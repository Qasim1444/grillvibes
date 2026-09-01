import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { router, useForm } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Designations",
  __ssrInlineRender: true,
  props: {
    designations: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "" }) }
  },
  setup(__props) {
    var _a;
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
      { key: "employees_count", label: "Employees", width: "120px" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.designations) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    let searchTimer = null;
    watch(search, (value) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        router.get(
          "/hr/designations",
          { search: value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["designations", "filters"] }
        );
      }, 300);
    });
    const showModal = ref(false);
    const form = useForm({ id: null, name: "", description: "" });
    const openModal = () => {
      form.reset();
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (d) => {
      form.id = d.id;
      form.name = d.name;
      form.description = d.description ?? "";
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/hr/designations/${form.id}`, opts);
      else form.post("/hr/designations", opts);
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this designation?")) return;
      router.delete(`/hr/designations/${id}`, { preserveScroll: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Designations",
        subtitle: "Job titles employees are assigned to."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.designations.create")) {
              _push2(`<button class="ui-btn ui-btn--primary"${_scopeId}> + Add Designation </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.designations.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Add Designation ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: rows.value,
        index: "",
        searchable: "",
        query: search.value,
        "onUpdate:query": ($event) => search.value = $event,
        "search-placeholder": "Search designations…",
        "empty-text": "No designations found."
      }, {
        "cell:employees_count": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value > 0 ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}"${_scopeId}>${ssrInterpolate(value)}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value > 0 ? "ui-badge--success" : "ui-badge--muted"]
              }, toDisplayString(value), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.designations.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm"${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.designations.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm"${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.designations.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.designations.delete") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => deleteRow(row.id)
              }, " Delete ", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.designations,
        only: ["designations"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Designation" : "Add Designation"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost"${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showModal.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: unref(form).processing,
                onClick: save
              }, "Save", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              label: "Name",
              placeholder: "e.g. Cashier",
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              label: "Description",
              type: "textarea",
              placeholder: "What this role does",
              error: unref(form).errors.description
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).name,
                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                label: "Name",
                placeholder: "e.g. Cashier",
                error: unref(form).errors.name
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).description,
                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                label: "Description",
                type: "textarea",
                placeholder: "What this role does",
                error: unref(form).errors.description
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Designations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
