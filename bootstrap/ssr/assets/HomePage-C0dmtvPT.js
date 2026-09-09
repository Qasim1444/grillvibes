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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-home" }, _attrs))} data-v-d0119fac><header class="site-header" data-v-d0119fac><a class="brand" href="/" aria-label="Ember and Salt home" data-v-d0119fac><span class="brand-mark" data-v-d0119fac>E</span><span data-v-d0119fac>Ember <i data-v-d0119fac>&amp;</i> Salt</span></a><nav class="site-nav" aria-label="Primary navigation" data-v-d0119fac><a href="#menu" data-v-d0119fac>Menu</a><a href="#story" data-v-d0119fac>Our story</a><a href="#reserve" data-v-d0119fac>Reservations</a></nav><a class="nav-cta" href="#reserve" data-v-d0119fac>Book a table <span aria-hidden="true" data-v-d0119fac>↗</span></a></header><main data-v-d0119fac><section class="hero section-shell" data-v-d0119fac><div class="hero-copy" data-v-d0119fac><p class="eyebrow" data-v-d0119fac><span data-v-d0119fac></span> Seasonal kitchen · Open daily</p><h1 data-v-d0119fac>A little fire.<br data-v-d0119fac><em data-v-d0119fac>A lot of flavour.</em></h1><p class="hero-text" data-v-d0119fac>A neighbourhood kitchen for long lunches, late dinners, and the kind of food you keep thinking about tomorrow.</p><div class="hero-actions" data-v-d0119fac><a class="button button--dark" href="#menu" data-v-d0119fac>Explore the menu <span data-v-d0119fac>↓</span></a><a class="text-button" href="#reserve" data-v-d0119fac>Find your table <span data-v-d0119fac>↗</span></a></div><div class="hero-meta" data-v-d0119fac><span data-v-d0119fac>12:00 — 23:00</span><span data-v-d0119fac>Wednesday to Sunday</span><span data-v-d0119fac>48 High Street</span></div></div><div class="hero-art" aria-label="A plated seasonal dish" data-v-d0119fac><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&amp;fit=crop&amp;w=1200&amp;q=85" alt="Fresh seasonal vegetables on a plate" data-v-d0119fac><div class="hero-stamp" data-v-d0119fac><strong data-v-d0119fac>EST.</strong><b data-v-d0119fac>2018</b><span data-v-d0119fac>GOOD FOOD<br data-v-d0119fac>GOOD COMPANY</span></div><div class="hero-caption" data-v-d0119fac><span data-v-d0119fac>01 / 04</span><b data-v-d0119fac>Charred greens<br data-v-d0119fac>with smoked almond</b></div></div></section><section id="menu" class="menu-section section-shell" data-v-d0119fac><div class="section-heading" data-v-d0119fac><div data-v-d0119fac><p class="eyebrow" data-v-d0119fac>From our kitchen</p><h2 data-v-d0119fac>Find your<br data-v-d0119fac><em data-v-d0119fac>favourite.</em></h2></div><p data-v-d0119fac>Our menu follows the market. Small plates, generous mains, and desserts worth saving room for.</p></div><div class="category-row" role="tablist" aria-label="Food categories" data-v-d0119fac><!--[-->`);
			ssrRenderList(menuCategories.value, (category) => {
				_push(`<button class="${ssrRenderClass({ active: activeCategory.value === category.id })}" role="tab"${ssrRenderAttr("aria-selected", activeCategory.value === category.id)} data-v-d0119fac><span data-v-d0119fac>${ssrInterpolate(category.icon)}</span>${ssrInterpolate(category.name)}</button>`);
			});
			_push(`<!--]--></div><div class="food-grid" data-v-d0119fac><!--[-->`);
			ssrRenderList(filteredItems.value, (item) => {
				_push(`<article class="food-card" data-v-d0119fac><div class="food-image" data-v-d0119fac><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-d0119fac>`);
				if (item.badge) _push(`<span class="food-badge" data-v-d0119fac>${ssrInterpolate(item.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="food-info" data-v-d0119fac><div data-v-d0119fac><h3 data-v-d0119fac>${ssrInterpolate(item.name)}</h3><p data-v-d0119fac>${ssrInterpolate(item.description)}</p></div><strong data-v-d0119fac>£${ssrInterpolate(item.price)}</strong></div></article>`);
			});
			_push(`<!--]--></div></section><section id="story" class="story-band" data-v-d0119fac><div class="section-shell story-inner" data-v-d0119fac><div class="story-photo" data-v-d0119fac><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Chef preparing ingredients in the kitchen" loading="lazy" data-v-d0119fac><span data-v-d0119fac>THE DAILY<br data-v-d0119fac>PREP</span></div><div class="story-copy" data-v-d0119fac><p class="eyebrow" data-v-d0119fac>A table with a point of view</p><h2 data-v-d0119fac>Good ingredients<br data-v-d0119fac><em data-v-d0119fac>need little fuss.</em></h2><p data-v-d0119fac>We cook over fire, work with people we know, and let the best produce set the pace. Come as you are; stay as long as you like.</p><a class="text-button text-button--light" href="#reserve" data-v-d0119fac>Come eat with us <span data-v-d0119fac>↗</span></a></div></div></section><section id="reserve" class="reserve-section section-shell" data-v-d0119fac><div class="reserve-intro" data-v-d0119fac><p class="eyebrow" data-v-d0119fac>Pull up a chair</p><h2 data-v-d0119fac>Make it<br data-v-d0119fac><em data-v-d0119fac>a date.</em></h2><p data-v-d0119fac>Tell us when you would like to join us and we will keep a table warm.</p><div class="contact-note" data-v-d0119fac><span data-v-d0119fac>Need a larger table?</span><a href="mailto:hello@emberandsalt.example" data-v-d0119fac>hello@emberandsalt.example</a></div></div><form class="reserve-form" data-v-d0119fac>`);
			if (reservationSent.value) _push(`<div class="reservation-success" role="status" data-v-d0119fac><span data-v-d0119fac>✓</span><div data-v-d0119fac><strong data-v-d0119fac>Request received.</strong><p data-v-d0119fac>We will be in touch shortly to confirm your table.</p></div></div>`);
			else {
				_push(`<!--[--><div class="table-picker" data-v-d0119fac><span class="form-label" data-v-d0119fac>Choose your table</span><div class="table-grid" data-v-d0119fac><!--[-->`);
				ssrRenderList(tables.value, (table) => {
					_push(`<button type="button" class="${ssrRenderClass([{
						selected: unref(reservation).dining_table_id === table.id,
						unavailable: !isTableSuitable(table)
					}, "table-option"])}"${ssrIncludeBooleanAttr(!isTableSuitable(table)) ? " disabled" : ""} data-v-d0119fac><strong data-v-d0119fac>${ssrInterpolate(table.table_number)}</strong><span data-v-d0119fac>${ssrInterpolate(table.capacity)} seats</span><small data-v-d0119fac>${ssrInterpolate(table.status === "available" ? "Available" : "Unavailable")}</small></button>`);
				});
				_push(`<!--]--></div>`);
				if (!tables.value.length) _push(`<p class="table-note" data-v-d0119fac>No tables are currently configured.</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="form-row" data-v-d0119fac><label data-v-d0119fac>Date<input${ssrRenderAttr("value", unref(reservation).date)} type="date" required data-v-d0119fac></label><label data-v-d0119fac>Time<select data-v-d0119fac><!--[-->`);
				ssrRenderList(times, (time) => {
					_push(`<option data-v-d0119fac${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).time) ? ssrLooseContain(unref(reservation).time, null) : ssrLooseEqual(unref(reservation).time, null)) ? " selected" : ""}>${ssrInterpolate(time)}</option>`);
				});
				_push(`<!--]--></select></label></div><label data-v-d0119fac>How many guests<select data-v-d0119fac><!--[-->`);
				ssrRenderList(8, (number) => {
					_push(`<option${ssrRenderAttr("value", number)} data-v-d0119fac${ssrIncludeBooleanAttr(Array.isArray(unref(reservation).guests) ? ssrLooseContain(unref(reservation).guests, number) : ssrLooseEqual(unref(reservation).guests, number)) ? " selected" : ""}>${ssrInterpolate(number)} ${ssrInterpolate(number === 1 ? "guest" : "guests")}</option>`);
				});
				_push(`<!--]--></select></label><div class="form-row" data-v-d0119fac><label data-v-d0119fac>Your name<input${ssrRenderAttr("value", unref(reservation).guest_name)} type="text" placeholder="Alex Morgan" required data-v-d0119fac></label><label data-v-d0119fac>Email<input${ssrRenderAttr("value", unref(reservation).guest_email)} type="email" placeholder="alex@example.com" required data-v-d0119fac></label></div><div class="form-row" data-v-d0119fac><label data-v-d0119fac>Phone<input${ssrRenderAttr("value", unref(reservation).guest_phone)} type="tel" placeholder="01234 567 890" data-v-d0119fac></label><label data-v-d0119fac>Occasion<input${ssrRenderAttr("value", unref(reservation).occasion)} type="text" placeholder="Birthday, anniversary..." data-v-d0119fac></label></div><label data-v-d0119fac>Notes<textarea rows="3" placeholder="Allergies, accessibility, or other requests" data-v-d0119fac>${ssrInterpolate(unref(reservation).notes)}</textarea></label><button class="button button--dark submit-button" type="submit"${ssrIncludeBooleanAttr(unref(reservation).processing || !unref(reservation).dining_table_id) ? " disabled" : ""} data-v-d0119fac>${ssrInterpolate(unref(reservation).processing ? "Sending request…" : "Request a table")} <span data-v-d0119fac>→</span></button>`);
				if (Object.keys(unref(reservation).errors).length) _push(`<p class="reservation-error" data-v-d0119fac>Please check the booking details and try again.</p>`);
				else _push(`<!---->`);
				_push(`<small data-v-d0119fac>We hold tables for 15 minutes. For tonight, please call <a href="tel:+441234567890" data-v-d0119fac>01234 567 890</a>.</small><!--]-->`);
			}
			_push(`</form></section></main><footer class="site-footer" data-v-d0119fac><div class="section-shell" data-v-d0119fac><a class="brand" href="/" data-v-d0119fac><span class="brand-mark" data-v-d0119fac>E</span><span data-v-d0119fac>Ember <i data-v-d0119fac>&amp;</i> Salt</span></a><span data-v-d0119fac>Good food, no ceremony.</span><span data-v-d0119fac>© 2026 Ember &amp; Salt</span></div></footer></div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-d0119fac"]]);
//#endregion
export { HomePage_default as default };
