<template>
  <div class="marketing-page">
    <header class="marketing-header">
      <div class="container marketing-header__inner">
        <div class="marketing-brand">
          <div class="marketing-brand__mark">J</div>
          <span>KitchenOS</span>
        </div>

        <nav class="marketing-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a @click="navigateTo('features')">Integrations</a>
        </nav>

        <div class="marketing-header__actions">
          <button class="marketing-link" type="button" @click="goToLogin">Log in</button>
          <button class="marketing-button" type="button" @click="goToLogin">Get started free</button>
        </div>

        <button class="marketing-menu" type="button" aria-label="Toggle menu" @click="mobileOpen = !mobileOpen">
          ☰
        </button>
      </div>

      <div v-if="mobileOpen" class="container marketing-mobile-nav">
        <a href="#features" @click="mobileOpen = false">Features</a>
        <a href="#solutions" @click="mobileOpen = false">Solutions</a>
        <a href="#how-it-works" @click="mobileOpen = false">How it works</a>
        <a href="#pricing" @click="mobileOpen = false">Pricing</a>
        <a @click="navigateTo('features'); mobileOpen = false">Integrations</a>
      </div>
    </header>

    <main>
      <!-- SECTION 1: HERO -->
      <section class="hero section">
        <div class="container hero__grid">
          <div class="hero__content">
            <span class="badge">🚀 Trusted by 500+ restaurants worldwide</span>
            <h1>Restaurant operations, reimagined.</h1>
            <p>
                KitchenOS is the all-in-one platform that connects ordering, kitchen operations, inventory,
              and analytics into one beautifully simple control center for restaurant teams and franchises.
            </p>
            <div class="hero__actions">
              <button class="marketing-button" type="button" @click="goToLogin">Get started free</button>
              <button class="marketing-button marketing-button--secondary" type="button" @click="openDemo">Watch 3-min demo</button>
            </div>
            <div class="hero__meta">
              <div>
                <strong>4.9/5</strong>
                <span>from 280+ reviews</span>
              </div>
              <div>
                <strong>2.6k+</strong>
                <span>daily orders processed</span>
              </div>
              <div>
                <strong>99.9%</strong>
                <span>uptime guarantee</span>
              </div>
            </div>
          </div>

          <div class="hero__visual" aria-label="Dashboard preview illustration">
            <div class="hero-panel hero-panel--main">
              <div class="hero-panel__header">
                <span class="dot dot--purple"></span>
                <span class="dot dot--blue"></span>
                <span class="dot dot--green"></span>
              </div>
              <div class="hero-panel__body">
                <div class="dashboard-mini">
                  <div class="dashboard-mini__bar" style="height: 55%"></div>
                  <div class="dashboard-mini__bar" style="height: 74%"></div>
                  <div class="dashboard-mini__bar" style="height: 64%"></div>
                  <div class="dashboard-mini__bar" style="height: 89%"></div>
                  <div class="dashboard-mini__bar" style="height: 73%"></div>
                </div>
                <div class="dashboard-summary">
                  <div class="card-pill">
                    <span>Revenue</span>
                    <strong>$34.2k</strong>
                  </div>
                  <div class="card-pill card-pill--muted">
                    <span>Prep time</span>
                    <strong>11m</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="hero-panel hero-panel--floating">
              <span>Live orders</span>
              <strong>248</strong>
              <small>+18% vs yesterday</small>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 2: TRUSTED BY -->
      <section class="logo-strip section section--tight">
        <div class="container logo-strip__inner">
          <p>Trusted by leading restaurant groups and independent operators</p>
          <div class="logo-strip__list" aria-label="Partner logos">
            <span>Northstar</span>
            <span>Harbor</span>
            <span>Fireside</span>
            <span>Velora</span>
            <span>Urban Bites</span>
          </div>
        </div>
      </section>

      <!-- SECTION 3: KEY FEATURES -->
      <section id="features" class="section features-section">
        <div class="container">
          <div class="section-heading">
            <span class="eyebrow">Everything you need</span>
            <h2>Built for operations, service, and growth.</h2>
            <p>All the tools your restaurant needs to run smoothly, from orders to analytics.</p>
          </div>

          <div class="features-grid">
            <article v-for="feature in features" :key="feature.title" class="feature-card">
              <div class="feature-card__icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <a href="#" class="feature-link">Learn more →</a>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 4: HOW IT WORKS -->
      <section id="how-it-works" class="section section--soft">
        <div class="container">
          <div class="section-heading center">
            <span class="eyebrow">Getting started is simple</span>
            <h2>Go live in four clear steps.</h2>
          </div>

          <div class="steps-flow">
            <div v-for="(step, index) in steps" :key="step.title" class="step-item">
              <div class="step-item__number">{{ String(index + 1).padStart(2, '0') }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
            <div class="steps-connector"></div>
          </div>
        </div>
      </section>

      <!-- SECTION 5: PRODUCT SHOWCASE -->
      <section class="section showcase-section">
        <div class="container showcase">
          <div class="showcase__preview">
            <div class="preview-window">
              <div class="preview-window__header">
                <span class="dot dot--purple"></span>
                <span class="dot dot--blue"></span>
                <span class="dot dot--green"></span>
              </div>
              <div class="preview-window__body">
                <div class="preview-window__sidebar"></div>
                <div class="preview-window__content">
                  <div class="preview-card preview-card--wide"></div>
                  <div class="preview-grid">
                    <div class="preview-card"></div>
                    <div class="preview-card"></div>
                    <div class="preview-card"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="showcase__content">
            <span class="eyebrow">Live dashboard</span>
            <h2>Centralized control for your entire operation.</h2>
            <ul>
              <li>See live sales, stock levels, and kitchen performance in real-time.</li>
              <li>Track every branch with role-based permissions and standard workflows.</li>
              <li>Reduce errors and optimize prep with intelligent production planning.</li>
              <li>Access forecasting, analytics, and performance metrics instantly.</li>
            </ul>
            <button class="marketing-button" type="button" @click="goToLogin">Schedule demo</button>
          </div>
        </div>
      </section>

      <!-- SECTION 6: SOLUTIONS BY USE CASE -->
      <section id="solutions" class="section section--soft solutions-section">
        <div class="container">
          <div class="section-heading center">
            <span class="eyebrow">Built for your business type</span>
            <h2>Solutions tailored to your needs.</h2>
          </div>

          <div class="solutions-grid">
            <article v-for="solution in solutions" :key="solution.title" class="solution-card">
              <div class="solution-icon">{{ solution.icon }}</div>
              <h3>{{ solution.title }}</h3>
              <p>{{ solution.description }}</p>
              <ul class="solution-features">
                <li v-for="feature in solution.features" :key="feature">✓ {{ feature }}</li>
              </ul>
              <a href="#" class="solution-link">Explore for {{ solution.title }} →</a>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 7: KEY METRICS & STATS -->
      <section class="section section--brand-band stats-section">
        <div class="container stats-band">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </section>

      <!-- SECTION 8: TESTIMONIALS & SOCIAL PROOF -->
      <section class="section testimonials-section">
        <div class="container">
          <div class="section-heading center">
            <span class="eyebrow">Customer success</span>
            <h2>Trusted by operators and teams.</h2>
          </div>

          <div class="testimonials-grid">
            <article v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
              <div class="testimonial-rating">★★★★★</div>
              <p>"{{ testimonial.quote }}"</p>
              <div class="testimonial-card__bottom">
                <div class="testimonial-avatar">{{ testimonial.initials }}</div>
                <div>
                  <strong>{{ testimonial.name }}</strong>
                  <span>{{ testimonial.role }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 9: PRICING PLANS -->
      <section id="pricing" class="section section--soft pricing-section">
        <div class="container">
          <div class="section-heading center">
            <span class="eyebrow">Simple, transparent pricing</span>
            <h2>Plans for every size restaurant.</h2>
            <p>Always know what you're paying. No hidden fees.</p>
          </div>

          <div class="pricing-toggle">
            <button type="button" :class="{ active: billing === 'monthly' }" @click="billing = 'monthly'">Monthly billing</button>
            <button type="button" :class="{ active: billing === 'annual' }" @click="billing = 'annual'">Annual billing (save 20%)</button>
          </div>

          <div class="pricing-grid">
            <article v-for="plan in plans" :key="plan.name" class="pricing-card" :class="{ 'pricing-card--featured': plan.featured }">
              <div class="pricing-card__label" v-if="plan.featured">Most popular</div>
              <h3>{{ plan.name }}</h3>
              <p class="plan-description">{{ plan.subtitle }}</p>
              <div class="price-row">
                <strong>${{ billing === 'annual' ? plan.annual : plan.monthly }}</strong>
                <span>/month</span>
              </div>
              <p class="price-note" v-if="plan.featured">per location • billed {{ billing === 'annual' ? 'annually' : 'monthly' }}</p>
              <ul>
                <li v-for="item in plan.features" :key="item">✓ {{ item }}</li>
              </ul>
              <button type="button" class="marketing-button" :class="plan.featured ? '' : 'marketing-button--secondary'" @click="goToLogin">
                {{ plan.cta }}
              </button>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 10: FAQ & FINAL CTA -->
      <section id="faq" class="section faqs-section">
        <div class="container faq-layout">
          <div class="section-heading faq-heading">
            <span class="eyebrow">Questions answered</span>
            <h2>Common questions about KitchenOS.</h2>
          </div>

          <div class="faq-list">
            <div v-for="(item, index) in faqs" :key="item.question" class="faq-item" :class="{ 'faq-item--open': openFaq === index }">
              <button type="button" class="faq-question" @click="toggleFaq(index)">
                <span>{{ item.question }}</span>
                <span class="faq-toggle">{{ openFaq === index ? '−' : '+' }}</span>
              </button>
              <div v-if="openFaq === index" class="faq-answer">{{ item.answer }}</div>
            </div>
          </div>

          <div class="faq-cta">
            <p>Can't find what you're looking for?</p>
            <a href="#" class="cta-link">Check our help center →</a>
          </div>
        </div>
      </section>

      <!-- SECTION 10B: FINAL CTA BANNER -->
      <section class="section cta-banner-section">
        <div class="container cta-banner">
          <div class="banner-content">
            <span class="eyebrow eyebrow--light">Ready to streamline operations?</span>
            <h2>See how KitchenOS keeps every shift running smoothly.</h2>
            <p>Join 500+ restaurants already saving time and money with KitchenOS.</p>
          </div>
          <button class="marketing-button marketing-button--light" type="button" @click="goToLogin">Start free trial</button>
        </div>
      </section>
    </main>

    <footer id="contact" class="marketing-footer">
      <div class="container marketing-footer__grid">
        <div>
          <div class="marketing-brand marketing-brand--footer">
            <div class="marketing-brand__mark">J</div>
            <span>KitchenOS</span>
          </div>
          <p>Modern operations software for restaurants, food brands, and hospitality teams worldwide.</p>
          <div class="social-links">
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Twitter">𝕏</a>
            <a href="#" title="Instagram">📷</a>
          </div>
        </div>

        <div>
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#" @click="navigateTo('pricing')">Pricing</a></li>
            <li><a href="#" @click="navigateTo('features')">Integrations</a></li>
            <li><a href="#" @click="navigateTo('resources')">Resources</a></li>
            <li><a href="#">API Docs</a></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#" @click="navigateTo('about')">About us</a></li>
            <li><a href="#" @click="navigateTo('resources')">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press kit</a></li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#" @click="navigateTo('contact')">Contact</a></li>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Status page</a></li>
          </ul>
        </div>

        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Compliance</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; 2024 KitchenOS. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

const mobileOpen = ref(false);
const billing = ref('monthly');
const openFaq = ref(0);

// 1. HERO & FEATURES
const features = [
  { icon: '📋', title: 'Orders', description: 'Capture orders from dine-in, takeaway, and delivery channels in real-time with intelligent routing.' },
  { icon: '👨‍🍳', title: 'Kitchen Display', description: 'Coordinate prep timing with live kitchen queue, station management, and timers.' },
  { icon: '📦', title: 'Inventory & Stock', description: 'Track stock movement, par levels, low-stock alerts, and wastage across branches.' },
  { icon: '🚚', title: 'Procurement', description: 'Manage vendors, purchase orders, goods receipts, and automate reordering workflows.' },
  { icon: '📖', title: 'Recipes & Costing', description: 'Standardize recipes, calculate food costs, and track ingredient usage per dish.' },
  { icon: '📊', title: 'Analytics & Reporting', description: 'Real-time dashboards with profitability, trends, performance insights, and KPI tracking.' },
];

// 2. HOW IT WORKS STEPS
const steps = [
  {
    title: 'Create Your Workspace',
    description: 'Sign up in minutes. Invite team members and set up your first branch or location.'
  },
  {
    title: 'Configure Your Menu',
    description: 'Add menu items, prices, recipes, ingredients, and set preparation requirements.'
  },
  {
    title: 'Start Taking Orders',
    description: 'Accept orders via POS, web, app, or integrations. See them flow to kitchen instantly.'
  },
  {
    title: 'Monitor & Optimize',
    description: 'Track sales, inventory, performance and make data-driven decisions in real-time.'
  },
];

// 3. SOLUTIONS BY BUSINESS TYPE
const solutions = [
  {
    icon: '🏪',
    title: 'Independent Restaurants',
    subtitle: 'Single or multi-unit operators',
    description: 'Perfect for growing independent restaurants wanting operational control and insights.',
    features: ['Multiple locations', 'Unified reporting', 'Team management', 'Customer analytics']
  },
  {
    icon: '🏢',
    title: 'Franchises',
    subtitle: 'Multi-location franchise networks',
    description: 'Designed for franchise groups to standardize operations across all locations.',
    features: ['Brand consistency', 'Central oversight', 'Performance comparison', 'Compliance tracking']
  },
  {
    icon: '🍕',
    title: 'QSR & Fast Casual',
    subtitle: 'Quick service restaurants',
    description: 'Built for speed and volume with efficient order management and kitchen operations.',
    features: ['High-volume handling', 'Delivery integration', 'Quick analytics', 'Staff efficiency']
  },
  {
    icon: '🛵',
    title: 'Cloud Kitchens',
    subtitle: 'Delivery-first operations',
    description: 'Optimized for delivery-only and dark kitchen operations with order routing.',
    features: ['Multi-brand support', 'Delivery management', 'Demand forecasting', 'Cost optimization']
  },
];

// 4. KEY STATISTICS
const stats = [
  { value: '1.4M+', label: 'Orders processed monthly' },
  { value: '500+', label: 'Active restaurants' },
  { value: '28 hrs', label: 'Time saved per week' },
  { value: '99.9%', label: 'Platform uptime' },
];

// 5. TESTIMONIALS
const testimonials = [
  {
    name: 'Maya Patel',
    role: 'COO, Northstar Kitchen',
    initials: 'MP',
    quote: 'KitchenOS gave us instant visibility across every branch. Our teams now spend less time chasing updates and more time serving guests.'
  },
  {
    name: 'Daniel Brooks',
    role: 'Owner, Harbor Table',
    initials: 'DB',
    quote: 'The inventory controls alone paid for itself within the first month. It is clear, intuitive, and fast.'
  },
  {
    name: 'Leah Morgan',
    role: 'Operations Manager, Fireside Group',
    initials: 'LM',
    quote: 'We replaced three separate tools with one workflow. The reporting makes every review more accurate and faster.'
  },
  {
    name: 'Raj Kumar',
    role: 'General Manager, Urban Bites',
    initials: 'RK',
    quote: 'Prep time is down 30%, and our waste has decreased significantly. Highly recommend to any restaurant owner.'
  },
];

// 6. PRICING PLANS
const plans = [
  {
    name: 'Starter',
    subtitle: 'For independent restaurants',
    monthly: '99',
    annual: '79',
    cta: 'Start free trial',
    features: [
      'Up to 1 location',
      'Orders & POS integration',
      'Basic inventory tracking',
      'Simple reporting',
      'Email support',
      'Mobile app access'
    ]
  },
  {
    name: 'Growth',
    subtitle: 'For growing restaurants',
    monthly: '249',
    annual: '199',
    cta: 'Choose Growth',
    featured: true,
    features: [
      'Up to 5 locations',
      'Kitchen display system',
      'Advanced inventory',
      'Procurement workflows',
      'Advanced analytics',
      'Priority email & chat support',
      'API access',
      'Custom integrations'
    ]
  },
  {
    name: 'Enterprise',
    subtitle: 'For large franchises',
    monthly: '599+',
    annual: '479+',
    cta: 'Contact sales',
    features: [
      'Unlimited locations',
      'Custom onboarding',
      'Dedicated account manager',
      'Multi-brand permissions',
      'Advanced API',
      'Phone & priority support',
      'Custom integrations',
      'Training & consulting'
    ]
  },
];

// 7. FAQ ITEMS
const faqs = [
  {
    question: 'How quickly can we get up and running?',
    answer: 'Most restaurants are live and taking orders within 1-3 days. We provide guided setup, menu templates, and dedicated onboarding to accelerate your launch.'
  },
  {
    question: 'Can we manage multiple locations with KitchenOS?',
    answer: 'Absolutely! KitchenOS is built for multi-location operations. You can manage unlimited branches with centralized controls, branch-specific customization, and unified reporting across all locations.'
  },
  {
    question: 'Does KitchenOS integrate with our existing POS system?',
    answer: 'Yes! We integrate with major POS systems including Toast, Square, Lightspeed, and others. We also have a robust API for custom integrations with your specific systems.'
  },
  {
    question: 'What about data security and compliance?',
    answer: 'We maintain SOC 2 Type II compliance, use enterprise-grade encryption, and have 99.9% uptime guarantee. Your data is backed up automatically and accessible anytime.'
  },
  {
    question: 'Can different team members have different permission levels?',
    answer: 'Yes. KitchenOS supports role-based access control. You can set specific permissions for managers, chefs, staff, and admins across features like orders, inventory, reporting, and settings.'
  },
  {
    question: 'What support options do you offer?',
    answer: 'We provide email support for Starter plans, email and chat for Growth, and dedicated account managers for Enterprise. We also have extensive help docs, video tutorials, and community forums.'
  },
  {
    question: 'Can we try KitchenOS before committing?',
    answer: 'Yes! We offer a 14-day free trial with full feature access. No credit card required. Many restaurants use this to validate the workflow with their team before subscribing.'
  },
  {
    question: 'How is pricing calculated for multiple locations?',
    answer: 'Pricing is per-location. So a Growth plan ($249) covers 5 locations, and an Enterprise plan covers unlimited locations. You pay based on your needs.'
  },
];

// METHODS
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index;
};

const goToLogin = () => {
  router.visit('/login');
};

const openDemo = () => {
  // Could open a modal or navigate to demo page
  alert('Demo video would open here');
};

const navigateTo = (page) => {
  // Navigate to additional pages
  if (page === 'pricing') {
    router.visit('/pricing');
  } else if (page === 'features') {
    router.visit('/features');
  } else if (page === 'about') {
    router.visit('/about');
  } else if (page === 'contact') {
    router.visit('/contact');
  } else if (page === 'resources') {
    router.visit('/resources');
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
}

.section {
  padding: 96px 0;
}

.section--tight {
  padding: 32px 0 0;
}

.section--soft {
  background: linear-gradient(180deg, rgba(79, 70, 229, 0.04), rgba(14, 116, 144, 0.03));
}

.section--brand-band {
  background: linear-gradient(135deg, #312e81 0%, #4338ca 100%);
}

.eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #4f46e5;
  font-weight: 700;
}

.eyebrow--light {
  color: rgba(255, 255, 255, 0.8);
}

.badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(79, 70, 229, 0.1);
  border-radius: 20px;
  color: #4f46e5;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.section-heading {
  margin-bottom: 56px;
  max-width: 680px;
}

.section-heading.center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-heading h2 {
  margin: 0 0 16px;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.2;
  letter-spacing: -0.04em;
  color: #0f172a;
}

.section-heading p {
  margin: 0;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.6;
}

.marketing-page {
  background: #f8fafc;
  color: #0f172a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* HEADER & NAVIGATION */
.marketing-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}

.marketing-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  gap: 16px;
}

