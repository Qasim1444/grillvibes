import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region resources/js/pages/PublicBlog.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: null }, {
	__name: "PublicBlog",
	__ssrInlineRender: true,
	props: { posts: {
		type: Array,
		default: () => []
	} },
	setup(__props) {
		const formatDate = (value) => value ? new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric"
		}).format(new Date(value)) : "";
		const excerpt = (value) => (value || "").replace(/<[^>]*>/g, "").slice(0, 180);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "public-blog" }, _attrs))} data-v-274dac95><header class="blog-header" data-v-274dac95><a class="brand" href="/" aria-label="KitchenOS home" data-v-274dac95><span class="brand-mark" data-v-274dac95>K</span><span data-v-274dac95>Kitchen<span class="brand-accent" data-v-274dac95>OS</span></span></a><nav aria-label="Primary navigation" data-v-274dac95><a href="/" data-v-274dac95>Home</a><a href="/product" data-v-274dac95>Product</a><a class="active" href="/blog" data-v-274dac95>Blog</a><a href="/login" data-v-274dac95>Sign In</a></nav></header><main data-v-274dac95><section class="blog-hero" data-v-274dac95><p class="eyebrow" data-v-274dac95>The KitchenOS journal</p><h1 data-v-274dac95>Ideas for a<br data-v-274dac95><em data-v-274dac95>better service.</em></h1><p data-v-274dac95>Practical stories, restaurant insights, and fresh thinking from the people behind better operations.</p></section><section class="posts-section" aria-label="Published blog posts" data-v-274dac95>`);
			if (__props.posts.length) {
				_push(`<div class="posts-grid" data-v-274dac95><!--[-->`);
				ssrRenderList(__props.posts, (post) => {
					_push(`<article class="post-card" data-v-274dac95><div class="post-image" data-v-274dac95>`);
					if (post.featured_image) _push(`<img${ssrRenderAttr("src", post.featured_image)}${ssrRenderAttr("alt", post.title)} data-v-274dac95>`);
					else _push(`<span data-v-274dac95>K</span>`);
					_push(`</div><div class="post-body" data-v-274dac95><div class="post-meta" data-v-274dac95><span data-v-274dac95>${ssrInterpolate(post.categories?.[0]?.name || "Restaurant operations")}</span><time${ssrRenderAttr("datetime", post.published_at)} data-v-274dac95>${ssrInterpolate(formatDate(post.published_at))}</time></div><h2 data-v-274dac95>${ssrInterpolate(post.title)}</h2><p data-v-274dac95>${ssrInterpolate(post.excerpt || excerpt(post.body))}</p></div></article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="empty-state" data-v-274dac95>No published blog posts yet.</p>`);
			_push(`</section></main><footer data-v-274dac95><a href="/" data-v-274dac95>KitchenOS</a><span data-v-274dac95>Great food. Better operations.</span></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/PublicBlog.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PublicBlog_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-274dac95"]]);
//#endregion
export { PublicBlog_default as default };
