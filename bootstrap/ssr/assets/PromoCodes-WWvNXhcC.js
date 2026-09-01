import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { S as StatCard } from "./StatCard-BBMxSIbz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "PromoCodes",
  __ssrInlineRender: true,
  props: {
    promoCodes: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", status: "" }) },
    stats: { type: Object, default: () => ({ total: 0, active: 0, redemptions: 0, discount_given: 0 }) }
  },
  setup(__props) {
    var _a, _b;
    const { can } = usePermissions();
    const page = usePage();
    const props = __props;
    const flashError = computed(() => {
      var _a2;
      return ((_a2 = page.props.flash) == null ? void 0 : _a2.error) || "";
    });
    const columns = [
      { key: "code", label: "Code" },
      { key: "value", label: "Discount", width: "130px" },
      { key: "min_order_amount", label: "Min order" },
      { key: "window", label: "Valid" },
      { key: "usage", label: "Used" },
      { key: "redeemed_total", label: "Given away" },
      { key: "state", label: "State", width: "110px" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.promoCodes) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const status = ref(((_b = props.filters) == null ? void 0 : _b.status) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/crm/promo-codes",
          { search: search.value || void 0, status: status.value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["promoCodes", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch(status, () => reload(0));
    const showModal = ref(false);
    const blank = {
      id: null,
      code: "",
      description: "",
      type: "fixed",
      value: "",
      max_discount: "",
      min_order_amount: "",
      starts_at: "",
      ends_at: "",
      usage_limit: "",
      usage_limit_per_customer: "",
      is_active: true
    };
    const form = useForm({ ...blank });
    const openModal = () => {
      Object.assign(form, blank);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (p) => {
      Object.assign(form, {
        id: p.id,
        code: p.code,
        description: p.description ?? "",
        type: p.type,
        value: p.value,
        max_discount: p.max_discount ?? "",
        min_order_amount: p.min_order_amount ?? "",
        starts_at: p.starts_at ?? "",
        ends_at: p.ends_at ?? "",
        usage_limit: p.usage_limit ?? "",
        usage_limit_per_customer: p.usage_limit_per_customer ?? "",
        is_active: p.is_active
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      form.transform((data) => ({
        ...data,
        max_discount: data.max_discount === "" ? null : data.max_discount,
        min_order_amount: data.min_order_amount === "" ? 0 : data.min_order_amount,
        starts_at: data.starts_at || null,
        ends_at: data.ends_at || null,
        usage_limit: data.usage_limit === "" ? null : data.usage_limit,
        usage_limit_per_customer: data.usage_limit_per_customer === "" ? null : data.usage_limit_per_customer
      }));
      if (form.id) form.put(`/crm/promo-codes/${form.id}`, opts);
      else form.post("/crm/promo-codes", opts);
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this promo code?")) return;
      router.delete(`/crm/promo-codes/${id}`, { preserveScroll: true });
    };
    const stateClass = (state) => ({
      usable: "ui-badge--success",
      inactive: "ui-badge--muted",
      scheduled: "ui-badge--info",
      expired: "ui-badge--danger",
      exhausted: "ui-badge--warning"
    })[state] ?? "ui-badge--muted";
    const money = (v) => `Rs ${Number(v || 0).toLocaleString(void 0, { minimumFractionDigits: 0 })}`;
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-93c964bc>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Promo Codes",
        subtitle: "Codes the cashier types at checkout — the discount is computed server-side."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("crm.promo-codes.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-93c964bc${_scopeId}> + Add Promo Code </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("crm.promo-codes.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Add Promo Code ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-93c964bc>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-93c964bc>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Total Codes",
        value: props.stats.total
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Active",
        value: props.stats.active,
        color: "var(--success)",
        tint: "var(--success-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Redemptions",
        value: props.stats.redemptions
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Discount Given",
        value: money(props.stats.discount_given),
        color: "var(--warning)",
        tint: "var(--warning-soft)"
      }, null, _parent));
      _push(`</div><div class="pc__filters" data-v-93c964bc>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: status.value,
        "onUpdate:modelValue": ($event) => status.value = $event,
        label: "Status",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-93c964bc${_scopeId}>All statuses</option><option value="active" data-v-93c964bc${_scopeId}>Active</option><option value="inactive" data-v-93c964bc${_scopeId}>Inactive</option><option value="expired" data-v-93c964bc${_scopeId}>Expired</option>`);
          } else {
            return [
              createVNode("option", { value: "" }, "All statuses"),
              createVNode("option", { value: "active" }, "Active"),
              createVNode("option", { value: "inactive" }, "Inactive"),
              createVNode("option", { value: "expired" }, "Expired")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: rows.value,
        index: "",
        searchable: "",
        query: search.value,
        "onUpdate:query": ($event) => search.value = $event,
        "search-placeholder": "Search code or description…",
        "empty-text": "No promo codes yet."
      }, {
        "cell:code": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pc__code" data-v-93c964bc${_scopeId}><strong data-v-93c964bc${_scopeId}>${ssrInterpolate(row.code)}</strong>`);
            if (row.description) {
              _push2(`<span class="pc__desc" data-v-93c964bc${_scopeId}>${ssrInterpolate(row.description)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "pc__code" }, [
                createVNode("strong", null, toDisplayString(row.code), 1),
                row.description ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "pc__desc"
                }, toDisplayString(row.description), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:value": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-93c964bc${_scopeId}>${ssrInterpolate(row.type === "percentage" ? `${row.value}%` : money(row.value))}</span>`);
            if (row.max_discount) {
              _push2(`<span class="pc__cap" data-v-93c964bc${_scopeId}>max ${ssrInterpolate(money(row.max_discount))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", null, toDisplayString(row.type === "percentage" ? `${row.value}%` : money(row.value)), 1),
              row.max_discount ? (openBlock(), createBlock("span", {
                key: 0,
                class: "pc__cap"
              }, "max " + toDisplayString(money(row.max_discount)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        "cell:min_order_amount": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(Number(value) > 0 ? money(value) : "—")}`);
          } else {
            return [
              createTextVNode(toDisplayString(Number(value) > 0 ? money(value) : "—"), 1)
            ];
          }
        }),
        "cell:window": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="pc__window" data-v-93c964bc${_scopeId}>${ssrInterpolate(row.starts_at || "—")} → ${ssrInterpolate(row.ends_at || "no end")}</span>`);
          } else {
            return [
              createVNode("span", { class: "pc__window" }, toDisplayString(row.starts_at || "—") + " → " + toDisplayString(row.ends_at || "no end"), 1)
            ];
          }
        }),
        "cell:usage": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="pc__usage" data-v-93c964bc${_scopeId}><span data-v-93c964bc${_scopeId}>${ssrInterpolate(row.used_count)}${ssrInterpolate(row.usage_limit ? ` / ${row.usage_limit}` : "")}</span>`);
            if (row.usage_limit_per_customer) {
              _push2(`<span class="pc__cap" data-v-93c964bc${_scopeId}>${ssrInterpolate(row.usage_limit_per_customer)} per customer </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "pc__usage" }, [
                createVNode("span", null, toDisplayString(row.used_count) + toDisplayString(row.usage_limit ? ` / ${row.usage_limit}` : ""), 1),
                row.usage_limit_per_customer ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "pc__cap"
                }, toDisplayString(row.usage_limit_per_customer) + " per customer ", 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:redeemed_total": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(money(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:state": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([stateClass(value), "ui-badge"])}" data-v-93c964bc${_scopeId}>${ssrInterpolate(label(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", stateClass(value)]
              }, toDisplayString(label(value)), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("crm.promo-codes.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-93c964bc${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("crm.promo-codes.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-93c964bc${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("crm.promo-codes.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("crm.promo-codes.delete") ? (openBlock(), createBlock("button", {
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
        paginator: props.promoCodes,
        only: ["promoCodes"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Promo Code" : "Add Promo Code"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-93c964bc${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-93c964bc${_scopeId}>Save</button>`);
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
            _push2(`<div class="pc__grid" data-v-93c964bc${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).code,
              "onUpdate:modelValue": ($event) => unref(form).code = $event,
              label: "Code",
              placeholder: "e.g. FLAT100",
              error: unref(form).errors.code
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).is_active,
              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
              label: "Status",
              type: "select",
              error: unref(form).errors.is_active
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option${ssrRenderAttr("value", true)} data-v-93c964bc${_scopeId2}>Active</option><option${ssrRenderAttr("value", false)} data-v-93c964bc${_scopeId2}>Inactive</option>`);
                } else {
                  return [
                    createVNode("option", { value: true }, "Active"),
                    createVNode("option", { value: false }, "Inactive")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              label: "Description",
              error: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`<div class="pc__grid" data-v-93c964bc${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              label: "Type",
              type: "select",
              error: unref(form).errors.type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="fixed" data-v-93c964bc${_scopeId2}>Fixed amount</option><option value="percentage" data-v-93c964bc${_scopeId2}>Percentage</option>`);
                } else {
                  return [
                    createVNode("option", { value: "fixed" }, "Fixed amount"),
                    createVNode("option", { value: "percentage" }, "Percentage")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).value,
              "onUpdate:modelValue": ($event) => unref(form).value = $event,
              label: unref(form).type === "percentage" ? "Percentage off" : "Amount off",
              type: "number",
              step: "0.01",
              error: unref(form).errors.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).max_discount,
              "onUpdate:modelValue": ($event) => unref(form).max_discount = $event,
              label: "Max discount (optional)",
              type: "number",
              step: "0.01",
              error: unref(form).errors.max_discount
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).min_order_amount,
              "onUpdate:modelValue": ($event) => unref(form).min_order_amount = $event,
              label: "Min order amount",
              type: "number",
              step: "0.01",
              error: unref(form).errors.min_order_amount
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).starts_at,
              "onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
              label: "Starts on",
              type: "date",
              error: unref(form).errors.starts_at
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).ends_at,
              "onUpdate:modelValue": ($event) => unref(form).ends_at = $event,
              label: "Ends on",
              type: "date",
              error: unref(form).errors.ends_at
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).usage_limit,
              "onUpdate:modelValue": ($event) => unref(form).usage_limit = $event,
              label: "Total uses (blank = unlimited)",
              type: "number",
              error: unref(form).errors.usage_limit
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).usage_limit_per_customer,
              "onUpdate:modelValue": ($event) => unref(form).usage_limit_per_customer = $event,
              label: "Uses per customer",
              type: "number",
              error: unref(form).errors.usage_limit_per_customer
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(form).usage_limit_per_customer) {
              _push2(`<p class="pc__note" data-v-93c964bc${_scopeId}> A per-customer limit needs a customer on the order, so the cashier must pick one before the code applies. </p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "pc__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).code,
                  "onUpdate:modelValue": ($event) => unref(form).code = $event,
                  label: "Code",
                  placeholder: "e.g. FLAT100",
                  error: unref(form).errors.code
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).is_active,
                  "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                  label: "Status",
                  type: "select",
                  error: unref(form).errors.is_active
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: true }, "Active"),
                    createVNode("option", { value: false }, "Inactive")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).description,
                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                label: "Description",
                error: unref(form).errors.description
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "pc__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).type,
                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                  label: "Type",
                  type: "select",
                  error: unref(form).errors.type
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "fixed" }, "Fixed amount"),
                    createVNode("option", { value: "percentage" }, "Percentage")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).value,
                  "onUpdate:modelValue": ($event) => unref(form).value = $event,
                  label: unref(form).type === "percentage" ? "Percentage off" : "Amount off",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.value
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).max_discount,
                  "onUpdate:modelValue": ($event) => unref(form).max_discount = $event,
                  label: "Max discount (optional)",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.max_discount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).min_order_amount,
                  "onUpdate:modelValue": ($event) => unref(form).min_order_amount = $event,
                  label: "Min order amount",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.min_order_amount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).starts_at,
                  "onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
                  label: "Starts on",
                  type: "date",
                  error: unref(form).errors.starts_at
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).ends_at,
                  "onUpdate:modelValue": ($event) => unref(form).ends_at = $event,
                  label: "Ends on",
                  type: "date",
                  error: unref(form).errors.ends_at
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).usage_limit,
                  "onUpdate:modelValue": ($event) => unref(form).usage_limit = $event,
                  label: "Total uses (blank = unlimited)",
                  type: "number",
                  error: unref(form).errors.usage_limit
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).usage_limit_per_customer,
                  "onUpdate:modelValue": ($event) => unref(form).usage_limit_per_customer = $event,
                  label: "Uses per customer",
                  type: "number",
                  error: unref(form).errors.usage_limit_per_customer
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              unref(form).usage_limit_per_customer ? (openBlock(), createBlock("p", {
                key: 0,
                class: "pc__note"
              }, " A per-customer limit needs a customer on the order, so the cashier must pick one before the code applies. ")) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/CRM/PromoCodes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PromoCodes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93c964bc"]]);
export {
  PromoCodes as default
};