.marketing-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  color: #111827;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.marketing-brand__mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: white;
  background: linear-gradient(135deg, #4f46e5, #8b5cf6);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.28);
  font-weight: 700;
  font-size: 1.1rem;
}

.marketing-brand--footer {
  margin-bottom: 16px;
}

.marketing-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
}

.marketing-nav a {
  color: #374151;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
}

.marketing-nav a:hover {
  color: #4f46e5;
}

.marketing-header__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.marketing-button,
.marketing-link,
.marketing-menu {
  font: inherit;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.marketing-link {
  background: transparent;
  padding: 10px 14px;
  color: #111827;
  font-weight: 600;
  font-size: 0.95rem;
}

.marketing-link:hover {
  color: #4f46e5;
}

.marketing-button {
  border: 0;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 10px 20px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 18px 35px rgba(79, 70, 229, 0.22);
  white-space: nowrap;
}

.marketing-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 45px rgba(79, 70, 229, 0.28);
}

.marketing-button--secondary {
  background: #eef2ff;
  color: #1f2937;
  box-shadow: none;
}

.marketing-button--secondary:hover {
  background: #e0e7ff;
}

.marketing-button--light {
  background: white;
  color: #111827;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.marketing-button--light:hover {
  background: #f1f5f9;
}

.marketing-menu {
  display: none;
  background: #eef2ff;
  width: 42px;
  height: 42px;
  font-size: 1.5rem;
}

