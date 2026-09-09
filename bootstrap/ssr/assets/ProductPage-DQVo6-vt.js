import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { computed, mergeProps, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
//#region resources/js/pages/ProductPage.vue
var _sfc_main = {
	__name: "ProductPage",
	__ssrInlineRender: true,
	props: {
		categories: {
			type: Array,
			default: () => []
		},
		foodItems: {
			type: Array,
			default: () => []
		}
	},
	setup(__props) {
		const props = __props;
		const foodItems = computed(() => props.foodItems.map((item) => ({
			...item,
			food_category: item.food_category || props.categories.find((category) => category.id === item.foodcategory_id)
		})));
		const modules = [
			{
				icon: "⌁",
				tone: "coral",
				title: "Orders & POS",
				description: "Capture dine-in, takeaway, delivery, and counter sales in one order stream.",
				link: "orders workspace",
				href: "/orders"
			},
			{
				icon: "▦",
				tone: "teal",
				title: "Kitchen production",
				description: "Route tickets to stations, track preparation, and keep the pass moving.",
				link: "KDS board",
				href: "/kds/board"
			},
			{
				icon: "◒",
				tone: "gold",
				title: "Stock & procurement",
				description: "Connect recipes and goods receipts to stock levels, vendors, and reorder decisions.",
				link: "stock controls",
				href: "/inventory/stock"
			},
			{
				icon: "↗",
				tone: "blue",
				title: "People & payroll",
				description: "Keep attendance, leave, overtime, loans, and payroll in the same back office.",
				link: "people tools",
				href: "/hr/attendance"
			},
			{
				icon: "◇",
				tone: "violet",
				title: "Guests & loyalty",
				description: "Build repeat visits with customer profiles, promos, feedback, and loyalty activity.",
				link: "customer records",
				href: "/customers"
			},
			{
				icon: "▤",
				tone: "green",
				title: "Reports & control",
				description: "Turn sales, food cost, expenses, and branch activity into decisions.",
				link: "food-cost reports",
				href: "/reports/food-cost"
			}
		];
		const workflow = [
			{
				title: "Take the order",
				description: "POS, QR menu, kiosk, and front-of-house teams feed one order stream."
			},
			{
				title: "Make production visible",
				description: "The KDS shows the right ticket, station, timing, and priority to the kitchen."
			},
			{
				title: "Keep stock accountable",
				description: "Recipes, purchase orders, and goods receipts connect service volume to inventory movement."
			},
			{
				title: "Run the business",
				description: "Reports bring sales, food cost, expenses, people, and guest signals together."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-137cb27d><header class="site-header" data-v-137cb27d><a class="brand" href="/" aria-label="KitchenOS home" data-v-137cb27d><span class="brand-mark" data-v-137cb27d>K</span><span data-v-137cb27d>Kitchen<span class="brand-accent" data-v-137cb27d>OS</span></span></a><nav class="site-nav" aria-label="Primary navigation" data-v-137cb27d><a href="#menu" data-v-137cb27d>Menu</a><a href="/product" data-v-137cb27d>Product</a><a href="#workflow" data-v-137cb27d>The service loop</a><a href="#guest-ordering" data-v-137cb27d>Guest channels</a></nav><a class="header-login" href="/login" data-v-137cb27d>Sign in <span aria-hidden="true" data-v-137cb27d>↗</span></a></header><main data-v-137cb27d><section class="hero section-wrap" data-v-137cb27d><div class="hero-copy" data-v-137cb27d><p class="kicker" data-v-137cb27d><span class="pulse-dot" data-v-137cb27d></span> The restaurant operating system</p><h1 data-v-137cb27d>Run service from one clear view.</h1><p class="hero-lede" data-v-137cb27d>KitchenOS brings orders, kitchen production, stock, people, guests, and finance into one operating rhythm for every branch.</p><div class="hero-actions" data-v-137cb27d><a class="button button--solid" href="/login" data-v-137cb27d>Enter the workspace <span aria-hidden="true" data-v-137cb27d>→</span></a><a class="button button--quiet" href="#modules" data-v-137cb27d>See what is connected</a></div><div class="hero-notes" data-v-137cb27d><span data-v-137cb27d>Every branch</span><span data-v-137cb27d>Every service channel</span><span data-v-137cb27d>Every handoff</span></div></div><div class="command-center" aria-label="KitchenOS shift overview preview" data-v-137cb27d><div class="window-bar" data-v-137cb27d><span data-v-137cb27d></span><span data-v-137cb27d></span><span data-v-137cb27d></span><b data-v-137cb27d>Tuesday / Main branch</b><i data-v-137cb27d>● Service live</i></div><div class="command-body" data-v-137cb27d><aside class="mini-sidebar" data-v-137cb27d><strong data-v-137cb27d>KitchenOS</strong><span class="mini-active" data-v-137cb27d>Overview</span><span data-v-137cb27d>Orders + POS</span><span data-v-137cb27d>Kitchen board</span><span data-v-137cb27d>Stockroom</span><span data-v-137cb27d>People + finance</span></aside><div class="mini-main" data-v-137cb27d><div class="mini-heading" data-v-137cb27d><div data-v-137cb27d><small data-v-137cb27d>Tuesday, 08 September · Main branch</small><h2 data-v-137cb27d>Good morning, team.</h2></div><button data-v-137cb27d>＋ New order</button></div><div class="metric-row" data-v-137cb27d><div class="metric" data-v-137cb27d><small data-v-137cb27d>Today&#39;s sales</small><strong data-v-137cb27d>£8,426</strong><em data-v-137cb27d>↑ 12.8% vs last Tue</em></div><div class="metric" data-v-137cb27d><small data-v-137cb27d>Live orders</small><strong data-v-137cb27d>42</strong><em class="warning" data-v-137cb27d>8 being prepared</em></div><div class="metric" data-v-137cb27d><small data-v-137cb27d>Stock alerts</small><strong data-v-137cb27d>06</strong><em class="danger" data-v-137cb27d>2 need ordering</em></div></div><div class="mini-grid" data-v-137cb27d><div class="chart-card" data-v-137cb27d><div class="card-title" data-v-137cb27d><b data-v-137cb27d>Service pace</b><span data-v-137cb27d>Last 7 days</span></div><div class="bars" data-v-137cb27d><i style="${ssrRenderStyle({ "height": "42%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "62%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "51%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "78%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "68%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "91%" })}" data-v-137cb27d></i><i style="${ssrRenderStyle({ "height": "82%" })}" data-v-137cb27d></i></div><div class="chart-labels" data-v-137cb27d><span data-v-137cb27d>Wed</span><span data-v-137cb27d>Thu</span><span data-v-137cb27d>Fri</span><span data-v-137cb27d>Sat</span><span data-v-137cb27d>Sun</span><span data-v-137cb27d>Mon</span><span data-v-137cb27d>Tue</span></div></div><div class="queue-card" data-v-137cb27d><div class="card-title" data-v-137cb27d><b data-v-137cb27d>Kitchen queue</b><span class="queue-live" data-v-137cb27d>Live</span></div><p data-v-137cb27d><b data-v-137cb27d>#1048</b><span data-v-137cb27d>Table 12 · 4 items</span><strong data-v-137cb27d>04:12</strong></p><p data-v-137cb27d><b data-v-137cb27d>#1047</b><span data-v-137cb27d>Delivery · 2 items</span><strong data-v-137cb27d>07:38</strong></p><p data-v-137cb27d><b data-v-137cb27d>#1046</b><span data-v-137cb27d>Table 04 · 6 items</span><strong class="late" data-v-137cb27d>12:04</strong></p></div></div></div></div></div></section><section class="trust-strip" data-v-137cb27d><div class="section-wrap trust-inner" data-v-137cb27d><span data-v-137cb27d>One operating rhythm for</span><b data-v-137cb27d>front of house</b><b data-v-137cb27d>kitchen stations</b><b data-v-137cb27d>stockrooms</b><b data-v-137cb27d>people teams</b><b data-v-137cb27d>multi-branch groups</b></div></section><section id="menu" class="section-wrap menu-preview" data-v-137cb27d><div class="section-intro" data-v-137cb27d><p class="kicker" data-v-137cb27d>Menu products</p><h2 data-v-137cb27d>Every dish,<br data-v-137cb27d><em data-v-137cb27d>clearly described.</em></h2><p data-v-137cb27d>Keep your live food catalogue connected to KitchenOS. Categories, descriptions, prices, and images stay ready for your team and your guests.</p></div>`);
			if (foodItems.value.length) {
				_push(`<div class="product-menu-grid" data-v-137cb27d><!--[-->`);
				ssrRenderList(foodItems.value, (item) => {
					_push(`<article class="product-menu-card" data-v-137cb27d>`);
					if (item.image) _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-137cb27d>`);
					else _push(`<!---->`);
					_push(`<div class="product-menu-card__body" data-v-137cb27d><span data-v-137cb27d>${ssrInterpolate(item.food_category?.name || "Menu item")}</span><h3 data-v-137cb27d>${ssrInterpolate(item.name)}</h3><p data-v-137cb27d>${ssrInterpolate(item.description)}</p><strong data-v-137cb27d>£${ssrInterpolate(item.price)}</strong></div></article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="menu-empty" data-v-137cb27d>No published menu products yet. Add food items from the KitchenOS workspace.</p>`);
			_push(`</section><section id="modules" class="section-wrap modules-section" data-v-137cb27d><div class="section-intro" data-v-137cb27d><p class="kicker" data-v-137cb27d>Built around the way restaurants work</p><h2 data-v-137cb27d>From first ticket<br data-v-137cb27d><em data-v-137cb27d>to final figure.</em></h2><p data-v-137cb27d>Each part of the service cycle stays connected, so managers can act on the same information as the team doing the work.</p></div><div class="module-grid" data-v-137cb27d><!--[-->`);
			ssrRenderList(modules, (module) => {
				_push(`<article class="module-card" data-v-137cb27d><div class="${ssrRenderClass([module.tone, "module-icon"])}" data-v-137cb27d>${ssrInterpolate(module.icon)}</div><div data-v-137cb27d><h3 data-v-137cb27d>${ssrInterpolate(module.title)}</h3><p data-v-137cb27d>${ssrInterpolate(module.description)}</p><a${ssrRenderAttr("href", module.href)} data-v-137cb27d>View ${ssrInterpolate(module.link)} <span aria-hidden="true" data-v-137cb27d>↗</span></a></div></article>`);
			});
			_push(`<!--]--></div></section><section id="workflow" class="workflow-band" data-v-137cb27d><div class="section-wrap workflow-inner" data-v-137cb27d><div class="workflow-copy" data-v-137cb27d><p class="kicker" data-v-137cb27d>The service loop</p><h2 data-v-137cb27d>Less chasing.<br data-v-137cb27d><em data-v-137cb27d>More serving.</em></h2><p data-v-137cb27d>One order can move from guest to station to stock movement to management report without being re-entered or lost between teams.</p><a class="text-link" href="/dashboard" data-v-137cb27d>See the operations view <span data-v-137cb27d>→</span></a></div><div class="flow-list" data-v-137cb27d><!--[-->`);
			ssrRenderList(workflow, (step, index) => {
				_push(`<div class="flow-step" data-v-137cb27d><span data-v-137cb27d>0${ssrInterpolate(index + 1)}</span><div data-v-137cb27d><b data-v-137cb27d>${ssrInterpolate(step.title)}</b><p data-v-137cb27d>${ssrInterpolate(step.description)}</p></div></div>`);
			});
			_push(`<!--]--></div></div></section><section id="guest-ordering" class="section-wrap guest-section" data-v-137cb27d><div class="guest-card" data-v-137cb27d><div data-v-137cb27d><p class="kicker kicker--light" data-v-137cb27d>Guest channels, one kitchen queue</p><h2 data-v-137cb27d>Let guests order the way that suits the moment.</h2><p data-v-137cb27d>Publish a QR menu for the table, run a branded kiosk at the counter, or take the order at POS. Every channel lands in the same kitchen and reporting flow.</p><div class="guest-links" data-v-137cb27d><a href="/menu/demo" data-v-137cb27d>Preview a QR menu ↗</a><a href="/kiosk/1" data-v-137cb27d>Open a kiosk ↗</a><a href="/pos" data-v-137cb27d>See POS ↗</a></div></div><div class="guest-visual" data-v-137cb27d><div class="qr-square" data-v-137cb27d><span data-v-137cb27d>QR</span><i data-v-137cb27d></i><i data-v-137cb27d></i><i data-v-137cb27d></i></div><div class="guest-ticket" data-v-137cb27d><small data-v-137cb27d>NEW ORDER · QR MENU</small><b data-v-137cb27d>Table 18</b><span data-v-137cb27d>2 × House ramen</span><span data-v-137cb27d>1 × Yuzu soda</span><strong data-v-137cb27d>Routed to kitchen →</strong></div></div></div></section></main><footer class="site-footer" data-v-137cb27d><div class="section-wrap footer-inner" data-v-137cb27d><a class="brand" href="/" data-v-137cb27d><span class="brand-mark" data-v-137cb27d>K</span><span data-v-137cb27d>Kitchen<span class="brand-accent" data-v-137cb27d>OS</span></span></a><nav class="footer-nav" aria-label="Footer navigation" data-v-137cb27d><a href="#menu" data-v-137cb27d>Menu</a><a href="#workflow" data-v-137cb27d>Workflow</a><a href="#guest-ordering" data-v-137cb27d>Guest channels</a></nav><p data-v-137cb27d>One calm place to run a busy restaurant.</p><a href="/login" data-v-137cb27d>Sign in to KitchenOS ↗</a></div></footer></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ProductPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-137cb27d"]]);
//#endregion
export { ProductPage_default as default };
