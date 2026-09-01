<template>
  <div class="page">
    <PageHeader title="Attendance" subtitle="Mark the whole roster for a day, then save the sheet in one go.">
      <template #actions>
        <button
          v-if="can('hr.attendance.create')"
          class="ui-btn ui-btn--primary"
          :disabled="saving || !sheet.length"
          @click="saveSheet"
        >
          {{ saving ? "Saving…" : "Save Sheet" }}
        </button>
      </template>
    </PageHeader>

    <div class="att__bar ui-card ui-card-pad">
      <div class="att__date">
        <label class="ui-label" for="att-date">Date</label>
        <input id="att-date" class="ui-input" type="date" :value="date" @change="changeDate($event.target.value)" />
      </div>

      <div v-if="can('hr.attendance.create')" class="att__bulk">
        <span class="ui-label">Mark everyone</span>
        <div class="att__bulk-btns">
          <button class="ui-btn ui-btn--ghost ui-btn--sm" @click="markAll('present')">Present</button>
          <button class="ui-btn ui-btn--ghost ui-btn--sm" @click="markAll('absent')">Absent</button>
          <button class="ui-btn ui-btn--ghost ui-btn--sm" @click="markAll('holiday')">Holiday</button>
        </div>
      </div>

      <div class="att__tallies">
        <span v-for="s in props.statuses" :key="s" class="ui-badge" :class="badgeClass(s)">
          {{ label(s) }}: {{ tallies[s] || 0 }}
        </span>
        <span class="ui-badge ui-badge--info">Total: {{ sheet.length }}</span>
      </div>
    </div>

    <div v-if="dirty" class="ui-alert ui-alert--danger">
      You have unsaved changes on this sheet — click <strong>Save Sheet</strong> before switching dates.
    </div>

    <div class="stat-grid">
      <StatCard :label="`Present (${props.monthSummary.month})`" :value="props.monthSummary.present" />
      <StatCard :label="`Absent (${props.monthSummary.month})`" :value="props.monthSummary.absent" />
      <StatCard :label="`On leave (${props.monthSummary.month})`" :value="props.monthSummary.leave" />
      <StatCard label="Days marked this month" :value="props.monthSummary.marked_days" />
    </div>

    <!-- The whole roster for one day is a fixed, small set, so it is not paged:
         paging it would make "save the sheet" silently drop the other pages.
         Filtering is client-side for the same reason — a server round trip would
         discard unsaved edits. -->
    <DataTable
      :columns="columns"
      :rows="sheet"
      index
      searchable
      search-placeholder="Filter by name, code or designation…"
      empty-text="No active employees. Add employees under HR → Employees."
    >
      <template #cell:name="{ row }">
        <div class="att__name">
          <strong>{{ row.name }}</strong>
          <span v-if="row.employee_code" class="att__code">{{ row.employee_code }}</span>
        </div>
      </template>
      <template #cell:status="{ row }">
        <select v-model="row.status" class="ui-select att__select" :disabled="!editable">
          <option v-for="s in props.statuses" :key="s" :value="s">{{ label(s) }}</option>
        </select>
      </template>
      <template #cell:check_in="{ row }">
        <input v-model="row.check_in" class="ui-input att__time" type="time" :disabled="!editable" />
      </template>
      <template #cell:check_out="{ row }">
        <input v-model="row.check_out" class="ui-input att__time" type="time" :disabled="!editable" />
      </template>
      <template #cell:late_minutes="{ row }">
        <input
          v-model.number="row.late_minutes"
          class="ui-input att__num"
          type="number"
          min="0"
          max="1440"
          :disabled="!editable"
        />
      </template>
      <template #cell:note="{ row }">
        <input v-model="row.note" class="ui-input" type="text" placeholder="Note" :disabled="!editable" />
      </template>
      <template #actions="{ row }">
        <button
          v-if="row.attendance_id && can('hr.attendance.delete')"
          class="ui-btn ui-btn--danger ui-btn--sm"
          @click="clearRow(row)"
        >
          Clear
        </button>
        <span v-else class="att__unsaved">{{ row.attendance_id ? "" : "Not saved" }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import AdminLayout from "../../layouts/AdminLayout.vue";
import PageHeader from "../../components/ui/PageHeader.vue";
import DataTable from "../../components/ui/DataTable.vue";
import StatCard from "../../components/ui/StatCard.vue";
import { usePermissions } from "../../composables/usePermissions";

defineOptions({ layout: AdminLayout });

const { can } = usePermissions();

const props = defineProps({
  date: { type: String, default: "" },
  roster: { type: Array, default: () => [] },
  statuses: { type: Array, default: () => [] },
  filters: { type: Object, default: () => ({ search: "" }) },
  monthSummary: { type: Object, default: () => ({ month: "", present: 0, absent: 0, leave: 0, marked_days: 0 }) },
});

const editable = computed(() => can("hr.attendance.create"));

const columns = [
  { key: "name", label: "Employee" },
  { key: "designation_name", label: "Designation" },
  { key: "status", label: "Status", width: "140px" },
  { key: "check_in", label: "In", width: "120px" },
  { key: "check_out", label: "Out", width: "120px" },
  { key: "late_minutes", label: "Late (min)", width: "110px" },
  { key: "note", label: "Note" },
];

// Local editable copy — props are replaced wholesale on every Inertia reload.
const clone = (rows) => rows.map((r) => ({ ...r }));
const sheet = ref(clone(props.roster));
const baseline = ref(JSON.stringify(sheet.value));
const saving = ref(false);
const date = computed(() => props.date);

watch(
  () => props.roster,
  (rows) => {
    sheet.value = clone(rows);
    baseline.value = JSON.stringify(sheet.value);
  }
);

const dirty = computed(() => JSON.stringify(sheet.value) !== baseline.value);

const tallies = computed(() =>
  sheet.value.reduce((acc, row) => {
    acc[row.status] = (acc[row.status] || 0) + 1;
    return acc;
  }, {})
);

const changeDate = (value) => {
  if (!value) return;
  if (dirty.value && !confirm("You have unsaved changes. Discard them and load another date?")) return;
  router.get("/hr/attendance", { date: value }, { preserveState: false, preserveScroll: true });
};

const markAll = (status) => sheet.value.forEach((row) => (row.status = status));

const saveSheet = () => {
  saving.value = true;
  router.post(
    "/hr/attendance/bulk",
    {
      date: props.date,
      rows: sheet.value.map((row) => ({
        user_id: row.user_id,
        status: row.status,
        check_in: row.check_in || null,
        check_out: row.check_out || null,
        late_minutes: row.late_minutes || 0,
        note: row.note || null,
      })),
    },
    { preserveScroll: true, onFinish: () => (saving.value = false) }
  );
};

const clearRow = (row) => {
  if (!confirm(`Remove the saved attendance entry for ${row.name}?`)) return;
  router.delete(`/hr/attendance/${row.attendance_id}`, { preserveScroll: true });
};

const label = (s) => (s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—");
const badgeClass = (s) =>
  ({
    present: "ui-badge--success",
    late: "ui-badge--warning",
    half_day: "ui-badge--warning",
    absent: "ui-badge--muted",
    leave: "ui-badge--info",
    holiday: "ui-badge--info",
  }[s] ?? "ui-badge--muted");
</script>

<style scoped>
.att__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 16px;
}

.att__date {
  max-width: 190px;
}

.att__bulk-btns {
  display: flex;
  gap: 6px;
}

.att__tallies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: auto;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}

.att__name {
  display: flex;
  flex-direction: column;
}

.att__code {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.att__select,
.att__time,
.att__num {
  padding: 6px 8px;
  font-size: 0.82rem;
}

.att__unsaved {
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 980px) {
  .stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .att__tallies {
    margin-left: 0;
  }
}
</style>
