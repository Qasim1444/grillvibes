import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { computed, mergeProps, ref, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
//#region resources/js/pages/HomePage.vue
var _sfc_main = {
	__name: "HomePage",
	__ssrInlineRender: true,
	props: {
		foodItems: {
			type: Array,
			default: () => []
		},
		reservations: {
			type: Array,
			default: () => []
		},
		branches: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const mobileOpen = ref(false);
		const foodItems = computed(() => props.foodItems);
		const reservations = computed(() => props.reservations);
		const branches = computed(() => props.branches);
		const heroImage = computed(() => foodItems.value.find((item) => item.image)?.image || "/images/rectangle.jpg");
		const formatCurrency = (value) => `Rs. ${Number(value || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}`;
		const formatTime = (value) => value ? new Date(value).toLocaleTimeString("en-PK", {
			hour: "2-digit",
			minute: "2-digit"
		}) : "--:--";
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "restaurant-page" }, _attrs))} data-v-8ad9226b><header class="site-header" data-v-8ad9226b><div class="shell site-header__inner" data-v-8ad9226b><a class="brand" href="#top" aria-label="KitchenOS home" data-v-8ad9226b><span class="brand__mark" data-v-8ad9226b>K</span><span data-v-8ad9226b>Kitchen<span class="brand__accent" data-v-8ad9226b>OS</span></span></a><nav class="site-nav" aria-label="Main navigation" data-v-8ad9226b><a href="#menu" data-v-8ad9226b>Menu</a><a href="#about" data-v-8ad9226b>Our story</a><a href="#reservations" data-v-8ad9226b>Reservations</a><a href="#contact" data-v-8ad9226b>Visit us</a></nav><div class="header-actions" data-v-8ad9226b><a class="header-login" href="/login" data-v-8ad9226b>Sign in</a><a class="button button--small button--dark" href="#reservations" data-v-8ad9226b>Reserve a table</a></div><button class="menu-toggle" type="button" aria-label="Toggle navigation" data-v-8ad9226b><span data-v-8ad9226b></span><span data-v-8ad9226b></span><span data-v-8ad9226b></span></button></div>`);
			if (mobileOpen.value) _push(`<nav class="mobile-nav shell" aria-label="Mobile navigation" data-v-8ad9226b><a href="#menu" data-v-8ad9226b>Menu</a><a href="#about" data-v-8ad9226b>Our story</a><a href="#reservations" data-v-8ad9226b>Reservations</a><a href="#contact" data-v-8ad9226b>Visit us</a></nav>`);
			else _push(`<!---->`);
			_push(`</header><main id="top" data-v-8ad9226b><section class="hero" data-v-8ad9226b><div class="shell hero__grid" data-v-8ad9226b><div class="hero__copy" data-v-8ad9226b><p class="eyebrow" data-v-8ad9226b>Good food. Warm tables. Every day.</p><h1 data-v-8ad9226b>Come hungry.<br data-v-8ad9226b><em data-v-8ad9226b>Leave inspired.</em></h1><p class="hero__intro" data-v-8ad9226b>A neighborhood kitchen serving honest, generous food made with ingredients we are proud to put on your table.</p><div class="hero__actions" data-v-8ad9226b><a class="button button--dark" href="#reservations" data-v-8ad9226b>Reserve a table <span data-v-8ad9226b>-&gt;</span></a><a class="text-link" href="#menu" data-v-8ad9226b>Explore the menu <span data-v-8ad9226b>-&gt;</span></a></div><div class="hero__note" data-v-8ad9226b><span class="hero__note-dot" data-v-8ad9226b></span><span data-v-8ad9226b>Open today for lunch and dinner</span></div></div><div class="hero__visual" data-v-8ad9226b><div class="hero__image-wrap" data-v-8ad9226b><img${ssrRenderAttr("src", heroImage.value)} alt="A featured dish from KitchenOS" data-v-8ad9226b></div><div class="hero__stamp" data-v-8ad9226b><strong data-v-8ad9226b>Fresh</strong><span data-v-8ad9226b>from our<br data-v-8ad9226b>kitchen</span></div><div class="hero__caption" data-v-8ad9226b><span data-v-8ad9226b>01</span><span data-v-8ad9226b>Seasonal kitchen</span></div></div></div><div class="hero__rail" data-v-8ad9226b><span data-v-8ad9226b>KitchenOS / Restaurant &amp; dining</span><span data-v-8ad9226b>Scroll to discover <b data-v-8ad9226b>↓</b></span></div></section><section id="menu" class="menu-section section" data-v-8ad9226b><div class="shell" data-v-8ad9226b><div class="section-heading section-heading--split" data-v-8ad9226b><div data-v-8ad9226b><p class="eyebrow" data-v-8ad9226b>From our kitchen</p><h2 data-v-8ad9226b>Made to be<br data-v-8ad9226b><em data-v-8ad9226b>remembered.</em></h2></div><p data-v-8ad9226b>Our menu moves with the seasons, but the standard never changes: careful cooking, bright flavor, and food worth gathering around.</p></div>`);
			if (foodItems.value.length) {
				_push(`<div class="dish-grid" data-v-8ad9226b><!--[-->`);
				ssrRenderList(foodItems.value, (item, index) => {
					_push(`<article class="${ssrRenderClass([{ "dish-card--feature": index === 0 }, "dish-card"])}" data-v-8ad9226b><div class="dish-card__image" data-v-8ad9226b>`);
					if (item.image) _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-8ad9226b>`);
					else _push(`<div class="dish-card__placeholder" data-v-8ad9226b>KitchenOS</div>`);
					_push(`<span class="dish-card__number" data-v-8ad9226b>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span></div><div class="dish-card__body" data-v-8ad9226b><span class="dish-card__category" data-v-8ad9226b>${ssrInterpolate(item.category || "From the kitchen")}</span><h3 data-v-8ad9226b>${ssrInterpolate(item.name)}</h3><p data-v-8ad9226b>${ssrInterpolate(item.description || "A house favorite, prepared fresh for the table.")}</p><strong data-v-8ad9226b>${ssrInterpolate(formatCurrency(item.price))}</strong></div></article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="empty-state" data-v-8ad9226b>Our next menu is being prepared. Check back soon.</div>`);
			_push(`<div class="section-action" data-v-8ad9226b><a class="text-link text-link--dark" href="#menu" data-v-8ad9226b>Browse menu highlights <span data-v-8ad9226b>-&gt;</span></a></div></div></section><section id="reservations" class="reservation-section section" data-v-8ad9226b><div class="shell reservation__grid" data-v-8ad9226b><div class="reservation__copy" data-v-8ad9226b><p class="eyebrow eyebrow--light" data-v-8ad9226b>Your table is waiting</p><h2 data-v-8ad9226b>Make tonight<br data-v-8ad9226b><em data-v-8ad9226b>worth remembering.</em></h2><p data-v-8ad9226b>Bring your favorite people. We will take care of the rest. Reserve a table and let us make room for a good evening.</p><a class="button button--cream" href="/login" data-v-8ad9226b>Reserve a table <span data-v-8ad9226b>-&gt;</span></a></div><div class="reservation__board" data-v-8ad9226b><div class="board-heading" data-v-8ad9226b><div data-v-8ad9226b><span class="board-heading__kicker" data-v-8ad9226b>Today at KitchenOS</span><h3 data-v-8ad9226b>Upcoming tables</h3></div><span class="board-heading__count" data-v-8ad9226b>${ssrInterpolate(reservations.value.length)} bookings</span></div>`);
			if (reservations.value.length) {
				_push(`<div class="booking-list" data-v-8ad9226b><!--[-->`);
				ssrRenderList(reservations.value, (booking) => {
					_push(`<div class="booking-row" data-v-8ad9226b><time data-v-8ad9226b>${ssrInterpolate(formatTime(booking.reserved_at))}</time><div data-v-8ad9226b><strong data-v-8ad9226b>${ssrInterpolate(booking.party_size)} ${ssrInterpolate(booking.party_size === 1 ? "guest" : "guests")}</strong><span data-v-8ad9226b>${ssrInterpolate(booking.branch || "Main dining room")}</span></div><span class="booking-status" data-v-8ad9226b>${ssrInterpolate(booking.status)}</span></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="booking-empty" data-v-8ad9226b>The evening is still open. Be the first to book a table.</p>`);
			_push(`<div class="board-footer" data-v-8ad9226b><span data-v-8ad9226b>Private dining available</span><span data-v-8ad9226b>Walk-ins welcome</span></div></div></div></section><section id="about" class="about-section section" data-v-8ad9226b><div class="shell about__grid" data-v-8ad9226b><div class="about__visual" data-v-8ad9226b><img${ssrRenderAttr("src", "/images/rectangle.jpg")} alt="The KitchenOS dining experience" data-v-8ad9226b><span class="about__vertical" data-v-8ad9226b>A place to gather</span></div><div class="about__copy" data-v-8ad9226b><p class="eyebrow" data-v-8ad9226b>Our table, your story</p><h2 data-v-8ad9226b>Food with a little more <em data-v-8ad9226b>feeling.</em></h2><p data-v-8ad9226b>KitchenOS is built around the simple pleasure of a meal shared well. Our cooks follow the ingredients, our team knows the regulars, and every plate leaves the pass with purpose.</p><p data-v-8ad9226b>From a quick lunch to a long dinner, we make space for the moments that matter.</p><div class="about__facts" data-v-8ad9226b><div data-v-8ad9226b><strong data-v-8ad9226b>01</strong><span data-v-8ad9226b>Seasonal produce</span></div><div data-v-8ad9226b><strong data-v-8ad9226b>02</strong><span data-v-8ad9226b>Thoughtful service</span></div><div data-v-8ad9226b><strong data-v-8ad9226b>03</strong><span data-v-8ad9226b>Open-hearted dining</span></div></div></div></div></section><section class="quote-section section" data-v-8ad9226b><div class="shell quote-section__inner" data-v-8ad9226b><span class="quote-mark" data-v-8ad9226b>“</span><blockquote data-v-8ad9226b>There is no better place to turn an ordinary evening into a small celebration.</blockquote><span class="quote-credit" data-v-8ad9226b>A note from our guests</span></div></section><section id="contact" class="visit-section section" data-v-8ad9226b><div class="shell" data-v-8ad9226b><div class="section-heading" data-v-8ad9226b><p class="eyebrow" data-v-8ad9226b>Find your way here</p><h2 data-v-8ad9226b>Come by for<br data-v-8ad9226b><em data-v-8ad9226b>something good.</em></h2></div>`);
			if (branches.value.length) {
				_push(`<div class="location-grid" data-v-8ad9226b><!--[-->`);
				ssrRenderList(branches.value, (branch) => {
					_push(`<article class="location-card" data-v-8ad9226b><span class="location-card__number" data-v-8ad9226b>${ssrInterpolate(String(branch.id).padStart(2, "0"))}</span><h3 data-v-8ad9226b>${ssrInterpolate(branch.name)}</h3><p data-v-8ad9226b>${ssrInterpolate(branch.address || "Address details available at the restaurant.")}</p>`);
					if (branch.phone) _push(`<a${ssrRenderAttr("href", `tel:${branch.phone}`)} data-v-8ad9226b>${ssrInterpolate(branch.phone)}</a>`);
					else _push(`<!---->`);
					if (branch.latitude && branch.longitude) _push(`<a${ssrRenderAttr("href", `https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`)} target="_blank" rel="noreferrer" data-v-8ad9226b>Get directions <span data-v-8ad9226b>-&gt;</span></a>`);
					else _push(`<!---->`);
					_push(`</article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="empty-state" data-v-8ad9226b>Our locations will appear here soon.</div>`);
			_push(`<div class="visit__hours" data-v-8ad9226b><span data-v-8ad9226b>Opening hours</span><strong data-v-8ad9226b>Mon - Sun / Lunch &amp; dinner service</strong><a href="#reservations" data-v-8ad9226b>Book your visit <span data-v-8ad9226b>-&gt;</span></a></div></div></section></main><footer class="site-footer" data-v-8ad9226b><div class="shell footer__top" data-v-8ad9226b><div data-v-8ad9226b><a class="brand brand--footer" href="#top" data-v-8ad9226b><span class="brand__mark" data-v-8ad9226b>K</span><span data-v-8ad9226b>Kitchen<span class="brand__accent" data-v-8ad9226b>OS</span></span></a><p data-v-8ad9226b>A modern neighborhood kitchen for generous food and good company.</p></div><div class="footer__links" data-v-8ad9226b><div data-v-8ad9226b><strong data-v-8ad9226b>Explore</strong><a href="#menu" data-v-8ad9226b>Menu</a><a href="#about" data-v-8ad9226b>Our story</a><a href="#reservations" data-v-8ad9226b>Reservations</a></div><div data-v-8ad9226b><strong data-v-8ad9226b>Visit</strong><a href="#contact" data-v-8ad9226b>Locations</a><a href="/login" data-v-8ad9226b>Team login</a><a href="mailto:hello@kitchenos.test" data-v-8ad9226b>Contact us</a></div></div></div><div class="shell footer__bottom" data-v-8ad9226b><span data-v-8ad9226b>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} KitchenOS</span><span data-v-8ad9226b>Good food, thoughtfully managed.</span></div></footer></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HomePage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-8ad9226b"]]);
//#endregion
export { HomePage_default as default };
