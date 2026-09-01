import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    paginator: { type: Object, default: null },
    only: { type: Array, default: () => [] }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.paginator && __props.paginator.last_page > 1) {
        _push(`<nav${ssrRenderAttrs(mergeProps({
          class: "pager",
          "aria-label": "Pagination"
        }, _attrs))} data-v-d4369e6c><span class="pager__info" data-v-d4369e6c> Showing <strong data-v-d4369e6c>${ssrInterpolate(__props.paginator.from ?? 0)}</strong>–<strong data-v-d4369e6c>${ssrInterpolate(__props.paginator.to ?? 0)}</strong> of <strong data-v-d4369e6c>${ssrInterpolate(__props.paginator.total)}</strong></span><ul class="pager__links" data-v-d4369e6c><!--[-->`);
        ssrRenderList(__props.paginator.links, (link, i) => {
          _push(`<li data-v-d4369e6c><button type="button" class="${ssrRenderClass([{
            "pager__btn--active": link.active,
            "pager__btn--disabled": !link.url
          }, "pager__btn"])}"${ssrIncludeBooleanAttr(!link.url) ? " disabled" : ""}${ssrRenderAttr("aria-current", link.active ? "page" : void 0)} data-v-d4369e6c>${link.label ?? ""}</button></li>`);
        });
        _push(`<!--]--></ul></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ui/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d4369e6c"]]);
export {
  Pagination as P
};
