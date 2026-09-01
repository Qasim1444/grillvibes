import { ref, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    reservations: { type: Array, default: () => [] },
    waitlist: { type: Array, default: () => [] },
    branches: { type: Array, default: () => [] },
    tables: { type: Array, default: () => [] },
    statuses: { type: Array, default: () => [] },
    sources: { type: Array, default: () => [] },
    filters: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    var _a, _b, _c;
    const { can } = usePermissions();
    const props = __props;
    const dateFilter = ref(((_a = props.filters) == null ? void 0 : _a.date) ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const branchFilter = ref(((_b = props.filters) == null ? void 0 : _b.branch_id) ?? "");
    const statusFilter = ref(((_c = props.filters) == null ? void 0 : _c.status) ?? "");
    const showModal = ref(false);
    const form = useForm({
      id: null,
      dining_table_id: "",
      branch_id: "",
      guest_name: "",
      guest_phone: "",
      guest_email: "",
      party_size: 2,
      reserved_at: "",
      duration_minutes: 90,
      status: "confirmed",
      occasion: "",
      notes: "",
      source: "phone"
    });
    const defaultBranchId = () => branchFilter.value || (props.branches.length === 1 ? props.branches[0].id : "");
    const openModal = (row = null) => {
      form.reset();
      form.clearErrors();
      if (row) {
        Object.assign(form, {
          ...row,
          reserved_at: row.reserved_at ? row.reserved_at.slice(0, 16) : "",
          dining_table_id: row.dining_table_id ?? "",
          branch_id: row.branch_id ?? ""
        });
      } else {
        form.reserved_at = dateFilter.value + "T19:00";
        form.branch_id = defaultBranchId();
      }
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      form.id ? form.put(`/reservations/${form.id}`, opts) : form.post("/reservations", opts);
    };
    const showWaitlistModal = ref(false);
    const wlForm = useForm({
      guest_name: "",
      guest_phone: "",
      party_size: 2,
      branch_id: "",
      estimated_wait_minutes: null,
      notes: ""
    });
    const openWaitlistModal = () => {
      wlForm.reset();
      wlForm.clearErrors();
      wlForm.branch_id = defaultBranchId();
      showWaitlistModal.value = true;
    };
    const saveWaitlist = () => wlForm.post(
      "/reservations/waitlist",
      { preserveScroll: true, onSuccess: () => showWaitlistModal.value = false }
    );
    const fmtTime = (iso) => iso ? new Date(iso).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" }) : "";
    const statusBadge = (s) => ({
      pending: "ui-badge--muted",
      confirmed: "ui-badge--info",
      seated: "ui-badge--success",
      completed: "ui-badge--success",
      cancelled: "ui-badge--danger",
      no_show: "ui-badge--warning"
    })[s] ?? "ui-badge--muted";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-204afcf2>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Reservations",
        subtitle: "Manage table bookings and walk-in queue."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a href="/reservations/floor-plan" class="ui-btn ui-btn--ghost" data-v-204afcf2${_scopeId}>🗺 Floor Plan</a>`);
            if (unref(can)("reservations.create")) {
              _push2(`<button class="ui-btn ui-btn--secondary" data-v-204afcf2${_scopeId}>+ Waitlist</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("reservations.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-204afcf2${_scopeId}>+ Reservation</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("a", {
                href: "/reservations/floor-plan",
                class: "ui-btn ui-btn--ghost"
              }, "🗺 Floor Plan"),
              unref(can)("reservations.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--secondary",
                onClick: openWaitlistModal
              }, "+ Waitlist")) : createCommentVNode("", true),
              unref(can)("reservations.create") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--primary",
                onClick: ($event) => openModal()
              }, "+ Reservation", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="res__filters" data-v-204afcf2><div class="res__filter-group" data-v-204afcf2><label class="ui-label" data-v-204afcf2>Date</label><input${ssrRenderAttr("value", dateFilter.value)} type="date" class="ui-input" data-v-204afcf2></div><div class="res__filter-group" data-v-204afcf2><label class="ui-label" data-v-204afcf2>Branch</label><select class="ui-input" style="${ssrRenderStyle({ "width": "180px" })}" data-v-204afcf2><option value="" data-v-204afcf2${ssrIncludeBooleanAttr(Array.isArray(branchFilter.value) ? ssrLooseContain(branchFilter.value, "") : ssrLooseEqual(branchFilter.value, "")) ? " selected" : ""}>All Branches</option><!--[-->`);
      ssrRenderList(props.branches, (b) => {
        _push(`<option${ssrRenderAttr("value", b.id)} data-v-204afcf2${ssrIncludeBooleanAttr(Array.isArray(branchFilter.value) ? ssrLooseContain(branchFilter.value, b.id) : ssrLooseEqual(branchFilter.value, b.id)) ? " selected" : ""}>${ssrInterpolate(b.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="res__filter-group" data-v-204afcf2><label class="ui-label" data-v-204afcf2>Status</label><select class="ui-input" style="${ssrRenderStyle({ "width": "160px" })}" data-v-204afcf2><option value="" data-v-204afcf2${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, "") : ssrLooseEqual(statusFilter.value, "")) ? " selected" : ""}>All</option><!--[-->`);
      ssrRenderList(props.statuses, (s) => {
        _push(`<option${ssrRenderAttr("value", s)} data-v-204afcf2${ssrIncludeBooleanAttr(Array.isArray(statusFilter.value) ? ssrLooseContain(statusFilter.value, s) : ssrLooseEqual(statusFilter.value, s)) ? " selected" : ""}>${ssrInterpolate(s)}</option>`);
      });
      _push(`<!--]--></select></div></div><div class="res__grid" data-v-204afcf2><div class="res__section" data-v-204afcf2><h3 class="res__section-title" data-v-204afcf2> Reservations <span class="ui-badge ui-badge--info" data-v-204afcf2>${ssrInterpolate(props.reservations.length)}</span></h3><div class="res__timeline" data-v-204afcf2>`);
      if (!props.reservations.length) {
        _push(`<div class="res__empty" data-v-204afcf2>No reservations for this date.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(props.reservations, (r) => {
        _push(`<div class="${ssrRenderClass(["res__card--" + r.status, "res__card"])}" data-v-204afcf2><div class="res__card-time" data-v-204afcf2><span class="res__time" data-v-204afcf2>${ssrInterpolate(fmtTime(r.reserved_at))}</span><span class="res__dur" data-v-204afcf2>${ssrInterpolate(r.duration_minutes)}min</span></div><div class="res__card-body" data-v-204afcf2><div class="res__card-name" data-v-204afcf2>${ssrInterpolate(r.guest_name)}</div><div class="res__card-meta" data-v-204afcf2><span data-v-204afcf2>👥 ${ssrInterpolate(r.party_size)}</span>`);
        if (r.table_number) {
          _push(`<span data-v-204afcf2>🪑 ${ssrInterpolate(r.table_number)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (r.phone) {
          _push(`<span data-v-204afcf2>📞 ${ssrInterpolate(r.guest_phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (r.occasion) {
          _push(`<span data-v-204afcf2>🎉 ${ssrInterpolate(r.occasion)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (r.notes) {
          _push(`<div class="res__card-notes" data-v-204afcf2>${ssrInterpolate(r.notes)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="res__card-actions" data-v-204afcf2><span class="${ssrRenderClass([statusBadge(r.status), "ui-badge"])}" data-v-204afcf2>${ssrInterpolate(r.status)}</span>`);
        if (unref(can)("reservations.update")) {
          _push(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-204afcf2>Edit</button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(can)("reservations.delete")) {
          _push(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-204afcf2>✕</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="res__section" data-v-204afcf2><h3 class="res__section-title" data-v-204afcf2> Waitlist <span class="ui-badge ui-badge--warning" data-v-204afcf2>${ssrInterpolate(props.waitlist.length)}</span></h3><div class="res__waitlist" data-v-204afcf2>`);
      if (!props.waitlist.length) {
        _push(`<div class="res__empty" data-v-204afcf2>Waitlist is empty.</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(props.waitlist, (entry, idx) => {
        _push(`<div class="res__wait-card" data-v-204afcf2><div class="res__wait-pos" data-v-204afcf2>${ssrInterpolate(idx + 1)}</div><div class="res__wait-body" data-v-204afcf2><div class="res__wait-name" data-v-204afcf2>${ssrInterpolate(entry.guest_name)}</div><div class="res__wait-meta" data-v-204afcf2><span data-v-204afcf2>👥 ${ssrInterpolate(entry.party_size)}</span>`);
        if (entry.guest_phone) {
          _push(`<span data-v-204afcf2>📞 ${ssrInterpolate(entry.guest_phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="res__wait-time" data-v-204afcf2>⏱ ${ssrInterpolate(entry.wait_minutes)}min waiting</span>`);
        if (entry.estimated_wait_minutes) {
          _push(`<span class="res__wait-est" data-v-204afcf2> Est: ${ssrInterpolate(entry.estimated_wait_minutes)}min </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="res__wait-actions" data-v-204afcf2><button class="ui-btn ui-btn--success ui-btn--sm" data-v-204afcf2>Seat</button><button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-204afcf2>Notify</button><button class="ui-btn ui-btn--danger ui-btn--sm" data-v-204afcf2>✕</button></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Reservation" : "New Reservation",
        width: "640px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-204afcf2${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-204afcf2${_scopeId}>Save</button>`);
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
            _push2(`<div class="form-grid-2" data-v-204afcf2${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).guest_name,
              "onUpdate:modelValue": ($event) => unref(form).guest_name = $event,
              label: "Guest Name *",
              placeholder: "Full name",
              error: unref(form).errors.guest_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).guest_phone,
              "onUpdate:modelValue": ($event) => unref(form).guest_phone = $event,
              label: "Phone",
              placeholder: "+92 300 0000000",
              error: unref(form).errors.guest_phone
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).guest_email,
              "onUpdate:modelValue": ($event) => unref(form).guest_email = $event,
              label: "Email",
              type: "email",
              placeholder: "Optional",
              error: unref(form).errors.guest_email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).party_size,
              "onUpdate:modelValue": ($event) => unref(form).party_size = $event,
              modelModifiers: { number: true },
              label: "Party Size *",
              type: "number",
              min: "1",
              error: unref(form).errors.party_size
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).reserved_at,
              "onUpdate:modelValue": ($event) => unref(form).reserved_at = $event,
              label: "Date & Time *",
              type: "datetime-local",
              error: unref(form).errors.reserved_at
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).duration_minutes,
              "onUpdate:modelValue": ($event) => unref(form).duration_minutes = $event,
              modelModifiers: { number: true },
              label: "Duration (min)",
              type: "number",
              min: "15",
              error: unref(form).errors.duration_minutes
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).dining_table_id,
              "onUpdate:modelValue": ($event) => unref(form).dining_table_id = $event,
              label: "Table",
              type: "select",
              error: unref(form).errors.dining_table_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-204afcf2${_scopeId2}>— No specific table —</option><!--[-->`);
                  ssrRenderList(props.tables, (t) => {
                    _push3(`<option${ssrRenderAttr("value", t.id)} data-v-204afcf2${_scopeId2}>${ssrInterpolate(t.table_number)} (cap. ${ssrInterpolate(t.capacity)}) </option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "— No specific table —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.tables, (t) => {
                      return openBlock(), createBlock("option", {
                        key: t.id,
                        value: t.id
                      }, toDisplayString(t.table_number) + " (cap. " + toDisplayString(t.capacity) + ") ", 9, ["value"]);
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
                  _push3(`<option value="" data-v-204afcf2${_scopeId2}>Select branch</option><!--[-->`);
                  ssrRenderList(props.branches, (b) => {
                    _push3(`<option${ssrRenderAttr("value", b.id)} data-v-204afcf2${_scopeId2}>${ssrInterpolate(b.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "Select branch"),
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).status,
              "onUpdate:modelValue": ($event) => unref(form).status = $event,
              label: "Status",
              type: "select",
              error: unref(form).errors.status
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(props.statuses, (s) => {
                    _push3(`<option${ssrRenderAttr("value", s)} data-v-204afcf2${_scopeId2}>${ssrInterpolate(s)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                      return openBlock(), createBlock("option", {
                        key: s,
                        value: s
                      }, toDisplayString(s), 9, ["value"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).occasion,
              "onUpdate:modelValue": ($event) => unref(form).occasion = $event,
              label: "Occasion",
              placeholder: "Birthday, Anniversary…",
              error: unref(form).errors.occasion
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).notes,
              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
              label: "Notes",
              type: "textarea",
              placeholder: "Special requests…",
              error: unref(form).errors.notes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "form-grid-2" }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).guest_name,
                  "onUpdate:modelValue": ($event) => unref(form).guest_name = $event,
                  label: "Guest Name *",
                  placeholder: "Full name",
                  error: unref(form).errors.guest_name
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).guest_phone,
                  "onUpdate:modelValue": ($event) => unref(form).guest_phone = $event,
                  label: "Phone",
                  placeholder: "+92 300 0000000",
                  error: unref(form).errors.guest_phone
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).guest_email,
                  "onUpdate:modelValue": ($event) => unref(form).guest_email = $event,
                  label: "Email",
                  type: "email",
                  placeholder: "Optional",
                  error: unref(form).errors.guest_email
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).party_size,
                  "onUpdate:modelValue": ($event) => unref(form).party_size = $event,
                  modelModifiers: { number: true },
                  label: "Party Size *",
                  type: "number",
                  min: "1",
                  error: unref(form).errors.party_size
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).reserved_at,
                  "onUpdate:modelValue": ($event) => unref(form).reserved_at = $event,
                  label: "Date & Time *",
                  type: "datetime-local",
                  error: unref(form).errors.reserved_at
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).duration_minutes,
                  "onUpdate:modelValue": ($event) => unref(form).duration_minutes = $event,
                  modelModifiers: { number: true },
                  label: "Duration (min)",
                  type: "number",
                  min: "15",
                  error: unref(form).errors.duration_minutes
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).dining_table_id,
                  "onUpdate:modelValue": ($event) => unref(form).dining_table_id = $event,
                  label: "Table",
                  type: "select",
                  error: unref(form).errors.dining_table_id
                }, {
                  default: withCtx(() => [
                    createVNode("option", { value: "" }, "— No specific table —"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.tables, (t) => {
                      return openBlock(), createBlock("option", {
                        key: t.id,
                        value: t.id
                      }, toDisplayString(t.table_number) + " (cap. " + toDisplayString(t.capacity) + ") ", 9, ["value"]);
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
                    createVNode("option", { value: "" }, "Select branch"),
                    (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (b) => {
                      return openBlock(), createBlock("option", {
                        key: b.id,
                        value: b.id
                      }, toDisplayString(b.name), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).status,
                  "onUpdate:modelValue": ($event) => unref(form).status = $event,
                  label: "Status",
                  type: "select",
                  error: unref(form).errors.status
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(props.statuses, (s) => {
                      return openBlock(), createBlock("option", {
                        key: s,
                        value: s
                      }, toDisplayString(s), 9, ["value"]);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).occasion,
                  "onUpdate:modelValue": ($event) => unref(form).occasion = $event,
                  label: "Occasion",
                  placeholder: "Birthday, Anniversary…",
                  error: unref(form).errors.occasion
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).notes,
                "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                label: "Notes",
                type: "textarea",
                placeholder: "Special requests…",
                error: unref(form).errors.notes
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showWaitlistModal.value,
        "onUpdate:modelValue": ($event) => showWaitlistModal.value = $event,
        title: "Add to Waitlist",
        width: "480px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-204afcf2${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(wlForm).processing) ? " disabled" : ""} data-v-204afcf2${_scopeId}>Add to Waitlist</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showWaitlistModal.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: unref(wlForm).processing,
                onClick: saveWaitlist
              }, "Add to Waitlist", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).guest_name,
              "onUpdate:modelValue": ($event) => unref(wlForm).guest_name = $event,
              label: "Guest Name *",
              placeholder: "Full name",
              error: unref(wlForm).errors.guest_name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).guest_phone,
              "onUpdate:modelValue": ($event) => unref(wlForm).guest_phone = $event,
              label: "Phone",
              placeholder: "+92 300 0000000",
              error: unref(wlForm).errors.guest_phone
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).party_size,
              "onUpdate:modelValue": ($event) => unref(wlForm).party_size = $event,
              modelModifiers: { number: true },
              label: "Party Size *",
              type: "number",
              min: "1",
              error: unref(wlForm).errors.party_size
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).branch_id,
              "onUpdate:modelValue": ($event) => unref(wlForm).branch_id = $event,
              label: "Branch",
              type: "select",
              error: unref(wlForm).errors.branch_id
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option value="" data-v-204afcf2${_scopeId2}>Select branch</option><!--[-->`);
                  ssrRenderList(props.branches, (b) => {
                    _push3(`<option${ssrRenderAttr("value", b.id)} data-v-204afcf2${_scopeId2}>${ssrInterpolate(b.name)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode("option", { value: "" }, "Select branch"),
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
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).estimated_wait_minutes,
              "onUpdate:modelValue": ($event) => unref(wlForm).estimated_wait_minutes = $event,
              modelModifiers: { number: true },
              label: "Est. Wait (min)",
              type: "number",
              min: "1",
              placeholder: "20",
              error: unref(wlForm).errors.estimated_wait_minutes
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(wlForm).notes,
              "onUpdate:modelValue": ($event) => unref(wlForm).notes = $event,
              label: "Notes",
              type: "textarea",
              error: unref(wlForm).errors.notes
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).guest_name,
                "onUpdate:modelValue": ($event) => unref(wlForm).guest_name = $event,
                label: "Guest Name *",
                placeholder: "Full name",
                error: unref(wlForm).errors.guest_name
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).guest_phone,
                "onUpdate:modelValue": ($event) => unref(wlForm).guest_phone = $event,
                label: "Phone",
                placeholder: "+92 300 0000000",
                error: unref(wlForm).errors.guest_phone
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).party_size,
                "onUpdate:modelValue": ($event) => unref(wlForm).party_size = $event,
                modelModifiers: { number: true },
                label: "Party Size *",
                type: "number",
                min: "1",
                error: unref(wlForm).errors.party_size
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).branch_id,
                "onUpdate:modelValue": ($event) => unref(wlForm).branch_id = $event,
                label: "Branch",
                type: "select",
                error: unref(wlForm).errors.branch_id
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: "" }, "Select branch"),
                  (openBlock(true), createBlock(Fragment, null, renderList(props.branches, (b) => {
                    return openBlock(), createBlock("option", {
                      key: b.id,
                      value: b.id
                    }, toDisplayString(b.name), 9, ["value"]);
                  }), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).estimated_wait_minutes,
                "onUpdate:modelValue": ($event) => unref(wlForm).estimated_wait_minutes = $event,
                modelModifiers: { number: true },
                label: "Est. Wait (min)",
                type: "number",
                min: "1",
                placeholder: "20",
                error: unref(wlForm).errors.estimated_wait_minutes
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(wlForm).notes,
                "onUpdate:modelValue": ($event) => unref(wlForm).notes = $event,
                label: "Notes",
                type: "textarea",
                error: unref(wlForm).errors.notes
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Reservations/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-204afcf2"]]);
export {
  Index as default
};
