import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, Fragment, toDisplayString, createTextVNode, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "Overtime",
  __ssrInlineRender: true,
  props: {
    overtimes: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", status: "", month: "" }) },
    employees: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ pending: 0, approved_hours: 0, approved_amount: 0 }) }
  },
  setup(__props) {
    var _a, _b, _c;
    const { can } = usePermissions();
    const page = usePage();
    const props = __props;
    const flashError = computed(() => {
      var _a2;
      return ((_a2 = page.props.flash) == null ? void 0 : _a2.error) || "";
    });
    const columns = [
      { key: "employee_name", label: "Employee" },
      { key: "date", label: "Date" },
      { key: "hours", label: "Hours", width: "90px" },
      { key: "rate_per_hour", label: "Rate/hr" },
      { key: "amount", label: "Amount" },
      { key: "note", label: "Note" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.overtimes) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const status = ref(((_b = props.filters) == null ? void 0 : _b.status) ?? "");
    const month = ref(((_c = props.filters) == null ? void 0 : _c.month) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/hr/overtime",
          {
            search: search.value || void 0,
            status: status.value || void 0,
            month: month.value || void 0
          },
          { preserveState: true, preserveScroll: true, replace: true, only: ["overtimes", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch([status, month], () => reload(0));
    const showModal = ref(false);
    const blank = { id: null, user_id: "", date: "", hours: "", rate_per_hour: "", note: "" };
    const form = useForm({ ...blank });
    const computedAmount = computed(
      () => money(Math.round((Number(form.hours) || 0) * (Number(form.rate_per_hour) || 0) * 100) / 100)
    );
    const suggestedRate = computed(
      () => {
        var _a2;
        return ((_a2 = props.employees.find((e) => String(e.id) === String(form.user_id))) == null ? void 0 : _a2.suggested_rate) || 0;
      }
    );
    const openModal = () => {
      Object.assign(form, blank);
      form.date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (o) => {
      Object.assign(form, {
        id: o.id,
        user_id: o.user_id,
        date: o.date,
        hours: o.hours,
        rate_per_hour: o.rate_per_hour,
        note: o.note ?? ""
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/hr/overtime/${form.id}`, opts);
      else form.post("/hr/overtime", opts);
    };
    const decide = (row, next) => {
      router.put(`/hr/overtime/${row.id}/decide`, { status: next }, { preserveScroll: true });
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this overtime entry?")) return;
      router.delete(`/hr/overtime/${id}`, { preserveScroll: true });
    };
    const money = (v) => `Rs ${Number(v || 0).toLocaleString(void 0, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    const badgeClass = (s) => ({ approved: "ui-badge--success", rejected: "ui-badge--muted", pending: "ui-badge--warning" })[s] ?? "ui-badge--muted";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-29880948>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Overtime",
        subtitle: "Extra hours worked. Only approved overtime is paid by payroll."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.overtime.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-29880948${_scopeId}> + Log Overtime </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.overtime.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Log Overtime ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-29880948>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-29880948>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Pending",
        value: props.stats.pending
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Approved Hours",
        value: props.stats.approved_hours
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Approved Amount",
        value: money(props.stats.approved_amount)
      }, null, _parent));
      _push(`</div><div class="ot__filters" data-v-29880948>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: status.value,
        "onUpdate:modelValue": ($event) => status.value = $event,
        label: "Status",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-29880948${_scopeId}>All statuses</option><option value="pending" data-v-29880948${_scopeId}>Pending</option><option value="approved" data-v-29880948${_scopeId}>Approved</option><option value="rejected" data-v-29880948${_scopeId}>Rejected</option>`);
          } else {
            return [
              createVNode("option", { value: "" }, "All statuses"),
              createVNode("option", { value: "pending" }, "Pending"),
              createVNode("option", { value: "approved" }, "Approved"),
              createVNode("option", { value: "rejected" }, "Rejected")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: month.value,
        "onUpdate:modelValue": ($event) => month.value = $event,
        label: "Month",
        type: "month"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: rows.value,
        index: "",
        searchable: "",
        query: search.value,
        "onUpdate:query": ($event) => search.value = $event,
        "search-placeholder": "Search employee…",
        "empty-text": "No overtime entries found."
      }, {
        "cell:employee_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="ot__name" data-v-29880948${_scopeId}><strong data-v-29880948${_scopeId}>${ssrInterpolate(row.employee_name)}</strong>`);
            if (row.employee_code) {
              _push2(`<span class="ot__code" data-v-29880948${_scopeId}>${ssrInterpolate(row.employee_code)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "ot__name" }, [
                createVNode("strong", null, toDisplayString(row.employee_name), 1),
                row.employee_code ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ot__code"
                }, toDisplayString(row.employee_code), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:rate_per_hour": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(money(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:amount": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<strong data-v-29880948${_scopeId}>${ssrInterpolate(money(value))}</strong>`);
          } else {
            return [
              createVNode("strong", null, toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:status": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([badgeClass(row.status), "ui-badge"])}" data-v-29880948${_scopeId}>${ssrInterpolate(label(row.status))}</span>`);
            if (row.approver_name) {
              _push2(`<span class="ot__by" data-v-29880948${_scopeId}>by ${ssrInterpolate(row.approver_name)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", badgeClass(row.status)]
              }, toDisplayString(label(row.status)), 3),
              row.approver_name ? (openBlock(), createBlock("span", {
                key: 0,
                class: "ot__by"
              }, "by " + toDisplayString(row.approver_name), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.overtime.approve")) {
              _push2(`<!--[-->`);
              if (row.status !== "approved") {
                _push2(`<button class="ui-btn ui-btn--success ui-btn--sm" data-v-29880948${_scopeId}> Approve </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (row.status !== "rejected") {
                _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-29880948${_scopeId}> Reject </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (row.status !== "pending") {
                _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-29880948${_scopeId}> Reset </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.overtime.update") && row.status !== "approved") {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-29880948${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.overtime.delete") && row.status !== "approved") {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-29880948${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.overtime.approve") ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                row.status !== "approved" ? (openBlock(), createBlock("button", {
                  key: 0,
                  class: "ui-btn ui-btn--success ui-btn--sm",
                  onClick: ($event) => decide(row, "approved")
                }, " Approve ", 8, ["onClick"])) : createCommentVNode("", true),
                row.status !== "rejected" ? (openBlock(), createBlock("button", {
                  key: 1,
                  class: "ui-btn ui-btn--danger ui-btn--sm",
                  onClick: ($event) => decide(row, "rejected")
                }, " Reject ", 8, ["onClick"])) : createCommentVNode("", true),
                row.status !== "pending" ? (openBlock(), createBlock("button", {
                  key: 2,
                  class: "ui-btn ui-btn--ghost ui-btn--sm",
                  onClick: ($event) => decide(row, "pending")
                }, " Reset ", 8, ["onClick"])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              unref(can)("hr.overtime.update") && row.status !== "approved" ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.overtime.delete") && row.status !== "approved" ? (openBlock(), createBlock("button", {
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
        paginator: props.overtimes,
        only: ["overtimes"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Overtime" : "Log Overtime"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-29880948${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-29880948${_scopeId}>Save</button>`);
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
                  _push3(`<option value="" data-v-29880948${_scopeId2}>— select —</option><!--[-->`);
                  ssrRenderList(props.employees, (e) => {
                    _push3(`<option${ssrRenderAttr("value", e.id)} data-v-29880948${_scopeId2}>${ssrInterpolate(e.name)}</option>`);
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
            _push2(`<div class="ot__grid" data-v-29880948${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).date,
              "onUpdate:modelValue": ($event) => unref(form).date = $event,
              label: "Date",
              type: "date",
              error: unref(form).errors.date
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).hours,
              "onUpdate:modelValue": ($event) => unref(form).hours = $event,
              label: "Hours",
              type: "number",
              step: "0.25",
              error: unref(form).errors.hours
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).rate_per_hour,
              "onUpdate:modelValue": ($event) => unref(form).rate_per_hour = $event,
              label: "Rate per hour",
              type: "number",
              step: "0.01",
              error: unref(form).errors.rate_per_hour
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              label: "Amount",
              "model-value": computedAmount.value,
              readonly: ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (suggestedRate.value) {
              _push2(`<p class="ot__hint" data-v-29880948${_scopeId}> Suggested rate from basic salary: ${ssrInterpolate(money(suggestedRate.value))}/hr <button type="button" class="ot__link" data-v-29880948${_scopeId}>use this</button></p>`);
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
              createVNode("div", { class: "ot__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).date,
                  "onUpdate:modelValue": ($event) => unref(form).date = $event,
                  label: "Date",
                  type: "date",
                  error: unref(form).errors.date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).hours,
                  "onUpdate:modelValue": ($event) => unref(form).hours = $event,
                  label: "Hours",
                  type: "number",
                  step: "0.25",
                  error: unref(form).errors.hours
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).rate_per_hour,
                  "onUpdate:modelValue": ($event) => unref(form).rate_per_hour = $event,
                  label: "Rate per hour",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.rate_per_hour
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  label: "Amount",
                  "model-value": computedAmount.value,
                  readonly: ""
                }, null, 8, ["model-value"])
              ]),
              suggestedRate.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "ot__hint"
              }, [
                createTextVNode(" Suggested rate from basic salary: " + toDisplayString(money(suggestedRate.value)) + "/hr ", 1),
                createVNode("button", {
                  type: "button",
                  class: "ot__link",
                  onClick: ($event) => unref(form).rate_per_hour = suggestedRate.value
                }, "use this", 8, ["onClick"])
              ])) : createCommentVNode("", true),
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Overtime.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Overtime = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-29880948"]]);
export {
  Overtime as default
};