.marketing-mobile-nav {
  display: none;
  flex-direction: column;
  gap: 14px;
  padding: 12px 0 18px;
}

.marketing-mobile-nav a {
  color: #111827;
  font-weight: 600;
  cursor: pointer;
}

/* HERO SECTION */
.hero {
  padding-top: 140px;
  padding-bottom: 60px;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 64px;
}

.hero__content h1 {
  margin: 0 0 24px;
  font-size: clamp(2.4rem, 5vw, 4.5rem);
  line-height: 1.1;
  letter-spacing: -0.08em;
  max-width: 680px;
  color: #0f172a;
}

.hero__content p {
  margin: 0;
  max-width: 580px;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #475569;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.hero__meta {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  flex-wrap: wrap;
}

.hero__meta div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero__meta strong {
  font-size: 1.4rem;
  color: #111827;
}

.hero__meta span {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

/* HERO VISUALIZATION */
.hero__visual {
  position: relative;
  height: 400px;
}

.hero-panel {
  border-radius: 14px;
  background: white;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hero-panel--main {
  height: 100%;
}

.hero-panel__header {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
}

.hero-panel__body {
  padding: 24px;
}

.dashboard-mini {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 120px;
  margin-bottom: 20px;
  gap: 12px;
}

.dashboard-mini__bar {
  flex: 1;
  background: linear-gradient(180deg, #4f46e5, #7c3aed);
  border-radius: 4px;
  opacity: 0.8;
}

.dashboard-summary {
  display: flex;
  gap: 12px;
  flex-direction: column;
}

.card-pill {
  padding: 12px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}

.card-pill span {
  color: #64748b;
  font-size: 0.85rem;
}

.card-pill strong {
  color: #0f172a;
  font-size: 1.1rem;
}

.card-pill--muted {
  opacity: 0.6;
}

.hero-panel--floating {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  padding: 16px;
  text-align: center;
}

.hero-panel--floating span {
  display: block;
  color: #64748b;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.hero-panel--floating strong {
  display: block;
  font-size: 1.8rem;
  color: #4f46e5;
  margin-bottom: 4px;
}

.hero-panel--floating small {
  display: block;
  color: #10b981;
  font-size: 0.8rem;
  font-weight: 600;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot--purple {
  background: #e879f9;
}

.dot--blue {
  background: #0ea5e9;
}

.dot--green {
  background: #10b981;
}

/* LOGO STRIP */
.logo-strip__inner {
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}

.logo-strip__inner p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 16px;
  font-weight: 500;
}

.logo-strip__list {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  font-weight: 600;
  color: #94a3b8;
}

/* FEATURES SECTION */
.features-section {
  padding-top: 120px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 32px;
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.15);
  border-color: #4f46e5;
}

.feature-card__icon {
  font-size: 2.8rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 0 0 12px;
  font-size: 1.3rem;
  color: #0f172a;
}

.feature-card p {
  margin: 0 0 16px;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
}

.feature-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.feature-link:hover {
  color: #7c3aed;
}

/* HOW IT WORKS */
.steps-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 40px;
  position: relative;
}

.step-item {
  text-align: center;
}

.step-item__number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.step-item h3 {
  margin: 0 0 12px;
  font-size: 1.25rem;
  color: #0f172a;
}

.step-item p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* SHOWCASE SECTION */
.showcase-section {
  padding: 120px 0;
}

.showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.showcase__preview {
  position: relative;
  height: 420px;
}

.preview-window {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  background: white;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.preview-window__header {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  gap: 8px;
  background: #f8fafc;
}

.preview-window__body {
  display: grid;
  grid-template-columns: 120px 1fr;
  flex: 1;
  overflow: hidden;
}

.preview-window__sidebar {
  background: #f1f5f9;
  border-right: 1px solid #e2e8f0;
}

.preview-window__content {
  padding: 16px;
  overflow: hidden;
}

.preview-card {
  height: 40px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
  border-radius: 6px;
  margin-bottom: 12px;
  animation: shimmer 2s infinite;
}

.preview-card--wide {
  height: 60px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.showcase__content h2 {
  margin-top: 0;
}

.showcase__content ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.showcase__content li {
  color: #475569;
  font-size: 1rem;
  line-height: 1.7;
  padding-left: 28px;
  position: relative;
}

.showcase__content li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 1.2rem;
}

/* SOLUTIONS SECTION */
.solutions-section {
  padding-top: 120px;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.solution-card {
  padding: 32px;
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.solution-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.12);
  border-color: #d6d3f7;
}

.solution-icon {
  font-size: 2.8rem;
  margin-bottom: 16px;
}

.solution-card h3 {
  margin: 0 0 8px;
  font-size: 1.25rem;
  color: #0f172a;
}

.solution-card > p:first-of-type {
  display: none;
}

.solution-card p {
  margin: 0 0 20px;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
}

.solution-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.solution-features li {
  color: #475569;
  font-size: 0.9rem;
  padding-left: 20px;
  position: relative;
}

.solution-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-weight: bold;
}

.solution-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: inline-block;
}

