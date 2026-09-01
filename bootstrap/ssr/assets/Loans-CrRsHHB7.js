import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "Loans",
  __ssrInlineRender: true,
  props: {
    loans: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", status: "" }) },
    employees: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ active: 0, disbursed: 0, outstanding: 0 }) }
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
      { key: "employee_name", label: "Employee" },
      { key: "type", label: "Type", width: "110px" },
      { key: "disbursed_on", label: "Disbursed" },
      { key: "amount", label: "Amount" },
      { key: "installment_amount", label: "Installment" },
      { key: "recovered", label: "Recovered" },
      { key: "outstanding", label: "Outstanding" },
      { key: "status", label: "Status", width: "100px" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.loans) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const status = ref(((_b = props.filters) == null ? void 0 : _b.status) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/hr/loans",
          { search: search.value || void 0, status: status.value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["loans", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch(status, () => reload(0));
    const showModal = ref(false);
    const showRepay = ref(false);
    const showHistory = ref(false);
    const active = ref(null);
    const blank = {
      id: null,
      user_id: "",
      type: "loan",
      amount: "",
      installment_amount: "",
      disbursed_on: "",
      note: ""
    };
    const form = useForm({ ...blank });
    const repayForm = useForm({ amount: "", paid_on: "" });
    const months = computed(() => {
      const amount = Number(form.amount) || 0;
      const installment = Number(form.installment_amount) || 0;
      return amount > 0 && installment > 0 ? Math.ceil(amount / installment) : 0;
    });
    const percent = (row) => {
      const amount = Number(row.amount) || 0;
      return amount <= 0 ? 0 : Math.min(100, Math.round((Number(row.recovered) || 0) / amount * 100));
    };
    const openModal = () => {
      Object.assign(form, blank);
      form.disbursed_on = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (l) => {
      Object.assign(form, {
        id: l.id,
        user_id: l.user_id,
        type: l.type,
        amount: l.amount,
        installment_amount: l.installment_amount,
        disbursed_on: l.disbursed_on,
        note: l.note ?? ""
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/hr/loans/${form.id}`, opts);
      else form.post("/hr/loans", opts);
    };
    const openRepay = (row) => {
      active.value = row;
      repayForm.reset();
      repayForm.amount = Math.min(Number(row.installment_amount) || 0, Number(row.outstanding) || 0) || "";
      repayForm.paid_on = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      repayForm.clearErrors();
      showRepay.value = true;
    };
    const submitRepay = () => {
      repayForm.post(`/hr/loans/${active.value.id}/repay`, {
        preserveScroll: true,
        onSuccess: () => showRepay.value = false
      });
    };
    const openHistory = (row) => {
      active.value = row;
      showHistory.value = true;
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this loan?")) return;
      router.delete(`/hr/loans/${id}`, { preserveScroll: true });
    };
    const money = (v) => `Rs ${Number(v || 0).toLocaleString(void 0, { minimumFractionDigits: 0 })}`;
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-6f73ae08>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Loans & Advances",
        subtitle: "Payroll collects one installment per active loan each month."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.loans.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-6f73ae08${_scopeId}>+ Add Loan</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.loans.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, "+ Add Loan")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-6f73ae08>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-6f73ae08>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Active Loans",
        value: props.stats.active
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Total Disbursed",
        value: money(props.stats.disbursed)
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Outstanding",
        value: money(props.stats.outstanding),
        color: "var(--warning)",
        tint: "var(--warning-soft)"
      }, null, _parent));
      _push(`</div><div class="ln__filters" data-v-6f73ae08>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: status.value,
        "onUpdate:modelValue": ($event) => status.value = $event,
        label: "Status",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-6f73ae08${_scopeId}>All statuses</option><option value="active" data-v-6f73ae08${_scopeId}>Active</option><option value="closed" data-v-6f73ae08${_scopeId}>Closed</option>`);
          } else {
            return [
              createVNode("option", { value: "" }, "All statuses"),
              createVNode("option", { value: "active" }, "Active"),
              createVNode("option", { value: "closed" }, "Closed")
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
        "search-placeholder": "Search employee…",
        "empty-text": "No loans recorded."
      }, {
        "cell:employee_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ln__name" data-v-6f73ae08${_scopeId}><strong data-v-6f73ae08${_scopeId}>${ssrInterpolate(row.employee_name)}</strong>`);
            if (row.employee_code) {
              _push2(`<span class="ln__code" data-v-6f73ae08${_scopeId}>${ssrInterpolate(row.employee_code)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "ln__name" }, [
                createVNode("strong", null, toDisplayString(row.employee_name), 1),
                row.employee_code ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ln__code"
                }, toDisplayString(row.employee_code), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:type": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value === "advance" ? "ui-badge--info" : "ui-badge--muted", "ui-badge"])}" data-v-6f73ae08${_scopeId}>${ssrInterpolate(label(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value === "advance" ? "ui-badge--info" : "ui-badge--muted"]
              }, toDisplayString(label(value)), 3)
            ];
          }
        }),
        "cell:amount": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(money(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:installment_amount": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(money(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:recovered": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ln__progress" data-v-6f73ae08${_scopeId}><span data-v-6f73ae08${_scopeId}>${ssrInterpolate(money(row.recovered))}</span><div class="ln__bar" data-v-6f73ae08${_scopeId}><span style="${ssrRenderStyle({ width: percent(row) + "%" })}" data-v-6f73ae08${_scopeId}></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "ln__progress" }, [
                createVNode("span", null, toDisplayString(money(row.recovered)), 1),
                createVNode("div", { class: "ln__bar" }, [
                  createVNode("span", {
                    style: { width: percent(row) + "%" }
                  }, null, 4)
                ])
              ])
            ];
          }
        }),
        "cell:outstanding": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-6f73ae08${_scopeId}>${ssrInterpolate(money(value))}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:status": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value === "active" ? "ui-badge--warning" : "ui-badge--success", "ui-badge"])}" data-v-6f73ae08${_scopeId}>${ssrInterpolate(label(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value === "active" ? "ui-badge--warning" : "ui-badge--success"]
              }, toDisplayString(label(value)), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-6f73ae08${_scopeId}> History (${ssrInterpolate(row.repayments.length)}) </button>`);
            if (unref(can)("hr.loans.update") && row.status === "active") {
              _push2(`<button class="ui-btn ui-btn--success ui-btn--sm" data-v-6f73ae08${_scopeId}> Repay </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.loans.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-6f73ae08${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.loans.delete") && !row.repayments.length) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-6f73ae08${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => openHistory(row)
              }, " History (" + toDisplayString(row.repayments.length) + ") ", 9, ["onClick"]),
              unref(can)("hr.loans.update") && row.status === "active" ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--success ui-btn--sm",
                onClick: ($event) => openRepay(row)
              }, " Repay ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.loans.update") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.loans.delete") && !row.repayments.length ? (openBlock(), createBlock("button", {
                key: 2,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => deleteRow(row.id)
              }, " Delete ", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.loans,
        only: ["loans"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Loan" : "Add Loan"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-6f73ae08${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-6f73ae08${_scopeId}>Save</button>`);
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
              modelValue: unref(form).user_id,
              "onUpdate:modelValue": ($event) => unref(form).user_id = $event,
              label: "Employee",
              type: "select",
              error: unref(form).errors.user_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-6f73ae08${_scopeId2}>— select —</option><!--[-->`);
                  ssrRenderList(props.employees, (e) => {
                    _push3(`<option${ssrRenderAttr("value", e.id)} data-v-6f73ae08${_scopeId2}>${ssrInterpolate(e.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— select —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.employees, (e) => {
                      return openBlock(), createBlock("option", {
                        key: e.id,
                        value: e.id
                      }, toDisplayString(e.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="ln__grid" data-v-6f73ae08${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).type,
              "onUpdate:modelValue": ($event) => unref(form).type = $event,
              label: "Type",
              type: "select",
              error: unref(form).errors.type
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="loan" data-v-6f73ae08${_scopeId2}>Loan</option><option value="advance" data-v-6f73ae08${_scopeId2}>Salary advance</option>`);
                } else {
                  return [
                    createVNode("option", { value: "loan" }, "Loan"),
                    createVNode("option", { value: "advance" }, "Salary advance")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).disbursed_on,
              "onUpdate:modelValue": ($event) => unref(form).disbursed_on = $event,
              label: "Disbursed on",
              type: "date",
              error: unref(form).errors.disbursed_on
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).amount,
              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
              label: "Amount",
              type: "number",
              step: "0.01",
              error: unref(form).errors.amount
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).installment_amount,
              "onUpdate:modelValue": ($event) => unref(form).installment_amount = $event,
              label: "Monthly installment",
              type: "number",
              step: "0.01",
              error: unref(form).errors.installment_amount
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (months.value) {
              _push2(`<p class="ln__hint" data-v-6f73ae08${_scopeId}>Recovers in about ${ssrInterpolate(months.value)} month${ssrInterpolate(months.value === 1 ? "" : "s")}.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).note,
              "onUpdate:modelValue": ($event) => unref(form).note = $event,
              label: "Note",
              type: "textarea",
              error: unref(form).errors.note
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).user_id,
                "onUpdate:modelValue": ($event) => unref(form).user_id = $event,
                label: "Employee",
                type: "select",
                error: unref(form).errors.user_id
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: "" }, "— select —"),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.employees, (e) => {
                    return openBlock(), createBlock("option", {
                      key: e.id,
                      value: e.id
                    }, toDisplayString(e.name), 9, ["value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "ln__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).type,
                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                  label: "Type",
                  type: "select",
                  error: unref(form).errors.type
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "loan" }, "Loan"),
                    createVNode("option", { value: "advance" }, "Salary advance")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).disbursed_on,
                  "onUpdate:modelValue": ($event) => unref(form).disbursed_on = $event,
                  label: "Disbursed on",
                  type: "date",
                  error: unref(form).errors.disbursed_on
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).amount,
                  "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                  label: "Amount",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.amount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).installment_amount,
                  "onUpdate:modelValue": ($event) => unref(form).installment_amount = $event,
                  label: "Monthly installment",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.installment_amount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              months.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "ln__hint"
              }, "Recovers in about " + toDisplayString(months.value) + " month" + toDisplayString(months.value === 1 ? "" : "s") + ".", 1)) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).note,
                "onUpdate:modelValue": ($event) => unref(form).note = $event,
                label: "Note",
                type: "textarea",
                error: unref(form).errors.note
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showRepay.value,
        "onUpdate:modelValue": ($event) => showRepay.value = $event,
        title: "Record Repayment"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-6f73ae08${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(repayForm).processing) ? " disabled" : ""} data-v-6f73ae08${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showRepay.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: unref(repayForm).processing,
                onClick: submitRepay
              }, "Save", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<p class="ln__hint" data-v-6f73ae08${_scopeId}>${ssrInterpolate((_a2 = active.value) == null ? void 0 : _a2.employee_name)} — outstanding <strong data-v-6f73ae08${_scopeId}>${ssrInterpolate(money((_b2 = active.value) == null ? void 0 : _b2.outstanding))}</strong></p><div class="ln__grid" data-v-6f73ae08${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(repayForm).amount,
              "onUpdate:modelValue": ($event) => unref(repayForm).amount = $event,
              label: "Amount",
              type: "number",
              step: "0.01",
              error: unref(repayForm).errors.amount
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(repayForm).paid_on,
              "onUpdate:modelValue": ($event) => unref(repayForm).paid_on = $event,
              label: "Paid on",
              type: "date",
              error: unref(repayForm).errors.paid_on
            }, null, _parent2, _scopeId));
            _push2(`</div><p class="ln__note" data-v-6f73ae08${_scopeId}> Use this only for repayments taken outside payroll — payroll collects the installment itself when a run is marked paid. </p>`);
          } else {
            return [
              createVNode("p", { class: "ln__hint" }, [
                createTextVNode(toDisplayString((_c = active.value) == null ? void 0 : _c.employee_name) + " — outstanding ", 1),
                createVNode("strong", null, toDisplayString(money((_d = active.value) == null ? void 0 : _d.outstanding)), 1)
              ]),
              createVNode("div", { class: "ln__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(repayForm).amount,
                  "onUpdate:modelValue": ($event) => unref(repayForm).amount = $event,
                  label: "Amount",
                  type: "number",
                  step: "0.01",
                  error: unref(repayForm).errors.amount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(repayForm).paid_on,
                  "onUpdate:modelValue": ($event) => unref(repayForm).paid_on = $event,
                  label: "Paid on",
                  type: "date",
                  error: unref(repayForm).errors.paid_on
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode("p", { class: "ln__note" }, " Use this only for repayments taken outside payroll — payroll collects the installment itself when a run is marked paid. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showHistory.value,
        "onUpdate:modelValue": ($event) => showHistory.value = $event,
        title: "Repayment History"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-6f73ae08${_scopeId}>Close</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showHistory.value = false
              }, "Close", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<p class="ln__hint" data-v-6f73ae08${_scopeId}>${ssrInterpolate((_a2 = active.value) == null ? void 0 : _a2.employee_name)} — ${ssrInterpolate(money((_b2 = active.value) == null ? void 0 : _b2.recovered))} of ${ssrInterpolate(money((_c = active.value) == null ? void 0 : _c.amount))} recovered </p>`);
            if ((_e = (_d = active.value) == null ? void 0 : _d.repayments) == null ? void 0 : _e.length) {
              _push2(`<table class="ln__table" data-v-6f73ae08${_scopeId}><thead data-v-6f73ae08${_scopeId}><tr data-v-6f73ae08${_scopeId}><th data-v-6f73ae08${_scopeId}>Paid on</th><th data-v-6f73ae08${_scopeId}>Amount</th><th data-v-6f73ae08${_scopeId}>Source</th></tr></thead><tbody data-v-6f73ae08${_scopeId}><!--[-->`);
              ssrRenderList(active.value.repayments, (r) => {
                _push2(`<tr data-v-6f73ae08${_scopeId}><td data-v-6f73ae08${_scopeId}>${ssrInterpolate(r.paid_on)}</td><td data-v-6f73ae08${_scopeId}>${ssrInterpolate(money(r.amount))}</td><td data-v-6f73ae08${_scopeId}>${ssrInterpolate(r.payroll_run_id ? `Payroll run #${r.payroll_run_id}` : "Manual")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table>`);
            } else {
              _push2(`<p class="ln__note" data-v-6f73ae08${_scopeId}>No repayments yet.</p>`);
            }
          } else {
            return [
              createVNode("p", { class: "ln__hint" }, toDisplayString((_f = active.value) == null ? void 0 : _f.employee_name) + " — " + toDisplayString(money((_g = active.value) == null ? void 0 : _g.recovered)) + " of " + toDisplayString(money((_h = active.value) == null ? void 0 : _h.amount)) + " recovered ", 1),
              ((_j = (_i = active.value) == null ? void 0 : _i.repayments) == null ? void 0 : _j.length) ? (openBlock(), createBlock("table", {
                key: 0,
                class: "ln__table"
              }, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", null, "Paid on"),
                    createVNode("th", null, "Amount"),
                    createVNode("th", null, "Source")
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(active.value.repayments, (r) => {
                    return openBlock(), createBlock("tr", {
                      key: r.id
                    }, [
                      createVNode("td", null, toDisplayString(r.paid_on), 1),
                      createVNode("td", null, toDisplayString(money(r.amount)), 1),
                      createVNode("td", null, toDisplayString(r.payroll_run_id ? `Payroll run #${r.payroll_run_id}` : "Manual"), 1)
                    ]);
                  }), 128))
                ])
              ])) : (openBlock(), createBlock("p", {
                key: 1,
                class: "ln__note"
              }, "No repayments yet."))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Loans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Loans = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f73ae08"]]);
export {
  Loans as default
};
