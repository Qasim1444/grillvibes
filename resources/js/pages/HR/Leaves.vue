<template>
  <div class="page">
    <PageHeader title="Leaves" subtitle="Leave requests and approvals. Approved unpaid leave is deducted by payroll.">
      <template #actions>
        <button v-if="can('hr.leaves.create')" class="ui-btn ui-btn--primary" @click="openModal">
          + Add Leave
        </button>
      </template>
    </PageHeader>

    <div v-if="flashError" class="ui-alert ui-alert--danger">{{ flashError }}</div>

    <div class="stat-grid">
      <StatCard label="Pending" :value="props.stats.pending" />
      <StatCard label="Approved" :value="props.stats.approved" />
      <StatCard label="Rejected" :value="props.stats.rejected" />
    </div>

    <div class="lv__filters">
      <FormField v-model="status" label="Status" type="select">
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </FormField>
    </div>

    <DataTable
      :columns="columns"
      :rows="rows"
      index
      searchable
      v-model:query="search"
      search-placeholder="Search employee…"
      empty-text="No leave requests found."
    >
      <template #cell:employee_name="{ row }">
        <div class="lv__name">
          <strong>{{ row.employee_name }}</strong>
          <span v-if="row.employee_code" class="lv__code">{{ row.employee_code }}</span>
        </div>
      </template>
      <template #cell:leave_type_name="{ row }">
        {{ row.leave_type_name }}
        <span class="ui-badge" :class="row.is_paid ? 'ui-badge--success' : 'ui-badge--warning'">
          {{ row.is_paid ? "Paid" : "Unpaid" }}
        </span>
      </template>
      <template #cell:period="{ row }">{{ row.from_date }} → {{ row.to_date }}</template>
      <template #cell:status="{ row }">
        <span class="ui-badge" :class="badgeClass(row.status)">{{ label(row.status) }}</span>
        <span v-if="row.approver_name" class="lv__by">by {{ row.approver_name }}</span>
      </template>
      <template #actions="{ row }">
        <template v-if="can('hr.leaves.approve')">
          <button
            v-if="row.status !== 'approved'"
            class="ui-btn ui-btn--success ui-btn--sm"
            @click="decide(row, 'approved')"
          >
            Approve
          </button>
          <button
            v-if="row.status !== 'rejected'"
            class="ui-btn ui-btn--danger ui-btn--sm"
            @click="decide(row, 'rejected')"
          >
            Reject
          </button>
          <button
            v-if="row.status !== 'pending'"
            class="ui-btn ui-btn--ghost ui-btn--sm"
            @click="decide(row, 'pending')"
          >
            Reset
          </button>
        </template>
        <button
          v-if="can('hr.leaves.update') && row.status === 'pending'"
          class="ui-btn ui-btn--ghost ui-btn--sm"
          @click="editRow(row)"
        >
          Edit
        </button>
        <button v-if="can('hr.leaves.delete')" class="ui-btn ui-btn--danger ui-btn--sm" @click="deleteRow(row.id)">
          Delete
        </button>
      </template>
    </DataTable>

    <Pagination :paginator="props.leaves" :only="['leaves']" />

    <Modal v-model="showModal" :title="form.id ? 'Edit Leave Request' : 'Add Leave Request'">
      <FormField v-model="form.user_id" label="Employee" type="select" :error="form.errors.user_id">
        <option value="">— select —</option>
        <option v-for="e in props.employees" :key="e.id" :value="e.id">{{ e.name }}</option>
      </FormField>
      <FormField v-model="form.leave_type_id" label="Leave type" type="select" :error="form.errors.leave_type_id">
        <option value="">— select —</option>
        <option v-for="t in props.leaveTypes" :key="t.id" :value="t.id">
          {{ t.name }} ({{ t.is_paid ? "paid" : "unpaid" }}{{ t.days_per_year ? `, ${t.days_per_year}/yr` : "" }})
        </option>
      </FormField>
      <div class="lv__grid">
        <FormField v-model="form.from_date" label="From" type="date" :error="form.errors.from_date" />
        <FormField v-model="form.to_date" label="To" type="date" :error="form.errors.to_date" />
      </div>
      <p v-if="dayCount" class="lv__days">{{ dayCount }} day{{ dayCount === 1 ? "" : "s" }}</p>
      <FormField v-model="form.reason" label="Reason" type="textarea" :error="form.errors.reason" />
      <template #footer>
        <button class="ui-btn ui-btn--ghost" @click="showModal = false">Cancel</button>
        <button class="ui-btn ui-btn--primary" :disabled="form.processing" @click="save">Save</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { router, useForm, usePage } from "@inertiajs/vue3";
