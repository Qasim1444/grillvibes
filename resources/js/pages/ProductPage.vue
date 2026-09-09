<template>
  <div class="home-page">
    <header class="site-header">
      <a class="brand" href="/" aria-label="KitchenOS home">
        <span class="brand-mark">K</span>
        <span>Kitchen<span class="brand-accent">OS</span></span>
      </a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#menu">Menu</a>
        <a href="/product">Product</a>
        <a href="#workflow">The service loop</a>
        <a href="#guest-ordering">Guest channels</a>
      </nav>
      <a class="header-login" href="/login">Sign in <span aria-hidden="true">↗</span></a>
    </header>

    <main>
      <section class="hero section-wrap">
        <div class="hero-copy">
          <p class="kicker"><span class="pulse-dot"></span> The restaurant operating system</p>
          <h1>Run service from one clear view.</h1>
          <p class="hero-lede">KitchenOS brings orders, kitchen production, stock, people, guests, and finance into one operating rhythm for every branch.</p>
          <div class="hero-actions">
            <a class="button button--solid" href="/login">Enter the workspace <span aria-hidden="true">→</span></a>
            <a class="button button--quiet" href="#modules">See what is connected</a>
          </div>
          <div class="hero-notes">
            <span>Every branch</span><span>Every service channel</span><span>Every handoff</span>
          </div>
        </div>

        <div class="command-center" aria-label="KitchenOS shift overview preview">
          <div class="window-bar"><span></span><span></span><span></span><b>Tuesday / Main branch</b><i>● Service live</i></div>
          <div class="command-body">
            <aside class="mini-sidebar"><strong>KitchenOS</strong><span class="mini-active">Overview</span><span>Orders + POS</span><span>Kitchen board</span><span>Stockroom</span><span>People + finance</span></aside>
            <div class="mini-main">
              <div class="mini-heading"><div><small>Tuesday, 08 September · Main branch</small><h2>Good morning, team.</h2></div><button>＋ New order</button></div>
              <div class="metric-row">
                <div class="metric"><small>Today's sales</small><strong>£8,426</strong><em>↑ 12.8% vs last Tue</em></div>
                <div class="metric"><small>Live orders</small><strong>42</strong><em class="warning">8 being prepared</em></div>
                <div class="metric"><small>Stock alerts</small><strong>06</strong><em class="danger">2 need ordering</em></div>
              </div>
              <div class="mini-grid"><div class="chart-card"><div class="card-title"><b>Service pace</b><span>Last 7 days</span></div><div class="bars"><i style="height: 42%"></i><i style="height: 62%"></i><i style="height: 51%"></i><i style="height: 78%"></i><i style="height: 68%"></i><i style="height: 91%"></i><i style="height: 82%"></i></div><div class="chart-labels"><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span></div></div><div class="queue-card"><div class="card-title"><b>Kitchen queue</b><span class="queue-live">Live</span></div><p><b>#1048</b><span>Table 12 · 4 items</span><strong>04:12</strong></p><p><b>#1047</b><span>Delivery · 2 items</span><strong>07:38</strong></p><p><b>#1046</b><span>Table 04 · 6 items</span><strong class="late">12:04</strong></p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section class="trust-strip"><div class="section-wrap trust-inner"><span>One operating rhythm for</span><b>front of house</b><b>kitchen stations</b><b>stockrooms</b><b>people teams</b><b>multi-branch groups</b></div></section>

      <section id="menu" class="section-wrap menu-preview">
        <div class="section-intro"><p class="kicker">Menu products</p><h2>Every dish,<br><em>clearly described.</em></h2><p>Keep your live food catalogue connected to KitchenOS. Categories, descriptions, prices, and images stay ready for your team and your guests.</p></div>
        <div v-if="foodItems.length" class="product-menu-grid"><article v-for="item in foodItems" :key="item.id" class="product-menu-card"><img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy"><div class="product-menu-card__body"><span>{{ item.food_category?.name || 'Menu item' }}</span><h3>{{ item.name }}</h3><p>{{ item.description }}</p><strong>£{{ item.price }}</strong></div></article></div>
        <p v-else class="menu-empty">No published menu products yet. Add food items from the KitchenOS workspace.</p>
      </section>

      <section id="modules" class="section-wrap modules-section">
        <div class="section-intro"><p class="kicker">Built around the way restaurants work</p><h2>From first ticket<br><em>to final figure.</em></h2><p>Each part of the service cycle stays connected, so managers can act on the same information as the team doing the work.</p></div>
        <div class="module-grid"><article v-for="module in modules" :key="module.title" class="module-card"><div class="module-icon" :class="module.tone">{{ module.icon }}</div><div><h3>{{ module.title }}</h3><p>{{ module.description }}</p><a :href="module.href">View {{ module.link }} <span aria-hidden="true">↗</span></a></div></article></div>
      </section>

      <section id="workflow" class="workflow-band"><div class="section-wrap workflow-inner"><div class="workflow-copy"><p class="kicker">The service loop</p><h2>Less chasing.<br><em>More serving.</em></h2><p>One order can move from guest to station to stock movement to management report without being re-entered or lost between teams.</p><a class="text-link" href="/dashboard">See the operations view <span>→</span></a></div><div class="flow-list"><div v-for="(step, index) in workflow" :key="step.title" class="flow-step"><span>0{{ index + 1 }}</span><div><b>{{ step.title }}</b><p>{{ step.description }}</p></div></div></div></div></section>

      <section id="guest-ordering" class="section-wrap guest-section"><div class="guest-card"><div><p class="kicker kicker--light">Guest channels, one kitchen queue</p><h2>Let guests order the way that suits the moment.</h2><p>Publish a QR menu for the table, run a branded kiosk at the counter, or take the order at POS. Every channel lands in the same kitchen and reporting flow.</p><div class="guest-links"><a href="/menu/demo">Preview a QR menu ↗</a><a href="/kiosk/1">Open a kiosk ↗</a><a href="/pos">See POS ↗</a></div></div><div class="guest-visual"><div class="qr-square"><span>QR</span><i></i><i></i><i></i></div><div class="guest-ticket"><small>NEW ORDER · QR MENU</small><b>Table 18</b><span>2 × House ramen</span><span>1 × Yuzu soda</span><strong>Routed to kitchen →</strong></div></div></div></section>
    </main>

    <footer class="site-footer"><div class="section-wrap footer-inner"><a class="brand" href="/"><span class="brand-mark">K</span><span>Kitchen<span class="brand-accent">OS</span></span></a><nav class="footer-nav" aria-label="Footer navigation"><a href="#menu">Menu</a><a href="#workflow">Workflow</a><a href="#guest-ordering">Guest channels</a></nav><p>One calm place to run a busy restaurant.</p><a href="/login">Sign in to KitchenOS ↗</a></div></footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  categories: { type: Array, default: () => [] },
  foodItems: { type: Array, default: () => [] },
});

