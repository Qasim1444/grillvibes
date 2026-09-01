import { ssrRenderTeleport, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { watch, onBeforeUnmount, useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    title: { type: String, default: "" },
    width: { type: String, default: "520px" },
    hideHeader: { type: Boolean, default: false },
    flush: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const close = () => emit("update:modelValue", false);
    const onKey = (e) => {
      if (e.key === "Escape" && props.modelValue) close();
    };
    watch(
      () => props.modelValue,
      (open) => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) window.addEventListener("keydown", onKey);
        else window.removeEventListener("keydown", onKey);
      }
    );
    onBeforeUnmount(() => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="ui-modal" data-v-92b9c1f7><div class="ui-modal__dialog" style="${ssrRenderStyle({ maxWidth: __props.width })}" data-v-92b9c1f7>`);
          if (!__props.hideHeader) {
            _push2(`<div class="ui-modal__header" data-v-92b9c1f7><h5 class="ui-modal__title" data-v-92b9c1f7>${ssrInterpolate(__props.title)}</h5><button class="ui-modal__close" type="button" aria-label="Close" data-v-92b9c1f7> × </button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass([{ "ui-modal__body--flush": __props.flush }, "ui-modal__body"])}" data-v-92b9c1f7>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
          if (_ctx.$slots.footer) {
            _push2(`<div class="ui-modal__footer" data-v-92b9c1f7>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/Modal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-92b9c1f7"]]);
export {
  Modal as M
};
