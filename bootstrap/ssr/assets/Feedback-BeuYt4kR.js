import { computed, ref, watch, mergeProps, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
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
  __name: "Feedback",
  __ssrInlineRender: true,
  props: {
    feedbacks: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "", rating: "", state: "" }) },
    stats: { type: Object, default: () => ({ total: 0, average: 0, unanswered: 0, negative: 0 }) }
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
      { key: "customer_name", label: "Customer" },
      { key: "rating", label: "Rating", width: "110px" },
      { key: "order_id", label: "Order", width: "80px" },
      { key: "comment", label: "Comment" },
      { key: "reply", label: "Reply" },
      { key: "is_published", label: "Visibility", width: "110px" },
      { key: "created_at", label: "Received" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.feedbacks) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    const rating = ref(((_b = props.filters) == null ? void 0 : _b.rating) ?? "");
    const state = ref(((_c = props.filters) == null ? void 0 : _c.state) ?? "");
    let searchTimer = null;
    const reload = (debounce) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(
        () => router.get(
          "/crm/feedback",
          {
            search: search.value || void 0,
            rating: rating.value || void 0,
            state: state.value || void 0
          },
          { preserveState: true, preserveScroll: true, replace: true, only: ["feedbacks", "filters", "stats"] }
        ),
        debounce
      );
    };
    watch(search, () => reload(300));
    watch([rating, state], () => reload(0));
    const showModal = ref(false);
    const showReply = ref(false);
    const active = ref(null);
    const blank = { id: null, customer_id: null, order_id: "", rating: 5, comment: "", is_published: false };
    const form = useForm({ ...blank });
    const rForm = useForm({ reply: "" });
    const openModal = () => {
      Object.assign(form, blank);
      form.clearErrors();
      showModal.value = true;
    };
    const editRow = (f) => {
      Object.assign(form, {
        id: f.id,
        customer_id: f.customer_id,
        order_id: f.order_id ?? "",
        rating: f.rating,
        comment: f.comment ?? "",
        is_published: f.is_published
      });
      form.clearErrors();
      showModal.value = true;
    };
    const save = () => {
      const opts = { preserveScroll: true, onSuccess: () => showModal.value = false };
      form.transform((data) => ({ ...data, order_id: data.order_id === "" ? null : data.order_id }));
      if (form.id) form.put(`/crm/feedback/${form.id}`, opts);
      else form.post("/crm/feedback", opts);
    };
    const openReply = (row) => {
      active.value = row;
      rForm.reset();
      rForm.reply = row.reply ?? "";
      rForm.clearErrors();
      showReply.value = true;
    };
    const submitReply = () => {
      rForm.put(`/crm/feedback/${active.value.id}/reply`, {
        preserveScroll: true,
        onSuccess: () => showReply.value = false
      });
    };
    const togglePublish = (row) => {
      router.put(`/crm/feedback/${row.id}/publish`, {}, { preserveScroll: true });
    };
    const deleteRow = (id) => {
      if (!confirm("Delete this feedback?")) return;
      router.delete(`/crm/feedback/${id}`, { preserveScroll: true });
    };
    const stars = (n) => "★".repeat(Number(n) || 0) + "☆".repeat(Math.max(0, 5 - (Number(n) || 0)));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-d054531d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Customer Feedback",
        subtitle: "Ratings against orders. Nothing is published until you say so."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("crm.feedback.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-d054531d${_scopeId}> + Record Feedback </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("crm.feedback.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, " + Record Feedback ")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (flashError.value) {
        _push(`<div class="ui-alert ui-alert--danger" data-v-d054531d>${ssrInterpolate(flashError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="stat-grid" data-v-d054531d>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Total Responses",
        value: props.stats.total
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Average Rating",
        value: props.stats.average ? `${props.stats.average} / 5` : "—",
        color: "var(--success)",
        tint: "var(--success-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Awaiting Reply",
        value: props.stats.unanswered,
        color: "var(--warning)",
        tint: "var(--warning-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Unhappy (1–2★)",
        value: props.stats.negative,
        color: "var(--danger)",
        tint: "var(--danger-soft)"
      }, null, _parent));
      _push(`</div><div class="fb__filters" data-v-d054531d>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: rating.value,
        "onUpdate:modelValue": ($event) => rating.value = $event,
        label: "Rating",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-d054531d${_scopeId}>Any rating</option><!--[-->`);
            ssrRenderList([5, 4, 3, 2, 1], (r) => {
              _push2(`<option${ssrRenderAttr("value", r)} data-v-d054531d${_scopeId}>${ssrInterpolate(r)} star${ssrInterpolate(r === 1 ? "" : "s")}</option>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              createVNode("option", { value: "" }, "Any rating"),
              (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (r) => {
                return createVNode("option", {
                  key: r,
                  value: r
                }, toDisplayString(r) + " star" + toDisplayString(r === 1 ? "" : "s"), 9, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: state.value,
        "onUpdate:modelValue": ($event) => state.value = $event,
        label: "State",
        type: "select"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<option value="" data-v-d054531d${_scopeId}>All</option><option value="unanswered" data-v-d054531d${_scopeId}>Awaiting reply</option><option value="answered" data-v-d054531d${_scopeId}>Answered</option><option value="published" data-v-d054531d${_scopeId}>Published</option>`);
          } else {
            return [
              createVNode("option", { value: "" }, "All"),
              createVNode("option", { value: "unanswered" }, "Awaiting reply"),
              createVNode("option", { value: "answered" }, "Answered"),
              createVNode("option", { value: "published" }, "Published")
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
        "search-placeholder": "Search comment, customer or order…",
        "empty-text": "No feedback yet."
      }, {
        "cell:customer_name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="fb__who" data-v-d054531d${_scopeId}><strong data-v-d054531d${_scopeId}>${ssrInterpolate(row.customer_name ?? "Walk-in")}</strong>`);
            if (row.customer_contact) {
              _push2(`<span class="fb__meta" data-v-d054531d${_scopeId}>${ssrInterpolate(row.customer_contact)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "fb__who" }, [
                createVNode("strong", null, toDisplayString(row.customer_name ?? "Walk-in"), 1),
                row.customer_contact ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "fb__meta"
                }, toDisplayString(row.customer_contact), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        "cell:rating": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="fb__stars"${ssrRenderAttr("title", `${value} of 5`)} data-v-d054531d${_scopeId}>${ssrInterpolate(stars(value))}</span>`);
          } else {
            return [
              createVNode("span", {
                class: "fb__stars",
                title: `${value} of 5`
              }, toDisplayString(stars(value)), 9, ["title"])
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
        "cell:comment": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="fb__wrap" data-v-d054531d${_scopeId}>${ssrInterpolate(value || "—")}</span>`);
          } else {
            return [
              createVNode("span", { class: "fb__wrap" }, toDisplayString(value || "—"), 1)
            ];
          }
        }),
        "cell:reply": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (row.reply) {
              _push2(`<div class="fb__who" data-v-d054531d${_scopeId}><span class="fb__wrap" data-v-d054531d${_scopeId}>${ssrInterpolate(row.reply)}</span><span class="fb__meta" data-v-d054531d${_scopeId}>${ssrInterpolate(row.responder_name)} · ${ssrInterpolate(row.replied_at)}</span></div>`);
            } else {
              _push2(`<span class="ui-badge ui-badge--warning" data-v-d054531d${_scopeId}>Awaiting reply</span>`);
            }
          } else {
            return [
              row.reply ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fb__who"
              }, [
                createVNode("span", { class: "fb__wrap" }, toDisplayString(row.reply), 1),
                createVNode("span", { class: "fb__meta" }, toDisplayString(row.responder_name) + " · " + toDisplayString(row.replied_at), 1)
              ])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "ui-badge ui-badge--warning"
              }, "Awaiting reply"))
            ];
          }
        }),
        "cell:is_published": withCtx(({ value }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([value ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}" data-v-d054531d${_scopeId}>${ssrInterpolate(value ? "Published" : "Hidden")}</span>`);
          } else {
            return [
              createVNode("span", {
                class: ["ui-badge", value ? "ui-badge--success" : "ui-badge--muted"]
              }, toDisplayString(value ? "Published" : "Hidden"), 3)
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(can)("crm.feedback.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-d054531d${_scopeId}>${ssrInterpolate(row.reply ? "Edit Reply" : "Reply")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("crm.feedback.update")) {
              _push2(`<button class="${ssrRenderClass([row.is_published ? "ui-btn--ghost" : "ui-btn--success", "ui-btn ui-btn--sm"])}" data-v-d054531d${_scopeId}>${ssrInterpolate(row.is_published ? "Unpublish" : "Publish")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("crm.feedback.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-d054531d${_scopeId}> Edit </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("crm.feedback.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-d054531d${_scopeId}> Delete </button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(can)("crm.feedback.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => openReply(row)
              }, toDisplayString(row.reply ? "Edit Reply" : "Reply"), 9, ["onClick"])) : createCommentVNode("", true),
              unref(can)("crm.feedback.update") ? (openBlock(), createBlock("button", {
                key: 1,
                class: ["ui-btn ui-btn--sm", row.is_published ? "ui-btn--ghost" : "ui-btn--success"],
                onClick: ($event) => togglePublish(row)
              }, toDisplayString(row.is_published ? "Unpublish" : "Publish"), 11, ["onClick"])) : createCommentVNode("", true),
              unref(can)("crm.feedback.update") ? (openBlock(), createBlock("button", {
                key: 2,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editRow(row)
              }, " Edit ", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("crm.feedback.delete") ? (openBlock(), createBlock("button", {
                key: 3,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => deleteRow(row.id)
              }, " Delete ", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.feedbacks,
        only: ["feedbacks"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Feedback" : "Record Feedback"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-d054531d${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-d054531d${_scopeId}>Save</button>`);
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
            if (!unref(form).id) {
              _push2(ssrRenderComponent(CustomerPicker, {
                modelValue: unref(form).customer_id,
                "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                label: "Customer (optional)",
                error: unref(form).errors.customer_id
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="fb__grid" data-v-d054531d${_scopeId}>`);
            if (!unref(form).id) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                modelValue: unref(form).order_id,
                "onUpdate:modelValue": ($event) => unref(form).order_id = $event,
                label: "Order # (optional)",
                type: "number",
                error: unref(form).errors.order_id
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).rating,
              "onUpdate:modelValue": ($event) => unref(form).rating = $event,
              label: "Rating",
              type: "select",
              error: unref(form).errors.rating
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList([5, 4, 3, 2, 1], (r) => {
                    _push3(`<option${ssrRenderAttr("value", r)} data-v-d054531d${_scopeId2}>${ssrInterpolate(stars(r))} — ${ssrInterpolate(r)}</option>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (r) => {
                      return createVNode("option", {
                        key: r,
                        value: r
                      }, toDisplayString(stars(r)) + " — " + toDisplayString(r), 9, ["value"]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).comment,
              "onUpdate:modelValue": ($event) => unref(form).comment = $event,
              label: "Comment",
              type: "textarea",
              error: unref(form).errors.comment
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).is_published,
              "onUpdate:modelValue": ($event) => unref(form).is_published = $event,
              label: "Visibility",
              type: "select",
              error: unref(form).errors.is_published
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<option${ssrRenderAttr("value", false)} data-v-d054531d${_scopeId2}>Hidden</option><option${ssrRenderAttr("value", true)} data-v-d054531d${_scopeId2}>Published</option>`);
                } else {
                  return [
                    createVNode("option", { value: false }, "Hidden"),
                    createVNode("option", { value: true }, "Published")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              !unref(form).id ? (openBlock(), createBlock(CustomerPicker, {
                key: 0,
                modelValue: unref(form).customer_id,
                "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                label: "Customer (optional)",
                error: unref(form).errors.customer_id
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : createCommentVNode("", true),
              createVNode("div", { class: "fb__grid" }, [
                !unref(form).id ? (openBlock(), createBlock(_sfc_main$2, {
                  key: 0,
                  modelValue: unref(form).order_id,
                  "onUpdate:modelValue": ($event) => unref(form).order_id = $event,
                  label: "Order # (optional)",
                  type: "number",
                  error: unref(form).errors.order_id
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])) : createCommentVNode("", true),
                createVNode(_sfc_main$2, {
                  modelValue: unref(form).rating,
                  "onUpdate:modelValue": ($event) => unref(form).rating = $event,
                  label: "Rating",
                  type: "select",
                  error: unref(form).errors.rating
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Fragment, null, renderList([5, 4, 3, 2, 1], (r) => {
                      return createVNode("option", {
                        key: r,
                        value: r
                      }, toDisplayString(stars(r)) + " — " + toDisplayString(r), 9, ["value"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "error"])
              ]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).comment,
                "onUpdate:modelValue": ($event) => unref(form).comment = $event,
                label: "Comment",
                type: "textarea",
                error: unref(form).errors.comment
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).is_published,
                "onUpdate:modelValue": ($event) => unref(form).is_published = $event,
                label: "Visibility",
                type: "select",
                error: unref(form).errors.is_published
              }, {
                default: withCtx(() => [
                  createVNode("option", { value: false }, "Hidden"),
                  createVNode("option", { value: true }, "Published")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "error"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showReply.value,
        "onUpdate:modelValue": ($event) => showReply.value = $event,
        title: "Reply to Feedback"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-d054531d${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(rForm).processing) ? " disabled" : ""} data-v-d054531d${_scopeId}>Save Reply</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showReply.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: unref(rForm).processing,
                onClick: submitReply
              }, "Save Reply", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (active.value) {
              _push2(`<div class="fb__quote" data-v-d054531d${_scopeId}><span class="fb__stars" data-v-d054531d${_scopeId}>${ssrInterpolate(stars(active.value.rating))}</span><p data-v-d054531d${_scopeId}>${ssrInterpolate(active.value.comment || "No comment left.")}</p><span class="fb__meta" data-v-d054531d${_scopeId}>${ssrInterpolate(active.value.customer_name ?? "Walk-in")} · ${ssrInterpolate(active.value.created_at)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(rForm).reply,
              "onUpdate:modelValue": ($event) => unref(rForm).reply = $event,
              label: "Your reply",
              type: "textarea",
              error: unref(rForm).errors.reply
            }, null, _parent2, _scopeId));
          } else {
            return [
              active.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fb__quote"
              }, [
                createVNode("span", { class: "fb__stars" }, toDisplayString(stars(active.value.rating)), 1),
                createVNode("p", null, toDisplayString(active.value.comment || "No comment left."), 1),
                createVNode("span", { class: "fb__meta" }, toDisplayString(active.value.customer_name ?? "Walk-in") + " · " + toDisplayString(active.value.created_at), 1)
              ])) : createCommentVNode("", true),
              createVNode(_sfc_main$2, {
                modelValue: unref(rForm).reply,
                "onUpdate:modelValue": ($event) => unref(rForm).reply = $event,
                label: "Your reply",
                type: "textarea",
                error: unref(rForm).errors.reply
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/CRM/Feedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d054531d"]]);
export {
  Feedback as default
};
