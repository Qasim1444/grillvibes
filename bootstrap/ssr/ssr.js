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
	title: (title) => title ? `${title} — KitchenOS Admin` : "KitchenOS Admin",
	resolve: (name) => resolvePageComponent(`./pages/${name}.vue`, /* #__PURE__ */ Object.assign({
		"./pages/AboutPage.vue": () => import("./assets/AboutPage-DUgFYytW.js"),
		"./pages/AdminDashboardPage.vue": () => import("./assets/AdminDashboardPage-BR7Yi4fI.js"),
		"./pages/AdminLoginPage.vue": () => import("./assets/AdminLoginPage-C9MlFLAk.js"),
		"./pages/Blog.vue": () => import("./assets/Blog-B_I3Y_g8.js"),
		"./pages/CRM/Discounts.vue": () => import("./assets/Discounts-pBIc0akn.js"),
		"./pages/CRM/Feedback.vue": () => import("./assets/Feedback-hEzInTFP.js"),
		"./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-vV0o16RC.js"),
		"./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-3AJrGB_e.js"),
		"./pages/ChangePassword.vue": () => import("./assets/ChangePassword-BYGhKpAJ.js"),
		"./pages/ContactPage.vue": () => import("./assets/ContactPage-QRTeJbBJ.js"),
		"./pages/Customers.vue": () => import("./assets/Customers-fuRQ-A8u.js"),
		"./pages/Dashboard.vue": () => import("./assets/Dashboard-4j3c8teC.js"),
		"./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-wVsTXPgA.js"),
		"./pages/Finance/Expenses.vue": () => import("./assets/Expenses-CewwTAVM.js"),
		"./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-BwmYAdER.js"),
		"./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-B-nuwR9F.js"),
		"./pages/FoodCategories.vue": () => import("./assets/FoodCategories-D2iD3dqv.js"),
		"./pages/FoodItems.vue": () => import("./assets/FoodItems-B4N5Qln2.js"),
		"./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-CbGU5rZU.js"),
		"./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DOSUvgZs.js"),
		"./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BBMp07EI.js"),
		"./pages/HR/Attendance.vue": () => import("./assets/Attendance-BJsliXOB.js"),
		"./pages/HR/AttendancePunch.vue": () => import("./assets/AttendancePunch-BScvwMQC.js"),
		"./pages/HR/Designations.vue": () => import("./assets/Designations-BtHLulss.js"),
		"./pages/HR/Employees.vue": () => import("./assets/Employees-Binesp5q.js"),
		"./pages/HR/Leaves.vue": () => import("./assets/Leaves--Egb_qoj.js"),
		"./pages/HR/Loans.vue": () => import("./assets/Loans-DhzDn7o8.js"),
		"./pages/HR/Overtime.vue": () => import("./assets/Overtime-CpSBV4kW.js"),
		"./pages/HR/Payroll.vue": () => import("./assets/Payroll-CooqVQY-.js"),
		"./pages/HomePage.vue": () => import("./assets/HomePage-BNx9nDxG.js"),
		"./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-Chx9QsJ0.js"),
		"./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-1WXDVSS1.js"),
		"./pages/Inventory/Stock.vue": () => import("./assets/Stock-DN4VsgUV.js"),
		"./pages/KDS/Board.vue": () => import("./assets/Board-CrFcZrWC.js"),
		"./pages/KDS/Stations.vue": () => import("./assets/Stations-CpQKhQXo.js"),
		"./pages/KioskConfig.vue": () => import("./assets/KioskConfig-e2AtjUAz.js"),
		"./pages/Login.vue": () => import("./assets/Login-CSrLI1u5.js"),
		"./pages/Maintenance/Assets.vue": () => import("./assets/Assets-BxBgubIN.js"),
		"./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-Cp4JovSN.js"),
		"./pages/Orders.vue": () => import("./assets/Orders-BYEWZnM9.js"),
		"./pages/POS.vue": () => import("./assets/POS-VELQjj0P.js"),
		"./pages/Places.vue": () => import("./assets/Places-BlhHF6HF.js"),
		"./pages/PricingPage.vue": () => import("./assets/PricingPage-bxMVf5-i.js"),
		"./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-rSUEnDpT.js"),
		"./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-C8OcjZql.js"),
		"./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-Ba0RLICy.js"),
		"./pages/Profile.vue": () => import("./assets/Profile-iqogqUtM.js"),
		"./pages/QRCodes.vue": () => import("./assets/QRCodes-CcLe6AYX.js"),
		"./pages/Register.vue": () => import("./assets/Register-B0uYGzjT.js"),
		"./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-C0pYrd_r.js"),
		"./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-DKQp90lx.js"),
		"./pages/Reservations/Index.vue": () => import("./assets/Index-u725s_LA.js"),
		"./pages/Roles.vue": () => import("./assets/Roles-DEStqoiE.js"),
		"./pages/Settings.vue": () => import("./assets/Settings-E4cBaS5p.js"),
		"./pages/Users.vue": () => import("./assets/Users-T30DPr15.js")
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin);
	}
}));
//#endregion
export {};
