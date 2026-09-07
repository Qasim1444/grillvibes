import { t as _plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-BOaGB7Aw.js";
import { mergeProps, ref, useSSRContext } from "vue";
import "@inertiajs/vue3";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderList } from "vue/server-renderer";
//#region resources/js/pages/ContactPage.vue
var _sfc_main = {
	__name: "ContactPage",
	__ssrInlineRender: true,
	setup(__props) {
		const expandedFaq = ref(0);
		const form = ref({
			name: "",
			email: "",
			phone: "",
			company: "",
			subject: "",
			message: "",
			terms: false
		});
		const quickFaqs = [
			{
				q: "How quickly can we get started?",
				a: "You can sign up for a free trial in minutes and start exploring KitchenOS immediately. Most restaurants are live and taking orders within 1-3 days with our guided setup process."
			},
			{
				q: "What payment methods do you accept?",
				a: "We accept all major credit cards (Visa, Mastercard, American Express) as well as bank transfers for Enterprise customers. Invoicing is available for annual plans."
			},
			{
				q: "Can I cancel anytime?",
				a: "Yes, you can cancel your subscription anytime with no penalties. If you cancel mid-month, we'll provide a pro-rated refund based on your usage."
			},
			{
				q: "Do you offer discounts for longer commitments?",
				a: "Yes! We offer 20% discount when you pay annually instead of monthly. Multi-year commitments receive additional discounts. Contact our sales team for details."
			},
			{
				q: "What kind of support do you provide?",
				a: "We offer 24/7 support via email and chat for all plans. Growth and Enterprise plans get priority support and phone access. All customers receive onboarding assistance."
			},
			{
				q: "Is there a demo available?",
				a: "Absolutely! We offer personalized demos tailored to your restaurant's needs. Schedule a demo using our contact form or call our sales team at +971 4 350 0198."
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-page" }, _attrs))} data-v-955a4ce3><header class="page-header" data-v-955a4ce3><div class="container header-content" data-v-955a4ce3><h1 data-v-955a4ce3>Get in Touch</h1><p data-v-955a4ce3>Have questions? Our team is here to help. Reach out to us in any way that works for you.</p></div></header><main data-v-955a4ce3><section class="contact-methods-section" data-v-955a4ce3><div class="container" data-v-955a4ce3><div class="methods-grid" data-v-955a4ce3><div class="method-card" data-v-955a4ce3><div class="method-icon" data-v-955a4ce3>💬</div><h3 data-v-955a4ce3>Chat with us</h3><p data-v-955a4ce3>Get instant answers during business hours</p><button class="method-button" data-v-955a4ce3>Start chat</button></div><div class="method-card" data-v-955a4ce3><div class="method-icon" data-v-955a4ce3>📧</div><h3 data-v-955a4ce3>Email us</h3><p data-v-955a4ce3>Send us your questions anytime</p><a href="mailto:hello@kitchenos.io" class="method-button" data-v-955a4ce3>hello@kitchenos.io</a></div><div class="method-card" data-v-955a4ce3><div class="method-icon" data-v-955a4ce3>📞</div><h3 data-v-955a4ce3>Call us</h3><p data-v-955a4ce3>Speak to our team directly</p><a href="tel:+97143500198" class="method-button" data-v-955a4ce3>+971 4 350 0198</a></div><div class="method-card" data-v-955a4ce3><div class="method-icon" data-v-955a4ce3>📍</div><h3 data-v-955a4ce3>Visit us</h3><p data-v-955a4ce3>Drop by our Dubai office</p><a href="#" class="method-button" data-v-955a4ce3>Get directions</a></div></div></div></section><section class="contact-form-section" data-v-955a4ce3><div class="container" data-v-955a4ce3><div class="form-wrapper" data-v-955a4ce3><div class="form-content" data-v-955a4ce3><h2 data-v-955a4ce3>Send us a message</h2><p data-v-955a4ce3>Tell us what you&#39;re interested in and we&#39;ll get back to you within 24 hours.</p><form class="contact-form" data-v-955a4ce3><div class="form-group" data-v-955a4ce3><label for="name" data-v-955a4ce3>Full Name *</label><input id="name"${ssrRenderAttr("value", form.value.name)} type="text" required placeholder="John Doe" data-v-955a4ce3></div><div class="form-group" data-v-955a4ce3><label for="email" data-v-955a4ce3>Email Address *</label><input id="email"${ssrRenderAttr("value", form.value.email)} type="email" required placeholder="john@restaurant.com" data-v-955a4ce3></div><div class="form-row" data-v-955a4ce3><div class="form-group" data-v-955a4ce3><label for="phone" data-v-955a4ce3>Phone Number</label><input id="phone"${ssrRenderAttr("value", form.value.phone)} type="tel" placeholder="+971 50 123 4567" data-v-955a4ce3></div><div class="form-group" data-v-955a4ce3><label for="company" data-v-955a4ce3>Restaurant Name</label><input id="company"${ssrRenderAttr("value", form.value.company)} type="text" placeholder="Your Restaurant" data-v-955a4ce3></div></div><div class="form-group" data-v-955a4ce3><label for="subject" data-v-955a4ce3>Subject *</label><select id="subject" required data-v-955a4ce3><option value="" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "") : ssrLooseEqual(form.value.subject, "")) ? " selected" : ""}>Select a subject</option><option value="demo" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "demo") : ssrLooseEqual(form.value.subject, "demo")) ? " selected" : ""}>Request a Demo</option><option value="pricing" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "pricing") : ssrLooseEqual(form.value.subject, "pricing")) ? " selected" : ""}>Pricing Questions</option><option value="technical" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "technical") : ssrLooseEqual(form.value.subject, "technical")) ? " selected" : ""}>Technical Support</option><option value="partnership" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "partnership") : ssrLooseEqual(form.value.subject, "partnership")) ? " selected" : ""}>Partnership Inquiry</option><option value="other" data-v-955a4ce3${ssrIncludeBooleanAttr(Array.isArray(form.value.subject) ? ssrLooseContain(form.value.subject, "other") : ssrLooseEqual(form.value.subject, "other")) ? " selected" : ""}>Other</option></select></div><div class="form-group" data-v-955a4ce3><label for="message" data-v-955a4ce3>Message *</label><textarea id="message" rows="6" required placeholder="Tell us more about your needs..." data-v-955a4ce3>${ssrInterpolate(form.value.message)}</textarea></div><div class="form-checkbox" data-v-955a4ce3><input id="terms"${ssrIncludeBooleanAttr(Array.isArray(form.value.terms) ? ssrLooseContain(form.value.terms, null) : form.value.terms) ? " checked" : ""} type="checkbox" required data-v-955a4ce3><label for="terms" data-v-955a4ce3> I agree to receive emails about our product updates and special offers </label></div><button type="submit" class="submit-button"${ssrIncludeBooleanAttr(!form.value.terms) ? " disabled" : ""} data-v-955a4ce3> Send Message </button><p class="form-note" data-v-955a4ce3>We&#39;ll get back to you within 24 hours.</p></form></div><div class="form-info" data-v-955a4ce3><h3 data-v-955a4ce3>Response Time</h3><p data-v-955a4ce3>We typically respond to inquiries within 24 hours during business days (Sunday - Thursday).</p><h3 data-v-955a4ce3>Office Hours</h3><ul class="hours-list" data-v-955a4ce3><li data-v-955a4ce3><strong data-v-955a4ce3>Sunday - Thursday:</strong><br data-v-955a4ce3> 9:00 AM - 6:00 PM GST </li><li data-v-955a4ce3><strong data-v-955a4ce3>Friday - Saturday:</strong><br data-v-955a4ce3> Closed </li></ul><h3 data-v-955a4ce3>Office Address</h3><address data-v-955a4ce3> KitchenOS Inc.<br data-v-955a4ce3> Dubai Business Hub<br data-v-955a4ce3> Dubai, UAE<br data-v-955a4ce3> PO Box 123456 </address><h3 data-v-955a4ce3>Follow Us</h3><div class="social-links" data-v-955a4ce3><a href="#" title="LinkedIn" data-v-955a4ce3>in</a><a href="#" title="Twitter" data-v-955a4ce3>𝕏</a><a href="#" title="Instagram" data-v-955a4ce3>📷</a><a href="#" title="Facebook" data-v-955a4ce3>f</a></div></div></div></div></section><section class="faq-preview-section" data-v-955a4ce3><div class="container" data-v-955a4ce3><h2 data-v-955a4ce3>Quick Answers</h2><p class="section-subtitle" data-v-955a4ce3>Common questions answered instantly</p><div class="faq-preview-grid" data-v-955a4ce3><!--[-->`);
			ssrRenderList(quickFaqs, (item, index) => {
				_push(`<div class="faq-preview-card" data-v-955a4ce3><div class="faq-preview-header" data-v-955a4ce3><h3 data-v-955a4ce3>${ssrInterpolate(item.q)}</h3><span class="toggle" data-v-955a4ce3>${ssrInterpolate(expandedFaq.value === index ? "−" : "+")}</span></div>`);
				if (expandedFaq.value === index) _push(`<div class="faq-preview-body" data-v-955a4ce3>${ssrInterpolate(item.a)}</div>`);
				else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></div></section><section class="contact-cta" data-v-955a4ce3><div class="container cta-content" data-v-955a4ce3><h2 data-v-955a4ce3>Ready to transform your restaurant?</h2><p data-v-955a4ce3>Start your free 14-day trial today. No credit card required.</p><button class="marketing-button" data-v-955a4ce3>Get started free</button></div></section></main></div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/ContactPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ContactPage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-955a4ce3"]]);
//#endregion
export { ContactPage_default as default };
