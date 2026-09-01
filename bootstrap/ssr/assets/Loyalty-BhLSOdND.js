import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { usePage, useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { S as StatCard } from "./StatCard-BBMxSIbz.js";
import { C as CustomerPicker } from "./CustomerPicker-C7wIinmp.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Loyalty",
  __ssrInlineRender: true,
  props: {
    settings: { type: Object, default: () => ({}) },
    ledger: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", type: "" }) },
    types: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ outstanding: 0, members: 0, earned: 0, redeemed: 0 }) },
    topCustomers: { type: Array, default: () => [] }
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
      { key: "customer_name", label: "Customer" },
      { key: "type", label: "Entry", width: "100px" },
      { key: "points", label: "Points", width: "100px" },
      { key: "balance_after", label: "Balance", width: "100px" },
      { key: "order_id", label: "Order", width: "80px" },
      { key: "note", label: "Note" },
      { key: "expires_at", label: "Expires" },
      { key: "created_at", label: "When" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.ledger) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const type = ref(((_b = props.filters) == null ? void 0 : _b.type) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/crm/loyalty",
          { search: search.value || void 0, type: type.value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["ledger", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch(type, () => reload(0));
    const sForm = useForm({
      is_active: props.settings.is_active ?? true,
      points_per_currency: props.settings.points_per_currency ?? 1,
      currency_per_point: props.settings.currency_per_point ?? 1,
      min_redeem_points: props.settings.min_redeem_points ?? 100,
      max_redeem_percent: props.settings.max_redeem_percent ?? 50,
      points_expiry_days: props.settings.points_expiry_days ?? 0
    });
    const earnExample = computed(() => Math.floor(1e3 * (Number(sForm.points_per_currency) || 0)));
    const worthExample = computed(() => earnExample.value * (Number(sForm.currency_per_point) || 0));
    const showAdjust = ref(false);
    const aForm = useForm({ customer_id: null, points: "", note: "" });
    const openAdjust = () => {
      aForm.reset();
      aForm.clearErrors();
      showAdjust.value = true;
    };
    const submitAdjust = () => {
      aForm.post("/crm/loyalty/adjust", {
        preserveScroll: true,
        onSuccess: () => showAdjust.value = false
      });
    };
    const runExpiry = () => {
      if (!confirm("Write off every point past its expiry date?")) return;
      router.post("/crm/loyalty/expire", {}, { preserveScroll: true });
    };
    const typeClass = (t) => ({
      earn: "ui-badge--success",
      redeem: "ui-badge--info",
      adjust: "ui-badge--warning",
      expire: "ui-badge--danger"
    })[t] ?? "ui-badge--muted";
    const num = (v) => Number(v || 0).toLocaleString();
    const money = (v) => `Rs ${Number(v || 0).toLocaleString(void 0, { minimumFractionDigits: 0 })}`;
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-c707168d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Loyalty Points",
        subtitle: "Points settings and the append-only ledger behind every balance."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("crm.loyalty.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost" data-v-c707168d${_scopeId}> Adjust Points </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("crm.loyalty.update")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-c707168d${_scopeId}> Run Expiry Sweep </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("crm.loyalty.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost",
                onClick: openAdjust
              }, " Adjust Points ")) : createCommentVNode("", true),
              unref(can)("crm.loyalty.update") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--primary",
                onClick: runExpiry
              }, " Run Expiry Sweep ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-c707168d>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-c707168d>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Outstanding Points",
        value: num(props.stats.outstanding),
        hint: "Owed to customers",
        color: "var(--warning)",
        tint: "var(--warning-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Members with Points",
        value: num(props.stats.members)
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Points Earned",
        value: num(props.stats.earned)
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Points Redeemed",
        value: num(props.stats.redeemed)
      }, null, _parent));
      _push(`</div><div class="ly__split" data-v-c707168d><div class="ui-card ly__settings" data-v-c707168d><h3 class="ly__title" data-v-c707168d>Programme Settings</h3>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).is_active,
        "onUpdate:modelValue": ($event) => unref(sForm).is_active = $event,
        label: "Programme",
        type: "select",
        error: unref(sForm).errors.is_active
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option${ssrRenderAttr("value", true)} data-v-c707168d${_scopeId}>Running</option><option${ssrRenderAttr("value", false)} data-v-c707168d${_scopeId}>Paused</option>`);
          } else {
            return [
              createVNode("option", { value: true }, "Running"),
              createVNode("option", { value: false }, "Paused")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ly__grid" data-v-c707168d>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).points_per_currency,
        "onUpdate:modelValue": ($event) => unref(sForm).points_per_currency = $event,
        label: "Points earned per Rs 1",
        type: "number",
        step: "0.0001",
        error: unref(sForm).errors.points_per_currency
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).currency_per_point,
        "onUpdate:modelValue": ($event) => unref(sForm).currency_per_point = $event,
        label: "Rs value of 1 point",
        type: "number",
        step: "0.0001",
        error: unref(sForm).errors.currency_per_point
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).min_redeem_points,
        "onUpdate:modelValue": ($event) => unref(sForm).min_redeem_points = $event,
        label: "Minimum points to redeem",
        type: "number",
        error: unref(sForm).errors.min_redeem_points
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).max_redeem_percent,
        "onUpdate:modelValue": ($event) => unref(sForm).max_redeem_percent = $event,
        label: "Max % of a bill payable with points",
        type: "number",
        error: unref(sForm).errors.max_redeem_percent
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(sForm).points_expiry_days,
        "onUpdate:modelValue": ($event) => unref(sForm).points_expiry_days = $event,
        label: "Points expire after (days, 0 = never)",
        type: "number",
        error: unref(sForm).errors.points_expiry_days
      }, null, _parent));
      _push(`</div><p class="ly__note" data-v-c707168d> At these rates Rs 1,000 spent earns <strong data-v-c707168d>${ssrInterpolate(num(earnExample.value))}</strong> point(s), worth <strong data-v-c707168d>${ssrInterpolate(money(worthExample.value))}</strong> back. </p>`);
      if (unref(can)("crm.loyalty.update")) {
        _push(`<button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(sForm).processing) ? " disabled" : ""} data-v-c707168d> Save Settings </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ui-card ly__top" data-v-c707168d><h3 class="ly__title" data-v-c707168d>Top Balances</h3>`);
      if (props.topCustomers.length) {
        _push(`<table class="ly__table" data-v-c707168d><thead data-v-c707168d><tr data-v-c707168d><th data-v-c707168d>Customer</th><th class="ly__right" data-v-c707168d>Points</th></tr></thead><tbody data-v-c707168d><!--[-->`);
        ssrRenderList(props.topCustomers, (c) => {
          _push(`<tr data-v-c707168d><td data-v-c707168d><strong data-v-c707168d>${ssrInterpolate(c.name)}</strong>`);
          if (c.contact) {
            _push(`<span class="ly__meta" data-v-c707168d>${ssrInterpolate(c.contact)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</td><td class="ly__right" data-v-c707168d>${ssrInterpolate(num(c.balance))}</td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      } else {
        _push(`<p class="ly__note" data-v-c707168d>No customer holds points yet.</p>`);
      }
      _push(`</div></div><div class="ly__filters" data-v-c707168d>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: type.value,
        "onUpdate:modelValue": ($event) => type.value = $event,
        label: "Entry type",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-c707168d${_scopeId}>All entries</option><!--[-->`);
            ssrRenderList(props.types, (t) => {
              _push2(`<option${ssrRenderAttr("value", t)} data-v-c707168d${_scopeId}>${ssrInterpolate(label(t))}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("option", { value: "" }, "All entries"),
              (openBlock(true), createBlock(Fragment, null, renderList(props.types, (t) => {
                return openBlock(), createBlock("option", {
                  key: t,
                  value: t
                }, toDisplayString(label(t)), 9, ["value"]);
              }), 128))
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
        "search-placeholder": "Search customer, order or note…",
        "empty-text": "The ledger is empty."
      }, {
        "cell:customer_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-c707168d${_scopeId}>${ssrInterpolate(row.customer_name ?? "—")}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(row.customer_name ?? "—"), 1)
            ];
          }
        }),
        "cell:type": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([typeClass(value), "ui-badge"])}" data-v-c707168d${_scopeId}>${ssrInterpolate(label(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", typeClass(value)]
              }, toDisplayString(label(value)), 3)
            ];
          }
        }),
        "cell:points": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong class="${ssrRenderClass(Number(value) < 0 ? "ly__neg" : "ly__pos")}" data-v-c707168d${_scopeId}>${ssrInterpolate(Number(value) > 0 ? "+" : "")}${ssrInterpolate(num(value))}</strong>`);
          } else {
            return [
              createVNode("strong", {
                class: Number(value) < 0 ? "ly__neg" : "ly__pos"
              }, toDisplayString(Number(value) > 0 ? "+" : "") + toDisplayString(num(value)), 3)
            ];
          }
        }),
        "cell:balance_after": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(num(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(num(value)), 1)
            ];
          }
        }),
        "cell:order_id": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(value ? `#${value}` : "—")}`);
          } else {
            return [
              createTextVNode(toDisplayString(value ? `#${value}` : "—"), 1)
            ];
          }
        }),
        "cell:note": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ly__wrap" data-v-c707168d${_scopeId}>${ssrInterpolate(row.note || "—")}</span>`);
            if (row.created_by_name) {
              _push2(`<span class="ly__meta" data-v-c707168d${_scopeId}>by ${ssrInterpolate(row.created_by_name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", { class: "ly__wrap" }, toDisplayString(row.note || "—"), 1),
              row.created_by_name ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ly__meta"
              }, "by " + toDisplayString(row.created_by_name), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        "cell:expires_at": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(value || "—")}`);
          } else {
            return [
              createTextVNode(toDisplayString(value || "—"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.ledger,
        only: ["ledger"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showAdjust.value,
        "onUpdate:modelValue": ($event) => showAdjust.value = $event,
        title: "Adjust Points"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-c707168d${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(aForm).processing) ? " disabled" : ""} data-v-c707168d${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showAdjust.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: unref(aForm).processing,
                onClick: submitAdjust
              }, "Save", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CustomerPicker, {
              modelValue: unref(aForm).customer_id,
              "onUpdate:modelValue": ($event) => unref(aForm).customer_id = $event,
              label: "Customer",
              error: unref(aForm).errors.customer_id
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(aForm).points,
              "onUpdate:modelValue": ($event) => unref(aForm).points = $event,
              label: "Points (negative to deduct)",
              type: "number",
              error: unref(aForm).errors.points
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(aForm).note,
              "onUpdate:modelValue": ($event) => unref(aForm).note = $event,
              label: "Reason",
              error: unref(aForm).errors.note
            }, null, _parent2, _scopeId));
            _push2(`<p class="ly__note" data-v-c707168d${_scopeId}> The ledger is never edited — a correction is its own entry, so the history of what was awarded stays intact. </p>`);
          } else {
            return [
              createVNode(CustomerPicker, {
                modelValue: unref(aForm).customer_id,
                "onUpdate:modelValue": ($event) => unref(aForm).customer_id = $event,
                label: "Customer",
                error: unref(aForm).errors.customer_id
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(aForm).points,
                "onUpdate:modelValue": ($event) => unref(aForm).points = $event,
                label: "Points (negative to deduct)",
                type: "number",
                error: unref(aForm).errors.points
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(aForm).note,
                "onUpdate:modelValue": ($event) => unref(aForm).note = $event,
                label: "Reason",
                error: unref(aForm).errors.note
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("p", { class: "ly__note" }, " The ledger is never edited — a correction is its own entry, so the history of what was awarded stays intact. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/CRM/Loyalty.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Loyalty = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c707168d"]]);
export {
  Loyalty as default
};
