import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { computed, mergeProps, ref, useSSRContext } from "vue";
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
		const mobileOpen = ref(false);
		const heroModules = [
			{
				label: "POS & Orders",
				icon: "▣"
			},
			{
				label: "Kitchen Display",
				icon: "◫"
			},
			{
				label: "Inventory",
				icon: "▦"
			},
			{
				label: "Staff",
				icon: "♙"
			},
			{
				label: "Finance",
				icon: "₨"
			},
			{
				label: "Customers",
				icon: "◌"
			},
			{
				label: "Reports",
				icon: "◒"
			}
		];
		const extendedModules = [
			{
				index: "01",
				icon: "⌁",
				tone: "violet",
				title: "Front of House",
				description: "POS, orders, tables, reservations, QR menus, and guest flow.",
				link: "front-of-house tools",
				href: "/pos"
			},
			{
				index: "02",
				icon: "▦",
				tone: "teal",
				title: "Kitchen Operations",
				description: "KDS, recipes, food items, stations, and production workflows.",
				link: "kitchen workspace",
				href: "/kds/board"
			},
			{
				index: "03",
				icon: "◒",
				tone: "gold",
				title: "Inventory & Purchasing",
				description: "Ingredients, stock, vendors, purchase orders, and goods receipts.",
				link: "stock controls",
				href: "/inventory/stock"
			},
			{
				index: "04",
				icon: "↗",
				tone: "blue",
				title: "People & Finance",
				description: "Employees, payroll, expenses, attendance, leave, and reporting.",
				link: "people tools",
				href: "/hr/attendance"
			},
			{
				index: "05",
				icon: "◇",
				tone: "pink",
				title: "Customer Growth",
				description: "Loyalty, promos, discounts, feedback, CRM, and guest records.",
				link: "customer tools",
				href: "/customers"
			},
			{
				index: "06",
				icon: "⌘",
				tone: "green",
				title: "Multi-Branch & Control",
				description: "Branches, assets, settings, WhatsApp, activity, and operations control.",
				link: "management tools",
				href: "/dashboard"
			}
		];
		const props = __props;
		const foodItems = computed(() => props.foodItems.map((item) => ({
			...item,
			food_category: item.food_category || props.categories.find((category) => category.id === item.foodcategory_id)
		})));
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "product-page" }, _attrs))} data-v-fbf27b7d><header class="site-header" data-v-fbf27b7d><a class="brand" href="/" aria-label="KitchenOS home" data-v-fbf27b7d><span class="brand-mark" data-v-fbf27b7d>K</span><span data-v-fbf27b7d>Kitchen<span class="brand-accent" data-v-fbf27b7d>OS</span></span></a><nav class="${ssrRenderClass([{ "site-nav--open": mobileOpen.value }, "site-nav"])}" aria-label="Primary navigation" data-v-fbf27b7d><a href="#features" data-v-fbf27b7d>Features</a><a href="#solutions" data-v-fbf27b7d>Solutions</a><a href="#workflow" data-v-fbf27b7d>Pricing</a><a href="/blog" data-v-fbf27b7d>Blog</a><a href="#footer" data-v-fbf27b7d>Contact</a></nav><div class="header-actions" data-v-fbf27b7d><a class="header-login" href="/login" data-v-fbf27b7d>Sign In</a><a class="button button--violet button--small" href="/login" data-v-fbf27b7d>Get Started <span data-v-fbf27b7d>↗</span></a><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", mobileOpen.value)} aria-label="Toggle navigation" data-v-fbf27b7d><span data-v-fbf27b7d></span><span data-v-fbf27b7d></span><span data-v-fbf27b7d></span></button></div></header><main data-v-fbf27b7d><section class="hero" data-v-fbf27b7d><div class="hero-bg" data-v-fbf27b7d></div><div class="hero-overlay" data-v-fbf27b7d></div><div class="hero-content section-wrap" data-v-fbf27b7d><div class="hero-copy" data-v-fbf27b7d><p class="kicker" data-v-fbf27b7d><span data-v-fbf27b7d></span> Restaurant management made simple</p><h1 data-v-fbf27b7d>All You Need to Run<br data-v-fbf27b7d>a Successful <em data-v-fbf27b7d>Restaurant</em></h1><p class="hero-lede" data-v-fbf27b7d>From POS to kitchen, inventory to finance — KitchenOS brings everything together in one powerful platform.</p><div class="hero-actions" data-v-fbf27b7d><a class="button button--violet" href="/login" data-v-fbf27b7d>Get Started Free</a><a class="button button--ghost" href="#solutions" data-v-fbf27b7d><span class="play" data-v-fbf27b7d>▶</span> Watch Demo</a></div><div class="hero-mini-points" data-v-fbf27b7d><span data-v-fbf27b7d>Every branch</span><span data-v-fbf27b7d>Every service channel</span><span data-v-fbf27b7d>Every handoff</span></div></div><div class="hero-product" data-v-fbf27b7d><div class="scribble-note" data-v-fbf27b7d>More Than<br data-v-fbf27b7d><strong data-v-fbf27b7d>Just a POS</strong> <span data-v-fbf27b7d>↘</span></div><div class="live-orders glass-card" data-v-fbf27b7d><div class="live-heading" data-v-fbf27b7d><span class="status-dot" data-v-fbf27b7d></span><strong data-v-fbf27b7d>Live Orders</strong><span class="mini-arrow" data-v-fbf27b7d>↗</span></div><div class="order-row" data-v-fbf27b7d><b data-v-fbf27b7d>#1024</b><span data-v-fbf27b7d>Chicken Burger</span><em class="preparing" data-v-fbf27b7d>Preparing</em></div><div class="order-row" data-v-fbf27b7d><b data-v-fbf27b7d>#1023</b><span data-v-fbf27b7d>BBQ Platter</span><em class="ready" data-v-fbf27b7d>Ready</em></div><div class="order-row" data-v-fbf27b7d><b data-v-fbf27b7d>#1022</b><span data-v-fbf27b7d>Zinger Meal</span><em class="served" data-v-fbf27b7d>Served</em></div><a href="/orders" data-v-fbf27b7d>View all orders →</a></div><div class="burger-stage" data-v-fbf27b7d><img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&amp;fit=crop&amp;w=1100&amp;q=88" alt="Premium restaurant burger" data-v-fbf27b7d></div></div></div><div class="section-wrap module-bar glass-card" data-v-fbf27b7d><!--[-->`);
			ssrRenderList(heroModules, (item) => {
				_push(`<div class="hero-module" data-v-fbf27b7d><div class="module-icon" data-v-fbf27b7d>${ssrInterpolate(item.icon)}</div><span data-v-fbf27b7d>${ssrInterpolate(item.label)}</span></div>`);
			});
			_push(`<!--]--></div><div class="section-wrap stats-row" data-v-fbf27b7d><div data-v-fbf27b7d><strong data-v-fbf27b7d>500+</strong><span data-v-fbf27b7d>Restaurants</span></div><div data-v-fbf27b7d><strong data-v-fbf27b7d>1M+</strong><span data-v-fbf27b7d>Orders Daily</span></div><div data-v-fbf27b7d><strong data-v-fbf27b7d>99.9%</strong><span data-v-fbf27b7d>Uptime</span></div><div data-v-fbf27b7d><strong data-v-fbf27b7d>24/7</strong><span data-v-fbf27b7d>Support</span></div></div></section><section id="solutions" class="product-preview section-wrap" data-v-fbf27b7d><div class="preview-layout" data-v-fbf27b7d><div class="dashboard-shell" data-v-fbf27b7d><div class="dash-topbar" data-v-fbf27b7d><span class="window-dot" data-v-fbf27b7d></span><span class="window-dot" data-v-fbf27b7d></span><span class="window-dot" data-v-fbf27b7d></span><b data-v-fbf27b7d>KitchenOS / Main branch</b><span class="dash-live" data-v-fbf27b7d>● Service live</span></div><div class="dashboard-body" data-v-fbf27b7d><aside class="dash-sidebar" data-v-fbf27b7d><div class="dash-logo" data-v-fbf27b7d>Kitchen<span data-v-fbf27b7d>OS</span></div><div class="dash-item active" data-v-fbf27b7d>⌂ <span data-v-fbf27b7d>Dashboard</span></div><div class="dash-item" data-v-fbf27b7d>◫ <span data-v-fbf27b7d>Orders</span></div><div class="dash-item" data-v-fbf27b7d>▣ <span data-v-fbf27b7d>POS</span></div><div class="dash-item" data-v-fbf27b7d>◉ <span data-v-fbf27b7d>Kitchen</span></div><div class="dash-item" data-v-fbf27b7d>▦ <span data-v-fbf27b7d>Inventory</span></div><div class="dash-item" data-v-fbf27b7d>♙ <span data-v-fbf27b7d>Customers</span></div><div class="dash-item" data-v-fbf27b7d>◌ <span data-v-fbf27b7d>Staff</span></div><div class="dash-item" data-v-fbf27b7d>◒ <span data-v-fbf27b7d>Reports</span></div><div class="dash-item" data-v-fbf27b7d>⚙ <span data-v-fbf27b7d>Settings</span></div></aside><div class="dash-main" data-v-fbf27b7d><div class="dash-heading" data-v-fbf27b7d><div data-v-fbf27b7d><small data-v-fbf27b7d>Tuesday, 08 September · Main branch</small><h3 data-v-fbf27b7d>Dashboard</h3></div><button data-v-fbf27b7d>＋ New order</button></div><div class="dash-metrics" data-v-fbf27b7d><div data-v-fbf27b7d><small data-v-fbf27b7d>Today&#39;s Sales</small><strong data-v-fbf27b7d>Rs. 24,580</strong><em data-v-fbf27b7d>↗ 12%</em></div><div data-v-fbf27b7d><small data-v-fbf27b7d>Total Orders</small><strong data-v-fbf27b7d>186</strong><em data-v-fbf27b7d>↗ 8%</em></div><div data-v-fbf27b7d><small data-v-fbf27b7d>Active Tables</small><strong data-v-fbf27b7d>12</strong><em data-v-fbf27b7d>↗ 0%</em></div><div data-v-fbf27b7d><small data-v-fbf27b7d>Customers</small><strong data-v-fbf27b7d>84</strong><em data-v-fbf27b7d>↗ 16%</em></div></div><div class="dash-grid" data-v-fbf27b7d><div class="chart-panel" data-v-fbf27b7d><div class="panel-head" data-v-fbf27b7d><b data-v-fbf27b7d>Sales overview</b><span data-v-fbf27b7d>Last 7 days</span></div><div class="fake-chart" data-v-fbf27b7d><i style="${ssrRenderStyle({ "height": "32%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "46%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "40%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "63%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "54%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "74%" })}" data-v-fbf27b7d></i><i style="${ssrRenderStyle({ "height": "88%" })}" data-v-fbf27b7d></i></div><div class="chart-labels" data-v-fbf27b7d><span data-v-fbf27b7d>Wed</span><span data-v-fbf27b7d>Thu</span><span data-v-fbf27b7d>Fri</span><span data-v-fbf27b7d>Sat</span><span data-v-fbf27b7d>Sun</span><span data-v-fbf27b7d>Mon</span><span data-v-fbf27b7d>Tue</span></div></div><div class="recent-panel" data-v-fbf27b7d><div class="panel-head" data-v-fbf27b7d><b data-v-fbf27b7d>Recent orders</b><span data-v-fbf27b7d>View all</span></div><p data-v-fbf27b7d><b data-v-fbf27b7d>#1024</b><span data-v-fbf27b7d>Chicken Burger</span><em class="preparing" data-v-fbf27b7d>Preparing</em></p><p data-v-fbf27b7d><b data-v-fbf27b7d>#1023</b><span data-v-fbf27b7d>BBQ Platter</span><em class="ready" data-v-fbf27b7d>Ready</em></p><p data-v-fbf27b7d><b data-v-fbf27b7d>#1022</b><span data-v-fbf27b7d>Zinger Meal</span><em class="served" data-v-fbf27b7d>Served</em></p></div></div></div></div></div><div class="preview-copy" data-v-fbf27b7d><h2 data-v-fbf27b7d>Smart Tools for<br data-v-fbf27b7d>Modern Restaurants</h2><p data-v-fbf27b7d>KitchenOS gives you complete control over your restaurant operations with easy-to-use tools and powerful insights.</p><div class="check-list" data-v-fbf27b7d><div data-v-fbf27b7d><span data-v-fbf27b7d>✓</span>All-in-one restaurant management</div><div data-v-fbf27b7d><span data-v-fbf27b7d>✓</span>Works for single or multi-branch restaurants</div><div data-v-fbf27b7d><span data-v-fbf27b7d>✓</span>Real-time order &amp; kitchen sync</div><div data-v-fbf27b7d><span data-v-fbf27b7d>✓</span>Secure and scalable</div><div data-v-fbf27b7d><span data-v-fbf27b7d>✓</span>Dedicated support</div></div><div class="preview-actions" data-v-fbf27b7d><a class="button button--violet" href="/login" data-v-fbf27b7d>Get started free <span data-v-fbf27b7d>→</span></a><a class="text-link text-link--light" href="#features" data-v-fbf27b7d>View features <span data-v-fbf27b7d>↗</span></a></div></div></div></section><section id="features" class="modules-section section-wrap" data-v-fbf27b7d><div class="section-heading section-heading--center" data-v-fbf27b7d><div data-v-fbf27b7d><h2 data-v-fbf27b7d>Everything Your<br data-v-fbf27b7d>Restaurant Needs</h2></div><p data-v-fbf27b7d>Complete tools to run, manage and grow your restaurant business.</p></div><div class="module-grid" data-v-fbf27b7d><!--[-->`);
			ssrRenderList(extendedModules, (module) => {
				_push(`<article class="module-card" data-v-fbf27b7d><div class="${ssrRenderClass([module.tone, "module-icon"])}" data-v-fbf27b7d>${ssrInterpolate(module.icon)}</div><div data-v-fbf27b7d><span class="module-index" data-v-fbf27b7d>${ssrInterpolate(module.index)}</span><h3 data-v-fbf27b7d>${ssrInterpolate(module.title)}</h3><p data-v-fbf27b7d>${ssrInterpolate(module.description)}</p><a${ssrRenderAttr("href", module.href)} data-v-fbf27b7d>Explore ${ssrInterpolate(module.link)} <span data-v-fbf27b7d>↗</span></a></div></article>`);
			});
			_push(`<!--]--></div></section><section id="workflow" class="workflow-section" data-v-fbf27b7d><div class="section-wrap workflow-inner" data-v-fbf27b7d><div class="workflow-copy" data-v-fbf27b7d><p class="kicker kicker--violet" data-v-fbf27b7d>The service loop</p><h2 data-v-fbf27b7d>Less chasing.<br data-v-fbf27b7d><em data-v-fbf27b7d>More serving.</em></h2><p data-v-fbf27b7d>One order can move from guest to station to stock movement to management report without being re-entered or lost between teams.</p><a class="button button--violet" href="/dashboard" data-v-fbf27b7d>See the operations view <span data-v-fbf27b7d>→</span></a></div><div class="flow-list" data-v-fbf27b7d><!--[-->`);
			ssrRenderList(workflow, (step, index) => {
				_push(`<div class="flow-step" data-v-fbf27b7d><span data-v-fbf27b7d>0${ssrInterpolate(index + 1)}</span><div data-v-fbf27b7d><b data-v-fbf27b7d>${ssrInterpolate(step.title)}</b><p data-v-fbf27b7d>${ssrInterpolate(step.description)}</p></div></div>`);
			});
			_push(`<!--]--></div></div></section><section id="guest-ordering" class="guest-section section-wrap" data-v-fbf27b7d><div class="guest-card" data-v-fbf27b7d><div class="guest-copy" data-v-fbf27b7d><p class="kicker kicker--violet" data-v-fbf27b7d>Guest channels, one kitchen queue</p><h2 data-v-fbf27b7d>One guest experience.<br data-v-fbf27b7d><em data-v-fbf27b7d>One kitchen queue.</em></h2><p data-v-fbf27b7d>Publish a QR menu for the table, run a branded kiosk at the counter, or take the order at POS. Every channel lands in the same kitchen and reporting flow.</p><div class="guest-links" data-v-fbf27b7d><a href="/menu/demo" data-v-fbf27b7d>Preview QR menu ↗</a><a href="/kiosk/1" data-v-fbf27b7d>Open kiosk ↗</a><a href="/pos" data-v-fbf27b7d>See POS ↗</a></div></div><div class="guest-visual" data-v-fbf27b7d><div class="qr-card" data-v-fbf27b7d><span data-v-fbf27b7d>QR</span><div class="qr-pattern" data-v-fbf27b7d><i data-v-fbf27b7d></i><i data-v-fbf27b7d></i><i data-v-fbf27b7d></i><i data-v-fbf27b7d></i></div><small data-v-fbf27b7d>TABLE 18</small></div><div class="kiosk-card" data-v-fbf27b7d><small data-v-fbf27b7d>KIOSK ORDER</small><strong data-v-fbf27b7d>2 × House ramen</strong><span data-v-fbf27b7d>1 × Yuzu soda</span><em data-v-fbf27b7d>Routed to kitchen →</em></div><div class="pos-chip" data-v-fbf27b7d>POS <span data-v-fbf27b7d>● Live</span></div></div></div></section><section id="menu" class="menu-showcase section-wrap" data-v-fbf27b7d><div class="section-heading section-heading--menu" data-v-fbf27b7d><div data-v-fbf27b7d><p class="kicker kicker--violet" data-v-fbf27b7d>Live menu catalogue</p><h2 data-v-fbf27b7d>Every dish.<br data-v-fbf27b7d><em data-v-fbf27b7d>Always connected.</em></h2></div><p data-v-fbf27b7d>Use the same live food catalogue for your team and guest-facing channels.</p></div>`);
			if (foodItems.value.length) {
				_push(`<div class="product-menu-grid" data-v-fbf27b7d><!--[-->`);
				ssrRenderList(foodItems.value, (item) => {
					_push(`<article class="product-menu-card" data-v-fbf27b7d><div class="${ssrRenderClass([{ "product-image--empty": !item.image }, "product-image"])}" data-v-fbf27b7d>`);
					if (item.image) _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} loading="lazy" data-v-fbf27b7d>`);
					else _push(`<span data-v-fbf27b7d>KitchenOS</span>`);
					_push(`</div><div class="product-menu-card__body" data-v-fbf27b7d><span data-v-fbf27b7d>${ssrInterpolate(item.food_category?.name || "Menu item")}</span><h3 data-v-fbf27b7d>${ssrInterpolate(item.name)}</h3><p data-v-fbf27b7d>${ssrInterpolate(item.description)}</p><strong data-v-fbf27b7d>£${ssrInterpolate(item.price)}</strong></div></article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<p class="menu-empty" data-v-fbf27b7d>No published menu products yet. Add food items from the KitchenOS workspace.</p>`);
			_push(`</section><section class="final-cta section-wrap" data-v-fbf27b7d><div class="final-cta-inner" data-v-fbf27b7d><div data-v-fbf27b7d><p class="kicker kicker--violet" data-v-fbf27b7d>Your restaurant, connected</p><h2 data-v-fbf27b7d>Run your restaurant<br data-v-fbf27b7d><em data-v-fbf27b7d>with more control.</em></h2><p data-v-fbf27b7d>Bring your front of house, kitchen, stock, people, finance, and guest channels into one connected workspace.</p></div><div class="final-actions" data-v-fbf27b7d><a class="button button--violet" href="/login" data-v-fbf27b7d>Get started free <span data-v-fbf27b7d>→</span></a><a class="text-link text-link--light" href="#features" data-v-fbf27b7d>Explore KitchenOS <span data-v-fbf27b7d>↗</span></a></div></div></section></main><footer id="footer" class="site-footer" data-v-fbf27b7d><div class="section-wrap footer-grid" data-v-fbf27b7d><div data-v-fbf27b7d><a class="brand" href="/" data-v-fbf27b7d><span class="brand-mark" data-v-fbf27b7d>K</span><span data-v-fbf27b7d>Kitchen<span class="brand-accent" data-v-fbf27b7d>OS</span></span></a><p data-v-fbf27b7d>One calm place to run a busy restaurant.</p></div><nav aria-label="Footer navigation" data-v-fbf27b7d><a href="#features" data-v-fbf27b7d>Features</a><a href="#workflow" data-v-fbf27b7d>Workflow</a><a href="#guest-ordering" data-v-fbf27b7d>Guest ordering</a><a href="#menu" data-v-fbf27b7d>Menu</a></nav><a href="/login" class="footer-signin" data-v-fbf27b7d>Sign in to KitchenOS ↗</a></div></footer></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ProductPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-fbf27b7d"]]);
//#endregion
export { ProductPage_default as default };
