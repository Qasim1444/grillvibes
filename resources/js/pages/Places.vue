<template>
  <div class="page">
    <PageHeader title="Places" subtitle="Manage service places / tables.">
      <template #actions>
        <button v-if="can('places.create')" class="ui-btn ui-btn--primary" @click="openModal">+ Add Place</button>
      </template>
    </PageHeader>

    <DataTable
      :columns="columns"
      :rows="places"
      index
      searchable
      v-model:query="search"
      search-placeholder="Search places…"
      empty-text="No places found."
    >
      <template #cell:status="{ value }">
        <span class="ui-badge" :class="value ? 'ui-badge--success' : 'ui-badge--muted'">
          {{ value ? "Active" : "Inactive" }}
        </span>
      </template>
      <template #actions="{ row }">
        <button v-if="can('places.update')" class="ui-btn ui-btn--ghost ui-btn--sm" @click="editPlace(row)">Edit</button>
        <button v-if="can('places.delete')" class="ui-btn ui-btn--danger ui-btn--sm" @click="deletePlace(row.id)">Delete</button>
      </template>
    </DataTable>

    <Pagination :paginator="props.places" :only="['places']" />

    <Modal v-model="showModal" :title="form.id ? 'Edit Place' : 'Add Place'">
      <FormField v-model="form.name" label="Name" placeholder="Name" :error="form.errors.name" />
      <FormField v-model="form.status" label="Status" type="select" :error="form.errors.status">
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </FormField>
      <template #footer>
        <button class="ui-btn ui-btn--ghost" @click="showModal = false">Cancel</button>
        <button class="ui-btn ui-btn--primary" :disabled="form.processing" @click="savePlace">Save</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { router, useForm } from "@inertiajs/vue3";
import AdminLayout from "../layouts/AdminLayout.vue";
import PageHeader from "../components/ui/PageHeader.vue";
import DataTable from "../components/ui/DataTable.vue";
import Pagination from "../components/ui/Pagination.vue";
import Modal from "../components/ui/Modal.vue";
import FormField from "../components/ui/FormField.vue";
import { usePermissions } from "../composables/usePermissions";

defineOptions({ layout: AdminLayout });

const { can } = usePermissions();

const props = defineProps({
  // Laravel paginator: { data, links, from, to, total, current_page, ... }.
  places: { type: Object, default: () => ({ data: [] }) },
  filters: { type: Object, default: () => ({ search: "" }) },
});

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];

const places = computed(() => props.places?.data ?? []);

// Server-driven search: typing issues a debounced partial reload that re-runs
// the paginated query (only the `places` prop) with the new term, resetting to
// page 1.
const search = ref(props.filters?.search ?? "");
let searchTimer = null;
watch(search, (value) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    router.get(
      "/places",
      { search: value || undefined },
      { preserveState: true, preserveScroll: true, replace: true, only: ["places", "filters"] }
    );
  }, 300);
});

const showModal = ref(false);
const form = useForm({ id: null, name: "", status: true });

const openModal = () => {
  form.reset();
  form.clearErrors();
  showModal.value = true;
};

const editPlace = (p) => {
  form.id = p.id;
  form.name = p.name;
  form.status = !!Number(p.status);
  form.clearErrors();
  showModal.value = true;
};

const savePlace = () => {
  const opts = { preserveScroll: true, onSuccess: () => (showModal.value = false) };
  if (form.id) {
    form.put(`/places/${form.id}`, opts);
  } else {
    form.post("/places", opts);
  }
};

const deletePlace = (id) => {
  if (!confirm("Are you sure?")) return;
  router.delete(`/places/${id}`, { preserveScroll: true });
};
</script>
