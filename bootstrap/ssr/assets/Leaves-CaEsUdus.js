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
  __name: "Leaves",
  __ssrInlineRender: true,
  props: {
    leaves: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", status: "" }) },
    employees: { type: Array, default: () => [] },
    leaveTypes: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ pending: 0, approved: 0, rejected: 0 }) }
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
      { key: "leave_type_name", label: "Type" },
      { key: "period", label: "Period" },
      { key: "days", label: "Days", width: "80px" },
      { key: "reason", label: "Reason" },
      { key: "status", label: "Status" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.leaves) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const status = ref(((_b = props.filters) == null ? void 0 : _b.status) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/hr/leaves",
          { search: search.value || void 0, status: status.value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["leaves", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch(status, () => reload(0));
    const showModal = ref(false);
    const blank = { id: null, user_id: "", leave_type_id: "", from_date: "", to_date: "", reason: "" };
    const form = useForm({ ...blank });
    const dayCount = computed(() => {
      if (!form.from_date || !form.to_date) return 0;
      const diff = new Date(form.to_date) - new Date(form.from_date);
      return diff < 0 ? 0 : Math.round(diff / 864e5) + 1;
    });
    const openModal = () => {
      Object.assign(form, blank);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (l) => {
      Object.assign(form, {
        id: l.id,
        user_id: l.user_id,
        leave_type_id: l.leave_type_id,
        from_date: l.from_date,
        to_date: l.to_date,
        reason: l.reason ?? ""
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/hr/leaves/${form.id}`, opts);
      else form.post("/hr/leaves", opts);
    };
    const decide = (row, next) => {
      router.put(`/hr/leaves/${row.id}/decide`, { status: next }, { preserveScroll: true });
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this leave request?")) return;
      router.delete(`/hr/leaves/${id}`, { preserveScroll: true });
    };
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    const badgeClass = (s) => ({ approved: "ui-badge--success", rejected: "ui-badge--muted", pending: "ui-badge--warning" })[s] ?? "ui-badge--muted";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-94ceb162>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Leaves",
        subtitle: "Leave requests and approvals. Approved unpaid leave is deducted by payroll."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.leaves.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-94ceb162${_scopeId}> + Add Leave </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.leaves.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Add Leave ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-94ceb162>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-94ceb162>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Pending",
        value: props.stats.pending
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Approved",
        value: props.stats.approved
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Rejected",
        value: props.stats.rejected
      }, null, _parent));
      _push(`</div><div class="lv__filters" data-v-94ceb162>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: status.value,
        "onUpdate:modelValue": ($event) => status.value = $event,
        label: "Status",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-94ceb162${_scopeId}>All statuses</option><option value="pending" data-v-94ceb162${_scopeId}>Pending</option><option value="approved" data-v-94ceb162${_scopeId}>Approved</option><option value="rejected" data-v-94ceb162${_scopeId}>Rejected</option>`);
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
      _push(`</div>`);
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: rows.value,
        index: "",
        searchable: "",
        query: search.value,
        "onUpdate:query": ($event) => search.value = $event,
        "search-placeholder": "Search employee…",
        "empty-text": "No leave requests found."
      }, {
        "cell:employee_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="lv__name" data-v-94ceb162${_scopeId}><strong data-v-94ceb162${_scopeId}>${ssrInterpolate(row.employee_name)}</strong>`);
            if (row.employee_code) {
              _push2(`<span class="lv__code" data-v-94ceb162${_scopeId}>${ssrInterpolate(row.employee_code)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "lv__name" }, [
                createVNode("strong", null, toDisplayString(row.employee_name), 1),
                row.employee_code ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "lv__code"
                }, toDisplayString(row.employee_code), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:leave_type_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(row.leave_type_name)} <span class="${ssrRenderClass([row.is_paid ? "ui-badge--success" : "ui-badge--warning", "ui-badge"])}" data-v-94ceb162${_scopeId}>${ssrInterpolate(row.is_paid ? "Paid" : "Unpaid")}</span>`);
          } else {
            return [
              createTextVNode(toDisplayString(row.leave_type_name) + " ", 1),
              createVNode("span", {
                class: ["ui-badge", row.is_paid ? "ui-badge--success" : "ui-badge--warning"]
              }, toDisplayString(row.is_paid ? "Paid" : "Unpaid"), 3)
            ];
          }
        }),
        "cell:period": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(row.from_date)} → ${ssrInterpolate(row.to_date)}`);
          } else {
            return [
              createTextVNode(toDisplayString(row.from_date) + " → " + toDisplayString(row.to_date), 1)
            ];
          }
        }),
        "cell:status": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([badgeClass(row.status), "ui-badge"])}" data-v-94ceb162${_scopeId}>${ssrInterpolate(label(row.status))}</span>`);
            if (row.approver_name) {
              _push2(`<span class="lv__by" data-v-94ceb162${_scopeId}>by ${ssrInterpolate(row.approver_name)}</span>`);
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
                class: "lv__by"
              }, "by " + toDisplayString(row.approver_name), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.leaves.approve")) {
              _push2(`<!--[-->`);
              if (row.status !== "approved") {
                _push2(`<button class="ui-btn ui-btn--success ui-btn--sm" data-v-94ceb162${_scopeId}> Approve </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (row.status !== "rejected") {
                _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-94ceb162${_scopeId}> Reject </button>`);
              } else {
                _push2(`<!---->`);
              }
              if (row.status !== "pending") {
                _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-94ceb162${_scopeId}> Reset </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.leaves.update") && row.status === "pending") {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-94ceb162${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.leaves.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-94ceb162${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.leaves.approve") ? (openBlock(), createBlock(Fragment, { key: 0 }, [
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
              unref(can)("hr.leaves.update") && row.status === "pending" ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.leaves.delete") ? (openBlock(), createBlock("button", {
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
        paginator: props.leaves,
        only: ["leaves"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Leave Request" : "Add Leave Request"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-94ceb162${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-94ceb162${_scopeId}>Save</button>`);
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
                  _push3(`<option value="" data-v-94ceb162${_scopeId2}>— select —</option><!--[-->`);
                  ssrRenderList(props.employees, (e) => {
                    _push3(`<option${ssrRenderAttr("value", e.id)} data-v-94ceb162${_scopeId2}>${ssrInterpolate(e.name)}</option>`);
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).leave_type_id,
              "onUpdate:modelValue": ($event) => unref(form).leave_type_id = $event,
              label: "Leave type",
              type: "select",
              error: unref(form).errors.leave_type_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-94ceb162${_scopeId2}>— select —</option><!--[-->`);
                  ssrRenderList(props.leaveTypes, (t) => {
                    _push3(`<option${ssrRenderAttr("value", t.id)} data-v-94ceb162${_scopeId2}>${ssrInterpolate(t.name)} (${ssrInterpolate(t.is_paid ? "paid" : "unpaid")}${ssrInterpolate(t.days_per_year ? `, ${t.days_per_year}/yr` : "")}) </option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— select —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.leaveTypes, (t) => {
                      return openBlock(), createBlock("option", {
                        key: t.id,
                        value: t.id
                      }, toDisplayString(t.name) + " (" + toDisplayString(t.is_paid ? "paid" : "unpaid") + toDisplayString(t.days_per_year ? `, ${t.days_per_year}/yr` : "") + ") ", 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="lv__grid" data-v-94ceb162${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).from_date,
              "onUpdate:modelValue": ($event) => unref(form).from_date = $event,
              label: "From",
              type: "date",
              error: unref(form).errors.from_date
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).to_date,
              "onUpdate:modelValue": ($event) => unref(form).to_date = $event,
              label: "To",
              type: "date",
              error: unref(form).errors.to_date
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (dayCount.value) {
              _push2(`<p class="lv__days" data-v-94ceb162${_scopeId}>${ssrInterpolate(dayCount.value)} day${ssrInterpolate(dayCount.value === 1 ? "" : "s")}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).reason,
              "onUpdate:modelValue": ($event) => unref(form).reason = $event,
              label: "Reason",
              type: "textarea",
              error: unref(form).errors.reason
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
              createVNode(_sfc_main$2, {
                modelValue: unref(form).leave_type_id,
                "onUpdate:modelValue": ($event) => unref(form).leave_type_id = $event,
                label: "Leave type",
                type: "select",
                error: unref(form).errors.leave_type_id
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: "" }, "— select —"),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.leaveTypes, (t) => {
                    return openBlock(), createBlock("option", {
                      key: t.id,
                      value: t.id
                    }, toDisplayString(t.name) + " (" + toDisplayString(t.is_paid ? "paid" : "unpaid") + toDisplayString(t.days_per_year ? `, ${t.days_per_year}/yr` : "") + ") ", 9, ["value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "lv__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).from_date,
                  "onUpdate:modelValue": ($event) => unref(form).from_date = $event,
                  label: "From",
                  type: "date",
                  error: unref(form).errors.from_date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).to_date,
                  "onUpdate:modelValue": ($event) => unref(form).to_date = $event,
                  label: "To",
                  type: "date",
                  error: unref(form).errors.to_date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              dayCount.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "lv__days"
              }, toDisplayString(dayCount.value) + " day" + toDisplayString(dayCount.value === 1 ? "" : "s"), 1)) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).reason,
                "onUpdate:modelValue": ($event) => unref(form).reason = $event,
                label: "Reason",
                type: "textarea",
                error: unref(form).errors.reason
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Leaves.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Leaves = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94ceb162"]]);
export {
  Leaves as default
};
