import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
//#region node_modules/laravel-vite-plugin/inertia-helpers/index.js
async function resolvePageComponent(path, pages) {
	for (const p of Array.isArray(path) ? path : [path]) {
		const page = pages[p];
		if (typeof page === "undefined") continue;
		return typeof page === "function" ? page() : page;
	}
	throw new Error(`Page not found: ${path}`);
}
//#endregion
//#region resources/js/ssr.js
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	title: (title) => title ? `${title} — GrillVibes Admin` : "GrillVibes Admin",
	resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, /* #__PURE__ */ Object.assign({
		"./pages/AboutPage.vue": () => import("./assets/AboutPage-DriDEC7v.js"),
		"./pages/AdminDashboardPage.vue": () => import("./assets/AdminDashboardPage-CMsHRW5G.js"),
		"./pages/AdminLoginPage.vue": () => import("./assets/AdminLoginPage-Dt-jnN_3.js"),
		"./pages/Blog.vue": () => import("./assets/Blog-BWTpmL6e.js"),
		"./pages/CRM/Discounts.vue": () => import("./assets/Discounts-0ejjepnO.js"),
		"./pages/CRM/Feedback.vue": () => import("./assets/Feedback-D0ld2-JA.js"),
		"./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-C9dYPjgS.js"),
		"./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-CzpoitxY.js"),
		"./pages/ChangePassword.vue": () => import("./assets/ChangePassword-CfieG8UO.js"),
		"./pages/ContactPage.vue": () => import("./assets/ContactPage-EeyZtdgM.js"),
		"./pages/Customers.vue": () => import("./assets/Customers-DjnN1oXU.js"),
		"./pages/Dashboard.vue": () => import("./assets/Dashboard-QIfAeHjX.js"),
		"./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-wVsTXPgA.js"),
		"./pages/Finance/Expenses.vue": () => import("./assets/Expenses-Bi5XjTva.js"),
		"./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-RsbVwlcw.js"),
		"./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-BHxevQHQ.js"),
		"./pages/FoodCategories.vue": () => import("./assets/FoodCategories-BiG-afkG.js"),
		"./pages/FoodItems.vue": () => import("./assets/FoodItems-BGlbspil.js"),
		"./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-CbGU5rZU.js"),
		"./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DOSUvgZs.js"),
		"./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BBMp07EI.js"),
		"./pages/HR/Attendance.vue": () => import("./assets/Attendance-CWZ-6SSZ.js"),
		"./pages/HR/AttendancePunch.vue": () => import("./assets/AttendancePunch-G7EHaDX3.js"),
		"./pages/HR/Designations.vue": () => import("./assets/Designations-CC-qXROy.js"),
		"./pages/HR/Employees.vue": () => import("./assets/Employees-Do2eKuNa.js"),
		"./pages/HR/Leaves.vue": () => import("./assets/Leaves-B7I9sNxc.js"),
		"./pages/HR/Loans.vue": () => import("./assets/Loans-Dp0ccsDh.js"),
		"./pages/HR/Overtime.vue": () => import("./assets/Overtime-DVy46AXg.js"),
		"./pages/HR/Payroll.vue": () => import("./assets/Payroll-BOVXW-3W.js"),
		"./pages/HomePage.vue": () => import("./assets/HomePage-BsTVNmJK.js"),
		"./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-DBKdgM4f.js"),
		"./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-BoYuBhYh.js"),
		"./pages/Inventory/Stock.vue": () => import("./assets/Stock-Kk77M8R_.js"),
		"./pages/KDS/Board.vue": () => import("./assets/Board-CrFcZrWC.js"),
		"./pages/KDS/Stations.vue": () => import("./assets/Stations-UmqTiUpH.js"),
		"./pages/KioskConfig.vue": () => import("./assets/KioskConfig-DrNCz7NE.js"),
		"./pages/Login.vue": () => import("./assets/Login-B2Mlv5u0.js"),
		"./pages/Maintenance/Assets.vue": () => import("./assets/Assets-BvHx3AVH.js"),
		"./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-CfdFyov-.js"),
		"./pages/Orders.vue": () => import("./assets/Orders-BPiWhs6Z.js"),
		"./pages/POS.vue": () => import("./assets/POS-AHVH3Ohs.js"),
		"./pages/Places.vue": () => import("./assets/Places-nCRoqUfR.js"),
		"./pages/PricingPage.vue": () => import("./assets/PricingPage-DN3Gr8cc.js"),
		"./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-bFrWBi-p.js"),
		"./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-RVHVEylq.js"),
		"./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-BJBeiJLB.js"),
		"./pages/ProductPage.vue": () => import("./assets/ProductPage-DGgR8AfK.js"),
		"./pages/Profile.vue": () => import("./assets/Profile-CBhP_O1G.js"),
		"./pages/PublicBlog.vue": () => import("./assets/PublicBlog-B-G0dpdy.js"),
		"./pages/PublicBlogPost.vue": () => import("./assets/PublicBlogPost-DFBvQ2lI.js"),
		"./pages/QRCodes.vue": () => import("./assets/QRCodes-Bt3Fw8ua.js"),
		"./pages/Register.vue": () => import("./assets/Register-B0uYGzjT.js"),
		"./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-gF0mH6g8.js"),
		"./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-Bzd1CgCM.js"),
		"./pages/Reservations/Index.vue": () => import("./assets/Index-PF7I-N0K.js"),
		"./pages/Roles.vue": () => import("./assets/Roles-CypT_-Jf.js"),
		"./pages/Settings.vue": () => import("./assets/Settings-DSGsfpbt.js"),
		"./pages/Users.vue": () => import("./assets/Users-DiKe6Z5m.js")
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin);
	}
}));
//#endregion
export {};
