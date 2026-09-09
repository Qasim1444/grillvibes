<template>
	<div class="restaurant-home">
		<header class="site-header">
			<a class="brand" href="/" aria-label="Ember and Salt home">
				<span class="brand-mark">E</span>
				<span>Ember <i>&amp;</i> Salt</span>
			</a>

			<nav class="site-nav" aria-label="Primary navigation">
				<a href="#menu">Menu</a>
				<a href="#story">Our story</a>
				<a href="#reserve">Reservations</a>
			</nav>

			<a class="nav-cta" href="#reserve">Book a table <span aria-hidden="true">↗</span></a>
		</header>

		<main>
			<section class="hero section-shell">
				<div class="hero-copy">
					<p class="eyebrow"><span></span> Seasonal kitchen · Open daily</p>
					<h1>A little fire.<br /><em>A lot of flavour.</em></h1>
					<p class="hero-text">A neighbourhood kitchen for long lunches, late dinners, and the kind of food you keep thinking about tomorrow.</p>
					<div class="hero-actions">
						<a class="button button--dark" href="#menu">Explore the menu <span>↓</span></a>
						<a class="text-button" href="#reserve">Find your table <span>↗</span></a>
					</div>
					<div class="hero-meta"><span>12:00 — 23:00</span><span>Wednesday to Sunday</span><span>48 High Street</span></div>
				</div>

				<div class="hero-art" aria-label="A plated seasonal dish">
					<img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="Fresh seasonal vegetables on a plate" />
					<div class="hero-stamp"><strong>EST.</strong><b>2018</b><span>GOOD FOOD<br />GOOD COMPANY</span></div>
					<div class="hero-caption"><span>01 / 04</span><b>Charred greens<br />with smoked almond</b></div>
				</div>
			</section>

			<section id="menu" class="menu-section section-shell">
				<div class="section-heading">
					<div><p class="eyebrow">From our kitchen</p><h2>Find your<br /><em>favourite.</em></h2></div>
					<p>Our menu follows the market. Small plates, generous mains, and desserts worth saving room for.</p>
				</div>

				<div class="category-row" role="tablist" aria-label="Food categories">
					<button v-for="category in menuCategories" :key="category.id" :class="{ active: activeCategory === category.id }" role="tab" :aria-selected="activeCategory === category.id" @click="activeCategory = category.id">
						<span>{{ category.icon }}</span>{{ category.name }}
					</button>
				</div>

				<div class="food-grid">
					<article v-for="item in filteredItems" :key="item.name" class="food-card">
						<div class="food-image"><img :src="item.image" :alt="item.name" loading="lazy" /><span v-if="item.badge" class="food-badge">{{ item.badge }}</span></div>
						<div class="food-info"><div><h3>{{ item.name }}</h3><p>{{ item.description }}</p></div><strong>£{{ item.price }}</strong></div>
					</article>
				</div>
			</section>

			<section id="story" class="story-band">
				<div class="section-shell story-inner">
					<div class="story-photo"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85" alt="Chef preparing ingredients in the kitchen" loading="lazy" /><span>THE DAILY<br />PREP</span></div>
					<div class="story-copy"><p class="eyebrow">A table with a point of view</p><h2>Good ingredients<br /><em>need little fuss.</em></h2><p>We cook over fire, work with people we know, and let the best produce set the pace. Come as you are; stay as long as you like.</p><a class="text-button text-button--light" href="#reserve">Come eat with us <span>↗</span></a></div>
				</div>
			</section>

			<section id="reserve" class="reserve-section section-shell">
				<div class="reserve-intro"><p class="eyebrow">Pull up a chair</p><h2>Make it<br /><em>a date.</em></h2><p>Tell us when you would like to join us and we will keep a table warm.</p><div class="contact-note"><span>Need a larger table?</span><a href="mailto:hello@emberandsalt.example">hello@emberandsalt.example</a></div></div>
				<form class="reserve-form" @submit.prevent="submitReservation">
					<div v-if="reservationSent" class="reservation-success" role="status"><span>✓</span><div><strong>Request received.</strong><p>We will be in touch shortly to confirm your table.</p></div></div>
					<template v-else>
						<div class="table-picker"><span class="form-label">Choose your table</span><div class="table-grid"><button v-for="table in tables" :key="table.id" type="button" class="table-option" :class="{ selected: reservation.dining_table_id === table.id, unavailable: !isTableSuitable(table) }" :disabled="!isTableSuitable(table)" @click="reservation.dining_table_id = table.id"><strong>{{ table.table_number }}</strong><span>{{ table.capacity }} seats</span><small>{{ table.status === 'available' ? 'Available' : 'Unavailable' }}</small></button></div><p v-if="!tables.length" class="table-note">No tables are currently configured.</p></div>
						<div class="form-row"><label>Date<input v-model="reservation.date" type="date" required /></label><label>Time<select v-model="reservation.time"><option v-for="time in times" :key="time">{{ time }}</option></select></label></div>
						<label>How many guests<select v-model="reservation.guests"><option v-for="number in 8" :key="number" :value="number">{{ number }} {{ number === 1 ? 'guest' : 'guests' }}</option></select></label>
						<div class="form-row"><label>Your name<input v-model="reservation.guest_name" type="text" placeholder="Alex Morgan" required /></label><label>Email<input v-model="reservation.guest_email" type="email" placeholder="alex@example.com" required /></label></div>
						<div class="form-row"><label>Phone<input v-model="reservation.guest_phone" type="tel" placeholder="01234 567 890" /></label><label>Occasion<input v-model="reservation.occasion" type="text" placeholder="Birthday, anniversary..." /></label></div>
						<label>Notes<textarea v-model="reservation.notes" rows="3" placeholder="Allergies, accessibility, or other requests"></textarea></label>
						<button class="button button--dark submit-button" type="submit" :disabled="reservation.processing || !reservation.dining_table_id">{{ reservation.processing ? 'Sending request…' : 'Request a table' }} <span>→</span></button>
						<p v-if="Object.keys(reservation.errors).length" class="reservation-error">Please check the booking details and try again.</p>
						<small>We hold tables for 15 minutes. For tonight, please call <a href="tel:+441234567890">01234 567 890</a>.</small>
					</template>
				</form>
			</section>
		</main>

		<footer class="site-footer"><div class="section-shell"><a class="brand" href="/"><span class="brand-mark">E</span><span>Ember <i>&amp;</i> Salt</span></a><span>Good food, no ceremony.</span><span>© 2026 Ember &amp; Salt</span></div></footer>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useForm } from '@inertiajs/vue3';