const foodItems = computed(() => props.foodItems.map(item => ({
  ...item,
  food_category: item.food_category || props.categories.find(category => category.id === item.foodcategory_id),
})));

const modules = [
  { icon: '⌁', tone: 'coral', title: 'Orders & POS', description: 'Capture dine-in, takeaway, delivery, and counter sales in one order stream.', link: 'orders workspace', href: '/orders' },
  { icon: '▦', tone: 'teal', title: 'Kitchen production', description: 'Route tickets to stations, track preparation, and keep the pass moving.', link: 'KDS board', href: '/kds/board' },
  { icon: '◒', tone: 'gold', title: 'Stock & procurement', description: 'Connect recipes and goods receipts to stock levels, vendors, and reorder decisions.', link: 'stock controls', href: '/inventory/stock' },
  { icon: '↗', tone: 'blue', title: 'People & payroll', description: 'Keep attendance, leave, overtime, loans, and payroll in the same back office.', link: 'people tools', href: '/hr/attendance' },
  { icon: '◇', tone: 'violet', title: 'Guests & loyalty', description: 'Build repeat visits with customer profiles, promos, feedback, and loyalty activity.', link: 'customer records', href: '/customers' },
  { icon: '▤', tone: 'green', title: 'Reports & control', description: 'Turn sales, food cost, expenses, and branch activity into decisions.', link: 'food-cost reports', href: '/reports/food-cost' },
];

