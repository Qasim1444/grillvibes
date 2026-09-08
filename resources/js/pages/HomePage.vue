<template>
  <div class="restaurant-page">
    <header class="site-header">
      <div class="shell site-header__inner">
        <a class="brand" href="#top" aria-label="KitchenOS home">
          <span class="brand__mark">K</span>
          <span>Kitchen<span class="brand__accent">OS</span></span>
        </a>

        <nav class="site-nav" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#about">Our story</a>
          <a href="#reservations">Reservations</a>
          <a href="#contact">Visit us</a>
        </nav>

        <div class="header-actions">
          <a class="header-login" href="/login">Sign in</a>
          <a class="button button--small button--dark" href="#reservations">Reserve a table</a>
        </div>

        <button class="menu-toggle" type="button" aria-label="Toggle navigation" @click="mobileOpen = !mobileOpen">
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav v-if="mobileOpen" class="mobile-nav shell" aria-label="Mobile navigation">
        <a href="#menu" @click="mobileOpen = false">Menu</a>
        <a href="#about" @click="mobileOpen = false">Our story</a>
        <a href="#reservations" @click="mobileOpen = false">Reservations</a>
        <a href="#contact" @click="mobileOpen = false">Visit us</a>
      </nav>
    </header>

    <main id="top">
      <section class="hero">
        <div class="shell hero__grid">
          <div class="hero__copy">
            <p class="eyebrow">Good food. Warm tables. Every day.</p>
            <h1>Come hungry.<br /><em>Leave inspired.</em></h1>
            <p class="hero__intro">A neighborhood kitchen serving honest, generous food made with ingredients we are proud to put on your table.</p>
            <div class="hero__actions">
              <a class="button button--dark" href="#reservations">Reserve a table <span>-></span></a>
              <a class="text-link" href="#menu">Explore the menu <span>-></span></a>
            </div>
            <div class="hero__note"><span class="hero__note-dot"></span><span>Open today for lunch and dinner</span></div>
          </div>
          <div class="hero__visual">
            <div class="hero__image-wrap"><img :src="heroImage" alt="A featured dish from KitchenOS" /></div>
            <div class="hero__stamp"><strong>Fresh</strong><span>from our<br />kitchen</span></div>
            <div class="hero__caption"><span>01</span><span>Seasonal kitchen</span></div>
          </div>
        </div>
        <div class="hero__rail"><span>KitchenOS / Restaurant & dining</span><span>Scroll to discover <b>↓</b></span></div>
      </section>

      <section id="menu" class="menu-section section">
        <div class="shell">
          <div class="section-heading section-heading--split">
            <div><p class="eyebrow">From our kitchen</p><h2>Made to be<br /><em>remembered.</em></h2></div>
            <p>Our menu moves with the seasons, but the standard never changes: careful cooking, bright flavor, and food worth gathering around.</p>
          </div>

          <div v-if="foodItems.length" class="dish-grid">
            <article v-for="(item, index) in foodItems" :key="item.id" class="dish-card" :class="{ 'dish-card--feature': index === 0 }">
              <div class="dish-card__image">
                <img v-if="item.image" :src="item.image" :alt="item.name" loading="lazy" />
                <div v-else class="dish-card__placeholder">KitchenOS</div>
                <span class="dish-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <div class="dish-card__body">
                <span class="dish-card__category">{{ item.category || 'From the kitchen' }}</span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.description || 'A house favorite, prepared fresh for the table.' }}</p>
                <strong>{{ formatCurrency(item.price) }}</strong>
              </div>
            </article>
          </div>
          <div v-else class="empty-state">Our next menu is being prepared. Check back soon.</div>
          <div class="section-action"><a class="text-link text-link--dark" href="#menu">Browse menu highlights <span>-></span></a></div>
        </div>
      </section>

      <section id="reservations" class="reservation-section section">
        <div class="shell reservation__grid">
          <div class="reservation__copy">
            <p class="eyebrow eyebrow--light">Your table is waiting</p>
            <h2>Make tonight<br /><em>worth remembering.</em></h2>
            <p>Bring your favorite people. We will take care of the rest. Reserve a table and let us make room for a good evening.</p>
            <a class="button button--cream" href="/login">Reserve a table <span>-></span></a>
          </div>
          <div class="reservation__board">
            <div class="board-heading"><div><span class="board-heading__kicker">Today at KitchenOS</span><h3>Upcoming tables</h3></div><span class="board-heading__count">{{ reservations.length }} bookings</span></div>
            <div v-if="reservations.length" class="booking-list">
              <div v-for="booking in reservations" :key="booking.id" class="booking-row">
                <time>{{ formatTime(booking.reserved_at) }}</time>
                <div><strong>{{ booking.party_size }} {{ booking.party_size === 1 ? 'guest' : 'guests' }}</strong><span>{{ booking.branch || 'Main dining room' }}</span></div>
                <span class="booking-status">{{ booking.status }}</span>
              </div>
            </div>
            <p v-else class="booking-empty">The evening is still open. Be the first to book a table.</p>
            <div class="board-footer"><span>Private dining available</span><span>Walk-ins welcome</span></div>
          </div>
        </div>
      </section>

      <section id="about" class="about-section section">
        <div class="shell about__grid">
          <div class="about__visual"><img :src="'/images/rectangle.jpg'" alt="The KitchenOS dining experience" /><span class="about__vertical">A place to gather</span></div>
          <div class="about__copy">
            <p class="eyebrow">Our table, your story</p>
            <h2>Food with a little more <em>feeling.</em></h2>
            <p>KitchenOS is built around the simple pleasure of a meal shared well. Our cooks follow the ingredients, our team knows the regulars, and every plate leaves the pass with purpose.</p>
            <p>From a quick lunch to a long dinner, we make space for the moments that matter.</p>
            <div class="about__facts"><div><strong>01</strong><span>Seasonal produce</span></div><div><strong>02</strong><span>Thoughtful service</span></div><div><strong>03</strong><span>Open-hearted dining</span></div></div>
          </div>
        </div>
      </section>

      <section class="quote-section section"><div class="shell quote-section__inner"><span class="quote-mark">“</span><blockquote>There is no better place to turn an ordinary evening into a small celebration.</blockquote><span class="quote-credit">A note from our guests</span></div></section>

      <section id="contact" class="visit-section section">
        <div class="shell">
          <div class="section-heading"><p class="eyebrow">Find your way here</p><h2>Come by for<br /><em>something good.</em></h2></div>
          <div v-if="branches.length" class="location-grid">
            <article v-for="branch in branches" :key="branch.id" class="location-card">
              <span class="location-card__number">{{ String(branch.id).padStart(2, '0') }}</span><h3>{{ branch.name }}</h3>
              <p>{{ branch.address || 'Address details available at the restaurant.' }}</p>
              <a v-if="branch.phone" :href="`tel:${branch.phone}`">{{ branch.phone }}</a>
              <a v-if="branch.latitude && branch.longitude" :href="`https://www.google.com/maps/search/?api=1&query=${branch.latitude},${branch.longitude}`" target="_blank" rel="noreferrer">Get directions <span>-></span></a>
            </article>
          </div>
          <div v-else class="empty-state">Our locations will appear here soon.</div>
          <div class="visit__hours"><span>Opening hours</span><strong>Mon - Sun / Lunch & dinner service</strong><a href="#reservations">Book your visit <span>-></span></a></div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="shell footer__top"><div><a class="brand brand--footer" href="#top"><span class="brand__mark">K</span><span>Kitchen<span class="brand__accent">OS</span></span></a><p>A modern neighborhood kitchen for generous food and good company.</p></div><div class="footer__links"><div><strong>Explore</strong><a href="#menu">Menu</a><a href="#about">Our story</a><a href="#reservations">Reservations</a></div><div><strong>Visit</strong><a href="#contact">Locations</a><a href="/login">Team login</a><a href="mailto:hello@kitchenos.test">Contact us</a></div></div></div>
      <div class="shell footer__bottom"><span>© {{ new Date().getFullYear() }} KitchenOS</span><span>Good food, thoughtfully managed.</span></div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  foodItems: { type: Array, default: () => [] },
  reservations: { type: Array, default: () => [] },
  branches: { type: Array, default: () => [] },
});

