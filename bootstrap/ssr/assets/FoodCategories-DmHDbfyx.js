import { n as usePermissions, t as AdminLayout_default } from "./AdminLayout-Bwr7FeyI.js";
import { t as _sfc_main$1 } from "./PageHeader-D0aRDn5C.js";
import { t as DataTable_default } from "./DataTable-BHCUCuvd.js";
import { t as Pagination_default } from "./Pagination-h4WEvndd.js";
import { t as Modal_default } from "./Modal-DhESI6xO.js";
import { t as _sfc_main$2 } from "./FormField-Doe8oR1s.js";
import { computed, createBlock, createCommentVNode, createVNode, mergeProps, openBlock, ref, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { router, useForm } from "@inertiajs/vue3";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
//#region resources/js/pages/FoodCategories.vue
var _sfc_main = /*@__PURE__*/ Object.assign({ layout: AdminLayout_default }, {
	__name: "FoodCategories",
	__ssrInlineRender: true,
	props: {
		categories: {
			type: Object,
			default: () => ({ data: [] })
		},
		filters: {
			type: Object,
			default: () => ({ search: "" })
		}
	},
	setup(__props) {
		const { can } = usePermissions();
		const props = __props;
		const columns = [{
			key: "name",
			label: "Name"
		}, {
			key: "status",
			label: "Status"
		}];
		const rows = computed(() => props.categories?.data ?? []);
		const search = ref(props.filters?.search ?? "");
		let searchTimer = null;
		watch(search, (value) => {
			clearTimeout(searchTimer);
			searchTimer = setTimeout(() => {
				router.get("/food-categories", { search: value || void 0 }, {
					preserveState: true,
					preserveScroll: true,
					replace: true,
					only: ["categories", "filters"]
				});
			}, 300);
		});
		const showModal = ref(false);
		const form = useForm({
			id: null,
			name: "",
			status: true
		});
		const openModal = () => {
			form.reset();
			form.clearErrors();
			showModal.value = true;
		};
		const editCategory = (c) => {
			form.id = c.id;
			form.name = c.name;
			form.status = !!Number(c.status);
			form.clearErrors();
			showModal.value = true;
		};
		const saveCategory = () => {
			const opts = {
				preserveScroll: true,
				onSuccess: () => showModal.value = false
			};
			if (form.id) form.put(`/food-categories/${form.id}`, opts);
			else form.post("/food-categories", opts);
		};
		const deleteCategory = (id) => {
			if (!confirm("Are you sure?")) return;
			router.delete(`/food-categories/${id}`, { preserveScroll: true });
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
			_push(ssrRenderComponent(_sfc_main$1, {
				title: "Food Categories",
				subtitle: "Organize menu items into categories."
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(can)("food-categories.create")) _push(`<button class="ui-btn ui-btn--primary"${_scopeId}>+ Add Category</button>`);
						else _push(`<!---->`);
					} else return [unref(can)("food-categories.create") ? (openBlock(), createBlock("button", {
						key: 0,
						class: "ui-btn ui-btn--primary",
						onClick: openModal
					}, "+ Add Category")) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(DataTable_default, {
				columns,
				rows: rows.value,
				index: "",
				searchable: "",
				query: search.value,
				"onUpdate:query": ($event) => search.value = $event,
				"search-placeholder": "Search categories…",
				"empty-text": "No categories found."
			}, {
				"cell:status": withCtx(({ value }, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="${ssrRenderClass([value ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}"${_scopeId}>${ssrInterpolate(value ? "Active" : "Inactive")}</span>`);
					else return [createVNode("span", { class: ["ui-badge", value ? "ui-badge--success" : "ui-badge--muted"] }, toDisplayString(value ? "Active" : "Inactive"), 3)];
				}),
				actions: withCtx(({ row }, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(can)("food-categories.update")) _push(`<button class="ui-btn ui-btn--ghost ui-btn--sm"${_scopeId}>Edit</button>`);
						else _push(`<!---->`);
						if (unref(can)("food-categories.delete")) _push(`<button class="ui-btn ui-btn--danger ui-btn--sm"${_scopeId}>Delete</button>`);
						else _push(`<!---->`);
					} else return [unref(can)("food-categories.update") ? (openBlock(), createBlock("button", {
						key: 0,
						class: "ui-btn ui-btn--ghost ui-btn--sm",
						onClick: ($event) => editCategory(row)
					}, "Edit", 8, ["onClick"])) : createCommentVNode("", true), unref(can)("food-categories.delete") ? (openBlock(), createBlock("button", {
						key: 1,
						class: "ui-btn ui-btn--danger ui-btn--sm",
						onClick: ($event) => deleteCategory(row.id)
					}, "Delete", 8, ["onClick"])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(Pagination_default, {
				paginator: props.categories,
				only: ["categories"]
			}, null, _parent));
			_push(ssrRenderComponent(Modal_default, {
				modelValue: showModal.value,
				"onUpdate:modelValue": ($event) => showModal.value = $event,
				title: unref(form).id ? "Edit Food Category" : "Add Food Category"
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button class="ui-btn ui-btn--ghost"${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}>Save</button>`);
					else return [createVNode("button", {
						class: "ui-btn ui-btn--ghost",
						onClick: ($event) => showModal.value = false
					}, "Cancel", 8, ["onClick"]), createVNode("button", {
						class: "ui-btn ui-btn--primary",
						disabled: unref(form).processing,
						onClick: saveCategory
					}, "Save", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).name,
							"onUpdate:modelValue": ($event) => unref(form).name = $event,
							label: "Name",
							placeholder: "Name",
							error: unref(form).errors.name
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(_sfc_main$2, {
							modelValue: unref(form).status,
							"onUpdate:modelValue": ($event) => unref(form).status = $event,
							label: "Status",
							type: "select",
							error: unref(form).errors.status
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<option${ssrRenderAttr("value", true)}${_scopeId}>Active</option><option${ssrRenderAttr("value", false)}${_scopeId}>Inactive</option>`);
								else return [createVNode("option", { value: true }, "Active"), createVNode("option", { value: false }, "Inactive")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode(_sfc_main$2, {
						modelValue: unref(form).name,
						"onUpdate:modelValue": ($event) => unref(form).name = $event,
						label: "Name",
						placeholder: "Name",
						error: unref(form).errors.name
					}, null, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"error"
					]), createVNode(_sfc_main$2, {
						modelValue: unref(form).status,
						"onUpdate:modelValue": ($event) => unref(form).status = $event,
						label: "Status",
						type: "select",
						error: unref(form).errors.status
					}, {
						default: withCtx(() => [createVNode("option", { value: true }, "Active"), createVNode("option", { value: false }, "Inactive")]),
						_: 1
					}, 8, [
						"modelValue",
						"onUpdate:modelValue",
						"error"
					])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/FoodCategories.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
export { _sfc_main as default };
