import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate } from "vue/server-renderer";
import { usePage, useForm } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Profile",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const user = ((_a = usePage().props.auth) == null ? void 0 : _a.user) ?? {};
    const email = ref(user.email ?? "");
    const profileForm = useForm({
      name: user.name ?? "",
      phone: user.phone ?? "",
      address: user.address ?? ""
    });
    const passwordForm = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-03c5170a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Profile",
        subtitle: "Your account information."
      }, null, _parent));
      _push(`<div class="profile-grid" data-v-03c5170a><div class="ui-card ui-card-pad" data-v-03c5170a><h3 class="profile__section-title" data-v-03c5170a>Personal Info</h3>`);
      if (unref(profileForm).recentlySuccessful) {
        _push(`<div class="ui-alert ui-alert--success" data-v-03c5170a> Profile updated successfully. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(profileForm).name,
        "onUpdate:modelValue": ($event) => unref(profileForm).name = $event,
        label: "Name",
        placeholder: "Name",
        error: unref(profileForm).errors.name
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: email.value,
        "onUpdate:modelValue": ($event) => email.value = $event,
        label: "Email",
        type: "email",
        readonly: ""
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(profileForm).phone,
        "onUpdate:modelValue": ($event) => unref(profileForm).phone = $event,
        label: "Phone",
        placeholder: "Phone",
        error: unref(profileForm).errors.phone
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(profileForm).address,
        "onUpdate:modelValue": ($event) => unref(profileForm).address = $event,
        label: "Address",
        type: "textarea",
        placeholder: "Address",
        error: unref(profileForm).errors.address
      }, null, _parent));
      _push(`<button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""} data-v-03c5170a>${ssrInterpolate(unref(profileForm).processing ? "Saving…" : "Update Profile")}</button></div><div class="ui-card" data-v-03c5170a><div class="ui-card-header" data-v-03c5170a><span data-v-03c5170a>Change Password</span></div><div class="ui-card-pad" data-v-03c5170a>`);
      if (unref(passwordForm).recentlySuccessful) {
        _push(`<div class="ui-alert ui-alert--success" data-v-03c5170a> Password changed successfully. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(passwordForm).current_password,
        "onUpdate:modelValue": ($event) => unref(passwordForm).current_password = $event,
        label: "Current Password",
        type: "password",
        placeholder: "••••••••",
        error: unref(passwordForm).errors.current_password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(passwordForm).password,
        "onUpdate:modelValue": ($event) => unref(passwordForm).password = $event,
        label: "New Password",
        type: "password",
        placeholder: "••••••••",
        error: unref(passwordForm).errors.password
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        modelValue: unref(passwordForm).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(passwordForm).password_confirmation = $event,
        label: "Confirm Password",
        type: "password",
        placeholder: "••••••••"
      }, null, _parent));
      _push(`<button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(passwordForm).processing) ? " disabled" : ""} data-v-03c5170a>${ssrInterpolate(unref(passwordForm).processing ? "Updating…" : "Change Password")}</button></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03c5170a"]]);
export {
  Profile as default
};
