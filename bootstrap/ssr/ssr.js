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
		"./pages/Blog.vue": () => import("./assets/Blog-jQxg8yKB.js"),
		"./pages/CRM/Discounts.vue": () => import("./assets/Discounts-wlKaydeI.js"),
		"./pages/CRM/Feedback.vue": () => import("./assets/Feedback-BTGP983k.js"),
		"./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-CRiqY52T.js"),
		"./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-BOwvzkmf.js"),
		"./pages/ChangePassword.vue": () => import("./assets/ChangePassword-DV8hOPCN.js"),
		"./pages/ContactPage.vue": () => import("./assets/ContactPage-QRTeJbBJ.js"),
		"./pages/Customers.vue": () => import("./assets/Customers-Dor4PAgG.js"),
		"./pages/Dashboard.vue": () => import("./assets/Dashboard-Bh_4wrUY.js"),
		"./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-wVsTXPgA.js"),
		"./pages/Finance/Expenses.vue": () => import("./assets/Expenses-DkbGTLUM.js"),
		"./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-BoQjXoGn.js"),
		"./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-C5Uv41Go.js"),
		"./pages/FoodCategories.vue": () => import("./assets/FoodCategories-Bokr9Doi.js"),
		"./pages/FoodItems.vue": () => import("./assets/FoodItems-CHeM5MI_.js"),
		"./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-CbGU5rZU.js"),
		"./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DOSUvgZs.js"),
		"./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BBMp07EI.js"),
		"./pages/HR/Attendance.vue": () => import("./assets/Attendance-Cl64Ai-Z.js"),
		"./pages/HR/AttendancePunch.vue": () => import("./assets/AttendancePunch-B56aeM3Z.js"),
		"./pages/HR/Designations.vue": () => import("./assets/Designations-BEW3fMwb.js"),
		"./pages/HR/Employees.vue": () => import("./assets/Employees-CvrCb1g7.js"),
		"./pages/HR/Leaves.vue": () => import("./assets/Leaves-D8UvL0OT.js"),
		"./pages/HR/Loans.vue": () => import("./assets/Loans-D4KH1qW5.js"),
		"./pages/HR/Overtime.vue": () => import("./assets/Overtime-BPt7Pi0b.js"),
		"./pages/HR/Payroll.vue": () => import("./assets/Payroll-lsddt7QB.js"),
		"./pages/HomePage.vue": () => import("./assets/HomePage-CZ7qjMKI.js"),
		"./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-CRL7EdKv.js"),
		"./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-9jxjpy0z.js"),
		"./pages/Inventory/Stock.vue": () => import("./assets/Stock-CA9HuuWN.js"),
		"./pages/KDS/Board.vue": () => import("./assets/Board-CrFcZrWC.js"),
		"./pages/KDS/Stations.vue": () => import("./assets/Stations-DUJVckoK.js"),
		"./pages/KioskConfig.vue": () => import("./assets/KioskConfig-CsyHi33G.js"),
		"./pages/Login.vue": () => import("./assets/Login-CSrLI1u5.js"),
		"./pages/Maintenance/Assets.vue": () => import("./assets/Assets-C8qXxiBP.js"),
		"./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-CPHkAh-L.js"),
		"./pages/Orders.vue": () => import("./assets/Orders-BvVavbXY.js"),
		"./pages/POS.vue": () => import("./assets/POS-VELQjj0P.js"),
		"./pages/Places.vue": () => import("./assets/Places-Di7pbTir.js"),
		"./pages/PricingPage.vue": () => import("./assets/PricingPage-bxMVf5-i.js"),
		"./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-8-ZzvdLv.js"),
		"./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-CG7nIcL4.js"),
		"./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-CjqujFr8.js"),
		"./pages/ProductPage.vue": () => import("./assets/ProductPage-DbS2PLSk.js"),
		"./pages/Profile.vue": () => import("./assets/Profile-BZcOwPmB.js"),
		"./pages/PublicBlog.vue": () => import("./assets/PublicBlog-CPW0dkna.js"),
		"./pages/PublicBlogPost.vue": () => import("./assets/PublicBlogPost-DaIMdIQs.js"),
		"./pages/QRCodes.vue": () => import("./assets/QRCodes-D4FME63V.js"),
		"./pages/Register.vue": () => import("./assets/Register-B0uYGzjT.js"),
		"./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-DhXVXryo.js"),
		"./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-BkyCUZxg.js"),
		"./pages/Reservations/Index.vue": () => import("./assets/Index-D5ucbT9s.js"),
		"./pages/Roles.vue": () => import("./assets/Roles-C91tJsfA.js"),
		"./pages/Settings.vue": () => import("./assets/Settings-SOFd-5P-.js"),
		"./pages/Users.vue": () => import("./assets/Users-DyEMIrfe.js")
	})),
	setup({ App, props, plugin }) {
		return createSSRApp({ render: () => h(App, props) }).use(plugin);
	}
}));
//#endregion
export {};
