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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-home" }, _attrs))} data-v-1440d3be><header class="site-header" data-v-1440d3be><a class="brand" href="/" aria-label="KitchenOS home" data-v-1440d3be><span class="brand-mark" data-v-1440d3be>K</span><span data-v-1440d3be>Kitchen<span class="brand-accent" data-v-1440d3be>OS</span></span></a><nav class="${ssrRenderClass([{ "site-nav--open": mobileOpen.value }, "site-nav"])}" aria-label="Primary navigation" data-v-1440d3be><a href="/" data-v-1440d3be>Home</a><a href="#menu" data-v-1440d3be>Menu</a><a href="#reserve" data-v-1440d3be>Reservation</a><a href="#blog" data-v-1440d3be>Blog</a><a href="#story" data-v-1440d3be>About</a><a href="#footer" data-v-1440d3be>Contact</a></nav><div class="header-actions" data-v-1440d3be><a class="header-login" href="/login" data-v-1440d3be>Sign In</a><a class="button button--coral button--small" href="#reserve" data-v-1440d3be>Get Started <span data-v-1440d3be>↗</span></a><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle navigation" data-v-1440d3be><span data-v-1440d3be></span><span data-v-1440d3be></span><span data-v-1440d3be></span></button></div></header><main data-v-1440d3be><section class="hero section-shell" data-v-1440d3be><div class="hero-copy" data-v-1440d3be><div class="scribble" data-v-1440d3be>Good Food<br data-v-1440d3be>Better Business <span data-v-1440d3be>♡</span></div><p class="eyebrow" data-v-1440d3be><span class="eyebrow-dot" data-v-1440d3be></span> Restaurant operations, beautifully connected</p><h1 data-v-1440d3be>Delicious Food<br data-v-1440d3be><em data-v-1440d3be>Smarter Operations</em></h1><p class="hero-text" data-v-1440d3be> KitchenOS helps restaurants manage orders, kitchen, inventory, staff, finance, and guest experiences — so you can focus on serving great food. </p><div class="hero-actions" data-v-1440d3be><a class="button button--coral" href="#reserve" data-v-1440d3be>Book a Table</a><a class="button button--outline" href="#story" data-v-1440d3be><span class="play" data-v-1440d3be>▶</span> Watch Video</a></div><div class="hero-stats" aria-label="KitchenOS highlights" data-v-1440d3be><div data-v-1440d3be><strong data-v-1440d3be>500+</strong><span data-v-1440d3be>Restaurants</span></div><div data-v-1440d3be><strong data-v-1440d3be>50K+</strong><span data-v-1440d3be>Happy Customers</span></div><div data-v-1440d3be><strong data-v-1440d3be>99.9%</strong><span data-v-1440d3be>Uptime</span></div><div data-v-1440d3be><strong data-v-1440d3be>24/7</strong><span data-v-1440d3be>Support</span></div></div></div><div class="hero-visual" data-v-1440d3be><div class="leaf leaf--1" data-v-1440d3be>✦</div><div class="leaf leaf--2" data-v-1440d3be>✦</div><div class="hero-photo-wrap" data-v-1440d3be><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=1200&amp;q=88" alt="Fresh plated restaurant food" data-v-1440d3be></div><div class="fresh-badge" data-v-1440d3be><small data-v-1440d3be>FRESH FOOD</small><strong data-v-1440d3be>Everyday</strong><span data-v-1440d3be>✦</span></div><div class="hero-note" data-v-1440d3be>Great Food<br data-v-1440d3be><strong data-v-1440d3be>Happier People</strong> <span data-v-1440d3be>↗</span></div></div></section><section class="feature-ribbon section-shell" aria-label="KitchenOS capabilities" data-v-1440d3be><!--[-->`);
			ssrRenderList(ribbonFeatures, (feature, index) => {
				_push(`<div class="ribbon-item" data-v-1440d3be><div class="${ssrRenderClass([feature.tone, "ribbon-icon"])}" data-v-1440d3be><span data-v-1440d3be>${ssrInterpolate(feature.icon)}</span></div><span data-v-1440d3be>${ssrInterpolate(feature.label)}</span>`);
				if (index < ribbonFeatures.length - 1) _push(`<i data-v-1440d3be></i>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></section><section id="story" class="experience section-shell" data-v-1440d3be><div class="experience-copy" data-v-1440d3be><p class="eyebrow" data-v-1440d3be>A complete restaurant management platform</p><h2 data-v-1440d3be>Run the restaurant.<br data-v-1440d3be><em data-v-1440d3be>Enjoy the craft.</em></h2><p class="section-lede" data-v-1440d3be> From front of house to back of house, KitchenOS brings everything together in one connected platform. </p><div class="check-list" data-v-1440d3be><div data-v-1440d3be><span data-v-1440d3be>✓</span>Easy to use and quick to set up</div><div data-v-1440d3be><span data-v-1440d3be>✓</span>Works for single or multi-branch restaurants</div><div data-v-1440d3be><span data-v-1440d3be>✓</span>Built for restaurants of all sizes</div><div data-v-1440d3be><span data-v-1440d3be>✓</span>Loved by restaurant owners</div></div><div class="inline-actions" data-v-1440d3be><a class="button button--coral button--small" href="/login" data-v-1440d3be>Get Started <span data-v-1440d3be>↗</span></a><a class="text-link" href="/product" data-v-1440d3be>Learn More <span data-v-1440d3be>→</span></a></div></div><div class="experience-collage" data-v-1440d3be><div class="collage-card collage-card--wide" data-v-1440d3be><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Warm modern restaurant dining room" loading="lazy" data-v-1440d3be><span data-v-1440d3be>Great ambience <b data-v-1440d3be>↗</b></span></div><div class="collage-card collage-card--chef" data-v-1440d3be><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Chef preparing a dish" loading="lazy" data-v-1440d3be><span data-v-1440d3be>Happy chefs <b data-v-1440d3be>↙</b></span></div><div class="collage-card collage-card--dish" data-v-1440d3be><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Colorful plated dish" loading="lazy" data-v-1440d3be><span data-v-1440d3be>Memorable<br data-v-1440d3be>experiences ♥</span></div></div></section><section id="menu" class="menu-section" data-v-1440d3be><div class="section-shell" data-v-1440d3be><div class="section-heading" data-v-1440d3be><div data-v-1440d3be><p class="eyebrow" data-v-1440d3be>From the kitchen</p><h2 data-v-1440d3be>Made to be<br data-v-1440d3be><em data-v-1440d3be>remembered.</em></h2></div><p data-v-1440d3be>Browse your live menu by category. Every dish shown here comes from the KitchenOS food catalogue.</p></div><div class="category-row" role="tablist" aria-label="Food categories" data-v-1440d3be><!--[-->`);
			ssrRenderList(menuCategories.value, (category) => {
				_push(`<button class="${ssrRenderClass({ active: activeCategory.value === category.id })}" role="tab"${ssrRenderAttr("aria-selected", activeCategory.value === category.id)} data-v-1440d3be><span data-v-1440d3be>${ssrInterpolate(category.icon)}</span>${ssrInterpolate(category.name)}</button>`);
			});
			_push(`<!--]--></div><div class="food-grid" data-v-1440d3be><!--[-->`);
			ssrRenderList(filteredItems.value, (item) => {
				_push(`<article class="food-card" data-v-1440d3be><div class="food-image" data-v-1440d3be><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-1440d3be>`);
				if (item.badge) _push(`<span class="food-badge" data-v-1440d3be>${ssrInterpolate(item.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="food-info" data-v-1440d3be><div data-v-1440d3be><span class="food-category" data-v-1440d3be>${ssrInterpolate(item.food_category?.name || categoriesById(item.foodcategory_id) || "Menu item")}</span><h3 data-v-1440d3be>${ssrInterpolate(item.name)}</h3><p data-v-1440d3be>${ssrInterpolate(item.description)}</p></div><strong data-v-1440d3be>£${ssrInterpolate(item.price)}</strong></div></article>`);
			});
			_push(`<!--]--></div>`);
			if (!filteredItems.value.length) _push(`<p class="empty-state" data-v-1440d3be>No published dishes in this category yet.</p>`);
			else _push(`<!---->`);
			_push(`</div></section>`);
			if (__props.blogPosts.length) {
				_push(`<section id="blog" class="blog-section" data-v-1440d3be><div class="section-shell" data-v-1440d3be><div class="section-heading blog-heading" data-v-1440d3be><div data-v-1440d3be><p class="eyebrow" data-v-1440d3be>From the KitchenOS journal</p><h2 data-v-1440d3be>Ideas for a<br data-v-1440d3be><em data-v-1440d3be>better service.</em></h2></div><p data-v-1440d3be>Practical stories and fresh thinking from the people behind better restaurant operations.</p></div><div class="blog-grid" data-v-1440d3be><!--[-->`);
				ssrRenderList(__props.blogPosts, (post) => {
					_push(`<article class="blog-card" data-v-1440d3be><div class="blog-image" data-v-1440d3be>`);
					if (post.featured_image) _push(`<img${ssrRenderAttr("src", post.featured_image)}${ssrRenderAttr("alt", post.title)} loading="lazy" data-v-1440d3be>`);
					else _push(`<span class="blog-image-placeholder" data-v-1440d3be>K</span>`);
					_push(`</div><div class="blog-card-body" data-v-1440d3be><div class="blog-meta" data-v-1440d3be><span data-v-1440d3be>${ssrInterpolate(post.categories?.[0]?.name || "Restaurant operations")}</span><time${ssrRenderAttr("datetime", post.published_at)} data-v-1440d3be>${ssrInterpolate(formatBlogDate(post.published_at))}</time></div><h3 data-v-1440d3be>${ssrInterpolate(post.title)}</h3><p data-v-1440d3be>${ssrInterpolate(post.excerpt || post.body?.replace(/<[^>]*>/g, "").slice(0, 150))}</p></div></article>`);
				});
				_push(`<!--]--></div></div></section>`);
			} else _push(`<!---->`);
			_push(`<section id="reserve" class="reserve-wrap" data-v-1440d3be><div class="reserve-section section-shell" data-v-1440d3be><div class="reserve-copy" data-v-1440d3be><p class="eyebrow" data-v-1440d3be>Reservations</p><h2 data-v-1440d3be>Reserve Your<br data-v-1440d3be><em data-v-1440d3be>Table</em></h2><p data-v-1440d3be>Great food brings people together. Book your table and enjoy an amazing experience.</p><div class="reservation-note" data-v-1440d3be><strong data-v-1440d3be>Dining made easy.</strong><span data-v-1440d3be>Tables stay held for 15 minutes.</span></div><div class="reservation-doodles" aria-hidden="true" data-v-1440d3be>❀ <span data-v-1440d3be>see you at the table</span> ♥</div></div><form class="reserve-form" data-v-1440d3be><div class="form-head" data-v-1440d3be><div data-v-1440d3be><span data-v-1440d3be>New reservation</span><h3 data-v-1440d3be>Reservation details</h3></div><span class="pending-chip" data-v-1440d3be>Pending confirmation</span></div>`);
			if (reservationSent.value) _push(`<div class="reservation-success" role="status" data-v-1440d3be><div class="success-icon" data-v-1440d3be>✓</div><div data-v-1440d3be><strong data-v-1440d3be>Request received.</strong><p data-v-1440d3be>We will be in touch shortly to confirm your table.</p></div></div>`);
			else {
				_push(`<!--[--><div class="field-block" data-v-1440d3be><label class="form-label" data-v-1440d3be>Choose your table</label><div class="table-grid" data-v-1440d3be><!--[-->`);
				ssrRenderList(tables.value, (table) => {
					_push(`<button type="button" class="${ssrRenderClass([{
						selected: unref(reservation).dining_table_id === table.id,
						unavailable: !isTableSuitable(table)
					}, "table-option"])}"${ssrIncludeBooleanAttr(!isTableSuitable(table)) ? " disabled" : ""} data-v-1440d3be><strong data-v-1440d3be>${ssrInterpolate(table.table_number)}</strong><span data-v-1440d3be>${ssrInterpolate(table.capacity)} seats</span><small data-v-1440d3be>${ssrInterpolate(table.status === "available" ? "Available" : "Unavailable")}</small></button>`);
				});
				_push(`<!--]--></div>`);
				if (!tables.value.length) _push(`<p class="table-note" data-v-1440d3be>No tables are currently configured.</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-row" data-v-1440d3be><label data-v-1440d3be>Date<input${ssrRenderAttr("value", unref(reservation).date)} type="date" required data-v-1440d3be></label><label data-v-1440d3be>Time<select data-v-1440d3be><!--[-->`);
				ssrRenderList(times, (time) => {
					_push(`<option data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).time) ? ssrLooseContain(unref(reservation).time, null) : ssrLooseEqual(unref(reservation).time, null)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
				});
				_push(`<!--]--></select></label></div><div class="form-row" data-v-1440d3be><label data-v-1440d3be>Party size<select data-v-1440d3be><!--[-->`);
				ssrRenderList(8, (number) => {
					_push(`<option${ssrRenderAttr("value", number)} data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).guests) ? ssrLooseContain(unref(reservation).guests, number) : ssrLooseEqual(unref(reservation).guests, number)) ? " selected" : ""}>${ssrInterpolate(number)} ${ssrInterpolate(number === 1 ? "guest" : "guests")}</option>`);
				});
				_push(`<!--]--></select></label><label data-v-1440d3be>Duration<select data-v-1440d3be><option${ssrRenderAttr("value", 60)} data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 60) : ssrLooseEqual(unref(reservation).duration_minutes, 60)) ? " selected" : ""}>60 min</option><option${ssrRenderAttr("value", 90)} data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 90) : ssrLooseEqual(unref(reservation).duration_minutes, 90)) ? " selected" : ""}>90 min</option><option${ssrRenderAttr("value", 120)} data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 120) : ssrLooseEqual(unref(reservation).duration_minutes, 120)) ? " selected" : ""}>120 min</option><option${ssrRenderAttr("value", 180)} data-v-1440d3be${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 180) : ssrLooseEqual(unref(reservation).duration_minutes, 180)) ? " selected" : ""}>180 min</option></select></label></div><div class="form-row" data-v-1440d3be><label data-v-1440d3be>Your name<input${ssrRenderAttr("value", unref(reservation).guest_name)} type="text" placeholder="Alex Morgan" required data-v-1440d3be></label><label data-v-1440d3be>Email<input${ssrRenderAttr("value", unref(reservation).guest_email)} type="email" placeholder="alex@example.com" required data-v-1440d3be></label></div><div class="form-row" data-v-1440d3be><label data-v-1440d3be>Phone<input${ssrRenderAttr("value", unref(reservation).guest_phone)} type="tel" placeholder="+44 7000 000000" data-v-1440d3be></label><label data-v-1440d3be>Occasion<input${ssrRenderAttr("value", unref(reservation).occasion)} type="text" placeholder="Birthday, anniversary..." data-v-1440d3be></label></div><label class="notes-field" data-v-1440d3be>Notes<textarea rows="3" placeholder="Allergies, accessibility, or other requests" data-v-1440d3be>${ssrInterpolate(unref(reservation).notes)}</textarea></label><button class="button button--coral submit-button" type="submit"${ssrIncludeBooleanAttr(unref(reservation).processing || !unref(reservation).dining_table_id) ? " disabled" : ""} data-v-1440d3be>${ssrInterpolate(unref(reservation).processing ? "Sending request…" : "Request a table")} <span data-v-1440d3be>→</span></button>`);
				if (Object.keys(unref(reservation).errors).length) _push(`<p class="reservation-error" data-v-1440d3be>Please check the booking details and try again.</p>`);
				else _push(`<!---->`);
				_push(`<small class="form-footnote" data-v-1440d3be>For tonight, please call <a href="tel:+441234567890" data-v-1440d3be>01234 567 890</a>.</small><!--]-->`);
			}
			_push(`</form></div></section></main><footer id="footer" class="site-footer" data-v-1440d3be><div class="section-shell footer-grid" data-v-1440d3be><div data-v-1440d3be><a class="brand" href="/" data-v-1440d3be><span class="brand-mark" data-v-1440d3be>K</span><span data-v-1440d3be>Kitchen<span class="brand-accent" data-v-1440d3be>OS</span></span></a><p data-v-1440d3be>Great food. Better operations.</p></div><nav aria-label="Footer navigation" data-v-1440d3be><a href="#menu" data-v-1440d3be>Menu</a><a href="#reserve" data-v-1440d3be>Reservations</a><a href="/product" data-v-1440d3be>Product</a><a href="#story" data-v-1440d3be>About</a></nav><div class="footer-cta" data-v-1440d3be><span data-v-1440d3be>Ready to run service better?</span><a href="/login" data-v-1440d3be>Enter KitchenOS ↗</a></div></div></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-1440d3be"]]);
//#endregion
export { HomePage_default as default };
