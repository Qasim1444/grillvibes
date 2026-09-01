import { createSSRApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'

createInertiaApp({
    title: (title) => (title ? `${title} — KitchenOS` : 'KitchenOS'),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        createSSRApp({ render: () => h(App, props) })
            .use(plugin)
            .mount(el)
    },
})
