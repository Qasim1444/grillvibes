import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { t as _sfc_main$2 } from "./FormField-Doe8oR1s.js";
import { createTextVNode, mergeProps, unref, useSSRContext, withCtx } from "vue";
import { Link, useForm } from "@inertiajs/vue3";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
//#region resources/js/layouts/LoginLayout.vue
var _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "auth" }, _attrs))} data-v-719d559d><div class="auth__brand-panel" data-v-719d559d><div class="auth__brand" data-v-719d559d><div class="auth__logo" data-v-719d559d>J</div><span class="auth__brand-name" data-v-719d559d>KitchenOS Admin</span></div><div class="auth__pitch" data-v-719d559d><h2 data-v-719d559d>Welcome back</h2><p data-v-719d559d>Manage your restaurant, inventory, customers and reports — all from one place.</p></div><div class="auth__glow auth__glow--1" data-v-719d559d></div><div class="auth__glow auth__glow--2" data-v-719d559d></div></div><div class="auth__form-panel" data-v-719d559d>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</div></div>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/LoginLayout.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region resources/js/pages/Login.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: /* @__PURE__ */ _plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-719d559d"]]) }, {
	__name: "Login",
	__ssrInlineRender: true,
	setup(__props) {
		const form = useForm({
			email: "",
			password: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-card" }, _attrs))}><h1 class="auth-card__title">Sign in</h1><p class="auth-card__subtitle">Enter your credentials to access the dashboard.</p><form>`);
			_push(ssrRenderComponent(_sfc_main$2, {
				modelValue: unref(form).email,
				"onUpdate:modelValue": ($event) => unref(form).email = $event,
				label: "Email",
				type: "email",
				placeholder: "you@example.com",
				error: unref(form).errors.email
			}, null, _parent));
			_push(ssrRenderComponent(_sfc_main$2, {
				modelValue: unref(form).password,
				"onUpdate:modelValue": ($event) => unref(form).password = $event,
				label: "Password",
				type: "password",
				placeholder: "••••••••",
				error: unref(form).errors.password
			}, null, _parent));
			_push(`<button type="submit" class="ui-btn ui-btn--primary ui-btn--block"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(unref(form).processing ? "Signing in…" : "Sign in")}</button></form><div class="auth-card__footer">`);
			_push(ssrRenderComponent(unref(Link), { href: "/forgot-password" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Forgot password?`);
					else return [createTextVNode("Forgot password?")];
				}),
				_: 1
			}, _parent));
			_push(`<span> · </span>`);
			_push(ssrRenderComponent(unref(Link), { href: "/register" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Create account`);
					else return [createTextVNode("Create account")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
