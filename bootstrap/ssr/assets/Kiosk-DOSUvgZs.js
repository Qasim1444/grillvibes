import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { computed, mergeProps, onMounted, onUnmounted, ref, useSSRContext } from "vue";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/pages/Guest/Kiosk.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: null }, {
	__name: "Kiosk",
	__ssrInlineRender: true,
	props: { placeId: {
		type: Number,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const state = ref("loading");
		const errorMsg = ref("");
		const sessionToken = ref("");
		const menu = ref({
			categories: [],
			items: []
		});
		const config = ref({
			accent_color: "#6366f1",
			order_types: ["dine_in", "takeaway"],
			require_name: false,
			require_phone: false,
			idle_timeout_seconds: 120,
			splash_title: "Welcome",
			splash_subtitle: "Tap to start"
		});
		const activeCat = ref(null);
		const cart = ref([]);
		ref("");
		const guestName = ref("");
		const guestPhone = ref("");
		const placing = ref(false);
		const orderError = ref("");
		const confirmOrder = ref(null);
		const countdown = ref(10);
		let idleTimer = null;
		onMounted(async () => {
			try {
				const res = await fetch(`/api/guest/kiosk/${props.placeId}`, { headers: { Accept: "application/json" } });
				if (!res.ok) throw new Error((await res.json())?.error ?? "Kiosk unavailable.");
				const data = await res.json();
				sessionToken.value = data.session_token;
				menu.value = data.menu ?? {
					categories: [],
					items: []
				};
				config.value = {
					...config.value,
					...data.kiosk_config
				};
				state.value = "attract";
			} catch (e) {
				errorMsg.value = e.message;
				state.value = "error";
			}
		});
		onUnmounted(() => {
			clearTimeout(idleTimer);
			clearInterval(countdownTimer);
		});
		const TYPE_MAP = [
			{
				key: "dine_in",
				label: "Dine In",
				icon: "🍽"
			},
			{
				key: "takeaway",
				label: "Takeaway",
				icon: "🥡"
			},
			{
				key: "delivery",
				label: "Delivery",
				icon: "🚚"
			}
		];
		const availableTypes = computed(() => TYPE_MAP.filter((t) => (config.value.order_types ?? []).includes(t.key)));
		const cartCount = computed(() => cart.value.reduce((s, l) => s + l.quantity, 0));
		const cartTotal = computed(() => cart.value.reduce((s, l) => s + l.price * l.quantity, 0));
		const cartQty = (id) => cart.value.find((l) => l.fooditems_id === id)?.quantity ?? 0;
		const filteredItems = computed(() => activeCat.value === null ? menu.value.items : menu.value.items.filter((i) => i.category_id === activeCat.value));
		let countdownTimer = null;
		const fmt = (v) => "Rs " + Number(v ?? 0).toLocaleString("en-PK", { minimumFractionDigits: 0 });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "kiosk",
				style: { "--accent": config.value.accent_color ?? "#6366f1" }
			}, _attrs))} data-v-be986fb4>`);
			if (state.value === "loading") _push(`<div class="kiosk__splash kiosk__splash--loading" data-v-be986fb4><div class="kiosk__spin" data-v-be986fb4></div></div>`);
			else if (state.value === "error") _push(`<div class="kiosk__splash" data-v-be986fb4><p class="kiosk__error" data-v-be986fb4>${ssrInterpolate(errorMsg.value)}</p></div>`);
			else if (state.value === "attract") {
				_push(`<div class="kiosk__attract" data-v-be986fb4>`);
				if (config.value.splash_image) _push(`<div class="kiosk__splash-bg" style="${ssrRenderStyle({ backgroundImage: `url(${config.value.splash_image})` })}" data-v-be986fb4></div>`);
				else _push(`<!---->`);
				_push(`<div class="kiosk__attract-content" data-v-be986fb4><h1 class="kiosk__attract-title" data-v-be986fb4>${ssrInterpolate(config.value.splash_title ?? "Welcome")}</h1><p class="kiosk__attract-sub" data-v-be986fb4>${ssrInterpolate(config.value.splash_subtitle ?? "Tap anywhere to start")}</p><div class="kiosk__tap-ring" data-v-be986fb4></div></div></div>`);
			} else if (state.value === "type") {
				_push(`<div class="kiosk__type-select" data-v-be986fb4><h2 class="kiosk__step-title" data-v-be986fb4>How would you like to order?</h2><div class="kiosk__type-grid" data-v-be986fb4><!--[-->`);
				ssrRenderList(availableTypes.value, (t) => {
					_push(`<button class="kiosk__type-btn" data-v-be986fb4><span class="kiosk__type-icon" data-v-be986fb4>${ssrInterpolate(t.icon)}</span><span data-v-be986fb4>${ssrInterpolate(t.label)}</span></button>`);
				});
				_push(`<!--]--></div><button class="kiosk__back" data-v-be986fb4>← Back</button></div>`);
			} else if (state.value === "guestInfo") {
				_push(`<div class="kiosk__guest-form" data-v-be986fb4><h2 class="kiosk__step-title" data-v-be986fb4>Your details</h2>`);
				if (config.value.require_name) _push(`<input${ssrRenderAttr("value", guestName.value)} class="kiosk__big-input" placeholder="Your name" data-v-be986fb4>`);
				else _push(`<!---->`);
				if (config.value.require_phone) _push(`<input${ssrRenderAttr("value", guestPhone.value)} class="kiosk__big-input" placeholder="Phone number" data-v-be986fb4>`);
				else _push(`<!---->`);
				_push(`<div class="kiosk__guest-actions" data-v-be986fb4><button class="kiosk__back" data-v-be986fb4>← Back</button><button class="kiosk__next-btn" data-v-be986fb4>Continue →</button></div></div>`);
			} else if (state.value === "menu" || state.value === "cart") {
				_push(`<div class="kiosk__menu-layout" data-v-be986fb4><div class="kiosk__menu-left" data-v-be986fb4><div class="kiosk__menu-header" data-v-be986fb4><h2 class="kiosk__menu-title" data-v-be986fb4>Our Menu</h2><button class="kiosk__cancel-btn" data-v-be986fb4>✕ Cancel</button></div><div class="kiosk__cats" data-v-be986fb4><button class="${ssrRenderClass([{ active: activeCat.value === null }, "kiosk__cat"])}" data-v-be986fb4>All</button><!--[-->`);
				ssrRenderList(menu.value.categories, (cat) => {
					_push(`<button class="${ssrRenderClass([{ active: activeCat.value === cat.id }, "kiosk__cat"])}" data-v-be986fb4>${ssrInterpolate(cat.name)}</button>`);
				});
				_push(`<!--]--></div><div class="kiosk__items-grid" data-v-be986fb4><!--[-->`);
				ssrRenderList(filteredItems.value, (item) => {
					_push(`<button class="kiosk__item" data-v-be986fb4><div class="kiosk__item-img" data-v-be986fb4>`);
					if (item.image) _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} data-v-be986fb4>`);
					else _push(`<span data-v-be986fb4>🍽</span>`);
					_push(`</div><div class="kiosk__item-name" data-v-be986fb4>${ssrInterpolate(item.name)}</div><div class="kiosk__item-price" data-v-be986fb4>${ssrInterpolate(fmt(item.price))}</div>`);
					if (cartQty(item.id)) _push(`<span class="kiosk__item-badge" data-v-be986fb4>${ssrInterpolate(cartQty(item.id))}</span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--></div></div><div class="kiosk__cart" data-v-be986fb4><div class="kiosk__cart-hdr" data-v-be986fb4><span data-v-be986fb4>Your Order</span><span class="kiosk__cart-count" data-v-be986fb4>${ssrInterpolate(cartCount.value)} items</span></div><div class="kiosk__cart-lines" data-v-be986fb4>`);
				if (!cart.value.length) _push(`<div class="kiosk__cart-empty" data-v-be986fb4>Tap items to add them</div>`);
				else _push(`<!---->`);
				_push(`<!--[-->`);
				ssrRenderList(cart.value, (line) => {
					_push(`<div class="kiosk__cart-line" data-v-be986fb4><div class="kiosk__cl-name" data-v-be986fb4>${ssrInterpolate(line.name)}</div><div class="kiosk__cl-qty" data-v-be986fb4><button data-v-be986fb4>−</button><span data-v-be986fb4>${ssrInterpolate(line.quantity)}</span><button data-v-be986fb4>+</button></div><span class="kiosk__cl-sub" data-v-be986fb4>${ssrInterpolate(fmt(line.price * line.quantity))}</span></div>`);
				});
				_push(`<!--]--></div><div class="kiosk__cart-footer" data-v-be986fb4><div class="kiosk__cart-total" data-v-be986fb4>Total <strong data-v-be986fb4>${ssrInterpolate(fmt(cartTotal.value))}</strong></div>`);
				if (cart.value.length) _push(`<button class="kiosk__checkout-btn"${ssrIncludeBooleanAttr(placing.value) ? " disabled" : ""} data-v-be986fb4>${ssrInterpolate(placing.value ? "Processing…" : "Place Order →")}</button>`);
				else _push(`<!---->`);
				if (orderError.value) _push(`<p class="kiosk__order-error" data-v-be986fb4>${ssrInterpolate(orderError.value)}</p>`);
				else _push(`<!---->`);
				_push(`</div></div></div>`);
			} else if (state.value === "confirmed") _push(`<div class="kiosk__confirmed" data-v-be986fb4><div class="kiosk__confirmed-icon" data-v-be986fb4>✅</div><h2 data-v-be986fb4>Order Confirmed!</h2><p class="kiosk__confirmed-num" data-v-be986fb4>${ssrInterpolate(confirmOrder.value.order_number)}</p><p class="kiosk__confirmed-total" data-v-be986fb4>${ssrInterpolate(fmt(confirmOrder.value.grand_total))}</p><p class="kiosk__confirmed-msg" data-v-be986fb4>${ssrInterpolate(confirmOrder.value.message)}</p><div class="kiosk__countdown" data-v-be986fb4> Returning to start in <strong data-v-be986fb4>${ssrInterpolate(countdown.value)}</strong>s </div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Guest/Kiosk.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Kiosk_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-be986fb4"]]);
//#endregion
export { Kiosk_default as default };