.solution-link:hover {
  color: #7c3aed;
}

/* STATS SECTION */
.stats-section {
  background: linear-gradient(135deg, #312e81 0%, #4338ca 100%);
}

.stats-band {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  text-align: center;
}

.stat-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-card strong {
  font-size: 2.8rem;
  color: white;
}

.stat-card span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 500;
}

/* TESTIMONIALS */
.testimonials-section {
  padding-top: 120px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.testimonial-card {
  padding: 28px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.testimonial-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.testimonial-rating {
  color: #fbbf24;
  font-size: 1rem;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.testimonial-card p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.8;
  font-style: italic;
  flex-grow: 1;
  margin-bottom: 20px;
}

.testimonial-card__bottom {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #8b5cf6);
  color: white;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.testimonial-card__bottom strong {
  display: block;
  color: #0f172a;
  font-size: 0.95rem;
}

.testimonial-card__bottom span {
  display: block;
  color: #64748b;
  font-size: 0.8rem;
}

/* PRICING */
.pricing-section {
  padding-top: 120px;
}

.pricing-toggle {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 56px;
  background: #f1f5f9;
  padding: 8px;
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

.pricing-toggle button {
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s;
  font-size: 0.95rem;
}

.pricing-toggle button.active {
  background: white;
  color: #0f172a;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
  max-width: 1100px;
  margin: 0 auto;
}

.pricing-card {
  padding: 36px;
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  position: relative;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  box-shadow: 0 12px 40px rgba(79, 70, 229, 0.12);
}

.pricing-card--featured {
  border-color: #4f46e5;
  transform: scale(1.05);
  box-shadow: 0 20px 50px rgba(79, 70, 229, 0.2);
}

.pricing-card__label {
  position: absolute;
  top: -12px;
  left: 20px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.pricing-card h3 {
  margin: 0 0 8px;
  font-size: 1.4rem;
  color: #0f172a;
}

.plan-description {
  margin: 0 0 20px;
  color: #64748b;
  font-size: 0.9rem;
}

.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 24px 0;
}

.price-row strong {
  font-size: 3rem;
  color: #0f172a;
}

.price-row span {
  color: #64748b;
  font-size: 1rem;
}

.price-note {
  margin: 0 0 20px;
  color: #64748b;
  font-size: 0.85rem;
}

.pricing-card ul {
  list-style: none;
  padding: 0;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-grow: 1;
}

.pricing-card li {
  color: #475569;
  font-size: 0.95rem;
  padding-left: 24px;
  position: relative;
  line-height: 1.5;
}

.pricing-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
  font-size: 1.1rem;
}

/* FAQ */
.faqs-section {
  padding-top: 120px;
}

.faq-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  align-items: start;
}

.faq-heading {
  margin-bottom: 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
}

.faq-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.faq-item--open {
  border-color: #4f46e5;
}

.faq-question {
  width: 100%;
  padding: 20px;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  transition: background 0.2s;
}

.faq-question:hover {
  background: #f8fafc;
}

.faq-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #4f46e5;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.faq-answer {
  padding: 0 20px 20px;
  color: #64748b;
  line-height: 1.8;
  font-size: 0.95rem;
}

.faq-cta {
  text-align: center;
  margin-top: 40px;
  padding: 32px;
  background: #f8fafc;
  border-radius: 12px;
}

.faq-cta p {
  margin: 0 0 12px;
  color: #64748b;
  font-size: 0.95rem;
}

.cta-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.cta-link:hover {
  color: #7c3aed;
}

/* CTA BANNER */
.cta-banner-section {
  background: linear-gradient(135deg, #312e81 0%, #4338ca 100%);
  padding: 80px 0;
}

.cta-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.banner-content {
  flex: 1;
}

.banner-content .eyebrow {
  color: rgba(255, 255, 255, 0.8);
}

.banner-content h2 {
  margin: 8px 0 12px;
  color: white;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  line-height: 1.2;
}

.banner-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

/* FOOTER */
.marketing-footer {
  background: #111827;
  color: #e5e7eb;
  padding: 64px 0 24px;
}

.marketing-footer__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.1);
}

