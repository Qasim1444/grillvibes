import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { router, useForm } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "FoodCategories",
  __ssrInlineRender: true,
  props: {
    // Laravel paginator: { data, links, from, to, total, current_page, ... }.
    categories: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "" }) }
  },
  setup(__props) {
    var _a;
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "name", label: "Name" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.categories) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    let searchTimer = null;
    watch(search, (value) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        router.get(
          "/food-categories",
          { search: value || void 0 },
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
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Food Categories",
        subtitle: "Organize menu items into categories."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("food-categories.create")) {
              _push2(`<button class="ui-btn ui-btn--primary"${_scopeId}>+ Add Category</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("food-categories.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, "+ Add Category")) : createCommentVNode("", true)
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
        "search-placeholder": "Search categories…",
        "empty-text": "No categories found."
      }, {
        "cell:status": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}"${_scopeId}>${ssrInterpolate(value ? "Active" : "Inactive")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value ? "ui-badge--success" : "ui-badge--muted"]
              }, toDisplayString(value ? "Active" : "Inactive"), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("food-categories.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm"${_scopeId}>Edit</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("food-categories.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm"${_scopeId}>Delete</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("food-categories.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editCategory(row)
              }, "Edit", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("food-categories.delete") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => deleteCategory(row.id)
              }, "Delete", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.categories,
        only: ["categories"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Food Category" : "Add Food Category"
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
                onClick: saveCategory
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
              placeholder: "Name",
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).status,
              "onUpdate:modelValue": ($event) => unref(form).status = $event,
              label: "Status",
              type: "select",
              error: unref(form).errors.status
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option${ssrRenderAttr("value", true)}${_scopeId2}>Active</option><option${ssrRenderAttr("value", false)}${_scopeId2}>Inactive</option>`);
                } else {
                  return [
                    createVNode("option", { value: true }, "Active"),
                    createVNode("option", { value: false }, "Inactive")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).name,
                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                label: "Name",
                placeholder: "Name",
                error: unref(form).errors.name
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).status,
                "onUpdate:modelValue": ($event) => unref(form).status = $event,
                label: "Status",
                type: "select",
                error: unref(form).errors.status
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: true }, "Active"),
                  createVNode("option", { value: false }, "Inactive")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "error"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/FoodCategories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
