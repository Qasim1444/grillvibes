<template>
  <div class="public-blog">
    <header class="blog-header">
      <a class="brand" href="/" aria-label="KitchenOS home">
        <span class="brand-mark">K</span>
        <span>Kitchen<span class="brand-accent">OS</span></span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/product">Product</a>
        <a class="active" href="/blog">Blog</a>
        <a href="/login">Sign In</a>
      </nav>
    </header>

    <main>
      <section class="blog-hero">
        <p class="eyebrow">The KitchenOS journal</p>
        <h1>Ideas for a<br /><em>better service.</em></h1>
        <p>Practical stories, restaurant insights, and fresh thinking from the people behind better operations.</p>
      </section>

      <section class="posts-section" aria-label="Published blog posts">
        <div v-if="posts.length" class="posts-grid">
          <article v-for="post in posts" :key="post.id" class="post-card">
            <div class="post-image">
              <img v-if="post.featured_image" :src="post.featured_image" :alt="post.title" />
              <span v-else>K</span>
            </div>
            <div class="post-body">
              <div class="post-meta">
                <span>{{ post.categories?.[0]?.name || 'Restaurant operations' }}</span>
                <time :datetime="post.published_at">{{ formatDate(post.published_at) }}</time>
              </div>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt || excerpt(post.body) }}</p>
            </div>
          </article>
        </div>
        <p v-else class="empty-state">No published blog posts yet.</p>
      </section>
    </main>

    <footer>
      <a href="/">KitchenOS</a>
      <span>Great food. Better operations.</span>
    </footer>
  </div>
</template>

<script setup>
defineOptions({ layout: null });

defineProps({
  posts: { type: Array, default: () => [] },
});

const formatDate = value => value
  ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
  : '';
const excerpt = value => (value || '').replace(/<[^>]*>/g, '').slice(0, 180);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap');
:global(*){box-sizing:border-box}:global(body){margin:0;background:#faf5ec;color:#17201c}
.public-blog{min-height:100vh;font-family:'DM Sans',sans-serif}.blog-header{width:min(1180px,calc(100% - 48px));min-height:78px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:25px}.brand{display:inline-flex;align-items:center;gap:10px;color:#17201c;font-weight:700;letter-spacing:-.04em;text-decoration:none}.brand-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:#ef4858;color:#fff;font:700 .9rem 'Fraunces',serif}.brand-accent{color:#ef4858}.blog-header nav{display:flex;align-items:center;gap:25px}.blog-header nav a{color:#68716b;font-size:.78rem;text-decoration:none}.blog-header nav a:hover,.blog-header nav a.active{color:#ef4858}.blog-hero{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:105px 0 90px;border-bottom:1px solid #dfd8cc}.eyebrow{margin:0 0 18px;color:#ef4858;font:600 .67rem 'DM Sans',sans-serif;letter-spacing:.12em;text-transform:uppercase}.blog-hero h1{margin:0;font:600 clamp(3.3rem,6vw,6rem)/.9 'Fraunces',serif;letter-spacing:-.06em}.blog-hero h1 em{color:#ef4858;font-style:italic}.blog-hero>p:last-child{max-width:430px;margin:28px 0 0;color:#6f766f;line-height:1.75}.posts-section{width:min(1180px,calc(100% - 48px));margin:0 auto;padding:75px 0 120px}.posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.post-card{background:#fffdf8;border:1px solid #e7ded2;box-shadow:0 16px 35px rgba(70,50,30,.07)}.post-image{height:230px;display:grid;place-items:center;overflow:hidden;background:#d9e7d7}.post-image img{width:100%;height:100%;object-fit:cover}.post-image span{color:#fff;font:700 4rem 'Fraunces',serif}.post-body{padding:20px}.post-meta{display:flex;justify-content:space-between;gap:12px;color:#ef4858;font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase}.post-meta time{color:#899087;white-space:nowrap}.post-body h2{margin:13px 0 9px;font:600 1.4rem/1.1 'Fraunces',serif}.post-body p{margin:0;color:#6f766f;font-size:.77rem;line-height:1.65}.empty-state{color:#6f766f}.public-blog footer{display:flex;justify-content:space-between;gap:20px;padding:30px max(24px,calc((100% - 1180px) / 2));background:#1c2822;color:#cbd4cd;font-size:.72rem}.public-blog footer a{color:#fff;font-weight:700;text-decoration:none}
@media(max-width:700px){.blog-header{width:calc(100% - 32px);min-height:68px}.blog-header nav{gap:14px}.blog-header nav a:nth-child(2){display:none}.blog-hero,.posts-section{width:calc(100% - 32px)}.blog-hero{padding:70px 0 65px}.posts-section{padding:55px 0 80px}.posts-grid{grid-template-columns:1fr}.public-blog footer{display:block;padding:26px 16px}.public-blog footer span{display:block;margin-top:8px}}
</style>