defineOptions({ layout: null });

const props = defineProps({
	categories: { type: Array, default: () => [] },
	foodItems: { type: Array, default: () => [] },
	tables: { type: Array, default: () => [] },
});

const menuCategories = computed(() => [
	{ id: 'all', name: 'All dishes', icon: '✦' },
	...props.categories.map(category => ({ id: category.id, name: category.name, icon: '✦' })),
]);

const activeCategory = ref('all');
const filteredItems = computed(() => activeCategory.value === 'all'
	? props.foodItems
	: props.foodItems.filter(item => item.foodcategory_id === activeCategory.value));
const times = ['12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
const tables = computed(() => props.tables);
const reservation = useForm({
	date: '',
	time: '19:00',
	guests: 2,
	dining_table_id: null,
	guest_name: '',
	guest_phone: '',
	guest_email: '',
	occasion: '',
	notes: '',
});
const isTableSuitable = table => table.status === 'available' && table.capacity >= Number(reservation.guests);
watch(() => reservation.guests, () => {
	const selectedTable = tables.value.find(table => table.id === reservation.dining_table_id);
	if (selectedTable && !isTableSuitable(selectedTable)) reservation.dining_table_id = null;
});
const reservationSent = ref(false);
const submitReservation = () => {
	reservation.transform(data => ({
		guest_name: data.guest_name,
		guest_phone: data.guest_phone || null,
		guest_email: data.guest_email,
		dining_table_id: data.dining_table_id,
		party_size: data.guests,
		reserved_at: `${data.date} ${data.time}`,
		occasion: data.occasion || null,
		notes: data.notes || null,
	})).post('/reservations/request', {
		preserveScroll: true,
		onSuccess: () => {
			reservationSent.value = true;
		},
	});
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap');
:global(*) { box-sizing: border-box; }
:global(body) { background: #f5f0e8; }
.restaurant-home { --ink: #182622; --muted: #68766e; --line: #d8ddd4; --paper: #f5f0e8; --cream: #fcfaf5; --orange: #d95f3f; color: var(--ink); font-family: 'DM Sans', sans-serif; overflow: hidden; }
.section-shell { margin: 0 auto; width: min(1160px, calc(100% - 56px)); }
.site-header { align-items: center; display: flex; gap: 36px; justify-content: space-between; margin: auto; min-height: 88px; width: min(1160px, calc(100% - 56px)); }
.brand { align-items: center; color: var(--ink); display: inline-flex; font: 600 1.1rem 'Fraunces', serif; gap: 10px; text-decoration: none; white-space: nowrap; }.brand i { color: var(--orange); font-style: normal; }.brand-mark { align-items: center; background: var(--ink); color: var(--paper); display: grid; font: 600 .9rem 'Fraunces', serif; height: 32px; justify-content: center; width: 32px; }
.site-nav { display: flex; gap: 32px; margin-left: auto; }.site-nav a, .nav-cta { color: var(--muted); font-size: .78rem; text-decoration: none; }.site-nav a:hover, .nav-cta:hover, .text-button:hover { color: var(--orange); }.nav-cta { color: var(--ink); font-weight: 700; }.nav-cta span { color: var(--orange); margin-left: 8px; }
.hero { align-items: center; display: grid; gap: 70px; grid-template-columns: .78fr 1.22fr; min-height: 650px; padding: 70px 0 94px; }.eyebrow { color: var(--orange); font: 500 .66rem 'DM Mono', monospace; letter-spacing: .12em; margin: 0 0 20px; text-transform: uppercase; }.eyebrow span { background: #4d9a71; border-radius: 50%; display: inline-block; height: 7px; margin-right: 9px; width: 7px; }.hero h1, h2 { font: 600 clamp(3.3rem, 5.8vw, 5.9rem)/.92 'Fraunces', serif; letter-spacing: -.055em; margin: 0; }.hero h1 em, h2 em { color: var(--orange); font-style: italic; }.hero-text { color: var(--muted); font-size: 1rem; line-height: 1.75; margin: 30px 0; max-width: 370px; }.hero-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 24px; }.button { align-items: center; border: 0; cursor: pointer; display: inline-flex; font: 600 .78rem 'DM Sans', sans-serif; gap: 32px; justify-content: center; padding: 15px 18px; text-decoration: none; }.button--dark { background: var(--ink); color: #fff; }.button--dark:hover { background: var(--orange); }.text-button { color: var(--ink); font-size: .8rem; font-weight: 700; text-decoration: none; }.text-button span { color: var(--orange); margin-left: 12px; }.hero-meta { border-top: 1px solid var(--line); color: #87928b; display: flex; flex-wrap: wrap; font: .58rem 'DM Mono', monospace; gap: 17px; margin-top: 52px; padding-top: 16px; }
.hero-art { min-height: 485px; position: relative; }.hero-art::before { background: #e3b77c; content: ''; height: 70%; left: -8%; position: absolute; top: 15%; transform: rotate(-5deg); width: 75%; }.hero-art img { display: block; height: 460px; object-fit: cover; position: relative; transform: rotate(3deg); width: 80%; }.hero-stamp { align-items: center; background: var(--orange); border-radius: 50%; color: #fff8ed; display: flex; flex-direction: column; height: 126px; justify-content: center; position: absolute; right: 2%; text-align: center; top: 5%; transform: rotate(12deg); width: 126px; }.hero-stamp strong { font: .55rem 'DM Mono', monospace; letter-spacing: .1em; }.hero-stamp b { font: 600 2rem 'Fraunces', serif; }.hero-stamp span { font: .42rem 'DM Mono', monospace; letter-spacing: .08em; line-height: 1.3; }.hero-caption { align-items: end; background: var(--cream); bottom: 4%; display: flex; gap: 14px; padding: 17px 20px; position: absolute; right: 0; width: 230px; }.hero-caption span { color: var(--orange); font: .6rem 'DM Mono', monospace; }.hero-caption b { font: 600 .86rem/1.2 'Fraunces', serif; }
.menu-section { padding: 116px 0 126px; }.section-heading { align-items: end; display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 54px; }.section-heading h2, .reserve-intro h2 { font-size: clamp(2.9rem, 4.5vw, 4.5rem); }.section-heading > p { color: var(--muted); font-size: .9rem; line-height: 1.75; margin: 0 0 4px; max-width: 270px; }.category-row { border-bottom: 1px solid var(--line); display: flex; gap: 30px; margin-bottom: 28px; overflow-x: auto; }.category-row button { background: none; border: 0; border-bottom: 2px solid transparent; color: #829087; cursor: pointer; font: 600 .76rem 'DM Sans', sans-serif; padding: 0 0 17px; white-space: nowrap; }.category-row button span { color: var(--orange); font-size: 1rem; margin-right: 8px; }.category-row button.active { border-color: var(--orange); color: var(--ink); }.food-grid { display: grid; gap: 22px; grid-template-columns: repeat(4, 1fr); }.food-card { min-width: 0; }.food-image { height: 245px; overflow: hidden; position: relative; }.food-image img { height: 100%; object-fit: cover; transition: transform .5s ease; width: 100%; }.food-card:hover img { transform: scale(1.04); }.food-badge { background: var(--orange); color: #fff; font: .55rem 'DM Mono', monospace; left: 12px; padding: 7px 9px; position: absolute; text-transform: uppercase; top: 12px; }.food-info { align-items: start; display: flex; gap: 10px; justify-content: space-between; padding-top: 15px; }.food-info h3 { font: 600 1.05rem 'Fraunces', serif; margin: 0 0 6px; }.food-info p { color: var(--muted); font-size: .7rem; line-height: 1.5; margin: 0; max-width: 170px; }.food-info strong { font: 600 .9rem 'DM Mono', monospace; white-space: nowrap; }
.story-band { background: #263832; color: #f5f0e8; padding: 112px 0; }.story-inner { align-items: center; display: grid; gap: 100px; grid-template-columns: .9fr 1.1fr; }.story-photo { height: 370px; position: relative; }.story-photo img { height: 100%; object-fit: cover; width: 100%; }.story-photo span { background: var(--orange); bottom: -18px; color: #fff; font: .62rem/1.4 'DM Mono', monospace; padding: 15px; position: absolute; right: -18px; }.story-copy h2 { font-size: clamp(2.8rem, 4.5vw, 4.6rem); }.story-copy > p:not(.eyebrow) { color: #b8c2bb; font-size: .9rem; line-height: 1.8; margin: 30px 0; max-width: 360px; }.text-button--light { color: #fff; }
.reserve-section { display: grid; gap: 130px; grid-template-columns: .85fr 1.15fr; padding: 126px 0; }.reserve-intro > p:not(.eyebrow) { color: var(--muted); font-size: .9rem; line-height: 1.7; margin-top: 30px; max-width: 260px; }.contact-note { border-top: 1px solid var(--line); display: flex; flex-direction: column; font-size: .66rem; gap: 5px; margin-top: 55px; padding-top: 15px; }.contact-note span { color: #8a948e; }.contact-note a { color: var(--orange); font-weight: 600; text-decoration: none; }.reserve-form { background: var(--cream); padding: 34px; }.form-row { display: grid; gap: 18px; grid-template-columns: 1fr 1fr; }.reserve-form label { color: var(--muted); display: flex; flex-direction: column; font: .63rem 'DM Mono', monospace; gap: 8px; margin-bottom: 20px; text-transform: uppercase; }.reserve-form input, .reserve-form select { background: transparent; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; color: var(--ink); font: 500 .9rem 'DM Sans', sans-serif; outline: 0; padding: 9px 0; text-transform: none; width: 100%; }.reserve-form input:focus, .reserve-form select:focus { border-color: var(--orange); }.submit-button { margin-top: 8px; width: 100%; }.reserve-form small { color: #89948d; display: block; font-size: .66rem; line-height: 1.5; margin-top: 17px; text-align: center; }.reserve-form small a { color: var(--orange); }.reservation-success { align-items: start; background: #edf5e9; color: #42704d; display: flex; gap: 15px; padding: 24px; }.reservation-success > span { align-items: center; background: #5c9a6c; border-radius: 50%; color: #fff; display: grid; flex: 0 0 28px; height: 28px; justify-content: center; }.reservation-success strong { font: 600 1rem 'Fraunces', serif; }.reservation-success p { font-size: .75rem; margin: 5px 0 0; }
.reservation-error { color: #b84c3a; font-size: .72rem; margin: 12px 0 0; text-align: center; }
.reserve-form textarea { background: transparent; border: 1px solid var(--line); color: var(--ink); font: 500 .9rem 'DM Sans', sans-serif; outline: 0; padding: 9px; resize: vertical; width: 100%; }.reserve-form textarea:focus { border-color: var(--orange); }
.table-picker { margin-bottom: 25px; }.form-label { color: var(--muted); display: block; font: .63rem 'DM Mono', monospace; margin-bottom: 10px; text-transform: uppercase; }.table-grid { display: grid; gap: 9px; grid-template-columns: repeat(4, 1fr); }.table-option { background: transparent; border: 1px solid var(--line); color: var(--ink); cursor: pointer; display: flex; flex-direction: column; gap: 3px; padding: 12px 8px; text-align: left; }.table-option:hover:not(:disabled), .table-option.selected { border-color: var(--orange); box-shadow: inset 0 -2px 0 var(--orange); }.table-option strong { font: 600 .9rem 'Fraunces', serif; }.table-option span, .table-option small { color: var(--muted); font-size: .62rem; }.table-option small { color: #4d9a71; }.table-option.unavailable { background: #f1eee8; color: #9ca49e; cursor: not-allowed; opacity: .65; }.table-option.unavailable small { color: #a36d5f; }.table-note { color: var(--muted); font-size: .72rem; margin: 10px 0 0; }.submit-button:disabled { cursor: not-allowed; opacity: .5; }
.site-footer { border-top: 1px solid var(--line); }.site-footer > div { align-items: center; color: #859089; display: flex; font-size: .66rem; gap: 30px; justify-content: space-between; min-height: 100px; }.site-footer .brand { color: var(--ink); }
@media (max-width: 900px) { .hero { gap: 45px; grid-template-columns: 1fr; }.hero-art { max-width: 680px; width: 100%; }.story-inner, .reserve-section { gap: 55px; grid-template-columns: 1fr 1fr; }.food-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .section-shell, .site-header { width: min(100% - 32px, 1160px); }.site-header { min-height: 72px; }.site-nav { display: none; }.hero { min-height: auto; padding: 58px 0 75px; }.hero h1 { font-size: 3.6rem; }.hero-art { min-height: 350px; }.hero-art img { height: 335px; width: 88%; }.hero-stamp { height: 98px; right: 0; width: 98px; }.hero-caption { bottom: 0; }.section-heading, .story-inner, .reserve-section { display: block; }.section-heading > p { margin-top: 24px; }.menu-section, .reserve-section { padding: 78px 0; }.category-row { gap: 21px; }.food-grid { gap: 30px 14px; }.food-image { height: 195px; }.story-band { padding: 78px 0; }.story-photo { height: 290px; margin: 0 18px 55px 0; }.story-copy h2 { font-size: 3rem; }.reserve-intro { margin-bottom: 42px; }.reserve-form { padding: 24px 18px; }.form-row { display: block; }.site-footer > div { align-items: start; flex-direction: column; gap: 12px; padding: 24px 0; } }
</style>