const mobileOpen = ref(false);
const foodItems = computed(() => props.foodItems);
const reservations = computed(() => props.reservations);
const branches = computed(() => props.branches);
const heroImage = computed(() => foodItems.value.find((item) => item.image)?.image || '/images/rectangle.jpg');

const formatCurrency = (value) => `Rs. ${Number(value || 0).toLocaleString('en-PK', { minimumFractionDigits: 2 })}`;
const formatTime = (value) => value ? new Date(value).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' }) : '--:--';
</script>

<style scoped>
:global(*) { box-sizing: border-box; }
:global(html) { scroll-behavior: smooth; }
:global(body) { margin: 0; }
.restaurant-page { --ink: #1f2823; --cream: #f4efe6; --paper: #fbfaf7; --rust: #a8482c; --sage: #66735e; background: var(--paper); color: var(--ink); font-family: Georgia, 'Times New Roman', serif; }
.shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }
.site-header { position: absolute; z-index: 10; top: 0; width: 100%; border-bottom: 1px solid rgba(244,239,230,.22); color: var(--cream); }
.site-header__inner { display: flex; align-items: center; justify-content: space-between; min-height: 82px; gap: 24px; }
.brand { display: inline-flex; align-items: center; gap: 10px; color: inherit; font-size: 1.15rem; font-weight: 700; letter-spacing: .03em; text-decoration: none; }
.brand__mark { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid currentColor; border-radius: 50%; font-size: 1rem; }
.brand__accent, em { color: #d88958; font-style: italic; }
.site-nav { display: flex; gap: 30px; margin-left: auto; }
.site-nav a, .header-login { color: inherit; font-size: .78rem; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.site-nav a:hover, .header-login:hover { color: #d88958; }
.header-actions { display: flex; align-items: center; gap: 20px; }
.button { display: inline-flex; align-items: center; justify-content: center; gap: 18px; min-height: 50px; padding: 0 23px; border: 1px solid transparent; color: var(--cream); font-family: inherit; font-size: .78rem; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; transition: transform .2s, background .2s; }
.button:hover { transform: translateY(-2px); }
.button--small { min-height: 38px; padding: 0 16px; font-size: .68rem; }
.button--dark { background: var(--ink); }
.button--cream { background: var(--cream); color: var(--ink); }
.menu-toggle { display: none; padding: 5px; border: 0; background: transparent; }
.menu-toggle span { display: block; width: 24px; height: 1px; margin: 5px; background: currentColor; }
.mobile-nav { display: none; padding: 18px 0 24px; }
.mobile-nav a { display: block; padding: 10px 0; color: inherit; text-decoration: none; text-transform: uppercase; }
.hero { position: relative; overflow: hidden; min-height: 740px; padding: 170px 0 80px; background: #344238; color: var(--cream); }
.hero:before { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(18,30,23,.86) 0%, rgba(18,30,23,.52) 50%, rgba(18,30,23,.14)), url('/images/mask.png') center/cover; content: ''; opacity: .34; }
.hero__grid, .hero__rail { position: relative; z-index: 1; }
.hero__grid { display: grid; grid-template-columns: .9fr 1.1fr; align-items: center; gap: 90px; }
.eyebrow { margin: 0 0 18px; color: var(--rust); font-size: .7rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.eyebrow--light { color: #e6aa7b; }
h1, h2, h3, p { margin-top: 0; }
h1 { max-width: 590px; margin-bottom: 22px; font-size: clamp(3.7rem, 7vw, 7rem); font-weight: 400; letter-spacing: -.055em; line-height: .92; }
.hero__intro { max-width: 430px; color: rgba(244,239,230,.76); font-size: 1.05rem; line-height: 1.7; }
.hero__actions { display: flex; align-items: center; gap: 25px; margin-top: 34px; }
.text-link { color: inherit; font-size: .78rem; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.text-link--dark { color: var(--ink); }
.text-link span, .visit__hours a span, .location-card a span { margin-left: 8px; color: var(--rust); }
.hero__note { display: flex; align-items: center; gap: 10px; margin-top: 70px; color: rgba(244,239,230,.65); font-size: .78rem; }
.hero__note-dot { width: 8px; height: 8px; border-radius: 50%; background: #9dbb76; box-shadow: 0 0 0 5px rgba(157,187,118,.14); }
.hero__visual { position: relative; min-height: 480px; }
.hero__image-wrap { width: 78%; height: 480px; margin-left: auto; overflow: hidden; border: 12px solid rgba(244,239,230,.13); }
.hero__image-wrap img { width: 100%; height: 100%; object-fit: cover; }
.hero__stamp { position: absolute; bottom: 36px; left: 0; display: grid; place-items: center; width: 126px; height: 126px; border-radius: 50%; background: var(--rust); color: var(--cream); text-align: center; transform: rotate(-10deg); }
.hero__stamp strong { font-size: 1.4rem; font-weight: 400; }
.hero__stamp span { font-size: .72rem; line-height: 1.2; }
.hero__caption { position: absolute; right: -28px; top: 20px; display: flex; gap: 12px; color: rgba(244,239,230,.6); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; writing-mode: vertical-rl; }
.hero__rail { display: flex; justify-content: space-between; width: min(1180px, calc(100% - 48px)); margin: 65px auto 0; padding-top: 16px; border-top: 1px solid rgba(244,239,230,.23); color: rgba(244,239,230,.6); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; }
.section { padding: 120px 0; }
.section-heading { margin-bottom: 55px; }
.section-heading--split { display: grid; grid-template-columns: 1fr .75fr; gap: 100px; align-items: end; }
h2 { margin-bottom: 18px; font-size: clamp(2.7rem, 5vw, 5rem); font-weight: 400; letter-spacing: -.05em; line-height: .95; }
.section-heading > p:last-child { max-width: 370px; margin-bottom: 5px; color: #69736b; font-size: 1rem; line-height: 1.75; }
.dish-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.dish-card { min-width: 0; }
.dish-card__image { position: relative; height: 230px; overflow: hidden; background: #e4ddd1; }
.dish-card--feature { grid-column: span 2; }
.dish-card--feature .dish-card__image { height: 330px; }
.dish-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.dish-card:hover img { transform: scale(1.04); }
.dish-card__placeholder { display: grid; place-items: center; height: 100%; color: #a29b8e; font-size: 1.5rem; font-style: italic; }
.dish-card__number { position: absolute; top: 12px; left: 12px; padding: 5px 8px; background: var(--cream); color: var(--ink); font-size: .68rem; }
.dish-card__body { padding: 17px 2px 0; }
.dish-card__category { color: var(--rust); font-size: .67rem; letter-spacing: .12em; text-transform: uppercase; }
.dish-card h3 { margin: 6px 0; font-size: 1.35rem; font-weight: 400; }
.dish-card p { min-height: 42px; margin-bottom: 10px; color: #778078; font-size: .82rem; line-height: 1.45; }
.dish-card strong { color: var(--rust); font-size: .95rem; font-weight: 400; }
.section-action { margin-top: 42px; text-align: center; }
.empty-state { padding: 55px; background: var(--cream); color: #69736b; text-align: center; }
.reservation-section { background: #344238; color: var(--cream); }
.reservation__grid { display: grid; grid-template-columns: .9fr 1.1fr; gap: 100px; align-items: center; }
.reservation__copy h2 { color: var(--cream); }
.reservation__copy > p:not(.eyebrow) { max-width: 390px; color: rgba(244,239,230,.7); font-size: 1rem; line-height: 1.7; }
.reservation__copy .button { margin-top: 18px; }
.reservation__board { padding: 28px; background: rgba(244,239,230,.08); border: 1px solid rgba(244,239,230,.18); }
.board-heading { display: flex; justify-content: space-between; gap: 20px; padding-bottom: 24px; border-bottom: 1px solid rgba(244,239,230,.18); }
.board-heading__kicker { color: #e6aa7b; font-size: .67rem; letter-spacing: .13em; text-transform: uppercase; }
.board-heading h3 { margin: 7px 0 0; color: var(--cream); font-size: 1.5rem; font-weight: 400; }
.board-heading__count { color: rgba(244,239,230,.58); font-size: .75rem; }
.booking-row { display: grid; grid-template-columns: 76px 1fr auto; align-items: center; gap: 16px; padding: 18px 0; border-bottom: 1px solid rgba(244,239,230,.11); }
.booking-row time { color: #e6aa7b; font-size: .9rem; }
.booking-row strong, .booking-row span { display: block; }
.booking-row strong { font-size: .9rem; font-weight: 400; }
.booking-row div span { margin-top: 4px; color: rgba(244,239,230,.52); font-size: .75rem; }
.booking-status { padding: 5px 8px; border: 1px solid rgba(244,239,230,.2); color: rgba(244,239,230,.65); font-size: .64rem; text-transform: capitalize; }
.booking-empty { padding: 28px 0; color: rgba(244,239,230,.65); font-size: .9rem; line-height: 1.6; }
.board-footer { display: flex; justify-content: space-between; gap: 15px; padding-top: 22px; color: rgba(244,239,230,.5); font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; }
.about-section { background: var(--cream); }
.about__grid { display: grid; grid-template-columns: 1fr .85fr; gap: 110px; align-items: center; }
.about__visual { position: relative; padding-left: 30px; }
.about__visual img { display: block; width: 100%; height: 520px; object-fit: cover; filter: saturate(.8); }
.about__vertical { position: absolute; bottom: 80px; left: -9px; color: var(--rust); font-size: .68rem; letter-spacing: .13em; text-transform: uppercase; transform: rotate(-90deg); }
.about__copy > p:not(.eyebrow) { max-width: 430px; color: #69736b; font-size: 1rem; line-height: 1.8; }
.about__facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 42px; padding-top: 22px; border-top: 1px solid #d8d0c2; }
.about__facts strong, .about__facts span { display: block; }
.about__facts strong { color: var(--rust); font-size: .72rem; }
.about__facts span { margin-top: 7px; color: #69736b; font-size: .72rem; line-height: 1.35; }
.quote-section { padding: 95px 0; background: var(--rust); color: var(--cream); }
.quote-section__inner { max-width: 800px; text-align: center; }
.quote-mark { display: block; height: 60px; color: #e6aa7b; font-size: 5rem; line-height: 1; }
blockquote { margin: 0; font-size: clamp(2rem, 4vw, 3.5rem); font-style: italic; line-height: 1.1; }
.quote-credit { display: block; margin-top: 25px; color: rgba(244,239,230,.72); font-size: .68rem; letter-spacing: .15em; text-transform: uppercase; }
.location-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.location-card { min-height: 230px; padding: 24px; border-top: 1px solid var(--ink); }
.location-card__number { color: var(--rust); font-size: .72rem; }
.location-card h3 { margin: 22px 0 10px; font-size: 1.5rem; font-weight: 400; }
.location-card p { min-height: 42px; color: #69736b; font-size: .86rem; line-height: 1.5; }
.location-card a { display: block; margin-top: 12px; color: var(--ink); font-size: .76rem; text-decoration: none; }
.visit__hours { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-top: 70px; padding-top: 22px; border-top: 1px solid #d8d0c2; font-size: .75rem; text-transform: uppercase; }
.visit__hours span:first-child { color: var(--rust); letter-spacing: .1em; }
.visit__hours strong { font-weight: 400; }
.visit__hours a { color: var(--ink); text-decoration: none; }
.site-footer { padding: 70px 0 25px; background: var(--ink); color: var(--cream); }
.brand--footer { margin-bottom: 18px; }
.footer__top { display: flex; justify-content: space-between; gap: 70px; padding-bottom: 65px; }
.footer__top p { max-width: 270px; color: rgba(244,239,230,.55); font-size: .85rem; line-height: 1.6; }
.footer__links { display: flex; gap: 100px; }
.footer__links div { display: flex; flex-direction: column; gap: 11px; min-width: 100px; }
.footer__links strong { margin-bottom: 5px; color: #e6aa7b; font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; }
.footer__links a { color: rgba(244,239,230,.65); font-size: .8rem; text-decoration: none; }
.footer__bottom { display: flex; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(244,239,230,.14); color: rgba(244,239,230,.4); font-size: .68rem; letter-spacing: .06em; text-transform: uppercase; }
@media (max-width: 850px) { .site-nav, .header-actions { display: none; } .menu-toggle { display: block; color: var(--cream); } .mobile-nav { display: block; } .hero { padding-top: 130px; } .hero__grid, .reservation__grid, .about__grid { grid-template-columns: 1fr; gap: 55px; } .hero__visual { min-height: 390px; } .hero__image-wrap { height: 390px; } .section-heading--split { grid-template-columns: 1fr; gap: 15px; } .dish-grid { grid-template-columns: repeat(2, 1fr); } .dish-card--feature { grid-column: span 2; } .about__visual img { height: 390px; } .location-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .shell, .hero__rail { width: min(100% - 32px, 1180px); } .hero { min-height: auto; padding-bottom: 45px; } h1 { font-size: clamp(3.4rem, 17vw, 5rem); } .hero__actions { align-items: flex-start; flex-direction: column; gap: 22px; } .hero__note { margin-top: 42px; } .hero__visual { min-height: 330px; } .hero__image-wrap { width: 87%; height: 330px; } .hero__stamp { width: 100px; height: 100px; bottom: 15px; } .hero__caption { right: -8px; } .hero__rail { display: none; } .section { padding: 75px 0; } .dish-grid, .location-grid { grid-template-columns: 1fr; } .dish-card--feature { grid-column: auto; } .dish-card__image, .dish-card--feature .dish-card__image { height: 280px; } .reservation__board { padding: 18px; } .booking-row { grid-template-columns: 60px 1fr; } .booking-status { grid-column: 2; justify-self: start; } .board-footer, .visit__hours, .footer__top, .footer__bottom { align-items: flex-start; flex-direction: column; } .footer__top { gap: 35px; } .footer__links { gap: 55px; } .about__visual { padding-left: 18px; } .about__facts { gap: 8px; } }
</style>
