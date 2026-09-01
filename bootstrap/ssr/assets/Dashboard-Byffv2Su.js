import { ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { S as StatCard } from "./StatCard-BBMxSIbz.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    counts: { type: Object, default: () => ({}) },
    recentOrders: { type: Array, default: () => [] },
    topCategories: { type: Array, default: () => [] },
    range: { type: Object, default: () => ({ start_date: "", end_date: "" }) },
    reports: { type: Object, default: () => ({}) }
  },
  setup(__props) {
    const props = __props;
    const range = ref({ ...props.range });
    const reportsLoading = ref(false);
    const BAR_COLORS = ["var(--brand)", "var(--success)", "var(--info)", "var(--warning)", "var(--danger)"];
    const barColor = (i) => BAR_COLORS[i % BAR_COLORS.length];
    const money = (v) => v == null || v === "" ? "—" : `$${Number(v).toFixed(2)}`;
    const TYPE_LABELS = { delivery: "Delivery", dining: "Dining", "on-way": "On the way" };
    const typeLabel = (t) => TYPE_LABELS[t] || t || "—";
    const statusClass = (s) => {
      const v = String(s || "").toLowerCase();
      if (["completed", "paid", "done"].includes(v)) return "ui-badge--success";
      if (["on-way", "on the way", "delivering", "shipped"].includes(v)) return "ui-badge--warning";
      if (["preparing", "pending", "processing", "in progress"].includes(v)) return "ui-badge--info";
      return "ui-badge--muted";
    };
    const dateTime = (v) => v ? new Date(v).toLocaleString() : "—";
    const counts = computed(() => ({
      users: props.counts.users ?? "—",
      customers: props.counts.customers ?? "—",
      foodItems: props.counts.foodItems ?? "—",
      orders: props.counts.orders ?? "—"
    }));
    const recentOrders = computed(() => props.recentOrders ?? []);
    const topCategories = computed(() => props.topCategories ?? []);
    const summary = computed(() => {
      var _a, _b, _c, _d;
      return {
        ordersByType: ((_b = (_a = props.reports) == null ? void 0 : _a.summary) == null ? void 0 : _b.ordersByType) ?? [],
        totalGrandTotal: Number(((_d = (_c = props.reports) == null ? void 0 : _c.summary) == null ? void 0 : _d.totalGrandTotal) ?? 0)
      };
    });
    const dining = computed(() => {
      var _a, _b, _c, _d;
      return {
        totalGrandTotal: Number(((_b = (_a = props.reports) == null ? void 0 : _a.dining) == null ? void 0 : _b.totalGrandTotal) ?? 0),
        rows: ((_d = (_c = props.reports) == null ? void 0 : _c.dining) == null ? void 0 : _d.rows) ?? []
      };
    });
    const delivery = computed(() => {
      var _a, _b, _c, _d;
      return {
        totalGrandTotal: Number(((_b = (_a = props.reports) == null ? void 0 : _a.delivery) == null ? void 0 : _b.totalGrandTotal) ?? 0),
        rows: ((_d = (_c = props.reports) == null ? void 0 : _c.delivery) == null ? void 0 : _d.rows) ?? []
      };
    });
    const onway = computed(() => {
      var _a, _b, _c, _d;
      return {
        totalGrandTotal: Number(((_b = (_a = props.reports) == null ? void 0 : _a.onway) == null ? void 0 : _b.totalGrandTotal) ?? 0),
        rows: ((_d = (_c = props.reports) == null ? void 0 : _c.onway) == null ? void 0 : _d.rows) ?? []
      };
    });
    const categorySales = computed(() => {
      var _a;
      return ((_a = props.reports) == null ? void 0 : _a.categorySales) ?? [];
    });
    const itemQty = computed(() => {
      var _a, _b, _c, _d;
      return {
        service_charge_total: Number(((_b = (_a = props.reports) == null ? void 0 : _a.itemQty) == null ? void 0 : _b.service_charge_total) ?? 0),
        categories: ((_d = (_c = props.reports) == null ? void 0 : _c.itemQty) == null ? void 0 : _d.categories) ?? []
      };
    });
    const itemQtyCurrent = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return {
        service_charge_total: Number(((_b = (_a = props.reports) == null ? void 0 : _a.itemQtyCurrent) == null ? void 0 : _b.service_charge_total) ?? 0),
        categories: ((_d = (_c = props.reports) == null ? void 0 : _c.itemQtyCurrent) == null ? void 0 : _d.categories) ?? [],
        totalGrandTotal: Number(((_f = (_e = props.reports) == null ? void 0 : _e.itemQtyCurrent) == null ? void 0 : _f.totalGrandTotal) ?? 0)
      };
    });
    const quickReport = computed(() => {
      var _a;
      return ((_a = props.reports) == null ? void 0 : _a.quickReport) ?? [];
    });
    const topTen = computed(() => {
      var _a;
      return ((_a = props.reports) == null ? void 0 : _a.topTen) ?? [];
    });
    const deletedOrders = computed(() => {
      var _a;
      return ((_a = props.reports) == null ? void 0 : _a.deletedOrders) ?? [];
    });
    const rangeLabel = computed(
      () => range.value.start_date === range.value.end_date ? range.value.start_date : `${range.value.start_date} → ${range.value.end_date}`
    );
    const csvCell = (v) => {
      const s = v == null ? "" : String(v);
      return `"${s.replace(/"/g, '""')}"`;
    };
    const csvRow = (cells) => cells.map(csvCell).join(",");
    const exportData = () => {
      const lines = [];
      const section = (title, headers, rows) => {
        if (lines.length) lines.push("");
        lines.push(csvRow([title]));
        if (!rows.length) {
          lines.push(csvRow(["No data"]));
          return;
        }
        lines.push(csvRow(headers));
        rows.forEach((r) => lines.push(csvRow(r)));
      };
      section("Report Range", ["Start", "End"], [[range.value.start_date, range.value.end_date]]);
      section(
        "Overview",
        ["Metric", "Value"],
        [
          ["Users", counts.value.users],
          ["Customers", counts.value.customers],
          ["Food Items", counts.value.foodItems],
          ["Orders", counts.value.orders]
        ]
      );
      section(
        "Recent Orders",
        ["Order", "Customer", "Type", "Status", "Total"],
        recentOrders.value.map((o) => {
          var _a;
          return [
            `#${o.id}`,
            ((_a = o.customer) == null ? void 0 : _a.name) || o.customer_name || "Guest",
            typeLabel(o.type),
            o.status || "—",
            money(o.grand_total)
          ];
        })
      );
      section(
        "Daily Summary by Type",
        ["Type", "Grand Total"],
        [
          ...summary.value.ordersByType.map((r) => [typeLabel(r.type), money(r.grand_total)]),
          ["Total", money(summary.value.totalGrandTotal)],
          ["Dining", money(dining.value.totalGrandTotal)],
          ["Delivery", money(delivery.value.totalGrandTotal)],
          ["On the way", money(onway.value.totalGrandTotal)]
        ]
      );
      section(
        "Category Sales",
        ["Category", "Subtotal", "Discount", "Total"],
        categorySales.value.map((c) => [
          c.category_name,
          money(c.total_subtotal),
          money(c.discount_amount),
          money(c.grand_total)
        ])
      );
      const flattenItemQty = (data) => {
        const out = [];
        data.categories.forEach((cat) => {
          out.push([cat.category_name, "", cat.total_quantity, money(cat.total_subtotal), money(cat.discount_amount)]);
          (cat.items || []).forEach(
            (it) => out.push(["", it.item_name, it.total_quantity, money(it.total_subtotal), money(it.discount_amount)])
          );
        });
        return out;
      };
      section(
        `Category Sales by Item Quantity (Service charges: ${money(itemQty.value.service_charge_total)})`,
        ["Category", "Item", "Qty", "Subtotal", "Discount"],
        flattenItemQty(itemQty.value)
      );
      section(
        `Item Quantity — Order Date (Service charges: ${money(itemQtyCurrent.value.service_charge_total)}; Total: ${money(itemQtyCurrent.value.totalGrandTotal)})`,
        ["Category", "Item", "Qty", "Subtotal", "Discount"],
        flattenItemQty(itemQtyCurrent.value)
      );
      section(
        "Quick Report — Today",
        ["Order", "Customer", "Type", "Total"],
        quickReport.value.map((o) => {
          var _a;
          return [
            `#${o.id}`,
            ((_a = o.customer) == null ? void 0 : _a.name) || "Guest",
            typeLabel(o.type),
            money(o.grand_total)
          ];
        })
      );
      section(
        "Top 10 Deals — Today",
        ["Order", "Customer", "Total"],
        topTen.value.map((o) => {
          var _a;
          return [`#${o.id}`, ((_a = o.customer) == null ? void 0 : _a.name) || "Guest", money(o.grand_total)];
        })
      );
      section(
        "Deleted Orders — Today",
        ["Order", "Type", "Status", "Deleted At", "Total"],
        deletedOrders.value.map((o) => [
          `#${o.id}`,
          typeLabel(o.type),
          o.status || "—",
          dateTime(o.deleted_at),
          money(o.grand_total)
        ])
      );
      const csv = lines.join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dashboard-report-${range.value.start_date}_to_${range.value.end_date}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-ee0a73df>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Dashboard",
        subtitle: "Quick overview of your system."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-ee0a73df${_scopeId}><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ee0a73df${_scopeId}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-ee0a73df${_scopeId}></path><polyline points="7 10 12 15 17 10" data-v-ee0a73df${_scopeId}></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-ee0a73df${_scopeId}></line></svg> Export </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/orders",
              class: "ui-btn ui-btn--primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`+ New Order`);
                } else {
                  return [
                    createTextVNode("+ New Order")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: exportData
              }, [
                (openBlock(), createBlock("svg", {
                  viewBox: "0 0 24 24",
                  width: "15",
                  height: "15",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  createVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                  createVNode("polyline", { points: "7 10 12 15 17 10" }),
                  createVNode("line", {
                    x1: "12",
                    y1: "15",
                    x2: "12",
                    y2: "3"
                  })
                ])),
                createTextVNode(" Export ")
              ]),
              createVNode(unref(Link), {
                href: "/orders",
                class: "ui-btn ui-btn--primary"
              }, {
                default: withCtx(() => [
                  createTextVNode("+ New Order")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ui-card ui-card-pad report-filter" data-v-ee0a73df><div class="report-filter__field" data-v-ee0a73df><label class="ui-label" for="rf-start" data-v-ee0a73df>Start date</label><input id="rf-start"${ssrRenderAttr("value", range.value.start_date)} type="date" class="ui-input" data-v-ee0a73df></div><div class="report-filter__field" data-v-ee0a73df><label class="ui-label" for="rf-end" data-v-ee0a73df>End date</label><input id="rf-end"${ssrRenderAttr("value", range.value.end_date)} type="date" class="ui-input" data-v-ee0a73df></div><div class="report-filter__actions" data-v-ee0a73df><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(reportsLoading.value) ? " disabled" : ""} data-v-ee0a73df>${ssrInterpolate(reportsLoading.value ? "Loading…" : "Apply")}</button><button class="ui-btn ui-btn--ghost"${ssrIncludeBooleanAttr(reportsLoading.value) ? " disabled" : ""} data-v-ee0a73df> Today </button></div></div><div class="stat-grid" data-v-ee0a73df>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Users",
        value: counts.value.users,
        hint: "Registered accounts",
        color: "var(--brand)",
        tint: "var(--brand-soft)",
        trend: "▲ 0%",
        "trend-dir": "up"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ee0a73df${_scopeId}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" data-v-ee0a73df${_scopeId}></path><circle cx="9" cy="7" r="4" data-v-ee0a73df${_scopeId}></circle><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" data-v-ee0a73df${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
                createVNode("circle", {
                  cx: "9",
                  cy: "7",
                  r: "4"
                }),
                createVNode("path", { d: "M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Customers",
        value: counts.value.customers,
        hint: "Active customers",
        color: "var(--success)",
        tint: "var(--success-soft)",
        trend: "▲ 100%",
        "trend-dir": "up"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ee0a73df${_scopeId}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-v-ee0a73df${_scopeId}></path><circle cx="12" cy="7" r="4" data-v-ee0a73df${_scopeId}></circle></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                createVNode("circle", {
                  cx: "12",
                  cy: "7",
                  r: "4"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Food Items",
        value: counts.value.foodItems,
        hint: "Menu entries",
        color: "var(--warning)",
        tint: "var(--warning-soft)",
        trend: "▼ —",
        "trend-dir": "down"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ee0a73df${_scopeId}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20M17 2c-1.7 0-3 2-3 5s1.3 5 3 5v10" data-v-ee0a73df${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("path", { d: "M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20M17 2c-1.7 0-3 2-3 5s1.3 5 3 5v10" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Orders",
        value: counts.value.orders,
        hint: "Total placed",
        color: "var(--info)",
        tint: "var(--info-soft)",
        trend: "▲ 0%",
        "trend-dir": "up"
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ee0a73df${_scopeId}><rect x="3" y="4" width="18" height="16" rx="2" data-v-ee0a73df${_scopeId}></rect><path d="M3 10h18" data-v-ee0a73df${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createVNode("rect", {
                  x: "3",
                  y: "4",
                  width: "18",
                  height: "16",
                  rx: "2"
                }),
                createVNode("path", { d: "M3 10h18" })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="dash-grid" data-v-ee0a73df><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df> Recent Orders `);
      _push(ssrRenderComponent(unref(Link), { href: "/orders" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View all`);
          } else {
            return [
              createTextVNode("View all")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Order</th><th data-v-ee0a73df>Customer</th><th data-v-ee0a73df>Type</th><th data-v-ee0a73df>Status</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (!recentOrders.value.length) {
        _push(`<tr data-v-ee0a73df><td colspan="5" class="data-table__empty" data-v-ee0a73df>No orders yet.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(recentOrders.value, (o) => {
        var _a;
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>#${ssrInterpolate(o.id)}</td><td data-v-ee0a73df>${ssrInterpolate(((_a = o.customer) == null ? void 0 : _a.name) || o.customer_name || "Guest")}</td><td data-v-ee0a73df>${ssrInterpolate(typeLabel(o.type))}</td><td data-v-ee0a73df><span class="${ssrRenderClass([statusClass(o.status), "ui-badge"])}" data-v-ee0a73df>${ssrInterpolate(o.status || "—")}</span></td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(o.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df>Top Categories</div><div class="cat" data-v-ee0a73df>`);
      if (!topCategories.value.length) {
        _push(`<p class="data-table__empty" style="${ssrRenderStyle({ "padding": "20px 0" })}" data-v-ee0a73df>No categories yet.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(topCategories.value, (c, i) => {
        _push(`<div class="cat__row" data-v-ee0a73df><span class="cat__name" data-v-ee0a73df>${ssrInterpolate(c.name)}</span><span class="cat__bar" data-v-ee0a73df><span class="cat__fill" style="${ssrRenderStyle({ width: c.pct + "%", background: barColor(i) })}" data-v-ee0a73df></span></span><span class="cat__val" data-v-ee0a73df>${ssrInterpolate(c.pct)}%</span></div>`);
      });
      _push(`<!--]--></div></div></div><h2 class="report-heading" data-v-ee0a73df>Reports</h2><p class="report-heading__sub" data-v-ee0a73df>${ssrInterpolate(rangeLabel.value)}</p><div class="stat-grid" data-v-ee0a73df>`);
      _push(ssrRenderComponent(StatCard, {
        label: "Total Sales",
        value: money(summary.value.totalGrandTotal),
        hint: "All order types",
        color: "var(--brand)",
        tint: "var(--brand-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Dining",
        value: money(dining.value.totalGrandTotal),
        hint: `${dining.value.rows.length} order(s)`,
        color: "var(--success)",
        tint: "var(--success-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "Delivery",
        value: money(delivery.value.totalGrandTotal),
        hint: `${delivery.value.rows.length} order(s)`,
        color: "var(--info)",
        tint: "var(--info-soft)"
      }, null, _parent));
      _push(ssrRenderComponent(StatCard, {
        label: "On the way",
        value: money(onway.value.totalGrandTotal),
        hint: `${onway.value.rows.length} order(s)`,
        color: "var(--warning)",
        tint: "var(--warning-soft)"
      }, null, _parent));
      _push(`</div><div class="dash-grid" data-v-ee0a73df><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df>Daily Summary by Type</div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Type</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Grand Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="2" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!summary.value.ordersByType.length) {
        _push(`<tr data-v-ee0a73df><td colspan="2" class="data-table__empty" data-v-ee0a73df>No sales in this range.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(summary.value.ordersByType, (r, i) => {
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>${ssrInterpolate(typeLabel(r.type))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(r.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody>`);
      if (summary.value.ordersByType.length) {
        _push(`<tfoot data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Total</th><th class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(summary.value.totalGrandTotal))}</th></tr></tfoot>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</table></div></div><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df>Category Sales</div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Category</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Subtotal</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Discount</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!categorySales.value.length) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>No category sales in this range.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(categorySales.value, (c, i) => {
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>${ssrInterpolate(c.category_name)}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(c.total_subtotal))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(c.discount_amount))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(c.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div class="ui-card report-block" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df> Category Sales by Item Quantity <span class="report-chip" data-v-ee0a73df>Service charges: ${ssrInterpolate(money(itemQty.value.service_charge_total))}</span></div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Category / Item</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Qty</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Subtotal</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Discount</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!itemQty.value.categories.length) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>No item sales in this range.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(itemQty.value.categories, (cat, ci) => {
        _push(`<!--[--><tr class="report-row--group" data-v-ee0a73df><td data-v-ee0a73df>${ssrInterpolate(cat.category_name)}</td><td style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(cat.total_quantity)}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(cat.total_subtotal))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(cat.discount_amount))}</td></tr><!--[-->`);
        ssrRenderList(cat.items, (it, ii) => {
          _push(`<tr data-v-ee0a73df><td class="report-cell--indent" data-v-ee0a73df>${ssrInterpolate(it.item_name)}</td><td style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(it.total_quantity)}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(it.total_subtotal))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(it.discount_amount))}</td></tr>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="ui-card report-block" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df> Item Quantity (Order Date) <span class="report-chip" data-v-ee0a73df> Service charges: ${ssrInterpolate(money(itemQtyCurrent.value.service_charge_total))} · Total: ${ssrInterpolate(money(itemQtyCurrent.value.totalGrandTotal))}</span></div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Category / Item</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Qty</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Subtotal</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Discount</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!itemQtyCurrent.value.categories.length) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>No item sales in this range.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(itemQtyCurrent.value.categories, (cat, ci) => {
        _push(`<!--[--><tr class="report-row--group" data-v-ee0a73df><td data-v-ee0a73df>${ssrInterpolate(cat.category_name)}</td><td style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(cat.total_quantity)}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(cat.total_subtotal))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(cat.discount_amount))}</td></tr><!--[-->`);
        ssrRenderList(cat.items, (it, ii) => {
          _push(`<tr data-v-ee0a73df><td class="report-cell--indent" data-v-ee0a73df>${ssrInterpolate(it.item_name)}</td><td style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(it.total_quantity)}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(it.total_subtotal))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(it.discount_amount))}</td></tr>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="dash-grid" data-v-ee0a73df><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df> Quick Report — Today <span class="report-chip" data-v-ee0a73df>${ssrInterpolate(quickReport.value.length)} order(s)</span></div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Order</th><th data-v-ee0a73df>Customer</th><th data-v-ee0a73df>Type</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!quickReport.value.length) {
        _push(`<tr data-v-ee0a73df><td colspan="4" class="data-table__empty" data-v-ee0a73df>No orders today.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(quickReport.value, (o) => {
        var _a;
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>#${ssrInterpolate(o.id)}</td><td data-v-ee0a73df>${ssrInterpolate(((_a = o.customer) == null ? void 0 : _a.name) || "Guest")}</td><td data-v-ee0a73df>${ssrInterpolate(typeLabel(o.type))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(o.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="ui-card" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df>Top 10 Deals — Today</div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Order</th><th data-v-ee0a73df>Customer</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="3" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!topTen.value.length) {
        _push(`<tr data-v-ee0a73df><td colspan="3" class="data-table__empty" data-v-ee0a73df>No orders today.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(topTen.value, (o) => {
        var _a;
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>#${ssrInterpolate(o.id)}</td><td data-v-ee0a73df>${ssrInterpolate(((_a = o.customer) == null ? void 0 : _a.name) || "Guest")}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(o.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div><div class="ui-card report-block" data-v-ee0a73df><div class="ui-card-header" data-v-ee0a73df> Deleted Orders — Today <span class="report-chip" data-v-ee0a73df>${ssrInterpolate(deletedOrders.value.length)} deleted</span></div><div class="data-table-wrap" data-v-ee0a73df><table class="data-table" data-v-ee0a73df><thead data-v-ee0a73df><tr data-v-ee0a73df><th data-v-ee0a73df>Order</th><th data-v-ee0a73df>Type</th><th data-v-ee0a73df>Status</th><th data-v-ee0a73df>Deleted At</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>Total</th></tr></thead><tbody data-v-ee0a73df>`);
      if (reportsLoading.value) {
        _push(`<tr data-v-ee0a73df><td colspan="5" class="data-table__empty" data-v-ee0a73df>Loading…</td></tr>`);
      } else if (!deletedOrders.value.length) {
        _push(`<tr data-v-ee0a73df><td colspan="5" class="data-table__empty" data-v-ee0a73df>No orders deleted today.</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(deletedOrders.value, (o) => {
        _push(`<tr data-v-ee0a73df><td data-v-ee0a73df>#${ssrInterpolate(o.id)}</td><td data-v-ee0a73df>${ssrInterpolate(typeLabel(o.type))}</td><td data-v-ee0a73df><span class="${ssrRenderClass([statusClass(o.status), "ui-badge"])}" data-v-ee0a73df>${ssrInterpolate(o.status || "—")}</span></td><td data-v-ee0a73df>${ssrInterpolate(dateTime(o.deleted_at))}</td><td class="money" style="${ssrRenderStyle({ "text-align": "right" })}" data-v-ee0a73df>${ssrInterpolate(money(o.grand_total))}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee0a73df"]]);
export {
  Dashboard as default
};
