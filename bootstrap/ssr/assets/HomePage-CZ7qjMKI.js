import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { computed, mergeProps, ref, unref, useSSRContext, watch } from "vue";
import { useForm } from "@inertiajs/vue3";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region resources/js/pages/HomePage.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: null }, {
	__name: "HomePage",
	__ssrInlineRender: true,
	props: {
		categories: {
			type: Array,
			default: () => []
		},
		foodItems: {
			type: Array,
			default: () => []
		},
		tables: {
			type: Array,
			default: () => []
		},
		blogPosts: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const mobileOpen = ref(false);
		const ribbonFeatures = [
			{
				label: "POS & Orders",
				icon: "▣",
				tone: "pink"
			},
			{
				label: "Kitchen Display",
				icon: "◫",
				tone: "orange"
			},
			{
				label: "Inventory",
				icon: "▦",
				tone: "green"
			},
			{
				label: "Staff Management",
				icon: "♙",
				tone: "blue"
			},
			{
				label: "Reservations",
				icon: "⌑",
				tone: "violet"
			},
			{
				label: "QR Menu",
				icon: "⌁",
				tone: "rose"
			},
			{
				label: "Reports",
				icon: "◒",
				tone: "gold"
			}
		];
		const categoriesById = (id) => props.categories.find((category) => category.id === id)?.name;
		const formatBlogDate = (value) => value ? new Intl.DateTimeFormat("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric"
		}).format(new Date(value)) : "";
		const menuCategories = computed(() => [{
			id: "all",
			name: "All dishes",
			icon: "✦"
		}, ...props.categories.map((category) => ({
			id: category.id,
			name: category.name,
			icon: "✦"
		}))]);
		const activeCategory = ref("all");
		const filteredItems = computed(() => activeCategory.value === "all" ? props.foodItems : props.foodItems.filter((item) => item.foodcategory_id === activeCategory.value));
		const times = [
			"12:30",
			"13:00",
			"18:00",
			"18:30",
			"19:00",
			"19:30",
			"20:00",
			"20:30"
		];
		const tables = computed(() => props.tables);
		const reservation = useForm({
			date: "",
			time: "19:00",
			guests: 2,
			duration_minutes: 90,
			dining_table_id: null,
			guest_name: "",
			guest_phone: "",
			guest_email: "",
			occasion: "",
			notes: ""
		});
		const isTableSuitable = (table) => table.status === "available" && table.capacity >= Number(reservation.guests);
		watch(() => reservation.guests, () => {
			const selectedTable = tables.value.find((table) => table.id === reservation.dining_table_id);
			if (selectedTable && !isTableSuitable(selectedTable)) reservation.dining_table_id = null;
		});
		const reservationSent = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-home" }, _attrs))} data-v-c863cda7><header class="site-header" data-v-c863cda7><a class="brand" href="/" aria-label="KitchenOS home" data-v-c863cda7><span class="brand-mark" data-v-c863cda7>K</span><span data-v-c863cda7>Kitchen<span class="brand-accent" data-v-c863cda7>OS</span></span></a><nav class="${ssrRenderClass([{ "site-nav--open": mobileOpen.value }, "site-nav"])}" aria-label="Primary navigation" data-v-c863cda7><a href="/" data-v-c863cda7>Home</a><a href="#menu" data-v-c863cda7>Menu</a><a href="#reserve" data-v-c863cda7>Reservation</a><a href="#blog" data-v-c863cda7>Blog</a><a href="#story" data-v-c863cda7>About</a><a href="#footer" data-v-c863cda7>Contact</a></nav><div class="header-actions" data-v-c863cda7><a class="header-login" href="/login" data-v-c863cda7>Sign In</a><a class="button button--coral button--small" href="#reserve" data-v-c863cda7>Get Started <span data-v-c863cda7>↗</span></a><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle navigation" data-v-c863cda7><span data-v-c863cda7></span><span data-v-c863cda7></span><span data-v-c863cda7></span></button></div></header><main data-v-c863cda7><section class="hero section-shell" data-v-c863cda7><div class="hero-copy" data-v-c863cda7><div class="scribble" data-v-c863cda7>Good Food<br data-v-c863cda7>Better Business <span data-v-c863cda7>♡</span></div><p class="eyebrow" data-v-c863cda7><span class="eyebrow-dot" data-v-c863cda7></span> Restaurant operations, beautifully connected</p><h1 data-v-c863cda7>Delicious Food<br data-v-c863cda7><em data-v-c863cda7>Smarter Operations</em></h1><p class="hero-text" data-v-c863cda7> KitchenOS helps restaurants manage orders, kitchen, inventory, staff, finance, and guest experiences — so you can focus on serving great food. </p><div class="hero-actions" data-v-c863cda7><a class="button button--coral" href="#reserve" data-v-c863cda7>Book a Table</a><a class="button button--outline" href="#story" data-v-c863cda7><span class="play" data-v-c863cda7>▶</span> Watch Video</a></div><div class="hero-stats" aria-label="KitchenOS highlights" data-v-c863cda7><div data-v-c863cda7><strong data-v-c863cda7>500+</strong><span data-v-c863cda7>Restaurants</span></div><div data-v-c863cda7><strong data-v-c863cda7>50K+</strong><span data-v-c863cda7>Happy Customers</span></div><div data-v-c863cda7><strong data-v-c863cda7>99.9%</strong><span data-v-c863cda7>Uptime</span></div><div data-v-c863cda7><strong data-v-c863cda7>24/7</strong><span data-v-c863cda7>Support</span></div></div></div><div class="hero-visual" data-v-c863cda7><div class="leaf leaf--1" data-v-c863cda7>✦</div><div class="leaf leaf--2" data-v-c863cda7>✦</div><div class="hero-photo-wrap" data-v-c863cda7><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=1200&amp;q=88" alt="Fresh plated restaurant food" data-v-c863cda7></div><div class="fresh-badge" data-v-c863cda7><small data-v-c863cda7>FRESH FOOD</small><strong data-v-c863cda7>Everyday</strong><span data-v-c863cda7>✦</span></div><div class="hero-note" data-v-c863cda7>Great Food<br data-v-c863cda7><strong data-v-c863cda7>Happier People</strong> <span data-v-c863cda7>↗</span></div></div></section><section class="feature-ribbon section-shell" aria-label="KitchenOS capabilities" data-v-c863cda7><!--[-->`);
			ssrRenderList(ribbonFeatures, (feature, index) => {
				_push(`<div class="ribbon-item" data-v-c863cda7><div class="${ssrRenderClass([feature.tone, "ribbon-icon"])}" data-v-c863cda7><span data-v-c863cda7>${ssrInterpolate(feature.icon)}</span></div><span data-v-c863cda7>${ssrInterpolate(feature.label)}</span>`);
				if (index < ribbonFeatures.length - 1) _push(`<i data-v-c863cda7></i>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></section><section id="story" class="experience section-shell" data-v-c863cda7><div class="experience-copy" data-v-c863cda7><p class="eyebrow" data-v-c863cda7>A complete restaurant management platform</p><h2 data-v-c863cda7>Run the restaurant.<br data-v-c863cda7><em data-v-c863cda7>Enjoy the craft.</em></h2><p class="section-lede" data-v-c863cda7> From front of house to back of house, KitchenOS brings everything together in one connected platform. </p><div class="check-list" data-v-c863cda7><div data-v-c863cda7><span data-v-c863cda7>✓</span>Easy to use and quick to set up</div><div data-v-c863cda7><span data-v-c863cda7>✓</span>Works for single or multi-branch restaurants</div><div data-v-c863cda7><span data-v-c863cda7>✓</span>Built for restaurants of all sizes</div><div data-v-c863cda7><span data-v-c863cda7>✓</span>Loved by restaurant owners</div></div><div class="inline-actions" data-v-c863cda7><a class="button button--coral button--small" href="/login" data-v-c863cda7>Get Started <span data-v-c863cda7>↗</span></a><a class="text-link" href="/product" data-v-c863cda7>Learn More <span data-v-c863cda7>→</span></a></div></div><div class="experience-collage" data-v-c863cda7><div class="collage-card collage-card--wide" data-v-c863cda7><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Warm modern restaurant dining room" loading="lazy" data-v-c863cda7><span data-v-c863cda7>Great ambience <b data-v-c863cda7>↗</b></span></div><div class="collage-card collage-card--chef" data-v-c863cda7><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Chef preparing a dish" loading="lazy" data-v-c863cda7><span data-v-c863cda7>Happy chefs <b data-v-c863cda7>↙</b></span></div><div class="collage-card collage-card--dish" data-v-c863cda7><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Colorful plated dish" loading="lazy" data-v-c863cda7><span data-v-c863cda7>Memorable<br data-v-c863cda7>experiences ♥</span></div></div></section><section id="menu" class="menu-section" data-v-c863cda7><div class="section-shell" data-v-c863cda7><div class="section-heading" data-v-c863cda7><div data-v-c863cda7><p class="eyebrow" data-v-c863cda7>From the kitchen</p><h2 data-v-c863cda7>Made to be<br data-v-c863cda7><em data-v-c863cda7>remembered.</em></h2></div><p data-v-c863cda7>Browse your live menu by category. Every dish shown here comes from the KitchenOS food catalogue.</p></div><div class="category-row" role="tablist" aria-label="Food categories" data-v-c863cda7><!--[-->`);
			ssrRenderList(menuCategories.value, (category) => {
				_push(`<button class="${ssrRenderClass({ active: activeCategory.value === category.id })}" role="tab"${ssrRenderAttr("aria-selected", activeCategory.value === category.id)} data-v-c863cda7><span data-v-c863cda7>${ssrInterpolate(category.icon)}</span>${ssrInterpolate(category.name)}</button>`);
			});
			_push(`<!--]--></div><div class="food-grid" data-v-c863cda7><!--[-->`);
			ssrRenderList(filteredItems.value, (item) => {
				_push(`<article class="food-card" data-v-c863cda7><div class="food-image" data-v-c863cda7><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-c863cda7>`);
				if (item.badge) _push(`<span class="food-badge" data-v-c863cda7>${ssrInterpolate(item.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="food-info" data-v-c863cda7><div data-v-c863cda7><span class="food-category" data-v-c863cda7>${ssrInterpolate(item.food_category?.name || categoriesById(item.foodcategory_id) || "Menu item")}</span><h3 data-v-c863cda7>${ssrInterpolate(item.name)}</h3><p data-v-c863cda7>${ssrInterpolate(item.description)}</p></div><strong data-v-c863cda7>£${ssrInterpolate(item.price)}</strong></div></article>`);
			});
			_push(`<!--]--></div>`);
			if (!filteredItems.value.length) _push(`<p class="empty-state" data-v-c863cda7>No published dishes in this category yet.</p>`);
			else _push(`<!---->`);
			_push(`</div></section>`);
			if (__props.blogPosts.length) {
				_push(`<section id="blog" class="blog-section" data-v-c863cda7><div class="section-shell" data-v-c863cda7><div class="section-heading blog-heading" data-v-c863cda7><div data-v-c863cda7><p class="eyebrow" data-v-c863cda7>From the KitchenOS journal</p><h2 data-v-c863cda7>Ideas for a<br data-v-c863cda7><em data-v-c863cda7>better service.</em></h2></div><p data-v-c863cda7>Practical stories and fresh thinking from the people behind better restaurant operations.</p></div><div class="blog-grid" data-v-c863cda7><!--[-->`);
				ssrRenderList(__props.blogPosts, (post) => {
					_push(`<a class="blog-card"${ssrRenderAttr("href", `/blog/${post.slug}`)} data-v-c863cda7><div class="blog-image" data-v-c863cda7>`);
					if (post.featured_image) _push(`<img${ssrRenderAttr("src", post.featured_image)}${ssrRenderAttr("alt", post.title)} loading="lazy" data-v-c863cda7>`);
					else _push(`<span class="blog-image-placeholder" data-v-c863cda7>K</span>`);
					_push(`</div><div class="blog-card-body" data-v-c863cda7><div class="blog-meta" data-v-c863cda7><span data-v-c863cda7>${ssrInterpolate(post.categories?.[0]?.name || "Restaurant operations")}</span><time${ssrRenderAttr("datetime", post.published_at)} data-v-c863cda7>${ssrInterpolate(formatBlogDate(post.published_at))}</time></div><h3 data-v-c863cda7>${ssrInterpolate(post.title)}</h3><p data-v-c863cda7>${ssrInterpolate(post.excerpt || post.body?.replace(/<[^>]*>/g, "").slice(0, 150))}</p></div></a>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`<section id="reserve" class="reserve-wrap" data-v-c863cda7><div class="reserve-section section-shell" data-v-c863cda7><div class="reserve-copy" data-v-c863cda7><p class="eyebrow" data-v-c863cda7>Reservations</p><h2 data-v-c863cda7>Reserve Your<br data-v-c863cda7><em data-v-c863cda7>Table</em></h2><p data-v-c863cda7>Great food brings people together. Book your table and enjoy an amazing experience.</p><div class="reservation-note" data-v-c863cda7><strong data-v-c863cda7>Dining made easy.</strong><span data-v-c863cda7>Tables stay held for 15 minutes.</span></div><div class="reservation-doodles" aria-hidden="true" data-v-c863cda7>❀ <span data-v-c863cda7>see you at the table</span> ♥</div></div><form class="reserve-form" data-v-c863cda7><div class="form-head" data-v-c863cda7><div data-v-c863cda7><span data-v-c863cda7>New reservation</span><h3 data-v-c863cda7>Reservation details</h3></div><span class="pending-chip" data-v-c863cda7>Pending confirmation</span></div>`);
			if (reservationSent.value) _push(`<div class="reservation-success" role="status" data-v-c863cda7><div class="success-icon" data-v-c863cda7>✓</div><div data-v-c863cda7><strong data-v-c863cda7>Request received.</strong><p data-v-c863cda7>We will be in touch shortly to confirm your table.</p></div></div>`);
			else {
				_push(`<!--[--><div class="field-block" data-v-c863cda7><label class="form-label" data-v-c863cda7>Choose your table</label><div class="table-grid" data-v-c863cda7><!--[-->`);
				ssrRenderList(tables.value, (table) => {
					_push(`<button type="button" class="${ssrRenderClass([{
						selected: unref(reservation).dining_table_id === table.id,
						unavailable: !isTableSuitable(table)
					}, "table-option"])}"${ssrIncludeBooleanAttr(!isTableSuitable(table)) ? " disabled" : ""} data-v-c863cda7><strong data-v-c863cda7>${ssrInterpolate(table.table_number)}</strong><span data-v-c863cda7>${ssrInterpolate(table.capacity)} seats</span><small data-v-c863cda7>${ssrInterpolate(table.status === "available" ? "Available" : "Unavailable")}</small></button>`);
				});
				_push(`<!--]--></div>`);
				if (!tables.value.length) _push(`<p class="table-note" data-v-c863cda7>No tables are currently configured.</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-row" data-v-c863cda7><label data-v-c863cda7>Date<input${ssrRenderAttr("value", unref(reservation).date)} type="date" required data-v-c863cda7></label><label data-v-c863cda7>Time<select data-v-c863cda7><!--[-->`);
				ssrRenderList(times, (time) => {
					_push(`<option data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).time) ? ssrLooseContain(unref(reservation).time, null) : ssrLooseEqual(unref(reservation).time, null)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
				});
				_push(`<!--]--></select></label></div><div class="form-row" data-v-c863cda7><label data-v-c863cda7>Party size<select data-v-c863cda7><!--[-->`);
				ssrRenderList(8, (number) => {
					_push(`<option${ssrRenderAttr("value", number)} data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).guests) ? ssrLooseContain(unref(reservation).guests, number) : ssrLooseEqual(unref(reservation).guests, number)) ? " selected" : ""}>${ssrInterpolate(number)} ${ssrInterpolate(number === 1 ? "guest" : "guests")}</option>`);
				});
				_push(`<!--]--></select></label><label data-v-c863cda7>Duration<select data-v-c863cda7><option${ssrRenderAttr("value", 60)} data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 60) : ssrLooseEqual(unref(reservation).duration_minutes, 60)) ? " selected" : ""}>60 min</option><option${ssrRenderAttr("value", 90)} data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 90) : ssrLooseEqual(unref(reservation).duration_minutes, 90)) ? " selected" : ""}>90 min</option><option${ssrRenderAttr("value", 120)} data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 120) : ssrLooseEqual(unref(reservation).duration_minutes, 120)) ? " selected" : ""}>120 min</option><option${ssrRenderAttr("value", 180)} data-v-c863cda7${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 180) : ssrLooseEqual(unref(reservation).duration_minutes, 180)) ? " selected" : ""}>180 min</option></select></label></div><div class="form-row" data-v-c863cda7><label data-v-c863cda7>Your name<input${ssrRenderAttr("value", unref(reservation).guest_name)} type="text" placeholder="Alex Morgan" required data-v-c863cda7></label><label data-v-c863cda7>Email<input${ssrRenderAttr("value", unref(reservation).guest_email)} type="email" placeholder="alex@example.com" required data-v-c863cda7></label></div><div class="form-row" data-v-c863cda7><label data-v-c863cda7>Phone<input${ssrRenderAttr("value", unref(reservation).guest_phone)} type="tel" placeholder="+44 7000 000000" data-v-c863cda7></label><label data-v-c863cda7>Occasion<input${ssrRenderAttr("value", unref(reservation).occasion)} type="text" placeholder="Birthday, anniversary..." data-v-c863cda7></label></div><label class="notes-field" data-v-c863cda7>Notes<textarea rows="3" placeholder="Allergies, accessibility, or other requests" data-v-c863cda7>${ssrInterpolate(unref(reservation).notes)}</textarea></label><button class="button button--coral submit-button" type="submit"${ssrIncludeBooleanAttr(unref(reservation).processing || !unref(reservation).dining_table_id) ? " disabled" : ""} data-v-c863cda7>${ssrInterpolate(unref(reservation).processing ? "Sending request…" : "Request a table")} <span data-v-c863cda7>→</span></button>`);
				if (Object.keys(unref(reservation).errors).length) _push(`<p class="reservation-error" data-v-c863cda7>Please check the booking details and try again.</p>`);
				else _push(`<!---->`);
				_push(`<small class="form-footnote" data-v-c863cda7>For tonight, please call <a href="tel:+441234567890" data-v-c863cda7>01234 567 890</a>.</small><!--]-->`);
			}
			_push(`</form></div></section></main><footer id="footer" class="site-footer" data-v-c863cda7><div class="section-shell footer-grid" data-v-c863cda7><div data-v-c863cda7><a class="brand" href="/" data-v-c863cda7><span class="brand-mark" data-v-c863cda7>K</span><span data-v-c863cda7>Kitchen<span class="brand-accent" data-v-c863cda7>OS</span></span></a><p data-v-c863cda7>Great food. Better operations.</p></div><nav aria-label="Footer navigation" data-v-c863cda7><a href="#menu" data-v-c863cda7>Menu</a><a href="#reserve" data-v-c863cda7>Reservations</a><a href="/product" data-v-c863cda7>Product</a><a href="#story" data-v-c863cda7>About</a></nav><div class="footer-cta" data-v-c863cda7><span data-v-c863cda7>Ready to run service better?</span><a href="/login" data-v-c863cda7>Enter KitchenOS ↗</a></div></div></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-c863cda7"]]);
//#endregion
export { HomePage_default as default };
