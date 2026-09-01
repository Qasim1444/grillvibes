import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "PricingPage",
  __ssrInlineRender: true,
  setup(__props) {
    const billing = ref("monthly");
    const expandedFaq = ref(0);
    const plans = [
      {
        name: "Starter",
        subtitle: "For independent restaurants",
        monthly: 99,
        annual: 79,
        cta: "Start free trial",
        priceNote: "per location • billed monthly",
        features: [
          "Up to 1 location",
          "Orders & POS integration",
          "Basic inventory tracking",
          "Simple reporting dashboard",
          "Email support",
          "Mobile app access",
          "14-day free trial"
        ]
      },
      {
        name: "Growth",
        subtitle: "For growing restaurants",
        monthly: 249,
        annual: 199,
        cta: "Choose Growth",
        featured: true,
        priceNote: "per location • billed monthly",
        features: [
          "Up to 5 locations",
          "Kitchen display system",
          "Advanced inventory management",
          "Procurement workflows",
          "Advanced analytics & reporting",
          "API access",
          "Priority email & chat support",
          "Custom integrations",
          "Team training included"
        ]
      },
      {
        name: "Enterprise",
        subtitle: "For large franchises",
        monthly: 599,
        annual: 479,
        cta: "Contact sales",
        priceNote: "unlimited locations • custom pricing",
        features: [
          "Unlimited locations",
          "Dedicated account manager",
          "Custom onboarding & training",
          "Multi-brand permissions",
          "White-label options",
          "Advanced API & webhooks",
          "Phone & priority support",
          "Custom integrations",
          "Data export & analytics",
          "Security & compliance"
        ]
      }
    ];
    const comparisonData = [
      {
        name: "Core Features",
        features: [
          { name: "Locations included", starter: "1", growth: "5", enterprise: "Unlimited" },
          { name: "Orders management", starter: "✓", growth: "✓", enterprise: "✓" },
          { name: "POS integration", starter: "✓", growth: "✓", enterprise: "✓" },
          { name: "Kitchen display system", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Menu management", starter: "✓", growth: "✓", enterprise: "✓" }
        ]
      },
      {
        name: "Inventory & Operations",
        features: [
          { name: "Inventory tracking", starter: "Basic", growth: "Advanced", enterprise: "Advanced+" },
          { name: "Stock alerts", starter: "✓", growth: "✓", enterprise: "✓" },
          { name: "Procurement module", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Vendor management", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Recipe management", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Food cost tracking", starter: "−", growth: "✓", enterprise: "✓" }
        ]
      },
      {
        name: "Analytics & Reporting",
        features: [
          { name: "Basic reports", starter: "✓", growth: "✓", enterprise: "✓" },
          { name: "Advanced analytics", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Custom reports", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Predictive analytics", starter: "−", growth: "−", enterprise: "✓" },
          { name: "Data export", starter: "−", growth: "Limited", enterprise: "✓" }
        ]
      },
      {
        name: "Support & Integrations",
        features: [
          { name: "Email support", starter: "✓", growth: "✓", enterprise: "✓" },
          { name: "Chat support", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Phone support", starter: "−", growth: "−", enterprise: "✓" },
          { name: "API access", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Custom integrations", starter: "−", growth: "✓", enterprise: "✓" },
          { name: "Dedicated account manager", starter: "−", growth: "−", enterprise: "✓" }
        ]
      }
    ];
    const pricingFaqs = [
      {
        q: "Do I need to provide a credit card for the free trial?",
        a: "No, you do not need a credit card to start your free trial. You can explore KitchenOS for 14 days completely free. We'll only ask for payment if you decide to subscribe after the trial ends."
      },
      {
        q: "Can I upgrade or downgrade my plan anytime?",
        a: "Absolutely! You can change your plan at any time. If you upgrade, we'll pro-rate the cost. If you downgrade, we'll credit your account. Charges only apply monthly or annually based on your billing cycle."
      },
      {
        q: "What happens after my free trial ends?",
        a: "After 14 days, you'll need to select a plan to continue using KitchenOS. You'll receive multiple reminders before the trial expires. Your data is never deleted, and you can pause or cancel anytime."
      },
      {
        q: "Is the price per location or per account?",
        a: "Pricing is per location. So if you have 3 locations and choose the Growth plan at $249/month, your total cost would be $747/month. However, Enterprise plans offer unlimited locations with custom pricing."
      },
      {
        q: "Do you offer discounts for annual billing?",
        a: "Yes! We offer 20% discount on all plans when you pay annually instead of monthly. So the Growth plan would be $1,990/year instead of $2,988/year (about $199/month)."
      },
      {
        q: `What's included in the "custom integrations"?`,
        a: "Our team can help integrate KitchenOS with your existing systems like accounting software, delivery platforms, or internal tools. Growth plans get support for 2 custom integrations, while Enterprise gets unlimited."
      },
      {
        q: "Is there a setup fee or onboarding cost?",
        a: "No setup fees! Starter plans include self-service onboarding. Growth and Enterprise plans include dedicated onboarding support at no extra cost to help you launch quickly."
      },
      {
        q: "Can I get a refund if I'm not satisfied?",
        a: "We're confident you'll love KitchenOS. If you're not satisfied within the first 30 days, we'll provide a full refund. No questions asked."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pricing-page" }, _attrs))} data-v-9caabf4c><header class="page-header" data-v-9caabf4c><div class="container header-content" data-v-9caabf4c><h1 data-v-9caabf4c>Simple, Transparent Pricing</h1><p data-v-9caabf4c>Choose the perfect plan for your restaurant. All plans include 14-day free trial.</p></div></header><main data-v-9caabf4c><section class="pricing-section" data-v-9caabf4c><div class="container" data-v-9caabf4c><div class="pricing-toggle-wrapper" data-v-9caabf4c><div class="pricing-toggle" data-v-9caabf4c><button type="button" class="${ssrRenderClass({ active: billing.value === "monthly" })}" data-v-9caabf4c>Monthly billing</button><button type="button" class="${ssrRenderClass({ active: billing.value === "annual" })}" data-v-9caabf4c>Annual billing <span class="discount-badge" data-v-9caabf4c>Save 20%</span></button></div></div><div class="pricing-grid" data-v-9caabf4c><!--[-->`);
      ssrRenderList(plans, (plan) => {
        _push(`<article class="${ssrRenderClass([{ "pricing-card--featured": plan.featured }, "pricing-card"])}" data-v-9caabf4c>`);
        if (plan.featured) {
          _push(`<div class="pricing-card__label" data-v-9caabf4c>Most popular</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 data-v-9caabf4c>${ssrInterpolate(plan.name)}</h3><p class="plan-subtitle" data-v-9caabf4c>${ssrInterpolate(plan.subtitle)}</p><div class="price-section" data-v-9caabf4c><div class="price-row" data-v-9caabf4c><span class="currency" data-v-9caabf4c>$</span><strong data-v-9caabf4c>${ssrInterpolate(billing.value === "annual" ? Math.floor(plan.annual) : Math.floor(plan.monthly))}</strong><span class="period" data-v-9caabf4c>/month</span></div><p class="price-note" data-v-9caabf4c>${ssrInterpolate(plan.priceNote)}</p></div><button type="button" class="${ssrRenderClass([plan.featured ? "" : "marketing-button--secondary", "marketing-button"])}" data-v-9caabf4c>${ssrInterpolate(plan.cta)}</button><div class="plan-includes" data-v-9caabf4c><p class="includes-label" data-v-9caabf4c>Includes:</p><ul class="features-list" data-v-9caabf4c><!--[-->`);
        ssrRenderList(plan.features, (feature) => {
          _push(`<li data-v-9caabf4c><span class="checkmark" data-v-9caabf4c>✓</span> ${ssrInterpolate(feature)}</li>`);
        });
        _push(`<!--]--></ul></div></article>`);
      });
      _push(`<!--]--></div><div class="comparison-section" data-v-9caabf4c><h2 data-v-9caabf4c>Detailed Feature Comparison</h2><div class="comparison-table" data-v-9caabf4c><div class="table-header" data-v-9caabf4c><div class="table-cell feature-name" data-v-9caabf4c>Feature</div><div class="table-cell plan-name" data-v-9caabf4c>Starter</div><div class="table-cell plan-name" data-v-9caabf4c>Growth</div><div class="table-cell plan-name" data-v-9caabf4c>Enterprise</div></div><!--[-->`);
      ssrRenderList(comparisonData, (category, index) => {
        _push(`<div class="comparison-category" data-v-9caabf4c><div class="category-header" data-v-9caabf4c>${ssrInterpolate(category.name)}</div><!--[-->`);
        ssrRenderList(category.features, (feature) => {
          _push(`<div class="${ssrRenderClass([{ "row-alt": index % 2 === 1 }, "table-row"])}" data-v-9caabf4c><div class="table-cell feature-name" data-v-9caabf4c>${ssrInterpolate(feature.name)}</div><div class="table-cell" data-v-9caabf4c>${ssrInterpolate(feature.starter)}</div><div class="table-cell" data-v-9caabf4c>${ssrInterpolate(feature.growth)}</div><div class="table-cell" data-v-9caabf4c>${ssrInterpolate(feature.enterprise)}</div></div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div></div><div class="pricing-faq" data-v-9caabf4c><h2 data-v-9caabf4c>Frequently Asked Questions</h2><div class="faq-grid" data-v-9caabf4c><!--[-->`);
      ssrRenderList(pricingFaqs, (item, index) => {
        _push(`<div class="faq-card" data-v-9caabf4c><div class="faq-header" data-v-9caabf4c><h3 data-v-9caabf4c>${ssrInterpolate(item.q)}</h3><span class="toggle" data-v-9caabf4c>${ssrInterpolate(expandedFaq.value === index ? "−" : "+")}</span></div>`);
        if (expandedFaq.value === index) {
          _push(`<div class="faq-body" data-v-9caabf4c>${ssrInterpolate(item.a)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="pricing-cta" data-v-9caabf4c><h2 data-v-9caabf4c>Ready to get started?</h2><p data-v-9caabf4c>Join 500+ restaurants that trust KitchenOS with their operations.</p><button class="marketing-button" data-v-9caabf4c>Start your free trial</button></div></div></section></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/PricingPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PricingPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9caabf4c"]]);
export {
  PricingPage as default
};
