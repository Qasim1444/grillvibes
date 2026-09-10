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
		"./pages/Blog.vue": () => import("./assets/Blog-C0cMa8Db.js"),
		"./pages/CRM/Discounts.vue": () => import("./assets/Discounts-ChhTyTEX.js"),
		"./pages/CRM/Feedback.vue": () => import("./assets/Feedback-DqgkX7pz.js"),
		"./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-rpjeshp7.js"),
		"./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-H4VZ_mcJ.js"),
		"./pages/ChangePassword.vue": () => import("./assets/ChangePassword-B3fUGL5G.js"),
		"./pages/ContactPage.vue": () => import("./assets/ContactPage-QRTeJbBJ.js"),
		"./pages/Customers.vue": () => import("./assets/Customers-DnZofigf.js"),
		"./pages/Dashboard.vue": () => import("./assets/Dashboard-CqQjA_Q-.js"),
		"./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-wVsTXPgA.js"),
		"./pages/Finance/Expenses.vue": () => import("./assets/Expenses-DwaLdhXm.js"),
		"./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-LHx413aN.js"),
		"./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-DuDGh5z4.js"),
		"./pages/FoodCategories.vue": () => import("./assets/FoodCategories-CctsEKSO.js"),
		"./pages/FoodItems.vue": () => import("./assets/FoodItems-m8-juhb-.js"),
		"./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-CbGU5rZU.js"),
		"./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DOSUvgZs.js"),
		"./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BBMp07EI.js"),
		"./pages/HR/Attendance.vue": () => import("./assets/Attendance-DyRxGEGy.js"),
		"./pages/HR/AttendancePunch.vue": () => import("./assets/AttendancePunch-BkRab9ax.js"),
		"./pages/HR/Designations.vue": () => import("./assets/Designations-CKPiKIUa.js"),
		"./pages/HR/Employees.vue": () => import("./assets/Employees-GRLt5-jw.js"),
		"./pages/HR/Leaves.vue": () => import("./assets/Leaves-PjLeznvf.js"),
		"./pages/HR/Loans.vue": () => import("./assets/Loans-C8pd5i9e.js"),
		"./pages/HR/Overtime.vue": () => import("./assets/Overtime-B9COc8AD.js"),
		"./pages/HR/Payroll.vue": () => import("./assets/Payroll-CNov9Rfb.js"),
		"./pages/HomePage.vue": () => import("./assets/HomePage-Clv93xjo.js"),
		"./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-CW4F8XB-.js"),
		"./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-MB3IcExJ.js"),
		"./pages/Inventory/Stock.vue": () => import("./assets/Stock-BxrBIDV3.js"),
		"./pages/KDS/Board.vue": () => import("./assets/Board-CrFcZrWC.js"),
		"./pages/KDS/Stations.vue": () => import("./assets/Stations-BfZbbJRD.js"),
		"./pages/KioskConfig.vue": () => import("./assets/KioskConfig-BlvEtKzH.js"),
		"./pages/Login.vue": () => import("./assets/Login-CSrLI1u5.js"),
		"./pages/Maintenance/Assets.vue": () => import("./assets/Assets-BgAxhksG.js"),
		"./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-D74K-K9J.js"),
		"./pages/Orders.vue": () => import("./assets/Orders-BovujrN_.js"),
		"./pages/POS.vue": () => import("./assets/POS-VELQjj0P.js"),
		"./pages/Places.vue": () => import("./assets/Places-EGoahOzR.js"),
		"./pages/PricingPage.vue": () => import("./assets/PricingPage-bxMVf5-i.js"),
		"./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-C8HDVLT9.js"),
		"./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-BHkX-8RI.js"),
		"./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-CkHY5EBd.js"),
		"./pages/ProductPage.vue": () => import("./assets/ProductPage-DbS2PLSk.js"),
		"./pages/Profile.vue": () => import("./assets/Profile-DyeJUTNT.js"),
		"./pages/PublicBlog.vue": () => import("./assets/PublicBlog-BK5SQUFt.js"),
		"./pages/QRCodes.vue": () => import("./assets/QRCodes-Cb2KchKh.js"),
		"./pages/Register.vue": () => import("./assets/Register-B0uYGzjT.js"),
		"./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-BTgUtROF.js"),
		"./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-CMYTXuiG.js"),
		"./pages/Reservations/Index.vue": () => import("./assets/Index-DEEgs7Zm.js"),
		"./pages/Roles.vue": () => import("./assets/Roles-CjALHWwL.js"),
		"./pages/Settings.vue": () => import("./assets/Settings-Dk7OKhoa.js"),
		"./pages/Users.vue": () => import("./assets/Users-d570T3kk.js")
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin);
	}
}));
//#endregion
export {};
