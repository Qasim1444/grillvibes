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
			dining_table_id: null,
			name: "",
			email: ""
		});
		const isTableSuitable = (table) => table.status === "available" && table.capacity >= Number(reservation.guests);
		watch(() => reservation.guests, () => {
			const selectedTable = tables.value.find((table) => table.id === reservation.dining_table_id);
			if (selectedTable && !isTableSuitable(selectedTable)) reservation.dining_table_id = null;
		});
		const reservationSent = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-home" }, _attrs))} data-v-9075e9dc><header class="site-header" data-v-9075e9dc><a class="brand" href="/" aria-label="Ember and Salt home" data-v-9075e9dc><span class="brand-mark" data-v-9075e9dc>E</span><span data-v-9075e9dc>Ember <i data-v-9075e9dc>&amp;</i> Salt</span></a><nav class="site-nav" aria-label="Primary navigation" data-v-9075e9dc><a href="#menu" data-v-9075e9dc>Menu</a><a href="#story" data-v-9075e9dc>Our story</a><a href="#reserve" data-v-9075e9dc>Reservations</a></nav><a class="nav-cta" href="#reserve" data-v-9075e9dc>Book a table <span aria-hidden="true" data-v-9075e9dc>↗</span></a></header><main data-v-9075e9dc><section class="hero section-shell" data-v-9075e9dc><div class="hero-copy" data-v-9075e9dc><p class="eyebrow" data-v-9075e9dc><span data-v-9075e9dc></span> Seasonal kitchen · Open daily</p><h1 data-v-9075e9dc>A little fire.<br data-v-9075e9dc><em data-v-9075e9dc>A lot of flavour.</em></h1><p class="hero-text" data-v-9075e9dc>A neighbourhood kitchen for long lunches, late dinners, and the kind of food you keep thinking about tomorrow.</p><div class="hero-actions" data-v-9075e9dc><a class="button button--dark" href="#menu" data-v-9075e9dc>Explore the menu <span data-v-9075e9dc>↓</span></a><a class="text-button" href="#reserve" data-v-9075e9dc>Find your table <span data-v-9075e9dc>↗</span></a></div><div class="hero-meta" data-v-9075e9dc><span data-v-9075e9dc>12:00 — 23:00</span><span data-v-9075e9dc>Wednesday to Sunday</span><span data-v-9075e9dc>48 High Street</span></div></div><div class="hero-art" aria-label="A plated seasonal dish" data-v-9075e9dc><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=1200&amp;q=85" alt="Fresh seasonal vegetables on a plate" data-v-9075e9dc><div class="hero-stamp" data-v-9075e9dc><strong data-v-9075e9dc>EST.</strong><b data-v-9075e9dc>2018</b><span data-v-9075e9dc>GOOD FOOD<br data-v-9075e9dc>GOOD COMPANY</span></div><div class="hero-caption" data-v-9075e9dc><span data-v-9075e9dc>01 / 04</span><b data-v-9075e9dc>Charred greens<br data-v-9075e9dc>with smoked almond</b></div></div></section><section id="menu" class="menu-section section-shell" data-v-9075e9dc><div class="section-heading" data-v-9075e9dc><div data-v-9075e9dc><p class="eyebrow" data-v-9075e9dc>From our kitchen</p><h2 data-v-9075e9dc>Find your<br data-v-9075e9dc><em data-v-9075e9dc>favourite.</em></h2></div><p data-v-9075e9dc>Our menu follows the market. Small plates, generous mains, and desserts worth saving room for.</p></div><div class="category-row" role="tablist" aria-label="Food categories" data-v-9075e9dc><!--[-->`);
			ssrRenderList(menuCategories.value, (category) => {
				_push(`<button class="${ssrRenderClass({ active: activeCategory.value === category.id })}" role="tab"${ssrRenderAttr("aria-selected", activeCategory.value === category.id)} data-v-9075e9dc><span data-v-9075e9dc>${ssrInterpolate(category.icon)}</span>${ssrInterpolate(category.name)}</button>`);
			});
			_push(`<!--]--></div><div class="food-grid" data-v-9075e9dc><!--[-->`);
			ssrRenderList(filteredItems.value, (item) => {
				_push(`<article class="food-card" data-v-9075e9dc><div class="food-image" data-v-9075e9dc><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-9075e9dc>`);
				if (item.badge) _push(`<span class="food-badge" data-v-9075e9dc>${ssrInterpolate(item.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="food-info" data-v-9075e9dc><div data-v-9075e9dc><h3 data-v-9075e9dc>${ssrInterpolate(item.name)}</h3><p data-v-9075e9dc>${ssrInterpolate(item.description)}</p></div><strong data-v-9075e9dc>£${ssrInterpolate(item.price)}</strong></div></article>`);
			});
			_push(`<!--]--></div></section><section id="story" class="story-band" data-v-9075e9dc><div class="section-shell story-inner" data-v-9075e9dc><div class="story-photo" data-v-9075e9dc><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Chef preparing ingredients in the kitchen" loading="lazy" data-v-9075e9dc><span data-v-9075e9dc>THE DAILY<br data-v-9075e9dc>PREP</span></div><div class="story-copy" data-v-9075e9dc><p class="eyebrow" data-v-9075e9dc>A table with a point of view</p><h2 data-v-9075e9dc>Good ingredients<br data-v-9075e9dc><em data-v-9075e9dc>need little fuss.</em></h2><p data-v-9075e9dc>We cook over fire, work with people we know, and let the best produce set the pace. Come as you are; stay as long as you like.</p><a class="text-button text-button--light" href="#reserve" data-v-9075e9dc>Come eat with us <span data-v-9075e9dc>↗</span></a></div></div></section><section id="reserve" class="reserve-section section-shell" data-v-9075e9dc><div class="reserve-intro" data-v-9075e9dc><p class="eyebrow" data-v-9075e9dc>Pull up a chair</p><h2 data-v-9075e9dc>Make it<br data-v-9075e9dc><em data-v-9075e9dc>a date.</em></h2><p data-v-9075e9dc>Tell us when you would like to join us and we will keep a table warm.</p><div class="contact-note" data-v-9075e9dc><span data-v-9075e9dc>Need a larger table?</span><a href="mailto:hello@emberandsalt.example" data-v-9075e9dc>hello@emberandsalt.example</a></div></div><form class="reserve-form" data-v-9075e9dc>`);
			if (reservationSent.value) _push(`<div class="reservation-success" role="status" data-v-9075e9dc><span data-v-9075e9dc>✓</span><div data-v-9075e9dc><strong data-v-9075e9dc>Request received.</strong><p data-v-9075e9dc>We will be in touch shortly to confirm your table.</p></div></div>`);
			else {
				_push(`<!--[--><div class="table-picker" data-v-9075e9dc><span class="form-label" data-v-9075e9dc>Choose your table</span><div class="table-grid" data-v-9075e9dc><!--[-->`);
				ssrRenderList(tables.value, (table) => {
					_push(`<button type="button" class="${ssrRenderClass([{
						selected: unref(reservation).dining_table_id === table.id,
						unavailable: !isTableSuitable(table)
					}, "table-option"])}"${ssrIncludeBooleanAttr(!isTableSuitable(table)) ? " disabled" : ""} data-v-9075e9dc><strong data-v-9075e9dc>${ssrInterpolate(table.table_number)}</strong><span data-v-9075e9dc>${ssrInterpolate(table.capacity)} seats</span><small data-v-9075e9dc>${ssrInterpolate(table.status === "available" ? "Available" : "Unavailable")}</small></button>`);
				});
				_push(`<!--]--></div>`);
				if (!tables.value.length) _push(`<p class="table-note" data-v-9075e9dc>No tables are currently configured.</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-row" data-v-9075e9dc><label data-v-9075e9dc>Date<input${ssrRenderAttr("value", unref(reservation).date)} type="date" required data-v-9075e9dc></label><label data-v-9075e9dc>Time<select data-v-9075e9dc><!--[-->`);
				ssrRenderList(times, (time) => {
					_push(`<option data-v-9075e9dc${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).time) ? ssrLooseContain(unref(reservation).time, null) : ssrLooseEqual(unref(reservation).time, null)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
				});
				_push(`<!--]--></select></label></div><label data-v-9075e9dc>How many guests<select data-v-9075e9dc><!--[-->`);
				ssrRenderList(8, (number) => {
					_push(`<option${ssrRenderAttr("value", number)} data-v-9075e9dc${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).guests) ? ssrLooseContain(unref(reservation).guests, number) : ssrLooseEqual(unref(reservation).guests, number)) ? " selected" : ""}>${ssrInterpolate(number)} ${ssrInterpolate(number === 1 ? "guest" : "guests")}</option>`);
				});
				_push(`<!--]--></select></label><div class="form-row" data-v-9075e9dc><label data-v-9075e9dc>Your name<input${ssrRenderAttr("value", unref(reservation).name)} type="text" placeholder="Alex Morgan" required data-v-9075e9dc></label><label data-v-9075e9dc>Email<input${ssrRenderAttr("value", unref(reservation).email)} type="email" placeholder="alex@example.com" required data-v-9075e9dc></label></div><button class="button button--dark submit-button" type="submit"${ssrIncludeBooleanAttr(unref(reservation).processing || !unref(reservation).dining_table_id) ? " disabled" : ""} data-v-9075e9dc>${ssrInterpolate(unref(reservation).processing ? "Sending request…" : "Request a table")} <span data-v-9075e9dc>→</span></button>`);
				if (Object.keys(unref(reservation).errors).length) _push(`<p class="reservation-error" data-v-9075e9dc>Please check the booking details and try again.</p>`);
				else _push(`<!---->`);
				_push(`<small data-v-9075e9dc>We hold tables for 15 minutes. For tonight, please call <a href="tel:+441234567890" data-v-9075e9dc>01234 567 890</a>.</small><!--]-->`);
			}
			_push(`</form></section></main><footer class="site-footer" data-v-9075e9dc><div class="section-shell" data-v-9075e9dc><a class="brand" href="/" data-v-9075e9dc><span class="brand-mark" data-v-9075e9dc>E</span><span data-v-9075e9dc>Ember <i data-v-9075e9dc>&amp;</i> Salt</span></a><span data-v-9075e9dc>Good food, no ceremony.</span><span data-v-9075e9dc>© 2026 Ember &amp; Salt</span></div></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-9075e9dc"]]);
//#endregion
export { HomePage_default as default };
