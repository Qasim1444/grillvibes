import { createSSRApp, h } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => title ? `${title} — KitchenOS Admin` : "KitchenOS Admin",
    resolve: (name) => resolvePageComponent(
      `./pages/${name}.vue`,
      /* @__PURE__ */ Object.assign({ "./pages/AboutPage.vue": () => import("./assets/AboutPage-CvPJy9JE.js"), "./pages/AdminDashboardPage.vue": () => import("./assets/AdminDashboardPage-D25E_Mj4.js"), "./pages/AdminLoginPage.vue": () => import("./assets/AdminLoginPage-BWI6uE-N.js"), "./pages/CRM/Discounts.vue": () => import("./assets/Discounts-552CC44z.js"), "./pages/CRM/Feedback.vue": () => import("./assets/Feedback-BeuYt4kR.js"), "./pages/CRM/Loyalty.vue": () => import("./assets/Loyalty-BhLSOdND.js"), "./pages/CRM/PromoCodes.vue": () => import("./assets/PromoCodes-WWvNXhcC.js"), "./pages/ChangePassword.vue": () => import("./assets/ChangePassword-CPHKG-uB.js"), "./pages/ContactPage.vue": () => import("./assets/ContactPage-91MMyUAG.js"), "./pages/Customers.vue": () => import("./assets/Customers-C_joQ-6j.js"), "./pages/Dashboard.vue": () => import("./assets/Dashboard-Byffv2Su.js"), "./pages/FeaturesPage.vue": () => import("./assets/FeaturesPage-CHgNkjMg.js"), "./pages/Finance/Expenses.vue": () => import("./assets/Expenses-4PCJcOZf.js"), "./pages/Finance/PettyCash.vue": () => import("./assets/PettyCash-BEBtDakO.js"), "./pages/Finance/Vouchers.vue": () => import("./assets/Vouchers-QNc67HK_.js"), "./pages/FoodCategories.vue": () => import("./assets/FoodCategories-CRdzKcll.js"), "./pages/FoodItems.vue": () => import("./assets/FoodItems-BxFcCJiN.js"), "./pages/ForgotPassword.vue": () => import("./assets/ForgotPassword-DSvwRXFK.js"), "./pages/Guest/Kiosk.vue": () => import("./assets/Kiosk-DO0Tdkly.js"), "./pages/Guest/QRMenu.vue": () => import("./assets/QRMenu-BfPVtGMI.js"), "./pages/HR/Attendance.vue": () => import("./assets/Attendance-DpOaeLBl.js"), "./pages/HR/Designations.vue": () => import("./assets/Designations-BxI40ewY.js"), "./pages/HR/Employees.vue": () => import("./assets/Employees-BiFd7Ld-.js"), "./pages/HR/Leaves.vue": () => import("./assets/Leaves-CaEsUdus.js"), "./pages/HR/Loans.vue": () => import("./assets/Loans-CrRsHHB7.js"), "./pages/HR/Overtime.vue": () => import("./assets/Overtime-Dajbsw5j.js"), "./pages/HR/Payroll.vue": () => import("./assets/Payroll-TrLD-U2j.js"), "./pages/HomePage.vue": () => import("./assets/HomePage-Dqc5tRvG.js"), "./pages/Inventory/Ingredients.vue": () => import("./assets/Ingredients-DnnleFuK.js"), "./pages/Inventory/Recipes.vue": () => import("./assets/Recipes-CAiC0Ges.js"), "./pages/Inventory/Stock.vue": () => import("./assets/Stock-B7lQwp4n.js"), "./pages/KDS/Board.vue": () => import("./assets/Board-DaDF6P_-.js"), "./pages/KDS/Stations.vue": () => import("./assets/Stations-7_lk8w9J.js"), "./pages/KioskConfig.vue": () => import("./assets/KioskConfig-BVqeTIZB.js"), "./pages/Login.vue": () => import("./assets/Login-Dix3C9mv.js"), "./pages/Maintenance/Assets.vue": () => import("./assets/Assets-BdBx7nIC.js"), "./pages/Maintenance/MaintenanceLogs.vue": () => import("./assets/MaintenanceLogs-DprjER79.js"), "./pages/Orders.vue": () => import("./assets/Orders-C2RYGLjk.js"), "./pages/POS.vue": () => import("./assets/POS-gKhVtEeZ.js"), "./pages/Places.vue": () => import("./assets/Places-DXmlbmDH.js"), "./pages/PricingPage.vue": () => import("./assets/PricingPage-Dk6-5QGW.js"), "./pages/Procurement/GoodsReceipts.vue": () => import("./assets/GoodsReceipts-CAwXL5uv.js"), "./pages/Procurement/PurchaseOrders.vue": () => import("./assets/PurchaseOrders-DXa3bm7D.js"), "./pages/Procurement/Vendors.vue": () => import("./assets/Vendors-CjZLHglC.js"), "./pages/Profile.vue": () => import("./assets/Profile-BdOh7Q4y.js"), "./pages/QRCodes.vue": () => import("./assets/QRCodes-x1rH2g19.js"), "./pages/Register.vue": () => import("./assets/Register-D-uJ7g_b.js"), "./pages/Reports/FoodCost.vue": () => import("./assets/FoodCost-BsXGYazl.js"), "./pages/Reservations/FloorPlan.vue": () => import("./assets/FloorPlan-gFoJ6_Jo.js"), "./pages/Reservations/Index.vue": () => import("./assets/Index-BsHxO8bp.js"), "./pages/Roles.vue": () => import("./assets/Roles-JIt11eZU.js"), "./pages/Settings.vue": () => import("./assets/Settings-D4ARpHnr.js"), "./pages/Users.vue": () => import("./assets/Users-CDRMoqN3.js") })
    ),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin);
    }
  })
);
