import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "HomePage",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileOpen = ref(false);
    const billing = ref("monthly");
    const openFaq = ref(0);
    const features = [
      { icon: "📋", title: "Orders", description: "Capture orders from dine-in, takeaway, and delivery channels in real-time with intelligent routing." },
      { icon: "👨‍🍳", title: "Kitchen Display", description: "Coordinate prep timing with live kitchen queue, station management, and timers." },
      { icon: "📦", title: "Inventory & Stock", description: "Track stock movement, par levels, low-stock alerts, and wastage across branches." },
      { icon: "🚚", title: "Procurement", description: "Manage vendors, purchase orders, goods receipts, and automate reordering workflows." },
      { icon: "📖", title: "Recipes & Costing", description: "Standardize recipes, calculate food costs, and track ingredient usage per dish." },
      { icon: "📊", title: "Analytics & Reporting", description: "Real-time dashboards with profitability, trends, performance insights, and KPI tracking." }
    ];
    const steps = [
      {
        title: "Create Your Workspace",
        description: "Sign up in minutes. Invite team members and set up your first branch or location."
      },
      {
        title: "Configure Your Menu",
        description: "Add menu items, prices, recipes, ingredients, and set preparation requirements."
      },
      {
        title: "Start Taking Orders",
        description: "Accept orders via POS, web, app, or integrations. See them flow to kitchen instantly."
      },
      {
        title: "Monitor & Optimize",
        description: "Track sales, inventory, performance and make data-driven decisions in real-time."
      }
    ];
    const solutions = [
      {
        icon: "🏪",
        title: "Independent Restaurants",
        subtitle: "Single or multi-unit operators",
        description: "Perfect for growing independent restaurants wanting operational control and insights.",
        features: ["Multiple locations", "Unified reporting", "Team management", "Customer analytics"]
      },
      {
        icon: "🏢",
        title: "Franchises",
        subtitle: "Multi-location franchise networks",
        description: "Designed for franchise groups to standardize operations across all locations.",
        features: ["Brand consistency", "Central oversight", "Performance comparison", "Compliance tracking"]
      },
      {
        icon: "🍕",
        title: "QSR & Fast Casual",
        subtitle: "Quick service restaurants",
        description: "Built for speed and volume with efficient order management and kitchen operations.",
        features: ["High-volume handling", "Delivery integration", "Quick analytics", "Staff efficiency"]
      },
      {
        icon: "🛵",
        title: "Cloud Kitchens",
        subtitle: "Delivery-first operations",
        description: "Optimized for delivery-only and dark kitchen operations with order routing.",
        features: ["Multi-brand support", "Delivery management", "Demand forecasting", "Cost optimization"]
      }
    ];
    const stats = [
      { value: "1.4M+", label: "Orders processed monthly" },
      { value: "500+", label: "Active restaurants" },
      { value: "28 hrs", label: "Time saved per week" },
      { value: "99.9%", label: "Platform uptime" }
    ];
    const testimonials = [
      {
        name: "Maya Patel",
        role: "COO, Northstar Kitchen",
        initials: "MP",
        quote: "KitchenOS gave us instant visibility across every branch. Our teams now spend less time chasing updates and more time serving guests."
      },
      {
        name: "Daniel Brooks",
        role: "Owner, Harbor Table",
        initials: "DB",
        quote: "The inventory controls alone paid for itself within the first month. It is clear, intuitive, and fast."
      },
      {
        name: "Leah Morgan",
        role: "Operations Manager, Fireside Group",
        initials: "LM",
        quote: "We replaced three separate tools with one workflow. The reporting makes every review more accurate and faster."
      },
      {
        name: "Raj Kumar",
        role: "General Manager, Urban Bites",
        initials: "RK",
        quote: "Prep time is down 30%, and our waste has decreased significantly. Highly recommend to any restaurant owner."
      }
    ];
    const plans = [
      {
        name: "Starter",
        subtitle: "For independent restaurants",
        monthly: "99",
        annual: "79",
        cta: "Start free trial",
        features: [
          "Up to 1 location",
          "Orders & POS integration",
          "Basic inventory tracking",
          "Simple reporting",
          "Email support",
          "Mobile app access"
        ]
      },
      {
        name: "Growth",
        subtitle: "For growing restaurants",
        monthly: "249",
        annual: "199",
        cta: "Choose Growth",
        featured: true,
        features: [
          "Up to 5 locations",
          "Kitchen display system",
          "Advanced inventory",
          "Procurement workflows",
          "Advanced analytics",
          "Priority email & chat support",
          "API access",
          "Custom integrations"
        ]
      },
      {
        name: "Enterprise",
        subtitle: "For large franchises",
        monthly: "599+",
        annual: "479+",
        cta: "Contact sales",
        features: [
          "Unlimited locations",
          "Custom onboarding",
          "Dedicated account manager",
          "Multi-brand permissions",
          "Advanced API",
          "Phone & priority support",
          "Custom integrations",
          "Training & consulting"
        ]
      }
    ];
    const faqs = [
      {
        question: "How quickly can we get up and running?",
        answer: "Most restaurants are live and taking orders within 1-3 days. We provide guided setup, menu templates, and dedicated onboarding to accelerate your launch."
      },
      {
        question: "Can we manage multiple locations with KitchenOS?",
        answer: "Absolutely! KitchenOS is built for multi-location operations. You can manage unlimited branches with centralized controls, branch-specific customization, and unified reporting across all locations."
      },
      {
        question: "Does KitchenOS integrate with our existing POS system?",
        answer: "Yes! We integrate with major POS systems including Toast, Square, Lightspeed, and others. We also have a robust API for custom integrations with your specific systems."
      },
      {
        question: "What about data security and compliance?",
        answer: "We maintain SOC 2 Type II compliance, use enterprise-grade encryption, and have 99.9% uptime guarantee. Your data is backed up automatically and accessible anytime."
      },
      {
        question: "Can different team members have different permission levels?",
        answer: "Yes. KitchenOS supports role-based access control. You can set specific permissions for managers, chefs, staff, and admins across features like orders, inventory, reporting, and settings."
      },
      {
        question: "What support options do you offer?",
        answer: "We provide email support for Starter plans, email and chat for Growth, and dedicated account managers for Enterprise. We also have extensive help docs, video tutorials, and community forums."
      },
      {
        question: "Can we try KitchenOS before committing?",
        answer: "Yes! We offer a 14-day free trial with full feature access. No credit card required. Many restaurants use this to validate the workflow with their team before subscribing."
      },
      {
        question: "How is pricing calculated for multiple locations?",
        answer: "Pricing is per-location. So a Growth plan ($249) covers 5 locations, and an Enterprise plan covers unlimited locations. You pay based on your needs."
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "marketing-page" }, _attrs))} data-v-9026044c><header class="marketing-header" data-v-9026044c><div class="container marketing-header__inner" data-v-9026044c><div class="marketing-brand" data-v-9026044c><div class="marketing-brand__mark" data-v-9026044c>J</div><span data-v-9026044c>KitchenOS</span></div><nav class="marketing-nav" aria-label="Main navigation" data-v-9026044c><a href="#features" data-v-9026044c>Features</a><a href="#solutions" data-v-9026044c>Solutions</a><a href="#how-it-works" data-v-9026044c>How it works</a><a href="#pricing" data-v-9026044c>Pricing</a><a data-v-9026044c>Integrations</a></nav><div class="marketing-header__actions" data-v-9026044c><button class="marketing-link" type="button" data-v-9026044c>Log in</button><button class="marketing-button" type="button" data-v-9026044c>Get started free</button></div><button class="marketing-menu" type="button" aria-label="Toggle menu" data-v-9026044c> ☰ </button></div>`);
      if (mobileOpen.value) {
        _push(`<div class="container marketing-mobile-nav" data-v-9026044c><a href="#features" data-v-9026044c>Features</a><a href="#solutions" data-v-9026044c>Solutions</a><a href="#how-it-works" data-v-9026044c>How it works</a><a href="#pricing" data-v-9026044c>Pricing</a><a data-v-9026044c>Integrations</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><main data-v-9026044c><section class="hero section" data-v-9026044c><div class="container hero__grid" data-v-9026044c><div class="hero__content" data-v-9026044c><span class="badge" data-v-9026044c>🚀 Trusted by 500+ restaurants worldwide</span><h1 data-v-9026044c>Restaurant operations, reimagined.</h1><p data-v-9026044c> KitchenOS is the all-in-one platform that connects ordering, kitchen operations, inventory, and analytics into one beautifully simple control center for restaurant teams and franchises. </p><div class="hero__actions" data-v-9026044c><button class="marketing-button" type="button" data-v-9026044c>Get started free</button><button class="marketing-button marketing-button--secondary" type="button" data-v-9026044c>Watch 3-min demo</button></div><div class="hero__meta" data-v-9026044c><div data-v-9026044c><strong data-v-9026044c>4.9/5</strong><span data-v-9026044c>from 280+ reviews</span></div><div data-v-9026044c><strong data-v-9026044c>2.6k+</strong><span data-v-9026044c>daily orders processed</span></div><div data-v-9026044c><strong data-v-9026044c>99.9%</strong><span data-v-9026044c>uptime guarantee</span></div></div></div><div class="hero__visual" aria-label="Dashboard preview illustration" data-v-9026044c><div class="hero-panel hero-panel--main" data-v-9026044c><div class="hero-panel__header" data-v-9026044c><span class="dot dot--purple" data-v-9026044c></span><span class="dot dot--blue" data-v-9026044c></span><span class="dot dot--green" data-v-9026044c></span></div><div class="hero-panel__body" data-v-9026044c><div class="dashboard-mini" data-v-9026044c><div class="dashboard-mini__bar" style="${ssrRenderStyle({ "height": "55%" })}" data-v-9026044c></div><div class="dashboard-mini__bar" style="${ssrRenderStyle({ "height": "74%" })}" data-v-9026044c></div><div class="dashboard-mini__bar" style="${ssrRenderStyle({ "height": "64%" })}" data-v-9026044c></div><div class="dashboard-mini__bar" style="${ssrRenderStyle({ "height": "89%" })}" data-v-9026044c></div><div class="dashboard-mini__bar" style="${ssrRenderStyle({ "height": "73%" })}" data-v-9026044c></div></div><div class="dashboard-summary" data-v-9026044c><div class="card-pill" data-v-9026044c><span data-v-9026044c>Revenue</span><strong data-v-9026044c>$34.2k</strong></div><div class="card-pill card-pill--muted" data-v-9026044c><span data-v-9026044c>Prep time</span><strong data-v-9026044c>11m</strong></div></div></div></div><div class="hero-panel hero-panel--floating" data-v-9026044c><span data-v-9026044c>Live orders</span><strong data-v-9026044c>248</strong><small data-v-9026044c>+18% vs yesterday</small></div></div></div></section><section class="logo-strip section section--tight" data-v-9026044c><div class="container logo-strip__inner" data-v-9026044c><p data-v-9026044c>Trusted by leading restaurant groups and independent operators</p><div class="logo-strip__list" aria-label="Partner logos" data-v-9026044c><span data-v-9026044c>Northstar</span><span data-v-9026044c>Harbor</span><span data-v-9026044c>Fireside</span><span data-v-9026044c>Velora</span><span data-v-9026044c>Urban Bites</span></div></div></section><section id="features" class="section features-section" data-v-9026044c><div class="container" data-v-9026044c><div class="section-heading" data-v-9026044c><span class="eyebrow" data-v-9026044c>Everything you need</span><h2 data-v-9026044c>Built for operations, service, and growth.</h2><p data-v-9026044c>All the tools your restaurant needs to run smoothly, from orders to analytics.</p></div><div class="features-grid" data-v-9026044c><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(`<article class="feature-card" data-v-9026044c><div class="feature-card__icon" data-v-9026044c>${ssrInterpolate(feature.icon)}</div><h3 data-v-9026044c>${ssrInterpolate(feature.title)}</h3><p data-v-9026044c>${ssrInterpolate(feature.description)}</p><a href="#" class="feature-link" data-v-9026044c>Learn more →</a></article>`);
      });
      _push(`<!--]--></div></div></section><section id="how-it-works" class="section section--soft" data-v-9026044c><div class="container" data-v-9026044c><div class="section-heading center" data-v-9026044c><span class="eyebrow" data-v-9026044c>Getting started is simple</span><h2 data-v-9026044c>Go live in four clear steps.</h2></div><div class="steps-flow" data-v-9026044c><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<div class="step-item" data-v-9026044c><div class="step-item__number" data-v-9026044c>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</div><h3 data-v-9026044c>${ssrInterpolate(step.title)}</h3><p data-v-9026044c>${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--><div class="steps-connector" data-v-9026044c></div></div></div></section><section class="section showcase-section" data-v-9026044c><div class="container showcase" data-v-9026044c><div class="showcase__preview" data-v-9026044c><div class="preview-window" data-v-9026044c><div class="preview-window__header" data-v-9026044c><span class="dot dot--purple" data-v-9026044c></span><span class="dot dot--blue" data-v-9026044c></span><span class="dot dot--green" data-v-9026044c></span></div><div class="preview-window__body" data-v-9026044c><div class="preview-window__sidebar" data-v-9026044c></div><div class="preview-window__content" data-v-9026044c><div class="preview-card preview-card--wide" data-v-9026044c></div><div class="preview-grid" data-v-9026044c><div class="preview-card" data-v-9026044c></div><div class="preview-card" data-v-9026044c></div><div class="preview-card" data-v-9026044c></div></div></div></div></div></div><div class="showcase__content" data-v-9026044c><span class="eyebrow" data-v-9026044c>Live dashboard</span><h2 data-v-9026044c>Centralized control for your entire operation.</h2><ul data-v-9026044c><li data-v-9026044c>See live sales, stock levels, and kitchen performance in real-time.</li><li data-v-9026044c>Track every branch with role-based permissions and standard workflows.</li><li data-v-9026044c>Reduce errors and optimize prep with intelligent production planning.</li><li data-v-9026044c>Access forecasting, analytics, and performance metrics instantly.</li></ul><button class="marketing-button" type="button" data-v-9026044c>Schedule demo</button></div></div></section><section id="solutions" class="section section--soft solutions-section" data-v-9026044c><div class="container" data-v-9026044c><div class="section-heading center" data-v-9026044c><span class="eyebrow" data-v-9026044c>Built for your business type</span><h2 data-v-9026044c>Solutions tailored to your needs.</h2></div><div class="solutions-grid" data-v-9026044c><!--[-->`);
      ssrRenderList(solutions, (solution) => {
        _push(`<article class="solution-card" data-v-9026044c><div class="solution-icon" data-v-9026044c>${ssrInterpolate(solution.icon)}</div><h3 data-v-9026044c>${ssrInterpolate(solution.title)}</h3><p data-v-9026044c>${ssrInterpolate(solution.description)}</p><ul class="solution-features" data-v-9026044c><!--[-->`);
        ssrRenderList(solution.features, (feature) => {
          _push(`<li data-v-9026044c>✓ ${ssrInterpolate(feature)}</li>`);
        });
        _push(`<!--]--></ul><a href="#" class="solution-link" data-v-9026044c>Explore for ${ssrInterpolate(solution.title)} →</a></article>`);
      });
      _push(`<!--]--></div></div></section><section class="section section--brand-band stats-section" data-v-9026044c><div class="container stats-band" data-v-9026044c><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="stat-card" data-v-9026044c><strong data-v-9026044c>${ssrInterpolate(stat.value)}</strong><span data-v-9026044c>${ssrInterpolate(stat.label)}</span></div>`);
      });
      _push(`<!--]--></div></section><section class="section testimonials-section" data-v-9026044c><div class="container" data-v-9026044c><div class="section-heading center" data-v-9026044c><span class="eyebrow" data-v-9026044c>Customer success</span><h2 data-v-9026044c>Trusted by operators and teams.</h2></div><div class="testimonials-grid" data-v-9026044c><!--[-->`);
      ssrRenderList(testimonials, (testimonial) => {
        _push(`<article class="testimonial-card" data-v-9026044c><div class="testimonial-rating" data-v-9026044c>★★★★★</div><p data-v-9026044c>&quot;${ssrInterpolate(testimonial.quote)}&quot;</p><div class="testimonial-card__bottom" data-v-9026044c><div class="testimonial-avatar" data-v-9026044c>${ssrInterpolate(testimonial.initials)}</div><div data-v-9026044c><strong data-v-9026044c>${ssrInterpolate(testimonial.name)}</strong><span data-v-9026044c>${ssrInterpolate(testimonial.role)}</span></div></div></article>`);
      });
      _push(`<!--]--></div></div></section><section id="pricing" class="section section--soft pricing-section" data-v-9026044c><div class="container" data-v-9026044c><div class="section-heading center" data-v-9026044c><span class="eyebrow" data-v-9026044c>Simple, transparent pricing</span><h2 data-v-9026044c>Plans for every size restaurant.</h2><p data-v-9026044c>Always know what you&#39;re paying. No hidden fees.</p></div><div class="pricing-toggle" data-v-9026044c><button type="button" class="${ssrRenderClass({ active: billing.value === "monthly" })}" data-v-9026044c>Monthly billing</button><button type="button" class="${ssrRenderClass({ active: billing.value === "annual" })}" data-v-9026044c>Annual billing (save 20%)</button></div><div class="pricing-grid" data-v-9026044c><!--[-->`);
      ssrRenderList(plans, (plan) => {
        _push(`<article class="${ssrRenderClass([{ "pricing-card--featured": plan.featured }, "pricing-card"])}" data-v-9026044c>`);
        if (plan.featured) {
          _push(`<div class="pricing-card__label" data-v-9026044c>Most popular</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3 data-v-9026044c>${ssrInterpolate(plan.name)}</h3><p class="plan-description" data-v-9026044c>${ssrInterpolate(plan.subtitle)}</p><div class="price-row" data-v-9026044c><strong data-v-9026044c>$${ssrInterpolate(billing.value === "annual" ? plan.annual : plan.monthly)}</strong><span data-v-9026044c>/month</span></div>`);
        if (plan.featured) {
          _push(`<p class="price-note" data-v-9026044c>per location • billed ${ssrInterpolate(billing.value === "annual" ? "annually" : "monthly")}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<ul data-v-9026044c><!--[-->`);
        ssrRenderList(plan.features, (item) => {
          _push(`<li data-v-9026044c>✓ ${ssrInterpolate(item)}</li>`);
        });
        _push(`<!--]--></ul><button type="button" class="${ssrRenderClass([plan.featured ? "" : "marketing-button--secondary", "marketing-button"])}" data-v-9026044c>${ssrInterpolate(plan.cta)}</button></article>`);
      });
      _push(`<!--]--></div></div></section><section id="faq" class="section faqs-section" data-v-9026044c><div class="container faq-layout" data-v-9026044c><div class="section-heading faq-heading" data-v-9026044c><span class="eyebrow" data-v-9026044c>Questions answered</span><h2 data-v-9026044c>Common questions about KitchenOS.</h2></div><div class="faq-list" data-v-9026044c><!--[-->`);
      ssrRenderList(faqs, (item, index) => {
        _push(`<div class="${ssrRenderClass([{ "faq-item--open": openFaq.value === index }, "faq-item"])}" data-v-9026044c><button type="button" class="faq-question" data-v-9026044c><span data-v-9026044c>${ssrInterpolate(item.question)}</span><span class="faq-toggle" data-v-9026044c>${ssrInterpolate(openFaq.value === index ? "−" : "+")}</span></button>`);
        if (openFaq.value === index) {
          _push(`<div class="faq-answer" data-v-9026044c>${ssrInterpolate(item.answer)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="faq-cta" data-v-9026044c><p data-v-9026044c>Can&#39;t find what you&#39;re looking for?</p><a href="#" class="cta-link" data-v-9026044c>Check our help center →</a></div></div></section><section class="section cta-banner-section" data-v-9026044c><div class="container cta-banner" data-v-9026044c><div class="banner-content" data-v-9026044c><span class="eyebrow eyebrow--light" data-v-9026044c>Ready to streamline operations?</span><h2 data-v-9026044c>See how KitchenOS keeps every shift running smoothly.</h2><p data-v-9026044c>Join 500+ restaurants already saving time and money with KitchenOS.</p></div><button class="marketing-button marketing-button--light" type="button" data-v-9026044c>Start free trial</button></div></section></main><footer id="contact" class="marketing-footer" data-v-9026044c><div class="container marketing-footer__grid" data-v-9026044c><div data-v-9026044c><div class="marketing-brand marketing-brand--footer" data-v-9026044c><div class="marketing-brand__mark" data-v-9026044c>J</div><span data-v-9026044c>KitchenOS</span></div><p data-v-9026044c>Modern operations software for restaurants, food brands, and hospitality teams worldwide.</p><div class="social-links" data-v-9026044c><a href="#" title="LinkedIn" data-v-9026044c>in</a><a href="#" title="Twitter" data-v-9026044c>𝕏</a><a href="#" title="Instagram" data-v-9026044c>📷</a></div></div><div data-v-9026044c><h4 data-v-9026044c>Product</h4><ul data-v-9026044c><li data-v-9026044c><a href="#features" data-v-9026044c>Features</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Pricing</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Integrations</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Resources</a></li><li data-v-9026044c><a href="#" data-v-9026044c>API Docs</a></li></ul></div><div data-v-9026044c><h4 data-v-9026044c>Company</h4><ul data-v-9026044c><li data-v-9026044c><a href="#" data-v-9026044c>About us</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Blog</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Careers</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Press kit</a></li></ul></div><div data-v-9026044c><h4 data-v-9026044c>Support</h4><ul data-v-9026044c><li data-v-9026044c><a href="#" data-v-9026044c>Contact</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Help center</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Community</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Status page</a></li></ul></div><div data-v-9026044c><h4 data-v-9026044c>Legal</h4><ul data-v-9026044c><li data-v-9026044c><a href="#" data-v-9026044c>Privacy policy</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Terms of service</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Security</a></li><li data-v-9026044c><a href="#" data-v-9026044c>Compliance</a></li></ul></div></div><div class="container footer-bottom" data-v-9026044c><p data-v-9026044c>© 2024 KitchenOS. All rights reserved.</p></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/HomePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HomePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9026044c"]]);
export {
  HomePage as default
};
