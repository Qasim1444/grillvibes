import { ref, onMounted, onUnmounted, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({
  layout: null
}, {
  __name: "QRMenu",
  __ssrInlineRender: true,
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const state = ref("loading");
    const errorMsg = ref("");
    const sessionToken = ref("");
    const menu = ref({
      categories: [],
      items: []
    });
    const place = ref(null);
    const tableInfo = ref(null);
    const config = ref({
      accent_color: "#6366f1",
      require_name: false,
      require_phone: false
    });
    const activeCat = ref(null);
    const cart = ref([]);
    const showCart = ref(false);
    const guestName = ref("");
    const guestPhone = ref("");
    const placing = ref(false);
    const orderError = ref("");
    const confirmOrder = ref(null);
    const orderStatus = ref("");
    let statusTimer = null;
    onMounted(async () => {
      try {
        const res = await fetch(
          `/api/guest/qr/${props.slug}`,
          {
            headers: {
              Accept: "application/json"
            }
          }
        );
        if (!res.ok) {
          let data2 = {};
          try {
            data2 = await res.json();
          } catch (error) {
          }
          throw new Error(
            (data2 == null ? void 0 : data2.error) || "QR code not found."
          );
        }
        const data = await res.json();
        sessionToken.value = data.session_token || "";
        place.value = data.place || null;
        tableInfo.value = data.table || null;
        menu.value = data.menu || {
          categories: [],
          items: []
        };
        config.value = {
          ...config.value,
          ...data.kiosk_config || {}
        };
        state.value = "menu";
      } catch (error) {
        errorMsg.value = (error == null ? void 0 : error.message) || "Unable to load the menu.";
        state.value = "error";
      }
    });
    onUnmounted(() => {
      clearInterval(statusTimer);
    });
    const filteredItems = computed(() => {
      if (activeCat.value === null) {
        return menu.value.items;
      }
      return menu.value.items.filter(
        (item) => item.category_id === activeCat.value
      );
    });
    const cartCount = computed(() => {
      return cart.value.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
      );
    });
    const cartTotal = computed(() => {
      return cart.value.reduce(
        (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
        0
      );
    });
    const cartQty = (id) => {
      var _a;
      return ((_a = cart.value.find(
        (line) => line.fooditems_id === id
      )) == null ? void 0 : _a.quantity) ?? 0;
    };
    const fmt = (value) => {
      return "Rs " + Number(value ?? 0).toLocaleString(
        "en-PK",
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "qrmenu",
        style: { "--accent": config.value.accent_color ?? "#6366f1" }
      }, _attrs))} data-v-6f74139b>`);
      if (state.value === "loading") {
        _push(`<div class="qrmenu__screen qrmenu__screen--loading" data-v-6f74139b><div class="qrmenu__loader" data-v-6f74139b><div class="qrmenu__loader-ring" data-v-6f74139b></div></div><h2 data-v-6f74139b>Preparing your menu</h2><p data-v-6f74139b>Please wait a moment...</p></div>`);
      } else if (state.value === "error") {
        _push(`<div class="qrmenu__screen qrmenu__screen--error" data-v-6f74139b><div class="qrmenu__error-icon" data-v-6f74139b>!</div><h2 data-v-6f74139b>Menu unavailable</h2><p data-v-6f74139b>${ssrInterpolate(errorMsg.value)}</p><button class="qrmenu__primary-btn" data-v-6f74139b> Try Again </button></div>`);
      } else if (state.value === "confirmed") {
        _push(`<div class="qrmenu__confirmation" data-v-6f74139b><div class="qrmenu__success-circle" data-v-6f74139b><span data-v-6f74139b>✓</span></div><span class="qrmenu__confirmation-label" data-v-6f74139b> ORDER CONFIRMED </span><h1 data-v-6f74139b>Thank you!</h1><p class="qrmenu__confirmation-subtitle" data-v-6f74139b> Your order has been sent to the restaurant. </p><div class="qrmenu__order-card" data-v-6f74139b><div class="qrmenu__order-card-row" data-v-6f74139b><span data-v-6f74139b>Order number</span><strong data-v-6f74139b>${ssrInterpolate(confirmOrder.value.order_number)}</strong></div><div class="qrmenu__order-card-divider" data-v-6f74139b></div><div class="qrmenu__order-card-row" data-v-6f74139b><span data-v-6f74139b>Total</span><strong data-v-6f74139b>${ssrInterpolate(fmt(confirmOrder.value.grand_total))}</strong></div></div>`);
        if (orderStatus.value) {
          _push(`<div class="qrmenu__status-card" data-v-6f74139b><span class="qrmenu__status-dot" data-v-6f74139b></span><div data-v-6f74139b><small data-v-6f74139b>ORDER STATUS</small><strong data-v-6f74139b>${ssrInterpolate(orderStatus.value)}</strong></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="qrmenu__confirmation-message" data-v-6f74139b>${ssrInterpolate(confirmOrder.value.message)}</p><button class="qrmenu__primary-btn qrmenu__primary-btn--large" data-v-6f74139b> Order More </button></div>`);
      } else {
        _push(`<!--[--><header class="qrmenu__header" data-v-6f74139b><div class="qrmenu__brand" data-v-6f74139b><div class="qrmenu__brand-icon" data-v-6f74139b>${ssrInterpolate(((_c = (_b = (_a = place.value) == null ? void 0 : _a.name) == null ? void 0 : _b.charAt(0)) == null ? void 0 : _c.toUpperCase()) || "M")}</div><div class="qrmenu__brand-text" data-v-6f74139b><div class="qrmenu__eyebrow" data-v-6f74139b> WELCOME TO </div><h1 class="qrmenu__title" data-v-6f74139b>${ssrInterpolate(((_d = place.value) == null ? void 0 : _d.name) ?? "Restaurant Menu")}</h1>`);
        if (tableInfo.value) {
          _push(`<p class="qrmenu__table" data-v-6f74139b><span class="qrmenu__table-dot" data-v-6f74139b></span> Table ${ssrInterpolate(tableInfo.value.number)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (cartCount.value) {
          _push(`<button class="qrmenu__header-cart" aria-label="Open cart" data-v-6f74139b><span class="qrmenu__cart-icon" data-v-6f74139b> 🛒 </span><span class="qrmenu__header-cart-count" data-v-6f74139b>${ssrInterpolate(cartCount.value)}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</header><section class="qrmenu__welcome" data-v-6f74139b><p class="qrmenu__welcome-kicker" data-v-6f74139b> DISCOVER OUR MENU </p><h2 data-v-6f74139b> Freshly made for you. </h2><p data-v-6f74139b> Browse our menu and add your favourites to your order. </p></section><div class="qrmenu__categories-wrap" data-v-6f74139b><div class="qrmenu__categories" data-v-6f74139b><button class="${ssrRenderClass([{ active: activeCat.value === null }, "qrmenu__category"])}" data-v-6f74139b><span data-v-6f74139b>✨</span> All </button><!--[-->`);
        ssrRenderList(menu.value.categories, (cat) => {
          _push(`<button class="${ssrRenderClass([{ active: activeCat.value === cat.id }, "qrmenu__category"])}" data-v-6f74139b>${ssrInterpolate(cat.name)}</button>`);
        });
        _push(`<!--]--></div></div><main class="qrmenu__content" data-v-6f74139b><div class="qrmenu__section-head" data-v-6f74139b><div data-v-6f74139b><span data-v-6f74139b> MENU </span><h2 data-v-6f74139b>${ssrInterpolate(activeCat.value === null ? "Popular choices" : ((_e = menu.value.categories.find(
          (c) => c.id === activeCat.value
        )) == null ? void 0 : _e.name) || "Menu")}</h2></div><span class="qrmenu__item-count" data-v-6f74139b>${ssrInterpolate(filteredItems.value.length)} items </span></div>`);
        if (filteredItems.value.length) {
          _push(`<div class="qrmenu__grid" data-v-6f74139b><!--[-->`);
          ssrRenderList(filteredItems.value, (item) => {
            _push(`<article class="qrmenu__item" data-v-6f74139b><div class="qrmenu__item-image" data-v-6f74139b>`);
            if (item.image) {
              _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-6f74139b>`);
            } else {
              _push(`<div class="qrmenu__item-placeholder" data-v-6f74139b> 🍽️ </div>`);
            }
            if (cartQty(item.id)) {
              _push(`<span class="qrmenu__item-quantity" data-v-6f74139b>${ssrInterpolate(cartQty(item.id))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div><div class="qrmenu__item-content" data-v-6f74139b><div class="qrmenu__item-top" data-v-6f74139b><h3 data-v-6f74139b>${ssrInterpolate(item.name)}</h3><button class="qrmenu__add-btn" aria-label="Add item" data-v-6f74139b> + </button></div>`);
            if (item.description) {
              _push(`<p class="qrmenu__item-description" data-v-6f74139b>${ssrInterpolate(item.description)}</p>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<div class="qrmenu__item-footer" data-v-6f74139b><span class="qrmenu__item-price" data-v-6f74139b>${ssrInterpolate(fmt(item.price))}</span><span class="qrmenu__item-action" data-v-6f74139b> Add to order </span></div></div></article>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="qrmenu__empty" data-v-6f74139b><div class="qrmenu__empty-icon" data-v-6f74139b> 🍽️ </div><h3 data-v-6f74139b> No items found </h3><p data-v-6f74139b> There are no menu items in this category. </p></div>`);
        }
        _push(`</main>`);
        if (showCart.value) {
          _push(`<div class="qrmenu__backdrop" data-v-6f74139b></div>`);
        } else {
          _push(`<!---->`);
        }
        if (showCart.value) {
          _push(`<aside class="qrmenu__cart" data-v-6f74139b><div class="qrmenu__cart-header" data-v-6f74139b><div data-v-6f74139b><span class="qrmenu__cart-label" data-v-6f74139b> YOUR ORDER </span><h2 data-v-6f74139b> Your Basket </h2></div><button class="qrmenu__close-btn" aria-label="Close cart" data-v-6f74139b> ✕ </button></div><div class="qrmenu__cart-body" data-v-6f74139b><!--[-->`);
          ssrRenderList(cart.value, (line) => {
            _push(`<div class="qrmenu__cart-item" data-v-6f74139b><div class="qrmenu__cart-item-info" data-v-6f74139b><h3 data-v-6f74139b>${ssrInterpolate(line.name)}</h3><span data-v-6f74139b>${ssrInterpolate(fmt(line.price))} each </span></div><div class="qrmenu__cart-item-right" data-v-6f74139b><div class="qrmenu__qty" data-v-6f74139b><button type="button" data-v-6f74139b> − </button><strong data-v-6f74139b>${ssrInterpolate(line.quantity)}</strong><button type="button" data-v-6f74139b> + </button></div><strong class="qrmenu__cart-price" data-v-6f74139b>${ssrInterpolate(fmt(line.price * line.quantity))}</strong></div></div>`);
          });
          _push(`<!--]-->`);
          if (config.value.require_name || config.value.require_phone) {
            _push(`<div class="qrmenu__guest" data-v-6f74139b><div class="qrmenu__guest-title" data-v-6f74139b><span data-v-6f74139b> DETAILS </span><h3 data-v-6f74139b> Before you order </h3></div>`);
            if (config.value.require_name) {
              _push(`<input${ssrRenderAttr("value", guestName.value)} class="qrmenu__input" placeholder="Your name" type="text" autocomplete="name" data-v-6f74139b>`);
            } else {
              _push(`<!---->`);
            }
            if (config.value.require_phone) {
              _push(`<input${ssrRenderAttr("value", guestPhone.value)} class="qrmenu__input" placeholder="Phone number" type="tel" autocomplete="tel" data-v-6f74139b>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          if (orderError.value) {
            _push(`<p class="qrmenu__order-error" data-v-6f74139b>${ssrInterpolate(orderError.value)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="qrmenu__cart-footer" data-v-6f74139b><div class="qrmenu__total" data-v-6f74139b><span data-v-6f74139b> Total </span><strong data-v-6f74139b>${ssrInterpolate(fmt(cartTotal.value))}</strong></div><button class="qrmenu__place-btn"${ssrIncludeBooleanAttr(placing.value || !cart.value.length) ? " disabled" : ""} data-v-6f74139b><span data-v-6f74139b>${ssrInterpolate(placing.value ? "Placing order..." : "Place Order")}</span>`);
          if (!placing.value) {
            _push(`<span data-v-6f74139b> → </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button></div></aside>`);
        } else {
          _push(`<!---->`);
        }
        if (cartCount.value && !showCart.value) {
          _push(`<button class="qrmenu__fab" data-v-6f74139b><span class="qrmenu__fab-left" data-v-6f74139b><span class="qrmenu__fab-badge" data-v-6f74139b>${ssrInterpolate(cartCount.value)}</span><span data-v-6f74139b> View Order </span></span><span class="qrmenu__fab-total" data-v-6f74139b>${ssrInterpolate(fmt(cartTotal.value))}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Guest/QRMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const QRMenu = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f74139b"]]);
export {
  QRMenu as default
};
