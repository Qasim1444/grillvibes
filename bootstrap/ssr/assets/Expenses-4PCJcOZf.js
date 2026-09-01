import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, Fragment, createVNode, toDisplayString, createTextVNode, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Expenses",
  __ssrInlineRender: true,
  props: {
    expenses: { type: Object, default: () => ({ data: [] }) },
    branches: { type: Array, default: () => [] },
    vendors: { type: Array, default: () => [] },
    accounts: { type: Array, default: () => [] },
    categories: { type: Array, default: () => [] },
    paidVia: { type: Array, default: () => [] },
    statuses: { type: Array, default: () => [] },
    summary: { type: Object, default: () => ({ pending: 0, pending_amount: 0, approved_this_month: 0, total_this_month: 0 }) },
    filters: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "expense_number", label: "Expense #" },
      { key: "expense_date", label: "Date" },
      { key: "category", label: "Category" },
      { key: "payee", label: "Payee / Vendor" },
      { key: "amount", label: "Amount" },
      { key: "paid_via", label: "Paid Via" },
      { key: "status", label: "Status" }
    ];
    const expenses = computed(() => {
      var _a2;
      return ((_a2 = props.expenses) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const categoryFilter = ref(((_b = props.filters) == null ? void 0 : _b.category) ?? "");
    const statusFilter = ref(((_c = props.filters) == null ? void 0 : _c.status) ?? "");
    const paidViaFilter = ref(((_d = props.filters) == null ? void 0 : _d.paid_via) ?? "");
    const branchFilter = ref(((_e = props.filters) == null ? void 0 : _e.branch_id) ?? "");
    let timer = null;
    const reload = () => router.get(
      "/finance/expenses",
      {
        search: search.value || void 0,
        category: categoryFilter.value || void 0,
        status: statusFilter.value || void 0,
        paid_via: paidViaFilter.value || void 0,
        branch_id: branchFilter.value || void 0
      },
      { preserveState: true, preserveScroll: true, replace: true, only: ["expenses", "summary", "filters"] }
    );
    watch([search, categoryFilter, statusFilter, paidViaFilter, branchFilter], () => {
      clearTimeout(timer);
      timer = setTimeout(reload, 300);
    });
    const CATEGORY_LABELS = {
      rent: "Rent",
      utilities: "Utilities",
      salaries: "Salaries",
      supplies: "Supplies",
      repairs_maintenance: "Repairs & Maintenance",
      marketing: "Marketing",
      transport: "Transport",
      licenses_fees: "Licenses & Fees",
      bank_charges: "Bank Charges",
      misc: "Miscellaneous"
    };
    const catLabel = (c) => CATEGORY_LABELS[c] ?? c;
    const paidViaLabel = (p) => ({ cash: "Cash", bank: "Bank", card: "Card", petty_cash: "Petty Cash" })[p] ?? p;
    const statusLabel = (s) => ({ pending: "Pending", approved: "Approved", rejected: "Rejected" })[s] ?? s;
    const statusClass = (s) => ({
      pending: "ui-badge--warning",
      approved: "ui-badge--success",
      rejected: "ui-badge--danger"
    })[s] ?? "ui-badge--muted";
    const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const defaults = () => ({
      id: null,
      category: "supplies",
      branch_id: "",
      vendor_id: "",
      payee: "",
      expense_date: today(),
      amount: 0,
      paid_via: "cash",
      petty_cash_account_id: "",
      reference: "",
      description: "",
      notes: ""
    });
    const showModal = ref(false);
    const form = useForm(defaults());
    watch(() => form.paid_via, (v) => {
      if (v !== "petty_cash") form.petty_cash_account_id = "";
    });
    const openCreate = () => {
      form.defaults(defaults());
      form.reset();
      form.clearErrors();
      showModal.value = true;
    };
    const openEdit = (row) => {
      form.id = row.id;
      form.category = row.category ?? "misc";
      form.branch_id = row.branch_id ?? "";
      form.vendor_id = row.vendor_id ?? "";
      form.payee = row.payee ?? "";
      form.expense_date = date(row.expense_date);
      form.amount = row.amount ?? 0;
      form.paid_via = row.paid_via ?? "cash";
      form.petty_cash_account_id = row.petty_cash_account_id ?? "";
      form.reference = row.reference ?? "";
      form.description = row.description ?? "";
      form.notes = row.notes ?? "";
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/finance/expenses/${form.id}`, opts);
      else form.post("/finance/expenses", opts);
    };
    const approve = (row) => router.put(`/finance/expenses/${row.id}/approve`, {}, { preserveScroll: true });
    const reject = (row) => {
      if (!confirm(`Reject expense ${row.expense_number}?`)) return;
      router.put(`/finance/expenses/${row.id}/reject`, {}, { preserveScroll: true });
    };
    const del = (row) => {
      if (!confirm(`Delete expense ${row.expense_number}? Any petty-cash entry it created will be reversed.`)) return;
      router.delete(`/finance/expenses/${row.id}`, { preserveScroll: true });
    };
    const fmt = (v) => "Rs " + Number(v || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 });
    const fmtDate = (v) => v ? new Date(v).toLocaleDateString() : "—";
    const date = (v) => v ? String(v).slice(0, 10) : "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-8453b4fa>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Expenses",
        subtitle: "Record what the business spends — rent, utilities, supplies, repairs and more — against vendors or petty cash, with a simple approve / reject flow per outlet."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("expenses.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-8453b4fa${_scopeId}>+ New Expense</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("expenses.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openCreate
              }, "+ New Expense")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ex__kpis" data-v-8453b4fa><div class="ex__kpi ex__kpi--warn" data-v-8453b4fa><span class="ex__kpi-label" data-v-8453b4fa>Pending</span><span class="ex__kpi-val" data-v-8453b4fa>${ssrInterpolate(props.summary.pending)}</span><span class="ex__kpi-sub" data-v-8453b4fa>awaiting approval</span></div><div class="ex__kpi" data-v-8453b4fa><span class="ex__kpi-label" data-v-8453b4fa>Pending Amount</span><span class="ex__kpi-val" data-v-8453b4fa>${ssrInterpolate(fmt(props.summary.pending_amount))}</span><span class="ex__kpi-sub" data-v-8453b4fa>to be approved</span></div><div class="ex__kpi ex__kpi--ok" data-v-8453b4fa><span class="ex__kpi-label" data-v-8453b4fa>Approved (mo.)</span><span class="ex__kpi-val" data-v-8453b4fa>${ssrInterpolate(fmt(props.summary.approved_this_month))}</span><span class="ex__kpi-sub" data-v-8453b4fa>this month</span></div><div class="ex__kpi ex__kpi--info" data-v-8453b4fa><span class="ex__kpi-label" data-v-8453b4fa>Total (mo.)</span><span class="ex__kpi-val" data-v-8453b4fa>${ssrInterpolate(fmt(props.summary.total_this_month))}</span><span class="ex__kpi-sub" data-v-8453b4fa>all expenses this month</span></div></div><div class="ex__filters" data-v-8453b4fa><input${ssrRenderAttr("value", search.value)} class="ui-input ex__search" placeholder="Search # / description / payee…" data-v-8453b4fa><select class="ui-input" style="${ssrRenderStyle({ "width": "190px" })}" data-v-8453b4fa><option value="" data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, "") : ssrLooseEqual(categoryFilter.value, "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(props.categories, (c) => {
        _push(`<option${ssrRenderAttr("value", c)} data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(categoryFilter.value) ? ssrLooseContain(categoryFilter.value, c) : ssrLooseEqual(categoryFilter.value, c)) ? " selected" : ""}>${ssrInterpolate(catLabel(c))}</option>`);
      });
      _push(`<!--]--></select><select class="ui-input" style="${ssrRenderStyle({ "width": "150px" })}" data-v-8453b4fa><option value="" data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All Statuses</option><!--[-->`);
      ssrRenderList(props.statuses, (s) => {
        _push(`<option${ssrRenderAttr("value", s)} data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, s) : ssrLooseEqual(statusFilter.value, s)) ? " selected" : ""}>${ssrInterpolate(statusLabel(s))}</option>`);
      });
      _push(`<!--]--></select><select class="ui-input" style="${ssrRenderStyle({ "width": "160px" })}" data-v-8453b4fa><option value="" data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(paidViaFilter.value) ? ssrLooseContain(paidViaFilter.value, "") : ssrLooseEqual(paidViaFilter.value, "")) ? " selected" : ""}>All Payment Methods</option><!--[-->`);
      ssrRenderList(props.paidVia, (p) => {
        _push(`<option${ssrRenderAttr("value", p)} data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(paidViaFilter.value) ? ssrLooseContain(paidViaFilter.value, p) : ssrLooseEqual(paidViaFilter.value, p)) ? " selected" : ""}>${ssrInterpolate(paidViaLabel(p))}</option>`);
      });
      _push(`<!--]--></select><select class="ui-input" style="${ssrRenderStyle({ "width": "180px" })}" data-v-8453b4fa><option value="" data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(branchFilter.value) ? ssrLooseContain(branchFilter.value, "") : ssrLooseEqual(branchFilter.value, "")) ? " selected" : ""}>All Branches</option><!--[-->`);
      ssrRenderList(props.branches, (branch) => {
        _push(`<option${ssrRenderAttr("value", branch.id)} data-v-8453b4fa${ssrIncludeBooleanAttr(Array.isArray(branchFilter.value) ? ssrLooseContain(branchFilter.value, branch.id) : ssrLooseEqual(branchFilter.value, branch.id)) ? " selected" : ""}>${ssrInterpolate(branch.name)}</option>`);
      });
      _push(`<!--]--></select></div>`);
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: expenses.value,
        index: "",
        "empty-text": "No expenses found. Record your first expense."
      }, {
        "cell:expense_date": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(fmtDate(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(fmtDate(value)), 1)
            ];
          }
        }),
        "cell:category": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="ui-badge ui-badge--muted" data-v-8453b4fa${_scopeId}>${ssrInterpolate(catLabel(value))}</span>`);
          } else {
            return [
              createVNode("span", { class: "ui-badge ui-badge--muted" }, toDisplayString(catLabel(value)), 1)
            ];
          }
        }),
        "cell:payee": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (row.vendor_name || row.payee) {
              _push2(`<span data-v-8453b4fa${_scopeId}>${ssrInterpolate(row.vendor_name || row.payee)}</span>`);
            } else {
              _push2(`<span class="ex__muted" data-v-8453b4fa${_scopeId}>—</span>`);
            }
          } else {
            return [
              row.vendor_name || row.payee ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(row.vendor_name || row.payee), 1)) : (openBlock(), createBlock("span", {
                key: 1,
                class: "ex__muted"
              }, "—"))
            ];
          }
        }),
        "cell:amount": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-8453b4fa${_scopeId}>${ssrInterpolate(fmt(value))}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(fmt(value)), 1)
            ];
          }
        }),
        "cell:paid_via": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(paidViaLabel(row.paid_via))} `);
            if (row.account_name) {
              _push2(`<span class="ex__code" data-v-8453b4fa${_scopeId}>${ssrInterpolate(row.account_name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createTextVNode(toDisplayString(paidViaLabel(row.paid_via)) + " ", 1),
              row.account_name ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ex__code"
              }, toDisplayString(row.account_name), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        "cell:status": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([statusClass(row.status), "ui-badge"])}" data-v-8453b4fa${_scopeId}>${ssrInterpolate(statusLabel(row.status))}</span>`);
            if (row.voucher_number) {
              _push2(`<span class="ui-badge ui-badge--info ex__pill"${ssrRenderAttr("title", `Claimed on voucher ${row.voucher_number}`)} data-v-8453b4fa${_scopeId}> Claimed · ${ssrInterpolate(row.voucher_number)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", statusClass(row.status)]
              }, toDisplayString(statusLabel(row.status)), 3),
              row.voucher_number ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ui-badge ui-badge--info ex__pill",
                title: `Claimed on voucher ${row.voucher_number}`
              }, " Claimed · " + toDisplayString(row.voucher_number), 9, ["title"])) : createCommentVNode("", true)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("expenses.approve") && row.status === "pending") {
              _push2(`<button class="ui-btn ui-btn--secondary ui-btn--sm" data-v-8453b4fa${_scopeId}>Approve</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("expenses.approve") && row.status === "pending") {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-8453b4fa${_scopeId}>Reject</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (!row.expense_voucher_id) {
              _push2(`<!--[-->`);
              if (unref(can)("expenses.update")) {
                _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-8453b4fa${_scopeId}>Edit</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(can)("expenses.delete")) {
                _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-8453b4fa${_scopeId}>Delete</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<span class="ex__muted" style="${ssrRenderStyle({ "font-size": "0.78rem" })}" data-v-8453b4fa${_scopeId}>on voucher</span>`);
            }
          } else {
            return [
              unref(can)("expenses.approve") && row.status === "pending" ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--secondary ui-btn--sm",
                onClick: ($event) => approve(row)
              }, "Approve", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("expenses.approve") && row.status === "pending" ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => reject(row)
              }, "Reject", 8, ["onClick"])) : createCommentVNode("", true),
              !row.expense_voucher_id ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                unref(can)("expenses.update") ? (openBlock(), createBlock("button", {
                  key: 0,
                  class: "ui-btn ui-btn--ghost ui-btn--sm",
                  onClick: ($event) => openEdit(row)
                }, "Edit", 8, ["onClick"])) : createCommentVNode("", true),
                unref(can)("expenses.delete") ? (openBlock(), createBlock("button", {
                  key: 1,
                  class: "ui-btn ui-btn--danger ui-btn--sm",
                  onClick: ($event) => del(row)
                }, "Delete", 8, ["onClick"])) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createBlock("span", {
                key: 3,
                class: "ex__muted",
                style: { "font-size": "0.78rem" }
              }, "on voucher"))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.expenses,
        only: ["expenses"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Expense" : "New Expense",
        width: "720px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-8453b4fa${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-8453b4fa${_scopeId}>Save</button>`);
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
              modelValue: unref(form).description,
              "onUpdate:modelValue": ($event) => unref(form).description = $event,
              label: "Description *",
              placeholder: "e.g. October electricity bill",
              error: unref(form).errors.description
            }, null, _parent2, _scopeId));
            _push2(`<div class="form-grid-2" data-v-8453b4fa${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).category,
              "onUpdate:modelValue": ($event) => unref(form).category = $event,
              label: "Category *",
              type: "select",
              error: unref(form).errors.category
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.categories, (c) => {
                    _push3(`<option${ssrRenderAttr("value", c)} data-v-8453b4fa${_scopeId2}>${ssrInterpolate(catLabel(c))}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (c) => {
                      return openBlock(), createBlock("option", {
                        key: c,
                        value: c
                      }, toDisplayString(catLabel(c)), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).branch_id,
              "onUpdate:modelValue": ($event) => unref(form).branch_id = $event,
              label: "Branch",
              type: "select",
              error: unref(form).errors.branch_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-8453b4fa${_scopeId2}>Current Outlet</option><!--[-->`);
                  ssrRenderList(props.branches, (branch) => {
                    _push3(`<option${ssrRenderAttr("value", branch.id)} data-v-8453b4fa${_scopeId2}>${ssrInterpolate(branch.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "Current Outlet"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (branch) => {
                      return openBlock(), createBlock("option", {
                        key: branch.id,
                        value: branch.id
                      }, toDisplayString(branch.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).expense_date,
              "onUpdate:modelValue": ($event) => unref(form).expense_date = $event,
              label: "Expense Date *",
              type: "date",
              error: unref(form).errors.expense_date
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).amount,
              "onUpdate:modelValue": ($event) => unref(form).amount = $event,
              modelModifiers: { number: true },
              label: "Amount *",
              type: "number",
              step: "0.01",
              error: unref(form).errors.amount
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).paid_via,
              "onUpdate:modelValue": ($event) => unref(form).paid_via = $event,
              label: "Paid Via *",
              type: "select",
              error: unref(form).errors.paid_via
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.paidVia, (p) => {
                    _push3(`<option${ssrRenderAttr("value", p)} data-v-8453b4fa${_scopeId2}>${ssrInterpolate(paidViaLabel(p))}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.paidVia, (p) => {
                      return openBlock(), createBlock("option", {
                        key: p,
                        value: p
                      }, toDisplayString(paidViaLabel(p)), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(form).paid_via === "petty_cash") {
              _push2(ssrRenderComponent(_sfc_main$2, {
                modelValue: unref(form).petty_cash_account_id,
                "onUpdate:modelValue": ($event) => unref(form).petty_cash_account_id = $event,
                label: "Petty-Cash Fund *",
                type: "select",
                error: unref(form).errors.petty_cash_account_id
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<option value="" disabled data-v-8453b4fa${_scopeId2}>Select fund</option><!--[-->`);
                    ssrRenderList(props.accounts, (a) => {
                      _push3(`<option${ssrRenderAttr("value", a.id)} data-v-8453b4fa${_scopeId2}>${ssrInterpolate(a.name)}</option>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      createVNode("option", {
                        value: "",
                        disabled: ""
                      }, "Select fund"),
                      (openBlock(true), createBlock(Fragment, null, renderList(props.accounts, (a) => {
                        return openBlock(), createBlock("option", {
                          key: a.id,
                          value: a.id
                        }, toDisplayString(a.name), 9, ["value"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).vendor_id,
              "onUpdate:modelValue": ($event) => unref(form).vendor_id = $event,
              label: "Vendor",
              type: "select",
              error: unref(form).errors.vendor_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-8453b4fa${_scopeId2}>— None —</option><!--[-->`);
                  ssrRenderList(props.vendors, (v) => {
                    _push3(`<option${ssrRenderAttr("value", v.id)} data-v-8453b4fa${_scopeId2}>${ssrInterpolate(v.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— None —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.vendors, (v) => {
                      return openBlock(), createBlock("option", {
                        key: v.id,
                        value: v.id
                      }, toDisplayString(v.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).payee,
              "onUpdate:modelValue": ($event) => unref(form).payee = $event,
              label: "Payee",
              placeholder: "Free-text (if no vendor)",
              error: unref(form).errors.payee
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).reference,
              "onUpdate:modelValue": ($event) => unref(form).reference = $event,
              label: "Reference / Bill No.",
              error: unref(form).errors.reference
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(form).paid_via === "petty_cash") {
              _push2(`<p class="ex__hint" data-v-8453b4fa${_scopeId}>Paying from a fund posts a matching disbursement to its petty-cash ledger — unless the expense is claimed on a voucher, in which case the voucher&#39;s combined line covers it instead.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).notes,
              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
              label: "Notes",
              type: "textarea",
              error: unref(form).errors.notes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).description,
                "onUpdate:modelValue": ($event) => unref(form).description = $event,
                label: "Description *",
                placeholder: "e.g. October electricity bill",
                error: unref(form).errors.description
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "form-grid-2" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).category,
                  "onUpdate:modelValue": ($event) => unref(form).category = $event,
                  label: "Category *",
                  type: "select",
                  error: unref(form).errors.category
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (c) => {
                      return openBlock(), createBlock("option", {
                        key: c,
                        value: c
                      }, toDisplayString(catLabel(c)), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).branch_id,
                  "onUpdate:modelValue": ($event) => unref(form).branch_id = $event,
                  label: "Branch",
                  type: "select",
                  error: unref(form).errors.branch_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "Current Outlet"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (branch) => {
                      return openBlock(), createBlock("option", {
                        key: branch.id,
                        value: branch.id
                      }, toDisplayString(branch.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).expense_date,
                  "onUpdate:modelValue": ($event) => unref(form).expense_date = $event,
                  label: "Expense Date *",
                  type: "date",
                  error: unref(form).errors.expense_date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).amount,
                  "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                  modelModifiers: { number: true },
                  label: "Amount *",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.amount
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).paid_via,
                  "onUpdate:modelValue": ($event) => unref(form).paid_via = $event,
                  label: "Paid Via *",
                  type: "select",
                  error: unref(form).errors.paid_via
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.paidVia, (p) => {
                      return openBlock(), createBlock("option", {
                        key: p,
                        value: p
                      }, toDisplayString(paidViaLabel(p)), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                unref(form).paid_via === "petty_cash" ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  modelValue: unref(form).petty_cash_account_id,
                  "onUpdate:modelValue": ($event) => unref(form).petty_cash_account_id = $event,
                  label: "Petty-Cash Fund *",
                  type: "select",
                  error: unref(form).errors.petty_cash_account_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", {
                      value: "",
                      disabled: ""
                    }, "Select fund"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.accounts, (a) => {
                      return openBlock(), createBlock("option", {
                        key: a.id,
                        value: a.id
                      }, toDisplayString(a.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).vendor_id,
                  "onUpdate:modelValue": ($event) => unref(form).vendor_id = $event,
                  label: "Vendor",
                  type: "select",
                  error: unref(form).errors.vendor_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "— None —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.vendors, (v) => {
                      return openBlock(), createBlock("option", {
                        key: v.id,
                        value: v.id
                      }, toDisplayString(v.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).payee,
                  "onUpdate:modelValue": ($event) => unref(form).payee = $event,
                  label: "Payee",
                  placeholder: "Free-text (if no vendor)",
                  error: unref(form).errors.payee
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).reference,
                  "onUpdate:modelValue": ($event) => unref(form).reference = $event,
                  label: "Reference / Bill No.",
                  error: unref(form).errors.reference
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              unref(form).paid_via === "petty_cash" ? (openBlock(), createBlock("p", {
                key: 0,
                class: "ex__hint"
              }, "Paying from a fund posts a matching disbursement to its petty-cash ledger — unless the expense is claimed on a voucher, in which case the voucher's combined line covers it instead.")) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).notes,
                "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                label: "Notes",
                type: "textarea",
                error: unref(form).errors.notes
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Finance/Expenses.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Expenses = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8453b4fa"]]);
export {
  Expenses as default
};
