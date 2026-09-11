import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { n as usePermissions, t as AdminLayout_default } from "./AdminLayout-Bwr7FeyI.js";
import { t as _sfc_main$1 } from "./PageHeader-D0aRDn5C.js";
import { t as DataTable_default } from "./DataTable-BHCUCuvd.js";
import { t as Modal_default } from "./Modal-DhESI6xO.js";
import { t as _sfc_main$2 } from "./FormField-Doe8oR1s.js";
import { Fragment, computed, createBlock, createCommentVNode, createTextVNode, createVNode, mergeProps, openBlock, ref, renderList, toDisplayString, unref, useSSRContext, vModelText, withCtx, withDirectives } from "vue";
import { useForm } from "@inertiajs/vue3";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/pages/KioskConfig.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: AdminLayout_default }, {
	__name: "KioskConfig",
	__ssrInlineRender: true,
	props: {
		configs: {
			type: Array,
			default: () => []
		},
		places: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const { can } = usePermissions();
		const props = __props;
		const ORDER_TYPES = [
			{
				key: "dine_in",
				label: "Dine In"
			},
			{
				key: "takeaway",
				label: "Takeaway"
			},
			{
				key: "delivery",
				label: "Delivery"
			}
		];
		const typeLabel = (k) => ORDER_TYPES.find((t) => t.key === k)?.label ?? k;
		const columns = [
			{
				key: "place_name",
				label: "Place"
			},
			{
				key: "order_types",
				label: "Order Types"
			},
			{
				key: "splash_title",
				label: "Splash Title"
			},
			{
				key: "accent_color",
				label: "Accent"
			},
			{
				key: "idle_timeout_seconds",
				label: "Idle"
			},
			{
				key: "prompts",
				label: "Prompts"
			},
			{
				key: "is_active",
				label: "Status"
			}
		];
		const defaults = () => ({
			id: null,
			place_id: "",
			order_types: ["dine_in", "takeaway"],
			splash_title: "Welcome",
			splash_subtitle: "Tap to start your order",
			accent_color: "#6366f1",
			idle_timeout_seconds: 120,
			require_name: false,
			require_phone: false,
			is_active: true
		});
		const showModal = ref(false);
		const form = useForm(defaults());
		const editingPlaceName = computed(() => props.places.find((p) => String(p.id) === String(form.place_id))?.name ?? "Default (all places)");
		const toggleType = (key) => {
			const i = form.order_types.indexOf(key);
			if (i === -1) form.order_types.push(key);
			else form.order_types.splice(i, 1);
		};
		const openCreate = () => {
			form.defaults(defaults());
			form.reset();
			form.clearErrors();
			showModal.value = true;
		};
		const openEdit = (row) => {
			form.id = row.id;
			form.place_id = row.place_id ?? "";
			form.order_types = Array.isArray(row.order_types) ? [...row.order_types] : [];
			form.splash_title = row.splash_title ?? "";
			form.splash_subtitle = row.splash_subtitle ?? "";
			form.accent_color = row.accent_color ?? "#6366f1";
			form.idle_timeout_seconds = row.idle_timeout_seconds ?? 120;
			form.require_name = !!row.require_name;
			form.require_phone = !!row.require_phone;
			form.is_active = !!row.is_active;
			form.clearErrors();
			showModal.value = true;
		};
		const save = () => {
			const opts = {
				preserveScroll: true,
				onSuccess: () => showModal.value = false
			};
			if (form.id) form.put(`/kiosk-config/${form.id}`, opts);
			else form.post("/kiosk-config", opts);
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-c8f5c6bf>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				title: "Kiosk Config",
				subtitle: "Customise the self-order kiosk splash, order types and guest prompts — per place or a shared default."
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(can)("kiosk.config")) _push(`<button class="ui-btn ui-btn--primary" data-v-c8f5c6bf${_scopeId}>+ New Config</button>`);
						else _push(`<!---->`);
					} else return [unref(can)("kiosk.config") ? (openBlock(), createBlock("button", {
						key: 0,
						class: "ui-btn ui-btn--primary",
						onClick: openCreate
					}, "+ New Config")) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(DataTable_default, {
				columns,
				rows: props.configs,
				index: "",
				"empty-text": "No kiosk configs yet. Add one to customise the kiosk."
			}, {
				"cell:place_name": withCtx(({ row }, _push, _parent, _scopeId) => {
					if (_push) _push(`<strong data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(row.place_name || "Default (all places)")}</strong>`);
					else return [createVNode("strong", null, toDisplayString(row.place_name || "Default (all places)"), 1)];
				}),
				"cell:order_types": withCtx(({ row }, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<!--[-->`);
						ssrRenderList(row.order_types || [], (t) => {
							_push(`<span class="ui-badge ui-badge--info kc__type" data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(typeLabel(t))}</span>`);
						});
						_push(`<!--]-->`);
						if (!(row.order_types || []).length) _push(`<span class="kc__muted" data-v-c8f5c6bf${_scopeId}>—</span>`);
						else _push(`<!---->`);
					} else return [(openBlock(true), createBlock(Fragment, null, renderList(row.order_types || [], (t) => {
						return openBlock(), createBlock("span", {
							key: t,
							class: "ui-badge ui-badge--info kc__type"
						}, toDisplayString(typeLabel(t)), 1);
					}), 128)), !(row.order_types || []).length ? (openBlock(), createBlock("span", {
						key: 0,
						class: "kc__muted"
					}, "—")) : createCommentVNode("", true)];
				}),
				"cell:accent_color": withCtx(({ value }, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="kc__swatch-row" data-v-c8f5c6bf${_scopeId}><span class="kc__swatch" style="${ssrRenderStyle({ background: value || "#6366f1" })}" data-v-c8f5c6bf${_scopeId}></span> ${ssrInterpolate(value || "#6366f1")}</span>`);
					else return [createVNode("span", { class: "kc__swatch-row" }, [createVNode("span", {
						class: "kc__swatch",
						style: { background: value || "#6366f1" }
					}, null, 4), createTextVNode(" " + toDisplayString(value || "#6366f1"), 1)])];
				}),
				"cell:idle_timeout_seconds": withCtx(({ value }, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(value || 120)}s`);
					else return [createTextVNode(toDisplayString(value || 120) + "s", 1)];
				}),
				"cell:prompts": withCtx(({ row }, _push, _parent, _scopeId) => {
					if (_push) {
						if (row.require_name) _push(`<span class="ui-badge ui-badge--muted" data-v-c8f5c6bf${_scopeId}>Name</span>`);
						else _push(`<!---->`);
						if (row.require_phone) _push(`<span class="ui-badge ui-badge--muted" data-v-c8f5c6bf${_scopeId}>Phone</span>`);
						else _push(`<!---->`);
						if (!row.require_name && !row.require_phone) _push(`<span class="kc__muted" data-v-c8f5c6bf${_scopeId}>None</span>`);
						else _push(`<!---->`);
					} else return [
						row.require_name ? (openBlock(), createBlock("span", {
							key: 0,
							class: "ui-badge ui-badge--muted"
						}, "Name")) : createCommentVNode("", true),
						row.require_phone ? (openBlock(), createBlock("span", {
							key: 1,
							class: "ui-badge ui-badge--muted"
						}, "Phone")) : createCommentVNode("", true),
						!row.require_name && !row.require_phone ? (openBlock(), createBlock("span", {
							key: 2,
							class: "kc__muted"
						}, "None")) : createCommentVNode("", true)
					];
				}),
				"cell:is_active": withCtx(({ value }, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="${ssrRenderClass([value ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}" data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(value ? "Active" : "Inactive")}</span>`);
					else return [createVNode("span", { class: ["ui-badge", value ? "ui-badge--success" : "ui-badge--muted"] }, toDisplayString(value ? "Active" : "Inactive"), 3)];
				}),
				actions: withCtx(({ row }, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(can)("kiosk.config")) _push(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-c8f5c6bf${_scopeId}>Edit</button>`);
						else _push(`<!---->`);
					} else return [unref(can)("kiosk.config") ? (openBlock(), createBlock("button", {
						key: 0,
						class: "ui-btn ui-btn--ghost ui-btn--sm",
						onClick: ($event) => openEdit(row)
					}, "Edit", 8, ["onClick"])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(Modal_default, {
				modelValue: showModal.value,
				"onUpdate:modelValue": ($event) => showModal.value = $event,
				title: unref(form).id ? "Edit Kiosk Config" : "New Kiosk Config",
				width: "560px"
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button class="ui-btn ui-btn--ghost" data-v-c8f5c6bf${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-c8f5c6bf${_scopeId}>Save</button>`);
					else return [createVNode("button", {
						class: "ui-btn ui-btn--ghost",
						onClick: ($event) => showModal.value = false
					}, "Cancel", 8, ["onClick"]), createVNode("button", {
						class: "ui-btn ui-btn--primary",
						disabled: unref(form).processing,
						onClick: save
					}, "Save", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (!unref(form).id) _push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).place_id,
							"onUpdate:modelValue": ($event) => unref(form).place_id = $event,
							label: "Place",
							type: "select",
							error: unref(form).errors.place_id
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<option value="" data-v-c8f5c6bf${_scopeId}>Default (all places)</option><!--[-->`);
									ssrRenderList(props.places, (p) => {
										_push(`<option${ssrRenderAttr("value", p.id)} data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(p.name)}</option>`);
									});
									_push(`<!--]-->`);
								} else return [createVNode("option", { value: "" }, "Default (all places)"), (openBlock(true), createBlock(Fragment, null, renderList(props.places, (p) => {
									return openBlock(), createBlock("option", {
										key: p.id,
										value: p.id
									}, toDisplayString(p.name), 9, ["value"]);
								}), 128))];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<div class="ui-field" data-v-c8f5c6bf${_scopeId}><span class="ui-label" data-v-c8f5c6bf${_scopeId}>Place</span><div class="kc__readonly" data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(editingPlaceName.value)}</div></div>`);
						_push(`<div class="ui-field" data-v-c8f5c6bf${_scopeId}><span class="ui-label" data-v-c8f5c6bf${_scopeId}>Order Types</span><div class="kc__checks" data-v-c8f5c6bf${_scopeId}><!--[-->`);
						ssrRenderList(ORDER_TYPES, (t) => {
							_push(`<label class="kc__check" data-v-c8f5c6bf${_scopeId}><input type="checkbox"${ssrRenderAttr("value", t.key)}${ssrIncludeBooleanAttr(unref(form).order_types.includes(t.key)) ? " checked" : ""} data-v-c8f5c6bf${_scopeId}><span data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(t.label)}</span></label>`);
						});
						_push(`<!--]--></div></div>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).splash_title,
							"onUpdate:modelValue": ($event) => unref(form).splash_title = $event,
							label: "Splash Title",
							placeholder: "Welcome",
							error: unref(form).errors.splash_title
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).splash_subtitle,
							"onUpdate:modelValue": ($event) => unref(form).splash_subtitle = $event,
							label: "Splash Subtitle",
							placeholder: "Tap to start your order",
							error: unref(form).errors.splash_subtitle
						}, null, _parent, _scopeId));
						_push(`<div class="ui-field" data-v-c8f5c6bf${_scopeId}><span class="ui-label" data-v-c8f5c6bf${_scopeId}>Accent Color</span><div class="kc__color" data-v-c8f5c6bf${_scopeId}><input type="color"${ssrRenderAttr("value", unref(form).accent_color)} class="kc__color-picker" data-v-c8f5c6bf${_scopeId}><input${ssrRenderAttr("value", unref(form).accent_color)} class="ui-input" placeholder="#6366f1" maxlength="20" data-v-c8f5c6bf${_scopeId}></div>`);
						if (unref(form).errors.accent_color) _push(`<p class="ui-field__error" data-v-c8f5c6bf${_scopeId}>${ssrInterpolate(unref(form).errors.accent_color)}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).idle_timeout_seconds,
							"onUpdate:modelValue": ($event) => unref(form).idle_timeout_seconds = $event,
							modelModifiers: { number: true },
							label: "Idle Timeout (seconds)",
							type: "number",
							step: "1",
							error: unref(form).errors.idle_timeout_seconds
						}, null, _parent, _scopeId));
						_push(`<div class="form-grid-2" data-v-c8f5c6bf${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).require_name,
							"onUpdate:modelValue": ($event) => unref(form).require_name = $event,
							label: "Require Guest Name",
							type: "select"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<option${ssrRenderAttr("value", false)} data-v-c8f5c6bf${_scopeId}>No</option><option${ssrRenderAttr("value", true)} data-v-c8f5c6bf${_scopeId}>Yes</option>`);
								else return [createVNode("option", { value: false }, "No"), createVNode("option", { value: true }, "Yes")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).require_phone,
							"onUpdate:modelValue": ($event) => unref(form).require_phone = $event,
							label: "Require Guest Phone",
							type: "select"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<option${ssrRenderAttr("value", false)} data-v-c8f5c6bf${_scopeId}>No</option><option${ssrRenderAttr("value", true)} data-v-c8f5c6bf${_scopeId}>Yes</option>`);
								else return [createVNode("option", { value: false }, "No"), createVNode("option", { value: true }, "Yes")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`</div>`);
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).is_active,
							"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
							label: "Status",
							type: "select"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<option${ssrRenderAttr("value", true)} data-v-c8f5c6bf${_scopeId}>Active</option><option${ssrRenderAttr("value", false)} data-v-c8f5c6bf${_scopeId}>Inactive</option>`);
								else return [createVNode("option", { value: true }, "Active"), createVNode("option", { value: false }, "Inactive")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [
						!unref(form).id ? (openBlock(), createBlock(_sfc_main$2, {
							key: 0,
							modelValue: unref(form).place_id,
							"onUpdate:modelValue": ($event) => unref(form).place_id = $event,
							label: "Place",
							type: "select",
							error: unref(form).errors.place_id
						}, {
							default: withCtx(() => [createVNode("option", { value: "" }, "Default (all places)"), (openBlock(true), createBlock(Fragment, null, renderList(props.places, (p) => {
								return openBlock(), createBlock("option", {
									key: p.id,
									value: p.id
								}, toDisplayString(p.name), 9, ["value"]);
							}), 128))]),
							_: 1
						}, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"error"
						])) : (openBlock(), createBlock("div", {
							key: 1,
							class: "ui-field"
						}, [createVNode("span", { class: "ui-label" }, "Place"), createVNode("div", { class: "kc__readonly" }, toDisplayString(editingPlaceName.value), 1)])),
						createVNode("div", { class: "ui-field" }, [createVNode("span", { class: "ui-label" }, "Order Types"), createVNode("div", { class: "kc__checks" }, [(openBlock(), createBlock(Fragment, null, renderList(ORDER_TYPES, (t) => {
							return createVNode("label", {
								key: t.key,
								class: "kc__check"
							}, [createVNode("input", {
								type: "checkbox",
								value: t.key,
								checked: unref(form).order_types.includes(t.key),
								onChange: ($event) => toggleType(t.key)
							}, null, 40, [
								"value",
								"checked",
								"onChange"
							]), createVNode("span", null, toDisplayString(t.label), 1)]);
						}), 64))])]),
						createVNode(_sfc_main$2, {
							modelValue: unref(form).splash_title,
							"onUpdate:modelValue": ($event) => unref(form).splash_title = $event,
							label: "Splash Title",
							placeholder: "Welcome",
							error: unref(form).errors.splash_title
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"error"
						]),
						createVNode(_sfc_main$2, {
							modelValue: unref(form).splash_subtitle,
							"onUpdate:modelValue": ($event) => unref(form).splash_subtitle = $event,
							label: "Splash Subtitle",
							placeholder: "Tap to start your order",
							error: unref(form).errors.splash_subtitle
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"error"
						]),
						createVNode("div", { class: "ui-field" }, [
							createVNode("span", { class: "ui-label" }, "Accent Color"),
							createVNode("div", { class: "kc__color" }, [withDirectives(createVNode("input", {
								type: "color",
								"onUpdate:modelValue": ($event) => unref(form).accent_color = $event,
								class: "kc__color-picker"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).accent_color]]), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).accent_color = $event,
								class: "ui-input",
								placeholder: "#6366f1",
								maxlength: "20"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).accent_color]])]),
							unref(form).errors.accent_color ? (openBlock(), createBlock("p", {
								key: 0,
								class: "ui-field__error"
							}, toDisplayString(unref(form).errors.accent_color), 1)) : createCommentVNode("", true)
						]),
						createVNode(_sfc_main$2, {
							modelValue: unref(form).idle_timeout_seconds,
							"onUpdate:modelValue": ($event) => unref(form).idle_timeout_seconds = $event,
							modelModifiers: { number: true },
							label: "Idle Timeout (seconds)",
							type: "number",
							step: "1",
							error: unref(form).errors.idle_timeout_seconds
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"error"
						]),
						createVNode("div", { class: "form-grid-2" }, [createVNode(_sfc_main$2, {
							modelValue: unref(form).require_name,
							"onUpdate:modelValue": ($event) => unref(form).require_name = $event,
							label: "Require Guest Name",
							type: "select"
						}, {
							default: withCtx(() => [createVNode("option", { value: false }, "No"), createVNode("option", { value: true }, "Yes")]),
							_: 1
						}, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(_sfc_main$2, {
							modelValue: unref(form).require_phone,
							"onUpdate:modelValue": ($event) => unref(form).require_phone = $event,
							label: "Require Guest Phone",
							type: "select"
						}, {
							default: withCtx(() => [createVNode("option", { value: false }, "No"), createVNode("option", { value: true }, "Yes")]),
							_: 1
						}, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode(_sfc_main$2, {
							modelValue: unref(form).is_active,
							"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
							label: "Status",
							type: "select"
						}, {
							default: withCtx(() => [createVNode("option", { value: true }, "Active"), createVNode("option", { value: false }, "Inactive")]),
							_: 1
						}, 8, ["modelValue", "onUpdate:modelValue"])
					];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/KioskConfig.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var KioskConfig_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-c8f5c6bf"]]);
//#endregion
export { KioskConfig_default as default };
