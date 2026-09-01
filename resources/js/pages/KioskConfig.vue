<template>
  <div class="page">
    <PageHeader title="Kiosk Config" subtitle="Customise the self-order kiosk splash, order types and guest prompts — per place or a shared default.">
      <template #actions>
        <button v-if="can('kiosk.config')" class="ui-btn ui-btn--primary" @click="openCreate">+ New Config</button>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :rows="props.configs" index empty-text="No kiosk configs yet. Add one to customise the kiosk.">
      <template #cell:place_name="{ row }">
        <strong>{{ row.place_name || 'Default (all places)' }}</strong>
      </template>
      <template #cell:order_types="{ row }">
        <span v-for="t in (row.order_types || [])" :key="t" class="ui-badge ui-badge--info kc__type">{{ typeLabel(t) }}</span>
        <span v-if="!(row.order_types || []).length" class="kc__muted">—</span>
      </template>
      <template #cell:accent_color="{ value }">
        <span class="kc__swatch-row"><span class="kc__swatch" :style="{ background: value || '#6366f1' }" /> {{ value || '#6366f1' }}</span>
      </template>
      <template #cell:idle_timeout_seconds="{ value }">{{ value || 120 }}s</template>
      <template #cell:prompts="{ row }">
        <span v-if="row.require_name" class="ui-badge ui-badge--muted">Name</span>
        <span v-if="row.require_phone" class="ui-badge ui-badge--muted">Phone</span>
        <span v-if="!row.require_name && !row.require_phone" class="kc__muted">None</span>
      </template>
      <template #cell:is_active="{ value }">
        <span class="ui-badge" :class="value ? 'ui-badge--success' : 'ui-badge--muted'">{{ value ? 'Active' : 'Inactive' }}</span>
      </template>
      <template #actions="{ row }">
        <button v-if="can('kiosk.config')" class="ui-btn ui-btn--ghost ui-btn--sm" @click="openEdit(row)">Edit</button>
      </template>
    </DataTable>

    <Modal v-model="showModal" :title="form.id ? 'Edit Kiosk Config' : 'New Kiosk Config'" width="560px">
      <FormField v-if="!form.id" v-model="form.place_id" label="Place" type="select" :error="form.errors.place_id">
        <option value="">Default (all places)</option>
        <option v-for="p in props.places" :key="p.id" :value="p.id">{{ p.name }}</option>
      </FormField>
      <div v-else class="ui-field">
        <span class="ui-label">Place</span>
        <div class="kc__readonly">{{ editingPlaceName }}</div>
      </div>

      <div class="ui-field">
        <span class="ui-label">Order Types</span>
        <div class="kc__checks">
          <label v-for="t in ORDER_TYPES" :key="t.key" class="kc__check">
            <input type="checkbox" :value="t.key" :checked="form.order_types.includes(t.key)" @change="toggleType(t.key)" />
            <span>{{ t.label }}</span>
          </label>
        </div>
      </div>

      <FormField v-model="form.splash_title" label="Splash Title" placeholder="Welcome" :error="form.errors.splash_title" />
      <FormField v-model="form.splash_subtitle" label="Splash Subtitle" placeholder="Tap to start your order" :error="form.errors.splash_subtitle" />

      <div class="ui-field">
        <span class="ui-label">Accent Color</span>
        <div class="kc__color">
          <input type="color" v-model="form.accent_color" class="kc__color-picker" />
          <input v-model="form.accent_color" class="ui-input" placeholder="#6366f1" maxlength="20" />
        </div>
        <p v-if="form.errors.accent_color" class="ui-field__error">{{ form.errors.accent_color }}</p>
      </div>

      <FormField v-model.number="form.idle_timeout_seconds" label="Idle Timeout (seconds)" type="number" step="1" :error="form.errors.idle_timeout_seconds" />

      <div class="form-grid-2">
        <FormField v-model="form.require_name" label="Require Guest Name" type="select">
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </FormField>
        <FormField v-model="form.require_phone" label="Require Guest Phone" type="select">
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </FormField>
      </div>

      <FormField v-model="form.is_active" label="Status" type="select">
        <option :value="true">Active</option>
        <option :value="false">Inactive</option>
      </FormField>

      <template #footer>
        <button class="ui-btn ui-btn--ghost" @click="showModal = false">Cancel</button>
        <button class="ui-btn ui-btn--primary" :disabled="form.processing" @click="save">Save</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../layouts/AdminLayout.vue';