import AdminLayout from "../../layouts/AdminLayout.vue";
import PageHeader from "../../components/ui/PageHeader.vue";
import DataTable from "../../components/ui/DataTable.vue";
import Pagination from "../../components/ui/Pagination.vue";
import Modal from "../../components/ui/Modal.vue";
import FormField from "../../components/ui/FormField.vue";
import StatCard from "../../components/ui/StatCard.vue";
import { usePermissions } from "../../composables/usePermissions";

defineOptions({ layout: AdminLayout });

const { can } = usePermissions();
const page = usePage();

const props = defineProps({
  leaves: { type: Object, default: () => ({ data: [] }) },
  filters: { type: Object, default: () => ({ search: "", status: "" }) },
  employees: { type: Array, default: () => [] },
  leaveTypes: { type: Array, default: () => [] },
  stats: { type: Object, default: () => ({ pending: 0, approved: 0, rejected: 0 }) },
});

const flashError = computed(() => page.props.flash?.error || "");

const columns = [
  { key: "employee_name", label: "Employee" },
  { key: "leave_type_name", label: "Type" },
  { key: "period", label: "Period" },
  { key: "days", label: "Days", width: "80px" },
  { key: "reason", label: "Reason" },
  { key: "status", label: "Status" },
];

const rows = computed(() => props.leaves?.data ?? []);

const search = ref(props.filters?.search ?? "");
const status = ref(props.filters?.status ?? "");

let searchTimer = null;
const reload = (debounce) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(
    () =>
      router.get(
        "/hr/leaves",
        { search: search.value || undefined, status: status.value || undefined },
        { preserveState: true, preserveScroll: true, replace: true, only: ["leaves", "filters", "stats"] }
      ),
    debounce
  );
};
watch(search, () => reload(300));
watch(status, () => reload(0));

const showModal = ref(false);
const blank = { id: null, user_id: "", leave_type_id: "", from_date: "", to_date: "", reason: "" };
const form = useForm({ ...blank });

// Inclusive, mirrors the server-side day count.
const dayCount = computed(() => {
  if (!form.from_date || !form.to_date) return 0;
  const diff = new Date(form.to_date) - new Date(form.from_date);
  return diff < 0 ? 0 : Math.round(diff / 86400000) + 1;
});

const openModal = () => {
  Object.assign(form, blank);
  form.clearErrors();
  showModal.value = true;
};

const editRow = (l) => {
  Object.assign(form, {
    id: l.id,
    user_id: l.user_id,
    leave_type_id: l.leave_type_id,
    from_date: l.from_date,
    to_date: l.to_date,
    reason: l.reason ?? "",
  });
  form.clearErrors();
  showModal.value = true;
};

const save = () => {
  const opts = { preserveScroll: true, onSuccess: () => (showModal.value = false) };
  if (form.id) form.put(`/hr/leaves/${form.id}`, opts);
  else form.post("/hr/leaves", opts);
};

const decide = (row, next) => {
  router.put(`/hr/leaves/${row.id}/decide`, { status: next }, { preserveScroll: true });
};

const deleteRow = (id) => {
  if (!confirm("Delete this leave request?")) return;
  router.delete(`/hr/leaves/${id}`, { preserveScroll: true });
};

const label = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");
const badgeClass = (s) =>
  ({ approved: "ui-badge--success", rejected: "ui-badge--muted", pending: "ui-badge--warning" }[s] ??
  "ui-badge--muted");
</script>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 18px;
}

.lv__filters {
  max-width: 220px;
  margin-bottom: 14px;
}

.lv__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

.lv__name {
  display: flex;
  flex-direction: column;
}

.lv__code,
.lv__by {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.lv__by {
  display: block;
  margin-top: 2px;
}

.lv__days {
  font-size: 0.8rem;
  color: var(--text-soft);
  margin: -6px 0 12px;
}

@media (max-width: 860px) {
  .stat-grid {
    grid-template-columns: 1fr;
  }
  .lv__grid {
    grid-template-columns: 1fr;
  }
}
</style>