const workflow = [
  { title: 'Take the order', description: 'POS, QR menu, kiosk, and front-of-house teams feed one order stream.' },
  { title: 'Make production visible', description: 'The KDS shows the right ticket, station, timing, and priority to the kitchen.' },
  { title: 'Keep stock accountable', description: 'Recipes, purchase orders, and goods receipts connect service volume to inventory movement.' },
  { title: 'Run the business', description: 'Reports bring sales, food cost, expenses, people, and guest signals together.' },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
:global(*) { box-sizing: border-box; }
:global(body) { background: #f7f8f5; }
.home-page { --ink: #192321; --muted: #65736d; --line: #dce3dc; --cream: #f7f8f5; --coral: #e9674f; color: var(--ink); font-family: 'DM Sans', sans-serif; overflow: hidden; }
.section-wrap { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
.site-header { width: min(1180px, calc(100% - 48px)); min-height: 84px; margin: auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.brand { align-items: center; color: var(--ink); display: inline-flex; font: 700 1.12rem 'Space Grotesk', sans-serif; gap: 10px; text-decoration: none; letter-spacing: -.04em; }
.brand-mark { background: var(--ink); border-radius: 9px; color: #fff; display: grid; font-size: .9rem; height: 32px; place-items: center; width: 32px; }
.brand-accent { color: var(--coral); }.site-nav { display: flex; gap: 30px; margin-left: auto; }.site-nav a,.header-login { color: var(--muted); font-size: .87rem; text-decoration: none; }.site-nav a:hover,.header-login:hover { color: var(--coral); }.header-login { color: var(--ink); font-weight: 700; }.header-login span { color: var(--coral); margin-left: 5px; }
.hero { align-items: center; display: grid; gap: 76px; grid-template-columns: .78fr 1.22fr; min-height: 635px; padding-bottom: 88px; padding-top: 72px; }.kicker { color: var(--coral); font-size: .72rem; font-weight: 700; letter-spacing: .12em; margin: 0 0 20px; text-transform: uppercase; }.pulse-dot { background: #49af83; border-radius: 50%; box-shadow: 0 0 0 5px #d9f0e4; display: inline-block; height: 7px; margin: 0 9px 1px 1px; width: 7px; }.hero h1,.section-intro h2,.workflow-copy h2,.guest-card h2 { font: 700 clamp(3rem, 5.4vw, 5.25rem)/.98 'Space Grotesk', sans-serif; letter-spacing: -.07em; margin: 0; }.hero-lede { color: var(--muted); font-size: 1.06rem; line-height: 1.7; margin: 28px 0 30px; max-width: 440px; }.hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 14px; }.button { border-radius: 5px; display: inline-flex; font-size: .88rem; font-weight: 700; gap: 22px; padding: 14px 18px; text-decoration: none; }.button--solid { background: var(--coral); color: #fff; }.button--solid:hover { background: #d85842; }.button--quiet { color: var(--ink); padding-left: 4px; }.hero-notes { color: #89958f; display: flex; flex-wrap: wrap; font-size: .7rem; gap: 17px; margin-top: 45px; }.hero-notes span::before { color: var(--coral); content: '•'; margin-right: 6px; }
.command-center { background: #fff; border: 1px solid #dbe3dc; border-radius: 12px; box-shadow: 0 24px 60px #243b3214; overflow: hidden; transform: rotate(1.3deg); }.window-bar { align-items: center; background: #eef2ed; border-bottom: 1px solid #dbe3dc; color: #76837d; display: flex; font-size: .63rem; gap: 6px; padding: 12px 16px; }.window-bar span { background: #cad4cd; border-radius: 50%; height: 7px; width: 7px; }.window-bar b { font-weight: 500; margin-left: 12px; }.window-bar i { color: #40a678; font-style: normal; margin-left: auto; }.command-body { display: flex; min-height: 350px; }.mini-sidebar { background: #23312d; color: #b9c7c0; display: flex; flex-direction: column; font-size: .66rem; gap: 21px; padding: 24px 15px; width: 118px; }.mini-sidebar strong { color: #fff; font: 700 .8rem 'Space Grotesk', sans-serif; margin-bottom: 17px; }.mini-active { background: #40534b; border-radius: 4px; color: #fff; margin: -7px -7px; padding: 7px; }.mini-main { flex: 1; padding: 28px; }.mini-heading { align-items: start; display: flex; justify-content: space-between; }.mini-heading small,.metric small,.card-title span { color: #8b9891; font-size: .62rem; }.mini-heading h2 { font: 600 1.2rem 'Space Grotesk', sans-serif; letter-spacing: -.04em; margin: 5px 0 22px; }.mini-heading button { background: var(--coral); border: 0; border-radius: 4px; color: #fff; font-size: .65rem; padding: 9px 11px; }.metric-row { display: grid; gap: 9px; grid-template-columns: repeat(3, 1fr); }.metric { background: #f4f7f3; border-radius: 5px; padding: 13px; }.metric strong { display: block; font: 600 1.25rem 'Space Grotesk', sans-serif; margin: 7px 0; }.metric em { color: #3c9d70; font-size: .59rem; font-style: normal; }.metric .warning { color: #c69334; }.metric .danger { color: #d66c5b; }.mini-grid { display: grid; gap: 10px; grid-template-columns: 1.12fr .88fr; margin-top: 10px; }.chart-card,.queue-card { border: 1px solid #e5ebe5; border-radius: 5px; padding: 15px; }.card-title { display: flex; font-size: .68rem; justify-content: space-between; }.card-title b { font-weight: 700; }.queue-live { color: #49a879 !important; }.bars { align-items: end; display: flex; gap: 9px; height: 100px; padding: 17px 8px 0; }.bars i { background: #e9876f; border-radius: 3px 3px 0 0; flex: 1; }.bars i:nth-child(2n) { background: #74b8a0; }.chart-labels { color: #9aa59e; display: flex; font-size: .5rem; justify-content: space-between; }.queue-card p { border-bottom: 1px solid #edf0ed; display: grid; font-size: .58rem; gap: 3px; margin: 14px 0 0; padding-bottom: 9px; }.queue-card p span { color: #8a9790; }.queue-card p strong { color: #3d9c74; font-weight: 600; }.queue-card p .late { color: #d56d5c; }
.trust-strip { border-bottom: 1px solid var(--line); border-top: 1px solid var(--line); }.trust-inner { align-items: center; display: flex; gap: 28px; justify-content: space-between; min-height: 78px; }.trust-inner span { color: #8b9690; font-size: .72rem; }.trust-inner b { color: #68756f; font: 600 1rem 'Space Grotesk', sans-serif; }.modules-section { padding-bottom: 120px; padding-top: 126px; }.section-intro { display: grid; grid-template-columns: 1fr 1fr 1fr; margin-bottom: 58px; }.section-intro .kicker { grid-column: 1 / -1; }.section-intro h2 { font-size: clamp(2.5rem, 4vw, 4rem); }.section-intro h2 em,.workflow-copy h2 em { color: var(--coral); font-style: normal; }.section-intro > p:last-child { align-self: end; color: var(--muted); font-size: .95rem; line-height: 1.7; max-width: 280px; }.module-grid { border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(3, 1fr); }.module-card { border-bottom: 1px solid var(--line); display: flex; gap: 18px; min-height: 205px; padding: 32px 28px 28px 0; }.module-card:nth-child(3n + 2),.module-card:nth-child(3n + 3) { border-left: 1px solid var(--line); padding-left: 28px; }.module-icon { align-items: center; border-radius: 7px; display: flex; flex: 0 0 38px; font-size: 1.2rem; height: 38px; justify-content: center; }.coral { background: #fbe2dc; color: #d65e48; }.teal { background: #d9eee7; color: #368d72; }.gold { background: #faecc9; color: #af7d21; }.blue { background: #dcebf3; color: #43809d; }.violet { background: #e8e1f1; color: #7d639a; }.green { background: #dfedcf; color: #68954a; }.module-card h3 { font: 600 1.06rem 'Space Grotesk', sans-serif; margin: 1px 0 9px; }.module-card p { color: var(--muted); font-size: .82rem; line-height: 1.6; margin: 0 0 19px; max-width: 235px; }.module-card a,.guest-links a { color: var(--coral); font-size: .76rem; font-weight: 700; text-decoration: none; }
.menu-preview { padding: 104px 0 112px; }.product-menu-grid { display: grid; gap: 20px; grid-template-columns: repeat(4, 1fr); }.product-menu-card { background: #fff; border: 1px solid var(--line); display: flex; flex-direction: column; min-width: 0; }.product-menu-card > img { height: 190px; object-fit: cover; width: 100%; }.product-menu-card__body { display: flex; flex: 1; flex-direction: column; padding: 18px; }.product-menu-card__body > span { color: var(--coral); font-size: .62rem; font-weight: 700; text-transform: uppercase; }.product-menu-card h3 { font: 600 1.05rem 'Space Grotesk', sans-serif; margin: 10px 0 7px; }.product-menu-card p { color: var(--muted); font-size: .78rem; line-height: 1.6; margin: 0 0 18px; }.product-menu-card strong { color: var(--ink); font: 600 .82rem 'Space Grotesk', sans-serif; margin-top: auto; }.menu-empty { border-top: 1px solid var(--line); color: var(--muted); padding-top: 22px; }
.workflow-band { background: #25342f; color: #f3f6f1; }.workflow-inner { display: grid; gap: 100px; grid-template-columns: .9fr 1.1fr; padding-bottom: 120px; padding-top: 120px; }.kicker--light { color: #f0a28e; }.workflow-copy h2 { font-size: clamp(2.7rem, 4vw, 4.1rem); }.workflow-copy > p:not(.kicker) { color: #adbbb3; font-size: .95rem; line-height: 1.7; margin: 28px 0; max-width: 330px; }.text-link { color: #fff; font-size: .8rem; font-weight: 700; text-decoration: none; }.text-link span { color: #f28b73; margin-left: 15px; }.flow-list { border-top: 1px solid #52635b; }.flow-step { align-items: start; border-bottom: 1px solid #52635b; display: flex; gap: 30px; padding: 24px 0; }.flow-step > span { color: #ee836b; font: 600 .75rem 'Space Grotesk', sans-serif; }.flow-step b { font: 600 1rem 'Space Grotesk', sans-serif; }.flow-step p { color: #aab9b1; font-size: .8rem; line-height: 1.55; margin: 7px 0 0; }
.guest-section { padding-bottom: 120px; padding-top: 120px; }.guest-card { align-items: center; background: #e76f55; border-radius: 8px; color: #fff; display: grid; gap: 70px; grid-template-columns: 1fr .7fr; overflow: hidden; padding: 62px 76px; }.guest-card h2 { font-size: clamp(2rem, 3.3vw, 3.3rem); letter-spacing: -.06em; max-width: 560px; }.guest-card p:not(.kicker) { color: #ffe4dc; font-size: .9rem; line-height: 1.7; max-width: 440px; }.guest-links { display: flex; flex-wrap: wrap; gap: 24px; margin-top: 28px; }.guest-links a { color: #fff; }.guest-visual { height: 225px; position: relative; }.qr-square { background: #fff; border-radius: 6px; color: #22332d; height: 120px; left: 9%; padding: 22px; position: absolute; top: 8%; transform: rotate(-8deg); width: 120px; }.qr-square span { font: 700 1.7rem 'Space Grotesk', sans-serif; }.qr-square i { background: #22332d; display: block; height: 11px; position: absolute; width: 11px; }.qr-square i:nth-child(2) { right: 18px; top: 18px; }.qr-square i:nth-child(3) { bottom: 18px; left: 18px; }.qr-square i:nth-child(4) { bottom: 25px; right: 24px; }.guest-ticket { background: #fff; border-radius: 6px; box-shadow: 0 12px 25px #9a382b45; color: var(--ink); display: flex; flex-direction: column; gap: 6px; padding: 18px; position: absolute; right: 0; top: 30%; transform: rotate(5deg); width: 190px; }.guest-ticket small { color: var(--coral); font-size: .55rem; font-weight: 700; letter-spacing: .1em; }.guest-ticket b { font: 600 1rem 'Space Grotesk', sans-serif; }.guest-ticket span { color: var(--muted); font-size: .65rem; }.guest-ticket strong { border-top: 1px solid #e8ece8; color: #3e9b72; font-size: .65rem; margin-top: 7px; padding-top: 9px; }
.site-footer { border-top: 1px solid var(--line); }.footer-inner { align-items: center; display: flex; gap: 28px; min-height: 100px; }.footer-inner p { color: #8b9690; font-size: .76rem; margin: 0; }.footer-inner > a:last-child { color: var(--ink); font-size: .76rem; font-weight: 700; margin-left: auto; text-decoration: none; }
@media (max-width: 900px) { .hero { gap: 45px; grid-template-columns: 1fr; padding-top: 65px; }.command-center { max-width: 720px; transform: none; }.trust-inner { flex-wrap: wrap; gap: 18px 25px; padding: 20px 0; }.section-intro { grid-template-columns: 1fr 1fr; row-gap: 25px; }.section-intro .kicker { grid-column: 1 / -1; }.section-intro > p:last-child { grid-column: 2; }.product-menu-grid { grid-template-columns: repeat(2, 1fr); }.workflow-inner { gap: 55px; grid-template-columns: 1fr; }.guest-card { gap: 30px; grid-template-columns: 1fr; }.guest-visual { margin: -10px auto 0; width: min(340px, 100%); } }
@media (max-width: 640px) { .section-wrap,.site-header { width: min(100% - 32px, 1180px); }.site-header { min-height: 70px; }.site-nav { display: none; }.header-login { font-size: .78rem; }.hero { min-height: auto; padding-bottom: 60px; padding-top: 56px; }.hero h1 { font-size: 3.45rem; }.hero-lede { font-size: .95rem; }.hero-notes { gap: 9px 15px; margin-top: 30px; }.command-body { min-height: 285px; }.mini-sidebar { display: none; }.mini-main { padding: 17px; }.mini-heading h2 { font-size: .96rem; }.mini-heading button { font-size: .55rem; }.metric { padding: 9px; }.metric strong { font-size: .95rem; }.metric em { font-size: .5rem; }.mini-grid { grid-template-columns: 1fr; }.chart-card { display: none; }.queue-card p { margin-top: 10px; }.modules-section,.guest-section,.menu-preview { padding-bottom: 75px; padding-top: 75px; }.section-intro { display: block; }.section-intro h2 { font-size: 2.8rem; }.section-intro > p:last-child { margin-top: 24px; }.product-menu-grid { grid-template-columns: 1fr; }.product-menu-card > img { height: 220px; }.module-grid { grid-template-columns: 1fr; }.module-card,.module-card:nth-child(3n + 2),.module-card:nth-child(3n + 3) { border-left: 0; padding-left: 0; }.workflow-inner { padding-bottom: 75px; padding-top: 75px; }.guest-card { padding: 38px 25px; }.guest-card h2 { font-size: 2.25rem; }.footer-inner { align-items: start; flex-direction: column; gap: 12px; padding: 25px 0; }.footer-inner > a:last-child { margin-left: 0; } }
</style>
