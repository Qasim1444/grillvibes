import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region resources/js/pages/PublicBlogPost.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: null }, {
	__name: "PublicBlogPost",
	__ssrInlineRender: true,
	props: {
		post: {
			type: Object,
			required: true
		},
		recentPosts: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const formatDate = (value) => value ? new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric"
		}).format(new Date(value)) : "";
		const readingMinutes = (value) => Math.max(1, Math.ceil((value || "").replace(/<[^>]*>/g, "").trim().split(/\s+/).filter(Boolean).length / 200));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "public-blog-post" }, _attrs))} data-v-202acac7><header class="blog-header" data-v-202acac7><a class="brand" href="/" aria-label="KitchenOS home" data-v-202acac7><span class="brand-mark" data-v-202acac7>K</span><span data-v-202acac7>Kitchen<span class="brand-accent" data-v-202acac7>OS</span></span></a><nav aria-label="Primary navigation" data-v-202acac7><a href="/" data-v-202acac7>Home</a><a href="/product" data-v-202acac7>Product</a><a class="active" href="/blog" data-v-202acac7>Blog</a><a href="/login" data-v-202acac7>Sign In</a></nav></header><main class="blog-layout" data-v-202acac7><div class="content-column" data-v-202acac7><a class="back-link" href="/blog" data-v-202acac7>← Back to all articles</a><article class="article" data-v-202acac7><div class="article-hero" data-v-202acac7><div class="article-meta" data-v-202acac7><span class="category-pill" data-v-202acac7>${ssrInterpolate(__props.post.categories?.[0]?.name || "Restaurant operations")}</span><time${ssrRenderAttr("datetime", __props.post.published_at)} data-v-202acac7>${ssrInterpolate(formatDate(__props.post.published_at))}</time><span data-v-202acac7>${ssrInterpolate(readingMinutes(__props.post.body))} min read</span></div><h1 data-v-202acac7>${ssrInterpolate(__props.post.title)}</h1>`);
			if (__props.post.excerpt) _push(`<p class="article-lede" data-v-202acac7>${ssrInterpolate(__props.post.excerpt)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="article-toolbar" data-v-202acac7>`);
			if (__props.post.author) _push(`<div class="author-chip" data-v-202acac7><span class="author-avatar" data-v-202acac7>${ssrInterpolate(__props.post.author.name.charAt(0).toUpperCase())}</span><div data-v-202acac7><small data-v-202acac7>Written by</small><strong data-v-202acac7>${ssrInterpolate(__props.post.author.name)}</strong></div></div>`);
			else _push(`<!---->`);
			_push(`<div class="meta-badges" data-v-202acac7><span data-v-202acac7>Fresh insights</span><span data-v-202acac7>KitchenOS</span></div></div>`);
			if (__props.post.featured_image) _push(`<img class="article-image"${ssrRenderAttr("src", __props.post.featured_image)}${ssrRenderAttr("alt", __props.post.title)} data-v-202acac7>`);
			else _push(`<!---->`);
			_push(`<div class="article-body" data-v-202acac7>${__props.post.body ?? ""}</div>`);
			if (__props.post.tags?.length) {
				_push(`<div class="article-tags" aria-label="Article tags" data-v-202acac7><!--[-->`);
				ssrRenderList(__props.post.tags, (tag) => {
					_push(`<span data-v-202acac7>#${ssrInterpolate(tag.name)}</span>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<div class="article-footer" data-v-202acac7>`);
			if (__props.post.author) _push(`<p class="article-author" data-v-202acac7>${ssrInterpolate(__props.post.author.name)} shares practical ideas for better restaurant operations.</p>`);
			else _push(`<!---->`);
			_push(`</div></article></div>`);
			if (__props.recentPosts.length || __props.post.tags?.length) {
				_push(`<aside class="sidebar-column" data-v-202acac7><div class="sidebar-card" data-v-202acac7><p class="eyebrow" data-v-202acac7>Recent articles</p><div class="recent-posts" data-v-202acac7><!--[-->`);
				ssrRenderList(__props.recentPosts, (recentPost) => {
					_push(`<a${ssrRenderAttr("href", `/blog/${recentPost.slug}`)} data-v-202acac7><span class="recent-date" data-v-202acac7>${ssrInterpolate(formatDate(recentPost.published_at))}</span><strong data-v-202acac7>${ssrInterpolate(recentPost.title)}</strong></a>`);
				});
				_push(`<!--]--></div></div>`);
				if (__props.post.tags?.length) {
					_push(`<div class="sidebar-card" data-v-202acac7><p class="eyebrow" data-v-202acac7>Explore topics</p><div class="topic-list" data-v-202acac7><!--[-->`);
					ssrRenderList(__props.post.tags, (tag) => {
						_push(`<a${ssrRenderAttr("href", `/blog?tag=${tag.slug}`)} data-v-202acac7>${ssrInterpolate(tag.name)}</a>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</aside>`);
			} else _push(`<!---->`);
			_push(`</main><footer data-v-202acac7><a href="/" data-v-202acac7>KitchenOS</a><span data-v-202acac7>Great food. Better operations.</span></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/PublicBlogPost.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PublicBlogPost_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-202acac7"]]);
//#endregion
export { PublicBlogPost_default as default };
