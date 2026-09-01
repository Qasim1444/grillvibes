import { ref, reactive, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AdminLoginPage",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const selectedRole = ref("SUPER_ADMIN");
    const isSubmitting = ref(false);
    const authError = ref("");
    const form = reactive({
      email: "",
      password: "",
      remember: true
    });
    const errors = reactive({
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-shell" }, _attrs))} data-v-0769ab5e><div class="login-card" data-v-0769ab5e><div class="login-card__header" data-v-0769ab5e><div class="brand-mark" data-v-0769ab5e>J</div><div data-v-0769ab5e><h1 data-v-0769ab5e>Admin login</h1><p data-v-0769ab5e>Access your workspace</p></div></div><div class="account-tabs" aria-label="Account type selector" data-v-0769ab5e><button type="button" class="${ssrRenderClass({ active: selectedRole.value === "SUPER_ADMIN" })}" data-v-0769ab5e> Super Admin </button><button type="button" class="${ssrRenderClass({ active: selectedRole.value === "SUB_ADMIN" })}" data-v-0769ab5e> Sub-Admin </button></div>`);
      if (authError.value) {
        _push(`<div class="error-banner" role="alert" data-v-0769ab5e>${ssrInterpolate(authError.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form class="login-form" data-v-0769ab5e><div class="field" data-v-0769ab5e><label for="email" data-v-0769ab5e>Email</label><input id="email"${ssrRenderAttr("value", form.email)} type="email" placeholder="admin@kitchenos.io" data-v-0769ab5e>`);
      if (errors.email) {
        _push(`<small class="field-error" data-v-0769ab5e>${ssrInterpolate(errors.email)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="field" data-v-0769ab5e><label for="password" data-v-0769ab5e>Password</label><input id="password"${ssrRenderAttr("value", form.password)} type="password" placeholder="Enter your password" data-v-0769ab5e>`);
      if (errors.password) {
        _push(`<small class="field-error" data-v-0769ab5e>${ssrInterpolate(errors.password)}</small>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="login-form__meta" data-v-0769ab5e><label class="checkbox" data-v-0769ab5e><input${ssrIncludeBooleanAttr(Array.isArray(form.remember) ? ssrLooseContain(form.remember, null) : form.remember) ? " checked" : ""} type="checkbox" data-v-0769ab5e><span data-v-0769ab5e>Remember me</span></label><button type="button" class="link-button" data-v-0769ab5e>Forgot password?</button></div><button type="submit" class="primary-button"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} data-v-0769ab5e>${ssrInterpolate(isSubmitting.value ? "Signing in…" : "Sign in")}</button></form><div class="demo-box" data-v-0769ab5e><p data-v-0769ab5e>Demo accounts</p><span data-v-0769ab5e>Super Admin: super@kitchenos.io / password123</span><span data-v-0769ab5e>Sub-Admin: subadmin@kitchenos.io / password123</span></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/AdminLoginPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0769ab5e"]]);
export {
  AdminLoginPage as default
};
