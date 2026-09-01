import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { S as StatCard } from "./StatCard-BBMxSIbz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Employees",
  __ssrInlineRender: true,
  props: {
    employees: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", status: "" }) },
    designations: { type: Array, default: () => [] },
    places: { type: Array, default: () => [] },
    statuses: { type: Array, default: () => [] },
    stats: { type: Object, default: () => ({ total: 0, active: 0, payroll: 0 }) }
  },
  setup(__props) {
    var _a, _b;
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "name", label: "Employee" },
      { key: "designation_name", label: "Designation" },
      { key: "place_name", label: "Place" },
      { key: "phone", label: "Phone" },
      { key: "joining_date", label: "Joined" },
      { key: "basic_salary", label: "Basic" },
      { key: "employment_status", label: "Status" },
      { key: "has_login", label: "Login" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.employees) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const status = ref(((_b = props.filters) == null ? void 0 : _b.status) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/hr/employees",
          { search: search.value || void 0, status: status.value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["employees", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch(status, () => reload(0));
    const showModal = ref(false);
    const blank = {
      id: null,
      name: "",
      employee_code: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      cnic: "",
      gender: "",
      date_of_birth: "",
      designation_id: "",
      place_id: "",
      joining_date: "",
      leaving_date: "",
      employment_status: "active",
      basic_salary: 0
    };
    const form = useForm({ ...blank });
    const openModal = () => {
      Object.assign(form, blank);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (e) => {
      Object.assign(form, {
        ...blank,
        id: e.id,
        name: e.name,
        employee_code: e.employee_code ?? "",
        email: e.email ?? "",
        password: "",
        phone: e.phone ?? "",
        address: e.address ?? "",
        cnic: e.cnic ?? "",
        gender: e.gender ?? "",
        date_of_birth: e.date_of_birth ?? "",
        designation_id: e.designation_id ?? "",
        place_id: e.place_id ?? "",
        joining_date: e.joining_date ?? "",
        leaving_date: e.leaving_date ?? "",
        employment_status: e.employment_status ?? "active",
        basic_salary: e.basic_salary ?? 0
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      if (form.id) form.put(`/hr/employees/${form.id}`, opts);
      else form.post("/hr/employees", opts);
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this employee? Staff with payslips must be marked 'left' instead.")) return;
      router.delete(`/hr/employees/${id}`, { preserveScroll: true });
    };
    const money = (v) => `Rs ${Number(v || 0).toLocaleString(void 0, { minimumFractionDigits: 0 })}`;
    const label = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "—";
    const statusClass = (s) => ({ active: "ui-badge--success", inactive: "ui-badge--warning", left: "ui-badge--muted" })[s] ?? "ui-badge--muted";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-444169e1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Employees",
        subtitle: "Staff records — the master data payroll and attendance run on."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.employees.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-444169e1${_scopeId}> + Add Employee </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.employees.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Add Employee ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="stat-grid" data-v-444169e1>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Employees",
        value: props.stats.total
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Active",
        value: props.stats.active
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Monthly Salary Bill",
        value: money(props.stats.payroll)
      }, null, _parent));
      _push(`</div><div class="emp__filters" data-v-444169e1>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: status.value,
        "onUpdate:modelValue": ($event) => status.value = $event,
        label: "Employment status",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-444169e1${_scopeId}>All statuses</option><!--[-->`);
            ssrRenderList(props.statuses, (s) => {
              _push2(`<option${ssrRenderAttr("value", s)} data-v-444169e1${_scopeId}>${ssrInterpolate(label(s))}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("option", { value: "" }, "All statuses"),
              (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                return openBlock(), createBlock("option", {
                  key: s,
                  value: s
                }, toDisplayString(label(s)), 9, ["value"]);
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
        "search-placeholder": "Search name, code, phone or CNIC…",
        "empty-text": "No employees found."
      }, {
        "cell:name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="emp__name" data-v-444169e1${_scopeId}><strong data-v-444169e1${_scopeId}>${ssrInterpolate(row.name)}</strong>`);
            if (row.employee_code) {
              _push2(`<span class="emp__code" data-v-444169e1${_scopeId}>${ssrInterpolate(row.employee_code)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "emp__name" }, [
                createVNode("strong", null, toDisplayString(row.name), 1),
                row.employee_code ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "emp__code"
                }, toDisplayString(row.employee_code), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:basic_salary": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(money(value))}`);
          } else {
            return [
              createTextVNode(toDisplayString(money(value)), 1)
            ];
          }
        }),
        "cell:employment_status": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([statusClass(value), "ui-badge"])}" data-v-444169e1${_scopeId}>${ssrInterpolate(label(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", statusClass(value)]
              }, toDisplayString(label(value)), 3)
            ];
          }
        }),
        "cell:has_login": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value ? "ui-badge--info" : "ui-badge--muted", "ui-badge"])}" data-v-444169e1${_scopeId}>${ssrInterpolate(value ? "Yes" : "No")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value ? "ui-badge--info" : "ui-badge--muted"]
              }, toDisplayString(value ? "Yes" : "No"), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.employees.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-444169e1${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("hr.employees.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-444169e1${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.employees.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("hr.employees.delete") ? (openBlock(), createBlock("button", {
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
        paginator: props.employees,
        only: ["employees"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Employee" : "Add Employee"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-444169e1${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-444169e1${_scopeId}>Save</button>`);
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
            _push2(`<div class="emp__grid" data-v-444169e1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              label: "Full name",
              placeholder: "Full name",
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).employee_code,
              "onUpdate:modelValue": ($event) => unref(form).employee_code = $event,
              label: "Employee code",
              placeholder: "e.g. EMP-014",
              error: unref(form).errors.employee_code
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).designation_id,
              "onUpdate:modelValue": ($event) => unref(form).designation_id = $event,
              label: "Designation",
              type: "select",
              error: unref(form).errors.designation_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-444169e1${_scopeId2}>— none —</option><!--[-->`);
                  ssrRenderList(props.designations, (d) => {
                    _push3(`<option${ssrRenderAttr("value", d.id)} data-v-444169e1${_scopeId2}>${ssrInterpolate(d.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— none —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.designations, (d) => {
                      return openBlock(), createBlock("option", {
                        key: d.id,
                        value: d.id
                      }, toDisplayString(d.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).place_id,
              "onUpdate:modelValue": ($event) => unref(form).place_id = $event,
              label: "Place / branch",
              type: "select",
              error: unref(form).errors.place_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-444169e1${_scopeId2}>— none —</option><!--[-->`);
                  ssrRenderList(props.places, (p) => {
                    _push3(`<option${ssrRenderAttr("value", p.id)} data-v-444169e1${_scopeId2}>${ssrInterpolate(p.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— none —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.places, (p) => {
                      return openBlock(), createBlock("option", {
                        key: p.id,
                        value: p.id
                      }, toDisplayString(p.name), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).phone,
              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
              label: "Phone",
              placeholder: "Phone",
              error: unref(form).errors.phone
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).cnic,
              "onUpdate:modelValue": ($event) => unref(form).cnic = $event,
              label: "CNIC / ID",
              placeholder: "00000-0000000-0",
              error: unref(form).errors.cnic
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).gender,
              "onUpdate:modelValue": ($event) => unref(form).gender = $event,
              label: "Gender",
              type: "select",
              error: unref(form).errors.gender
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-444169e1${_scopeId2}>— not set —</option><option value="male" data-v-444169e1${_scopeId2}>Male</option><option value="female" data-v-444169e1${_scopeId2}>Female</option><option value="other" data-v-444169e1${_scopeId2}>Other</option>`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— not set —"),
                    createVNode("option", { value: "male" }, "Male"),
                    createVNode("option", { value: "female" }, "Female"),
                    createVNode("option", { value: "other" }, "Other")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).date_of_birth,
              "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
              label: "Date of birth",
              type: "date",
              error: unref(form).errors.date_of_birth
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).joining_date,
              "onUpdate:modelValue": ($event) => unref(form).joining_date = $event,
              label: "Joining date",
              type: "date",
              error: unref(form).errors.joining_date
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).leaving_date,
              "onUpdate:modelValue": ($event) => unref(form).leaving_date = $event,
              label: "Leaving date",
              type: "date",
              error: unref(form).errors.leaving_date
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).employment_status,
              "onUpdate:modelValue": ($event) => unref(form).employment_status = $event,
              label: "Employment status",
              type: "select",
              error: unref(form).errors.employment_status
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.statuses, (s) => {
                    _push3(`<option${ssrRenderAttr("value", s)} data-v-444169e1${_scopeId2}>${ssrInterpolate(label(s))}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                      return openBlock(), createBlock("option", {
                        key: s,
                        value: s
                      }, toDisplayString(label(s)), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).basic_salary,
              "onUpdate:modelValue": ($event) => unref(form).basic_salary = $event,
              label: "Basic salary (monthly)",
              type: "number",
              step: "0.01",
              error: unref(form).errors.basic_salary
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).address,
              "onUpdate:modelValue": ($event) => unref(form).address = $event,
              label: "Address",
              type: "textarea",
              error: unref(form).errors.address
            }, null, _parent2, _scopeId));
            _push2(`<div class="emp__login" data-v-444169e1${_scopeId}><p class="emp__login-note" data-v-444169e1${_scopeId}> Login is optional. Leave both fields blank for staff who only need attendance and payroll — they cannot sign in without an email <em data-v-444169e1${_scopeId}>and</em> a password. </p><div class="emp__grid" data-v-444169e1${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              label: "Email (login)",
              type: "email",
              error: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              label: unref(form).id ? "New password (blank keeps current)" : "Password",
              type: "password",
              error: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "emp__grid" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                  label: "Full name",
                  placeholder: "Full name",
                  error: unref(form).errors.name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).employee_code,
                  "onUpdate:modelValue": ($event) => unref(form).employee_code = $event,
                  label: "Employee code",
                  placeholder: "e.g. EMP-014",
                  error: unref(form).errors.employee_code
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).designation_id,
                  "onUpdate:modelValue": ($event) => unref(form).designation_id = $event,
                  label: "Designation",
                  type: "select",
                  error: unref(form).errors.designation_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "— none —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.designations, (d) => {
                      return openBlock(), createBlock("option", {
                        key: d.id,
                        value: d.id
                      }, toDisplayString(d.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).place_id,
                  "onUpdate:modelValue": ($event) => unref(form).place_id = $event,
                  label: "Place / branch",
                  type: "select",
                  error: unref(form).errors.place_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "— none —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.places, (p) => {
                      return openBlock(), createBlock("option", {
                        key: p.id,
                        value: p.id
                      }, toDisplayString(p.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).phone,
                  "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                  label: "Phone",
                  placeholder: "Phone",
                  error: unref(form).errors.phone
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).cnic,
                  "onUpdate:modelValue": ($event) => unref(form).cnic = $event,
                  label: "CNIC / ID",
                  placeholder: "00000-0000000-0",
                  error: unref(form).errors.cnic
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).gender,
                  "onUpdate:modelValue": ($event) => unref(form).gender = $event,
                  label: "Gender",
                  type: "select",
                  error: unref(form).errors.gender
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "— not set —"),
                    createVNode("option", { value: "male" }, "Male"),
                    createVNode("option", { value: "female" }, "Female"),
                    createVNode("option", { value: "other" }, "Other")
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).date_of_birth,
                  "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
                  label: "Date of birth",
                  type: "date",
                  error: unref(form).errors.date_of_birth
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).joining_date,
                  "onUpdate:modelValue": ($event) => unref(form).joining_date = $event,
                  label: "Joining date",
                  type: "date",
                  error: unref(form).errors.joining_date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).leaving_date,
                  "onUpdate:modelValue": ($event) => unref(form).leaving_date = $event,
                  label: "Leaving date",
                  type: "date",
                  error: unref(form).errors.leaving_date
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).employment_status,
                  "onUpdate:modelValue": ($event) => unref(form).employment_status = $event,
                  label: "Employment status",
                  type: "select",
                  error: unref(form).errors.employment_status
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                      return openBlock(), createBlock("option", {
                        key: s,
                        value: s
                      }, toDisplayString(label(s)), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).basic_salary,
                  "onUpdate:modelValue": ($event) => unref(form).basic_salary = $event,
                  label: "Basic salary (monthly)",
                  type: "number",
                  step: "0.01",
                  error: unref(form).errors.basic_salary
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).address,
                "onUpdate:modelValue": ($event) => unref(form).address = $event,
                label: "Address",
                type: "textarea",
                error: unref(form).errors.address
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode("div", { class: "emp__login" }, [
                createVNode("p", { class: "emp__login-note" }, [
                  createTextVNode(" Login is optional. Leave both fields blank for staff who only need attendance and payroll — they cannot sign in without an email "),
                  createVNode("em", null, "and"),
                  createTextVNode(" a password. ")
                ]),
                createVNode("div", { class: "emp__grid" }, [
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    label: "Email (login)",
                    type: "email",
                    error: unref(form).errors.email
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                  createVNode(_sfc_main$2, {
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    label: unref(form).id ? "New password (blank keeps current)" : "Password",
                    type: "password",
                    error: unref(form).errors.password
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error"])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Employees.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Employees = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-444169e1"]]);
export {
  Employees as default
};
