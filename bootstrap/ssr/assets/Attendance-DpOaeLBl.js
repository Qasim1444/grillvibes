import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, toDisplayString, createCommentVNode, withDirectives, createVNode, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { S as StatCard } from "./StatCard-BBMxSIbz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Attendance",
  __ssrInlineRender: true,
  props: {
    date: { type: String, default: "" },
    roster: { type: Array, default: () => [] },
    statuses: { type: Array, default: () => [] },
    filters: { type: Object, default: () => ({ search: "" }) },
    monthSummary: { type: Object, default: () => ({ month: "", present: 0, absent: 0, leave: 0, marked_days: 0 }) }
  },
  setup(__props) {
    const { can } = usePermissions();
    const props = __props;
    const editable = computed(() => can("hr.attendance.create"));
    const columns = [
      { key: "name", label: "Employee" },
      { key: "designation_name", label: "Designation" },
      { key: "status", label: "Status", width: "140px" },
      { key: "check_in", label: "In", width: "120px" },
      { key: "check_out", label: "Out", width: "120px" },
      { key: "late_minutes", label: "Late (min)", width: "110px" },
      { key: "note", label: "Note" }
    ];
    const clone = (rows) => rows.map((r) => ({ ...r }));
    const sheet = ref(clone(props.roster));
    const baseline = ref(JSON.stringify(sheet.value));
    const saving = ref(false);
    const date = computed(() => props.date);
    watch(
      () => props.roster,
      (rows) => {
        sheet.value = clone(rows);
        baseline.value = JSON.stringify(sheet.value);
      }
    );
    const dirty = computed(() => JSON.stringify(sheet.value) !== baseline.value);
    const tallies = computed(
      () => sheet.value.reduce((acc, row) => {
        acc[row.status] = (acc[row.status] || 0) + 1;
        return acc;
      }, {})
    );
    const saveSheet = () => {
      saving.value = true;
      router.post(
        "/hr/attendance/bulk",
        {
          date: props.date,
          rows: sheet.value.map((row) => ({
            user_id: row.user_id,
            status: row.status,
            check_in: row.check_in || null,
            check_out: row.check_out || null,
            late_minutes: row.late_minutes || 0,
            note: row.note || null
          }))
        },
        { preserveScroll: true, onFinish: () => saving.value = false }
      );
    };
    const clearRow = (row) => {
      if (!confirm(`Remove the saved attendance entry for ${row.name}?`)) return;
      router.delete(`/hr/attendance/${row.attendance_id}`, { preserveScroll: true });
    };
    const label = (s) => s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—";
    const badgeClass = (s) => ({
      present: "ui-badge--success",
      late: "ui-badge--warning",
      half_day: "ui-badge--warning",
      absent: "ui-badge--muted",
      leave: "ui-badge--info",
      holiday: "ui-badge--info"
    })[s] ?? "ui-badge--muted";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-833ace26>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Attendance",
        subtitle: "Mark the whole roster for a day, then save the sheet in one go."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("hr.attendance.create")) {
              _push2(`<button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(saving.value || !sheet.value.length) ? " disabled" : ""} data-v-833ace26${_scopeId}>${ssrInterpolate(saving.value ? "Saving…" : "Save Sheet")}</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("hr.attendance.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                disabled: saving.value || !sheet.value.length,
                onClick: saveSheet
              }, toDisplayString(saving.value ? "Saving…" : "Save Sheet"), 9, ["disabled"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="att__bar ui-card ui-card-pad" data-v-833ace26><div class="att__date" data-v-833ace26><label class="ui-label" for="att-date" data-v-833ace26>Date</label><input id="att-date" class="ui-input" type="date"${ssrRenderAttr("value", date.value)} data-v-833ace26></div>`);
      if (unref(can)("hr.attendance.create")) {
        _push(`<div class="att__bulk" data-v-833ace26><span class="ui-label" data-v-833ace26>Mark everyone</span><div class="att__bulk-btns" data-v-833ace26><button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-833ace26>Present</button><button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-833ace26>Absent</button><button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-833ace26>Holiday</button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="att__tallies" data-v-833ace26><!--[-->`);
      ssrRenderList(props.statuses, (s) => {
        _push(`<span class="${ssrRenderClass([badgeClass(s), "ui-badge"])}" data-v-833ace26>${ssrInterpolate(label(s))}: ${ssrInterpolate(tallies.value[s] || 0)}</span>`);
      });
      _push(`<!--]--><span class="ui-badge ui-badge--info" data-v-833ace26>Total: ${ssrInterpolate(sheet.value.length)}</span></div></div>`);
      if (dirty.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-833ace26> You have unsaved changes on this sheet — click <strong data-v-833ace26>Save Sheet</strong> before switching dates. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-833ace26>`);
      _push(ssrRenderComponent(StatCard, {
        label: `Present (${props.monthSummary.month})`,
        value: props.monthSummary.present
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: `Absent (${props.monthSummary.month})`,
        value: props.monthSummary.absent
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: `On leave (${props.monthSummary.month})`,
        value: props.monthSummary.leave
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Days marked this month",
        value: props.monthSummary.marked_days
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: sheet.value,
        index: "",
        searchable: "",
        "search-placeholder": "Filter by name, code or designation…",
        "empty-text": "No active employees. Add employees under HR → Employees."
      }, {
        "cell:name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="att__name" data-v-833ace26${_scopeId}><strong data-v-833ace26${_scopeId}>${ssrInterpolate(row.name)}</strong>`);
            if (row.employee_code) {
              _push2(`<span class="att__code" data-v-833ace26${_scopeId}>${ssrInterpolate(row.employee_code)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "att__name" }, [
                createVNode("strong", null, toDisplayString(row.name), 1),
                row.employee_code ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "att__code"
                }, toDisplayString(row.employee_code), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:status": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<select class="ui-select att__select"${ssrIncludeBooleanAttr(!editable.value) ? " disabled" : ""} data-v-833ace26${_scopeId}><!--[-->`);
            ssrRenderList(props.statuses, (s) => {
              _push2(`<option${ssrRenderAttr("value", s)} data-v-833ace26${ssrIncludeBooleanAttr(Array.isArray(row.status) ? ssrLooseContain(row.status, s) : ssrLooseEqual(row.status, s)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(label(s))}</option>`);
            });
            _push2(`<!--]--></select>`);
          } else {
            return [
              withDirectives(createVNode("select", {
                "onUpdate:modelValue": ($event) => row.status = $event,
                class: "ui-select att__select",
                disabled: !editable.value
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                  return openBlock(), createBlock("option", {
                    key: s,
                    value: s
                  }, toDisplayString(label(s)), 9, ["value"]);
                }), 128))
              ], 8, ["onUpdate:modelValue", "disabled"]), [
                [vModelSelect, row.status]
              ])
            ];
          }
        }),
        "cell:check_in": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", row.check_in)} class="ui-input att__time" type="time"${ssrIncludeBooleanAttr(!editable.value) ? " disabled" : ""} data-v-833ace26${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => row.check_in = $event,
                class: "ui-input att__time",
                type: "time",
                disabled: !editable.value
              }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                [vModelText, row.check_in]
              ])
            ];
          }
        }),
        "cell:check_out": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", row.check_out)} class="ui-input att__time" type="time"${ssrIncludeBooleanAttr(!editable.value) ? " disabled" : ""} data-v-833ace26${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => row.check_out = $event,
                class: "ui-input att__time",
                type: "time",
                disabled: !editable.value
              }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                [vModelText, row.check_out]
              ])
            ];
          }
        }),
        "cell:late_minutes": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", row.late_minutes)} class="ui-input att__num" type="number" min="0" max="1440"${ssrIncludeBooleanAttr(!editable.value) ? " disabled" : ""} data-v-833ace26${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => row.late_minutes = $event,
                class: "ui-input att__num",
                type: "number",
                min: "0",
                max: "1440",
                disabled: !editable.value
              }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                [
                  vModelText,
                  row.late_minutes,
                  void 0,
                  { number: true }
                ]
              ])
            ];
          }
        }),
        "cell:note": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", row.note)} class="ui-input" type="text" placeholder="Note"${ssrIncludeBooleanAttr(!editable.value) ? " disabled" : ""} data-v-833ace26${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => row.note = $event,
                class: "ui-input",
                type: "text",
                placeholder: "Note",
                disabled: !editable.value
              }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                [vModelText, row.note]
              ])
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (row.attendance_id && unref(can)("hr.attendance.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-833ace26${_scopeId}> Clear </button>`);
            } else {
              _push2(`<span class="att__unsaved" data-v-833ace26${_scopeId}>${ssrInterpolate(row.attendance_id ? "" : "Not saved")}</span>`);
            }
          } else {
            return [
              row.attendance_id && unref(can)("hr.attendance.delete") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => clearRow(row)
              }, " Clear ", 8, ["onClick"])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "att__unsaved"
              }, toDisplayString(row.attendance_id ? "" : "Not saved"), 1))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HR/Attendance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Attendance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-833ace26"]]);
export {
  Attendance as default
};
