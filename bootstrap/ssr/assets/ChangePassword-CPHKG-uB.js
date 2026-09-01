import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "ChangePassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Change Password",
        subtitle: "Update the password for your account."
      }, null, _parent));
      _push(`<div class="ui-card ui-card-pad" style="${ssrRenderStyle({ "max-width": "520px" })}">`);
      if (unref(form).recentlySuccessful) {
        _push(`<div class="ui-alert ui-alert--success"> Password changed successfully. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        label: "Current Password",
        type: "password",
        placeholder: "••••••••",
        error: unref(form).errors.current_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        label: "New Password",
        type: "password",
        placeholder: "••••••••",
        error: unref(form).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        label: "Confirm New Password",
        type: "password",
        placeholder: "••••••••"
      }, null, _parent));
      _push(`<button type="submit" class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}>${ssrInterpolate(unref(form).processing ? "Updating…" : "Update Password")}</button></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ChangePassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