.marketing-footer__grid > div:first-child {
  grid-column: 1;
}

.marketing-footer__grid p {
  margin: 12px 0 0;
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.6;
}

.marketing-footer h4 {
  margin: 0 0 16px;
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
}

.marketing-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.marketing-footer a {
  color: #9ca3af;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  cursor: pointer;
}

.marketing-footer a:hover {
  color: #f3f4f6;
}

.social-links {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.social-links a {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(229, 231, 235, 0.1);
  display: grid;
  place-items: center;
  font-weight: 600;
}

.social-links a:hover {
  background: rgba(229, 231, 235, 0.2);
}

.footer-bottom {
  text-align: center;
  color: #6b7280;
  font-size: 0.85rem;
  padding-top: 20px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .marketing-nav {
    display: none;
  }

  .marketing-menu {
    display: block;
  }

  .marketing-mobile-nav {
    display: flex;
  }

  .hero__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .hero__meta {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .hero__visual {
    height: 300px;
  }

  .hero {
    padding-top: 100px;
  }

  .showcase {
    grid-template-columns: 1fr;
  }

  .showcase__preview {
    height: 300px;
  }

  .faq-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .pricing-card--featured {
    transform: scale(1);
  }

  .cta-banner {
    flex-direction: column;
    text-align: center;
  }

  .logo-strip__list {
    gap: 20px;
  }

  .section {
    padding: 60px 0;
  }

  .section-heading {
    margin-bottom: 40px;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 40px 0;
  }

  .container {
    width: calc(100% - 16px);
  }

  .hero__content h1 {
    font-size: 1.8rem;
  }

  .hero__meta {
    grid-template-columns: 1fr;
  }

  .hero__actions {
    flex-direction: column;
  }

  .marketing-button {
    width: 100%;
  }

  .pricing-toggle {
    flex-direction: column;
  }

  .pricing-toggle button {
    width: 100%;
  }

  .steps-flow {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
