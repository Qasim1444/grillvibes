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
		"./pages/Blog.vue": () => import("./assets/Blog-CO25a4gR.js"),
		"./pages/CRM/Discounts.vue": () => import("./assets/Discounts-B-4XbJKh.js"),
		"./pages/CRM/Feedback.vue": () => import("./assets/Feedback-8sNFDScr.js"),
		"./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-Dtg6yeoQ.js"),
		"./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-DZipbEkC.js"),
		"./pages/ChangePassword.vue": () => import("./assets/ChangePassword-DXFCTNq0.js"),
		"./pages/ContactPage.vue": () => import("./assets/ContactPage-EeyZtdgM.js"),
		"./pages/Customers.vue": () => import("./assets/Customers-C68FFol5.js"),
		"./pages/Dashboard.vue": () => import("./assets/Dashboard-BnfFNyv_.js"),
		"./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-wVsTXPgA.js"),
		"./pages/Finance/Expenses.vue": () => import("./assets/Expenses-BPxh905P.js"),
		"./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-DTv4RJNv.js"),
		"./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-DJ4sNo-l.js"),
		"./pages/FoodCategories.vue": () => import("./assets/FoodCategories-BQ-C6qEs.js"),
		"./pages/FoodItems.vue": () => import("./assets/FoodItems-OIcUcZ9C.js"),
		"./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-CbGU5rZU.js"),
		"./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DOSUvgZs.js"),
		"./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BBMp07EI.js"),
		"./pages/HR/Attendance.vue": () => import("./assets/Attendance--Jp4ByOD.js"),
		"./pages/HR/AttendancePunch.vue": () => import("./assets/AttendancePunch-Sp9qpiqb.js"),
		"./pages/HR/Designations.vue": () => import("./assets/Designations--O81yISn.js"),
		"./pages/HR/Employees.vue": () => import("./assets/Employees-CdEG4FFk.js"),
		"./pages/HR/Leaves.vue": () => import("./assets/Leaves-BtAtBZyk.js"),
		"./pages/HR/Loans.vue": () => import("./assets/Loans-BwJQkpvZ.js"),
		"./pages/HR/Overtime.vue": () => import("./assets/Overtime-It31CjUD.js"),
		"./pages/HR/Payroll.vue": () => import("./assets/Payroll-CujvIA87.js"),
		"./pages/HomePage.vue": () => import("./assets/HomePage-BsTVNmJK.js"),
		"./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-DOCGsY3d.js"),
		"./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-mbIiyIGS.js"),
		"./pages/Inventory/Stock.vue": () => import("./assets/Stock-Sh4rHJiT.js"),
		"./pages/KDS/Board.vue": () => import("./assets/Board-B-za4sjG.js"),
		"./pages/KDS/Stations.vue": () => import("./assets/Stations-BqHSgfxQ.js"),
		"./pages/KioskConfig.vue": () => import("./assets/KioskConfig-BfIeoQXT.js"),
		"./pages/Login.vue": () => import("./assets/Login-B2Mlv5u0.js"),
		"./pages/Maintenance/Assets.vue": () => import("./assets/Assets-1lxwdGE-.js"),
		"./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-CfoishP5.js"),
		"./pages/Orders.vue": () => import("./assets/Orders-CAogWcOf.js"),
		"./pages/POS.vue": () => import("./assets/POS-D1QseflK.js"),
		"./pages/Places.vue": () => import("./assets/Places-Dgv9JPvV.js"),
		"./pages/PricingPage.vue": () => import("./assets/PricingPage-DN3Gr8cc.js"),
		"./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-PqhvhN8P.js"),
		"./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-Beuf-Wpm.js"),
		"./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-D3xlumH_.js"),
		"./pages/ProductPage.vue": () => import("./assets/ProductPage-DGgR8AfK.js"),
		"./pages/Profile.vue": () => import("./assets/Profile-DWsN_M0E.js"),
		"./pages/PublicBlog.vue": () => import("./assets/PublicBlog-B-G0dpdy.js"),
		"./pages/PublicBlogPost.vue": () => import("./assets/PublicBlogPost-DFBvQ2lI.js"),
		"./pages/QRCodes.vue": () => import("./assets/QRCodes-CNUdqwAY.js"),
		"./pages/Register.vue": () => import("./assets/Register-B0uYGzjT.js"),
		"./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-BLbgcU55.js"),
		"./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-BAkjiULj.js"),
		"./pages/Reservations/Index.vue": () => import("./assets/Index-fjHbpCz6.js"),
		"./pages/Roles.vue": () => import("./assets/Roles-CWjKRMP5.js"),
		"./pages/Settings.vue": () => import("./assets/Settings-Co-0nfo2.js"),
		"./pages/Users.vue": () => import("./assets/Users-BWj9ruuG.js")
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin);
	}
}));
//#endregion
export {};
