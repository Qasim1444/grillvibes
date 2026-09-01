import { ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Stations",
  __ssrInlineRender: true,
  props: {
    stations: { type: Array, default: () => [] },
    branches: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] }
  },
  setup(__props) {
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "color", label: "Color" },
      { key: "name", label: "Station" },
      { key: "branch_name", label: "Branch" },
      { key: "category_ids", label: "Categories" },
      { key: "sort_order", label: "Order" },
      { key: "is_active", label: "Status" }
    ];
    const catName = (id) => {
      var _a;
      return ((_a = props.categories.find((c) => c.id === id)) == null ? void 0 : _a.name) ?? id;
    };
    const showModal = ref(false);
    const form = useForm({
      id: null,
      name: "",
      branch_id: "",
      color: "#6366f1",
      description: "",
      category_ids: [],
      is_active: true,
      sort_order: 0
    });
    const openModal = (row = null) => {
      form.reset();
      form.clearErrors();
      if (row) Object.assign(form, { ...row, branch_id: row.branch_id ?? "", category_ids: row.category_ids ?? [] });
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      form.id ? form.put(`/kds/stations/${form.id}`, opts) : form.post("/kds/stations", opts);
    };
    const del = (id) => {
      if (!confirm("Delete this station?")) return;
      router.delete(`/kds/stations/${id}`, { preserveScroll: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-2d650d15>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "KDS Stations",
        subtitle: "Configure kitchen display screens and their food category assignments."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="/kds/board" target="_blank" class="ui-btn ui-btn--ghost" data-v-2d650d15${_scopeId}>🖥 Open Board</a>`);
            if (unref(can)("kds.stations.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-2d650d15${_scopeId}>+ Add Station</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("a", {
                href: "/kds/board",
                target: "_blank",
                class: "ui-btn ui-btn--ghost"
              }, "🖥 Open Board"),
              unref(can)("kds.stations.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: ($event) => openModal()
              }, "+ Add Station", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: props.stations,
        index: "",
        "empty-text": "No stations configured."
      }, {
        "cell:color": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="kds-stn__dot" style="${ssrRenderStyle({ background: value })}" data-v-2d650d15${_scopeId}></span>`);
          } else {
            return [
              createVNode("span", {
                class: "kds-stn__dot",
                style: { background: value }
              }, null, 4)
            ];
          }
        }),
        "cell:is_active": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}" data-v-2d650d15${_scopeId}>${ssrInterpolate(value ? "Active" : "Inactive")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value ? "ui-badge--success" : "ui-badge--muted"]
              }, toDisplayString(value ? "Active" : "Inactive"), 3)
            ];
          }
        }),
        "cell:category_ids": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!value || value.length === 0) {
              _push2(`<span class="ui-badge ui-badge--muted" data-v-2d650d15${_scopeId}>All categories</span>`);
            } else {
              _push2(`<span class="kds-stn__cats" data-v-2d650d15${_scopeId}><!--[-->`);
              ssrRenderList(value, (id) => {
                _push2(`<span class="ui-badge ui-badge--info" data-v-2d650d15${_scopeId}>${ssrInterpolate(catName(id))}</span>`);
              });
              _push2(`<!--]--></span>`);
            }
          } else {
            return [
              !value || value.length === 0 ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ui-badge ui-badge--muted"
              }, "All categories")) : (openBlock(), createBlock("span", {
                key: 1,
                class: "kds-stn__cats"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(value, (id) => {
                  return openBlock(), createBlock("span", {
                    key: id,
                    class: "ui-badge ui-badge--info"
                  }, toDisplayString(catName(id)), 1);
                }), 128))
              ]))
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("kds.stations.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-2d650d15${_scopeId}>Edit</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("kds.stations.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-2d650d15${_scopeId}>Delete</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("kds.stations.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => openModal(row)
              }, "Edit", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("kds.stations.delete") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => del(row.id)
              }, "Delete", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Station" : "Add KDS Station",
        width: "560px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2d650d15${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-2d650d15${_scopeId}>Save</button>`);
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
            _push2(`<div class="form-grid-2" data-v-2d650d15${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              label: "Station Name *",
              placeholder: "e.g. Grill, Cold Kitchen",
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).branch_id,
              "onUpdate:modelValue": ($event) => unref(form).branch_id = $event,
              label: "Branch",
              type: "select",
              error: unref(form).errors.branch_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-2d650d15${_scopeId2}>All Branches</option><!--[-->`);
                  ssrRenderList(props.branches, (b) => {
                    _push3(`<option${ssrRenderAttr("value", b.id)} data-v-2d650d15${_scopeId2}>${ssrInterpolate(b.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "All Branches"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (b) => {
                      return openBlock(), createBlock("option", {
                        key: b.id,
                        value: b.id
                      }, toDisplayString(b.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ui-field" data-v-2d650d15${_scopeId}><label class="ui-label" data-v-2d650d15${_scopeId}>Accent Color</label><div class="kds-stn__color-row" data-v-2d650d15${_scopeId}><input${ssrRenderAttr("value", unref(form).color)} type="color" class="kds-stn__color-input" data-v-2d650d15${_scopeId}><span class="kds-stn__color-val" data-v-2d650d15${_scopeId}>${ssrInterpolate(unref(form).color)}</span><span class="kds-stn__preview" style="${ssrRenderStyle({ background: unref(form).color })}" data-v-2d650d15${_scopeId}>Preview</span></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).sort_order,
              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
              modelModifiers: { number: true },
              label: "Sort Order",
              type: "number",
              placeholder: "0",
              error: unref(form).errors.sort_order
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              label: "Description",
              type: "textarea",
              placeholder: "Optional — shown on the board",
              error: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`<div class="ui-field" data-v-2d650d15${_scopeId}><label class="ui-label" data-v-2d650d15${_scopeId}>Handles Categories</label><p class="kds-stn__hint" data-v-2d650d15${_scopeId}>Leave all unchecked to handle every category.</p><div class="kds-stn__cats-grid" data-v-2d650d15${_scopeId}><!--[-->`);
            ssrRenderList(props.categories, (cat) => {
              _push2(`<label class="kds-stn__cat-label" data-v-2d650d15${_scopeId}><input type="checkbox"${ssrRenderAttr("value", cat.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_ids) ? ssrLooseContain(unref(form).category_ids, cat.id) : unref(form).category_ids) ? " checked" : ""} data-v-2d650d15${_scopeId}><span data-v-2d650d15${_scopeId}>${ssrInterpolate(cat.name)}</span></label>`);
            });
            _push2(`<!--]--></div></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).is_active,
              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
              label: "Status",
              type: "select"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option${ssrRenderAttr("value", true)} data-v-2d650d15${_scopeId2}>Active</option><option${ssrRenderAttr("value", false)} data-v-2d650d15${_scopeId2}>Inactive</option>`);
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
              createVNode("div", { class: "form-grid-2" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  label: "Station Name *",
                  placeholder: "e.g. Grill, Cold Kitchen",
                  error: unref(form).errors.name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).branch_id,
                  "onUpdate:modelValue": ($event) => unref(form).branch_id = $event,
                  label: "Branch",
                  type: "select",
                  error: unref(form).errors.branch_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "All Branches"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (b) => {
                      return openBlock(), createBlock("option", {
                        key: b.id,
                        value: b.id
                      }, toDisplayString(b.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode("div", { class: "ui-field" }, [
                  createVNode("label", { class: "ui-label" }, "Accent Color"),
                  createVNode("div", { class: "kds-stn__color-row" }, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).color = $event,
                      type: "color",
                      class: "kds-stn__color-input"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).color]
                    ]),
                    createVNode("span", { class: "kds-stn__color-val" }, toDisplayString(unref(form).color), 1),
                    createVNode("span", {
                      class: "kds-stn__preview",
                      style: { background: unref(form).color }
                    }, "Preview", 4)
                  ])
                ]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).sort_order,
                  "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                  modelModifiers: { number: true },
                  label: "Sort Order",
                  type: "number",
                  placeholder: "0",
                  error: unref(form).errors.sort_order
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).description,
                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                label: "Description",
                type: "textarea",
                placeholder: "Optional — shown on the board",
                error: unref(form).errors.description
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "ui-field" }, [
                createVNode("label", { class: "ui-label" }, "Handles Categories"),
                createVNode("p", { class: "kds-stn__hint" }, "Leave all unchecked to handle every category."),
                createVNode("div", { class: "kds-stn__cats-grid" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (cat) => {
                    return openBlock(), createBlock("label", {
                      key: cat.id,
                      class: "kds-stn__cat-label"
                    }, [
                      withDirectives(createVNode("input", {
                        type: "checkbox",
                        value: cat.id,
                        "onUpdate:modelValue": ($event) => unref(form).category_ids = $event
                      }, null, 8, ["value", "onUpdate:modelValue"]), [
                        [vModelCheckbox, unref(form).category_ids]
                      ]),
                      createVNode("span", null, toDisplayString(cat.name), 1)
                    ]);
                  }), 128))
                ])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).is_active,
                "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                label: "Status",
                type: "select"
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: true }, "Active"),
                  createVNode("option", { value: false }, "Inactive")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/KDS/Stations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Stations = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d650d15"]]);
export {
  Stations as default
};
