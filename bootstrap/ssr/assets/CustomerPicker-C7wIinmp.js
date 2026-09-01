import { computed, ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CustomerPicker",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [String, Number, null], default: null },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "Search customer…" },
    error: { type: String, default: "" },
    initialName: { type: String, default: "" },
    endpoint: { type: String, default: "/customers/search" }
  },
  emits: ["update:modelValue", "picked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const fieldId = computed(
      () => `cp-${(props.label || "customer").toLowerCase().replace(/\s+/g, "-")}`
    );
    const text = ref("");
    const selectedName = ref("");
    const results = ref([]);
    const open = ref(false);
    const loading = ref(false);
    const noResults = ref(false);
    const activeIndex = ref(0);
    watch(
      () => props.modelValue,
      (id) => {
        if (id === null || id === void 0 || id === "") {
          text.value = "";
          selectedName.value = "";
        } else if (!selectedName.value && props.initialName) {
          selectedName.value = props.initialName;
          text.value = props.initialName;
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["cpick ui-field", { "ui-field--error": __props.error }]
      }, _attrs))} data-v-f90435a4>`);
      if (__props.label) {
        _push(`<label class="ui-label"${ssrRenderAttr("for", fieldId.value)} data-v-f90435a4>${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cpick__control" data-v-f90435a4><input${ssrRenderAttr("id", fieldId.value)} class="ui-input cpick__input" type="text" autocomplete="off"${ssrRenderAttr("placeholder", __props.placeholder)}${ssrRenderAttr("value", text.value)} data-v-f90435a4>`);
      if (loading.value) {
        _push(`<span class="cpick__spinner" aria-hidden="true" data-v-f90435a4></span>`);
      } else if (text.value) {
        _push(`<button type="button" class="cpick__clear" aria-label="Clear selection" data-v-f90435a4> × </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (open.value) {
        _push(`<ul class="cpick__menu" role="listbox" data-v-f90435a4>`);
        if (loading.value) {
          _push(`<li class="cpick__state" data-v-f90435a4>Searching…</li>`);
        } else if (noResults.value) {
          _push(`<li class="cpick__state" data-v-f90435a4>No customers found.</li>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(results.value, (c, i) => {
            _push(`<li class="${ssrRenderClass([{ "cpick__option--active": i === activeIndex.value }, "cpick__option"])}" role="option"${ssrRenderAttr("aria-selected", i === activeIndex.value)} data-v-f90435a4><span class="cpick__name" data-v-f90435a4>${ssrInterpolate(c.name)}</span>`);
            if (c.contact) {
              _push(`<span class="cpick__contact" data-v-f90435a4>${ssrInterpolate(c.contact)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</ul>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.error) {
        _push(`<p class="ui-field__error" data-v-f90435a4>${ssrInterpolate(__props.error)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/CustomerPicker.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CustomerPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f90435a4"]]);
export {
  CustomerPicker as C
};