import PageHeader from '../components/ui/PageHeader.vue';
import DataTable from '../components/ui/DataTable.vue';
import Modal from '../components/ui/Modal.vue';
import FormField from '../components/ui/FormField.vue';
import { usePermissions } from '../composables/usePermissions';

defineOptions({ layout: AdminLayout });
const { can } = usePermissions();

const props = defineProps({
  configs: { type: Array, default: () => [] },
  places:  { type: Array, default: () => [] },
});

const ORDER_TYPES = [
  { key: 'dine_in',  label: 'Dine In' },
  { key: 'takeaway', label: 'Takeaway' },
  { key: 'delivery', label: 'Delivery' },
];
const typeLabel = k => ORDER_TYPES.find(t => t.key === k)?.label ?? k;

const columns = [
  { key: 'place_name',           label: 'Place' },
  { key: 'order_types',          label: 'Order Types' },
  { key: 'splash_title',         label: 'Splash Title' },
  { key: 'accent_color',         label: 'Accent' },
  { key: 'idle_timeout_seconds', label: 'Idle' },
  { key: 'prompts',              label: 'Prompts' },
  { key: 'is_active',            label: 'Status' },
];

const defaults = () => ({
  id: null, place_id: '', order_types: ['dine_in', 'takeaway'],
  splash_title: 'Welcome', splash_subtitle: 'Tap to start your order',
  accent_color: '#6366f1', idle_timeout_seconds: 120,
  require_name: false, require_phone: false, is_active: true,
});

const showModal = ref(false);
const form = useForm(defaults());

const editingPlaceName = computed(() =>
  props.places.find(p => String(p.id) === String(form.place_id))?.name ?? 'Default (all places)'
);

const toggleType = key => {
  const i = form.order_types.indexOf(key);
  if (i === -1) form.order_types.push(key);
  else form.order_types.splice(i, 1);
};

const openCreate = () => {
  form.defaults(defaults());
  form.reset(); form.clearErrors();
  showModal.value = true;
};

const openEdit = row => {
  form.id = row.id;
  form.place_id = row.place_id ?? '';
  form.order_types = Array.isArray(row.order_types) ? [...row.order_types] : [];
  form.splash_title = row.splash_title ?? '';
  form.splash_subtitle = row.splash_subtitle ?? '';
  form.accent_color = row.accent_color ?? '#6366f1';
  form.idle_timeout_seconds = row.idle_timeout_seconds ?? 120;
  form.require_name = !!row.require_name;
  form.require_phone = !!row.require_phone;
  form.is_active = !!row.is_active;
  form.clearErrors();
  showModal.value = true;
};

const save = () => {
  const opts = { preserveScroll: true, onSuccess: () => (showModal.value = false) };
  if (form.id) form.put(`/kiosk-config/${form.id}`, opts);
  else form.post('/kiosk-config', opts);
};
</script>

<style scoped>
.kc__muted       { color: var(--text-soft); }
.kc__type        { margin-right: 4px; }
.kc__swatch-row  { display: inline-flex; align-items: center; gap: 8px; font-size: 0.82rem; }
.kc__swatch      { width: 16px; height: 16px; border-radius: 4px; border: 1px solid var(--border); display: inline-block; }
.kc__checks      { display: flex; gap: 16px; flex-wrap: wrap; }
.kc__check       { display: flex; align-items: center; gap: 6px; font-size: 0.88rem; cursor: pointer; }
.kc__color       { display: flex; align-items: center; gap: 10px; }
.kc__color-picker{ width: 44px; height: 38px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: none; cursor: pointer; padding: 2px; }
.kc__readonly    { padding: 9px 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface-muted, #f8f9fa); color: var(--text-soft); }
.form-grid-2     { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
</style>
