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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-home" }, _attrs))} data-v-a535ef67><header class="site-header" data-v-a535ef67><a class="brand" href="/" aria-label="KitchenOS home" data-v-a535ef67><span class="brand-mark" data-v-a535ef67>K</span><span data-v-a535ef67>Kitchen<span class="brand-accent" data-v-a535ef67>OS</span></span></a><nav class="${ssrRenderClass([{ "site-nav--open": mobileOpen.value }, "site-nav"])}" aria-label="Primary navigation" data-v-a535ef67><a href="/" data-v-a535ef67>Home</a><a href="#menu" data-v-a535ef67>Menu</a><a href="#reserve" data-v-a535ef67>Reservation</a><a href="/blog" data-v-a535ef67>Blog</a><a href="#story" data-v-a535ef67>About</a><a href="#footer" data-v-a535ef67>Contact</a></nav><div class="header-actions" data-v-a535ef67><a class="header-login" href="/login" data-v-a535ef67>Sign In</a><a class="button button--coral button--small" href="#reserve" data-v-a535ef67>Get Started <span data-v-a535ef67>↗</span></a><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle navigation" data-v-a535ef67><span data-v-a535ef67></span><span data-v-a535ef67></span><span data-v-a535ef67></span></button></div></header><main data-v-a535ef67><section class="hero section-shell" data-v-a535ef67><div class="hero-copy" data-v-a535ef67><div class="scribble" data-v-a535ef67>Good Food<br data-v-a535ef67>Better Business <span data-v-a535ef67>♡</span></div><p class="eyebrow" data-v-a535ef67><span class="eyebrow-dot" data-v-a535ef67></span> Restaurant operations, beautifully connected</p><h1 data-v-a535ef67>Delicious Food<br data-v-a535ef67><em data-v-a535ef67>Smarter Operations</em></h1><p class="hero-text" data-v-a535ef67> KitchenOS helps restaurants manage orders, kitchen, inventory, staff, finance, and guest experiences — so you can focus on serving great food. </p><div class="hero-actions" data-v-a535ef67><a class="button button--coral" href="#reserve" data-v-a535ef67>Book a Table</a><a class="button button--outline" href="#story" data-v-a535ef67><span class="play" data-v-a535ef67>▶</span> Watch Video</a></div><div class="hero-stats" aria-label="KitchenOS highlights" data-v-a535ef67><div data-v-a535ef67><strong data-v-a535ef67>500+</strong><span data-v-a535ef67>Restaurants</span></div><div data-v-a535ef67><strong data-v-a535ef67>50K+</strong><span data-v-a535ef67>Happy Customers</span></div><div data-v-a535ef67><strong data-v-a535ef67>99.9%</strong><span data-v-a535ef67>Uptime</span></div><div data-v-a535ef67><strong data-v-a535ef67>24/7</strong><span data-v-a535ef67>Support</span></div></div></div><div class="hero-visual" data-v-a535ef67><div class="leaf leaf--1" data-v-a535ef67>✦</div><div class="leaf leaf--2" data-v-a535ef67>✦</div><div class="hero-photo-wrap" data-v-a535ef67><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=1200&amp;q=88" alt="Fresh plated restaurant food" data-v-a535ef67></div><div class="fresh-badge" data-v-a535ef67><small data-v-a535ef67>FRESH FOOD</small><strong data-v-a535ef67>Everyday</strong><span data-v-a535ef67>✦</span></div><div class="hero-note" data-v-a535ef67>Great Food<br data-v-a535ef67><strong data-v-a535ef67>Happier People</strong> <span data-v-a535ef67>↗</span></div></div></section><section class="feature-ribbon section-shell" aria-label="KitchenOS capabilities" data-v-a535ef67><!--[-->`);
			ssrRenderList(ribbonFeatures, (feature, index) => {
				_push(`<div class="ribbon-item" data-v-a535ef67><div class="${ssrRenderClass([feature.tone, "ribbon-icon"])}" data-v-a535ef67><span data-v-a535ef67>${ssrInterpolate(feature.icon)}</span></div><span data-v-a535ef67>${ssrInterpolate(feature.label)}</span>`);
				if (index < ribbonFeatures.length - 1) _push(`<i data-v-a535ef67></i>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></section><section id="story" class="experience section-shell" data-v-a535ef67><div class="experience-copy" data-v-a535ef67><p class="eyebrow" data-v-a535ef67>A complete restaurant management platform</p><h2 data-v-a535ef67>Run the restaurant.<br data-v-a535ef67><em data-v-a535ef67>Enjoy the craft.</em></h2><p class="section-lede" data-v-a535ef67> From front of house to back of house, KitchenOS brings everything together in one connected platform. </p><div class="check-list" data-v-a535ef67><div data-v-a535ef67><span data-v-a535ef67>✓</span>Easy to use and quick to set up</div><div data-v-a535ef67><span data-v-a535ef67>✓</span>Works for single or multi-branch restaurants</div><div data-v-a535ef67><span data-v-a535ef67>✓</span>Built for restaurants of all sizes</div><div data-v-a535ef67><span data-v-a535ef67>✓</span>Loved by restaurant owners</div></div><div class="inline-actions" data-v-a535ef67><a class="button button--coral button--small" href="/login" data-v-a535ef67>Get Started <span data-v-a535ef67>↗</span></a><a class="text-link" href="/product" data-v-a535ef67>Learn More <span data-v-a535ef67>→</span></a></div></div><div class="experience-collage" data-v-a535ef67><div class="collage-card collage-card--wide" data-v-a535ef67><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Warm modern restaurant dining room" loading="lazy" data-v-a535ef67><span data-v-a535ef67>Great ambience <b data-v-a535ef67>↗</b></span></div><div class="collage-card collage-card--chef" data-v-a535ef67><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Chef preparing a dish" loading="lazy" data-v-a535ef67><span data-v-a535ef67>Happy chefs <b data-v-a535ef67>↙</b></span></div><div class="collage-card collage-card--dish" data-v-a535ef67><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=700&amp;q=85" alt="Colorful plated dish" loading="lazy" data-v-a535ef67><span data-v-a535ef67>Memorable<br data-v-a535ef67>experiences ♥</span></div></div></section><section id="menu" class="menu-section" data-v-a535ef67><div class="section-shell" data-v-a535ef67><div class="section-heading" data-v-a535ef67><div data-v-a535ef67><p class="eyebrow" data-v-a535ef67>From the kitchen</p><h2 data-v-a535ef67>Made to be<br data-v-a535ef67><em data-v-a535ef67>remembered.</em></h2></div><p data-v-a535ef67>Browse your live menu by category. Every dish shown here comes from the KitchenOS food catalogue.</p></div><div class="category-row" role="tablist" aria-label="Food categories" data-v-a535ef67><!--[-->`);
			ssrRenderList(menuCategories.value, (category) => {
				_push(`<button class="${ssrRenderClass({ active: activeCategory.value === category.id })}" role="tab"${ssrRenderAttr("aria-selected", activeCategory.value === category.id)} data-v-a535ef67><span data-v-a535ef67>${ssrInterpolate(category.icon)}</span>${ssrInterpolate(category.name)}</button>`);
			});
			_push(`<!--]--></div><div class="food-grid" data-v-a535ef67><!--[-->`);
			ssrRenderList(filteredItems.value, (item) => {
				_push(`<article class="food-card" data-v-a535ef67><div class="food-image" data-v-a535ef67><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-a535ef67>`);
				if (item.badge) _push(`<span class="food-badge" data-v-a535ef67>${ssrInterpolate(item.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="food-info" data-v-a535ef67><div data-v-a535ef67><span class="food-category" data-v-a535ef67>${ssrInterpolate(item.food_category?.name || categoriesById(item.foodcategory_id) || "Menu item")}</span><h3 data-v-a535ef67>${ssrInterpolate(item.name)}</h3><p data-v-a535ef67>${ssrInterpolate(item.description)}</p></div><strong data-v-a535ef67>£${ssrInterpolate(item.price)}</strong></div></article>`);
			});
			_push(`<!--]--></div>`);
			if (!filteredItems.value.length) _push(`<p class="empty-state" data-v-a535ef67>No published dishes in this category yet.</p>`);
			else _push(`<!---->`);
			_push(`</div></section><section id="reserve" class="reserve-wrap" data-v-a535ef67><div class="reserve-section section-shell" data-v-a535ef67><div class="reserve-copy" data-v-a535ef67><p class="eyebrow" data-v-a535ef67>Reservations</p><h2 data-v-a535ef67>Reserve Your<br data-v-a535ef67><em data-v-a535ef67>Table</em></h2><p data-v-a535ef67>Great food brings people together. Book your table and enjoy an amazing experience.</p><div class="reservation-note" data-v-a535ef67><strong data-v-a535ef67>Dining made easy.</strong><span data-v-a535ef67>Tables stay held for 15 minutes.</span></div><div class="reservation-doodles" aria-hidden="true" data-v-a535ef67>❀ <span data-v-a535ef67>see you at the table</span> ♥</div></div><form class="reserve-form" data-v-a535ef67><div class="form-head" data-v-a535ef67><div data-v-a535ef67><span data-v-a535ef67>New reservation</span><h3 data-v-a535ef67>Reservation details</h3></div><span class="pending-chip" data-v-a535ef67>Pending confirmation</span></div>`);
			if (reservationSent.value) _push(`<div class="reservation-success" role="status" data-v-a535ef67><div class="success-icon" data-v-a535ef67>✓</div><div data-v-a535ef67><strong data-v-a535ef67>Request received.</strong><p data-v-a535ef67>We will be in touch shortly to confirm your table.</p></div></div>`);
			else {
				_push(`<!--[--><div class="field-block" data-v-a535ef67><label class="form-label" data-v-a535ef67>Choose your table</label><div class="table-grid" data-v-a535ef67><!--[-->`);
				ssrRenderList(tables.value, (table) => {
					_push(`<button type="button" class="${ssrRenderClass([{
						selected: unref(reservation).dining_table_id === table.id,
						unavailable: !isTableSuitable(table)
					}, "table-option"])}"${ssrIncludeBooleanAttr(!isTableSuitable(table)) ? " disabled" : ""} data-v-a535ef67><strong data-v-a535ef67>${ssrInterpolate(table.table_number)}</strong><span data-v-a535ef67>${ssrInterpolate(table.capacity)} seats</span><small data-v-a535ef67>${ssrInterpolate(table.status === "available" ? "Available" : "Unavailable")}</small></button>`);
				});
				_push(`<!--]--></div>`);
				if (!tables.value.length) _push(`<p class="table-note" data-v-a535ef67>No tables are currently configured.</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-row" data-v-a535ef67><label data-v-a535ef67>Date<input${ssrRenderAttr("value", unref(reservation).date)} type="date" required data-v-a535ef67></label><label data-v-a535ef67>Time<select data-v-a535ef67><!--[-->`);
				ssrRenderList(times, (time) => {
					_push(`<option data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).time) ? ssrLooseContain(unref(reservation).time, null) : ssrLooseEqual(unref(reservation).time, null)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
				});
				_push(`<!--]--></select></label></div><div class="form-row" data-v-a535ef67><label data-v-a535ef67>Party size<select data-v-a535ef67><!--[-->`);
				ssrRenderList(8, (number) => {
					_push(`<option${ssrRenderAttr("value", number)} data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).guests) ? ssrLooseContain(unref(reservation).guests, number) : ssrLooseEqual(unref(reservation).guests, number)) ? " selected" : ""}>${ssrInterpolate(number)} ${ssrInterpolate(number === 1 ? "guest" : "guests")}</option>`);
				});
				_push(`<!--]--></select></label><label data-v-a535ef67>Duration<select data-v-a535ef67><option${ssrRenderAttr("value", 60)} data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 60) : ssrLooseEqual(unref(reservation).duration_minutes, 60)) ? " selected" : ""}>60 min</option><option${ssrRenderAttr("value", 90)} data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 90) : ssrLooseEqual(unref(reservation).duration_minutes, 90)) ? " selected" : ""}>90 min</option><option${ssrRenderAttr("value", 120)} data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 120) : ssrLooseEqual(unref(reservation).duration_minutes, 120)) ? " selected" : ""}>120 min</option><option${ssrRenderAttr("value", 180)} data-v-a535ef67${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).duration_minutes) ? ssrLooseContain(unref(reservation).duration_minutes, 180) : ssrLooseEqual(unref(reservation).duration_minutes, 180)) ? " selected" : ""}>180 min</option></select></label></div><div class="form-row" data-v-a535ef67><label data-v-a535ef67>Your name<input${ssrRenderAttr("value", unref(reservation).guest_name)} type="text" placeholder="Alex Morgan" required data-v-a535ef67></label><label data-v-a535ef67>Email<input${ssrRenderAttr("value", unref(reservation).guest_email)} type="email" placeholder="alex@example.com" required data-v-a535ef67></label></div><div class="form-row" data-v-a535ef67><label data-v-a535ef67>Phone<input${ssrRenderAttr("value", unref(reservation).guest_phone)} type="tel" placeholder="+44 7000 000000" data-v-a535ef67></label><label data-v-a535ef67>Occasion<input${ssrRenderAttr("value", unref(reservation).occasion)} type="text" placeholder="Birthday, anniversary..." data-v-a535ef67></label></div><label class="notes-field" data-v-a535ef67>Notes<textarea rows="3" placeholder="Allergies, accessibility, or other requests" data-v-a535ef67>${ssrInterpolate(unref(reservation).notes)}</textarea></label><button class="button button--coral submit-button" type="submit"${ssrIncludeBooleanAttr(unref(reservation).processing || !unref(reservation).dining_table_id) ? " disabled" : ""} data-v-a535ef67>${ssrInterpolate(unref(reservation).processing ? "Sending request…" : "Request a table")} <span data-v-a535ef67>→</span></button>`);
				if (Object.keys(unref(reservation).errors).length) _push(`<p class="reservation-error" data-v-a535ef67>Please check the booking details and try again.</p>`);
				else _push(`<!---->`);
				_push(`<small class="form-footnote" data-v-a535ef67>For tonight, please call <a href="tel:+441234567890" data-v-a535ef67>01234 567 890</a>.</small><!--]-->`);
			}
			_push(`</form></div></section></main><footer id="footer" class="site-footer" data-v-a535ef67><div class="section-shell footer-grid" data-v-a535ef67><div data-v-a535ef67><a class="brand" href="/" data-v-a535ef67><span class="brand-mark" data-v-a535ef67>K</span><span data-v-a535ef67>Kitchen<span class="brand-accent" data-v-a535ef67>OS</span></span></a><p data-v-a535ef67>Great food. Better operations.</p></div><nav aria-label="Footer navigation" data-v-a535ef67><a href="#menu" data-v-a535ef67>Menu</a><a href="#reserve" data-v-a535ef67>Reservations</a><a href="/product" data-v-a535ef67>Product</a><a href="#story" data-v-a535ef67>About</a></nav><div class="footer-cta" data-v-a535ef67><span data-v-a535ef67>Ready to run service better?</span><a href="/login" data-v-a535ef67>Enter KitchenOS ↗</a></div></div></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-a535ef67"]]);
//#endregion
export { HomePage_default as default };
