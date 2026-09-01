<template>
  <div class="page">
    <PageHeader title="Food Categories" subtitle="Organize menu items into categories.">
      <template #actions>
        <button v-if="can('food-categories.create')" class="ui-btn ui-btn--primary" @click="openModal">+ Add Category</button>
      </template>
    </PageHeader>

    <DataTable
      :columns="columns"
      :rows="rows"
      index
      searchable
      v-model:query="search"
      search-placeholder="Search categories…"
      empty-text="No categories found."
    >
      <template #cell:status="{ value }">
        <span class="ui-badge" :class="value ? 'ui-badge--success' : 'ui-badge--muted'">
          {{ value ? "Active" : "Inactive" }}
        </span>
      </template>
      <template #actions="{ row }">
        <button v-if="can('food-categories.update')" class="ui-btn ui-btn--ghost ui-btn--sm" @click="editCategory(row)">Edit</button>
        <button v-if="can('food-categories.delete')" class="ui-btn ui-btn--danger ui-btn--sm" @click="deleteCategory(row.id)">Delete</button>
      </template>
    </DataTable>

    <Pagination :paginator="props.categories" :only="['categories']" />

    <Modal v-model="showModal" :title="form.id ? 'Edit Food Category' : 'Add Food Category'">
      <FormField v-model="form.name" label="Name" placeholder="Name" :error="form.errors.name" />
      <FormField v-model="form.status" label="Status" type="select" :error="form.errors.status">
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </FormField>
      <template #footer>
        <button class="ui-btn ui-btn--ghost" @click="showModal = false">Cancel</button>
        <button class="ui-btn ui-btn--primary" :disabled="form.processing" @click="saveCategory">Save</button>
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
  categories: { type: Object, default: () => ({ data: [] }) },
  filters: { type: Object, default: () => ({ search: "" }) },
});

const columns = [
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];

// The visible slice for the current page. After any create/update/delete the
// controller redirects back and Inertia refreshes this prop automatically.
const rows = computed(() => props.categories?.data ?? []);

// Server-driven search: typing issues a debounced partial reload that re-runs
// the paginated query (only the `categories` prop) with the new term, resetting
// to page 1.
const search = ref(props.filters?.search ?? "");
let searchTimer = null;
watch(search, (value) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    router.get(
      "/food-categories",
      { search: value || undefined },
      { preserveState: true, preserveScroll: true, replace: true, only: ["categories", "filters"] }
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

const editCategory = (c) => {
  form.id = c.id;
  form.name = c.name;
  form.status = !!Number(c.status);
  form.clearErrors();
  showModal.value = true;
};

const saveCategory = () => {
  const opts = { preserveScroll: true, onSuccess: () => (showModal.value = false) };
  if (form.id) {
    form.put(`/food-categories/${form.id}`, opts);
  } else {
    form.post("/food-categories", opts);
  }
};

const deleteCategory = (id) => {
  if (!confirm("Are you sure?")) return;
  router.delete(`/food-categories/${id}`, { preserveScroll: true });
};
</script>
