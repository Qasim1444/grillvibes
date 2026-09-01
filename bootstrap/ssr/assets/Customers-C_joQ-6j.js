import { computed, ref, watch, onMounted, onBeforeUnmount, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, withKeys, vModelText, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { router, useForm } from "@inertiajs/vue3";
import { A as AdminLayout, u as usePermissions } from "./AdminLayout-BSQoNMD5.js";
import { _ as _sfc_main$1 } from "./PageHeader-S9CKpuCQ.js";
import { D as DataTable } from "./DataTable-_3Sx4Prd.js";
import { P as Pagination } from "./Pagination-BwjreGCl.js";
import { M as Modal } from "./Modal-DuP6wrX_.js";
import { _ as _sfc_main$2 } from "./FormField-CQ_by-Bj.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
function xsrfToken() {
  const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}
function buildQuery(params) {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== void 0 && v !== null && v !== ""
  );
  if (!entries.length) return "";
  return "?" + new URLSearchParams(entries).toString();
}
async function request(method, url, { params, body, formData } = {}) {
  const headers = { Accept: "application/json" };
  const opts = { method, credentials: "same-origin", headers };
  if (method !== "GET") {
    headers["X-XSRF-TOKEN"] = xsrfToken();
    headers["X-Requested-With"] = "XMLHttpRequest";
  }
  if (formData) {
    opts.body = formData;
  } else if (body !== void 0) {
    headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(url + buildQuery(params), opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
const whatsapp = {
  status: () => request("GET", "/whatsapp/status"),
  conversations: (params) => request("GET", "/whatsapp/conversations", { params }),
  messages: (number, params) => request("GET", `/whatsapp/messages/${encodeURIComponent(number)}`, { params }),
  sendMessage: (payload) => request("POST", "/whatsapp/send-message", { body: payload }),
  sendImage: (formData) => request("POST", "/whatsapp/send-image", { formData }),
  sendMedia: (formData) => request("POST", "/whatsapp/send-media", { formData }),
  calls: (params) => request("GET", "/whatsapp/calls", { params }),
  rejectCall: (callId, payload) => request("POST", `/whatsapp/calls/${encodeURIComponent(callId)}/reject`, { body: payload })
};
const _sfc_main = /* @__PURE__ */ Object.assign({ layout: AdminLayout }, {
  __name: "Customers",
  __ssrInlineRender: true,
  props: {
    // Laravel paginator: { data, links, from, to, total, current_page, ... }.
    // The full customer table is never shipped — only the current 20-row slice.
    customers: { type: Object, default: () => ({ data: [] }) },
    filters: { type: Object, default: () => ({ search: "" }) },
    orders: { type: Array, default: () => [] },
    foodItems: { type: Array, default: () => [] }
  },
  setup(__props) {
    var _a;
    const { can } = usePermissions();
    const props = __props;
    const columns = [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "contact", label: "Contact" }
    ];
    const rows = computed(() => {
      var _a2;
      return ((_a2 = props.customers) == null ? void 0 : _a2.data) ?? [];
    });
    const search = ref(((_a = props.filters) == null ? void 0 : _a.search) ?? "");
    let searchTimer = null;
    watch(search, (value) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        router.get(
          "/customers",
          { search: value || void 0 },
          { preserveState: true, preserveScroll: true, replace: true, only: ["customers", "filters"] }
        );
      }, 300);
    });
    const showModal = ref(false);
    const form = useForm({ id: null, name: "", email: "", contact: "", address: "", date_of_birth: "" });
    const showChat = ref(false);
    const chatCustomer = ref(null);
    const messages = ref([]);
    const messageInput = ref("");
    const loadingMessages = ref(false);
    const sendingMessage = ref(false);
    const whatsappConnected = ref(false);
    const conversations = ref([]);
    const messagesContainer = ref(null);
    let pollTimer = null;
    const fileInput = ref(null);
    const attachment = ref(null);
    const attachmentPreview = ref("");
    const attachmentIsImage = computed(() => {
      var _a2, _b;
      return !!((_b = (_a2 = attachment.value) == null ? void 0 : _a2.type) == null ? void 0 : _b.startsWith("image/"));
    });
    const onFileSelected = (e) => {
      var _a2;
      const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
      if (!file) return;
      attachment.value = file;
      attachmentPreview.value = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";
    };
    const clearAttachment = () => {
      if (attachmentPreview.value) URL.revokeObjectURL(attachmentPreview.value);
      attachment.value = null;
      attachmentPreview.value = "";
      if (fileInput.value) fileInput.value.value = "";
    };
    const MEDIA_KINDS = ["image", "video", "audio", "sticker", "document"];
    const LABEL_PREFIX_RE = /^\[(image|photo|video|audio|voice|document|file|sticker|gif|media)(:[^\]]*)?\]\s*/i;
    const NOISE_RE = /^\[(unsupported|protocolmessage|messagecontextinfo|null)[^\]]*\]$/i;
    const fileNameFromUrl = (url) => {
      try {
        return decodeURIComponent(url.split("?")[0].split("/").pop()) || "file";
      } catch {
        return "file";
      }
    };
    const cleanText = (raw) => {
      const stripped = (raw || "").trim().replace(LABEL_PREFIX_RE, "").trim();
      if (!stripped || NOISE_RE.test(stripped)) return "";
      return stripped;
    };
    const normalizeMessage = (msg, index) => {
      var _a2, _b, _c;
      const rawUrl = msg.media_url || msg.mediaUrl || ((_a2 = msg.media) == null ? void 0 : _a2.url) || null;
      const mime = (msg.media_mime || ((_b = msg.media) == null ? void 0 : _b.mimetype) || "").toLowerCase();
      let kind = (msg.messageType || msg.message_type || msg.type || "").toLowerCase();
      if (rawUrl && !MEDIA_KINDS.includes(kind)) {
        if (mime.startsWith("image/")) kind = "image";
        else if (mime.startsWith("video/")) kind = "video";
        else if (mime.startsWith("audio/")) kind = "audio";
        else kind = "document";
      }
      const caption = ((_c = msg.media) == null ? void 0 : _c.caption) || msg.caption || "";
      const text = cleanText(caption || msg.text || msg.message || "");
      return {
        key: msg.id || `m${index}`,
        direction: msg.direction === "outgoing" ? "outgoing" : "incoming",
        timestamp: msg.timestamp,
        text,
        media: rawUrl ? { kind, url: rawUrl, mime, filename: fileNameFromUrl(rawUrl) } : null
      };
    };
    const displayMessages = computed(
      () => messages.value.map(normalizeMessage).filter((m) => m.text || m.media)
    );
    const lightboxUrl = ref("");
    const openImage = (url) => {
      lightboxUrl.value = url;
    };
    const showCall = ref(false);
    const incomingCall = ref(null);
    let callTimer = null;
    const handledCallIds = /* @__PURE__ */ new Set();
    const matchCustomerName = async (number) => {
      const c = await lookupCustomer(number);
      return (c == null ? void 0 : c.name) || null;
    };
    let callsInFlight = false;
    const refreshCalls = async () => {
      if (callsInFlight) return;
      callsInFlight = true;
      try {
        const res = await whatsapp.calls({ limit: 100 });
        const calls = res.calls || [];
        allCalls.value = calls;
        const call = calls.find(
          (c) => !handledCallIds.has(c.id || c.callId) && (c.status === "ringing" || c.status === "offer")
        );
        if (call) {
          const number = normalizeNumber(call.from || call.number || call.callerJid);
          incomingCall.value = {
            id: call.id || call.callId,
            callerJid: call.callerJid || call.from,
            number,
            name: null
          };
          showCall.value = true;
          const pendingId = incomingCall.value.id;
          matchCustomerName(number).then((name) => {
            if (name && incomingCall.value && incomingCall.value.id === pendingId) {
              incomingCall.value.name = name;
            }
          });
        }
      } catch (err) {
      } finally {
        callsInFlight = false;
      }
    };
    const rejectIncomingCall = async () => {
      const call = incomingCall.value;
      showCall.value = false;
      if (!call) return;
      handledCallIds.add(call.id);
      try {
        await whatsapp.rejectCall(call.id, { callerJid: call.callerJid });
      } catch (err) {
      }
      incomingCall.value = null;
    };
    const showCompose = ref(false);
    const composeNumber = ref("");
    const openCompose = () => {
      composeNumber.value = "";
      showCompose.value = true;
    };
    const matchedCustomer = ref(null);
    let composeLookupTimer = null;
    watch(composeNumber, (value) => {
      clearTimeout(composeLookupTimer);
      matchedCustomer.value = null;
      const num = normalizeNumber(value);
      if (num.length < 7) return;
      composeLookupTimer = setTimeout(async () => {
        const c = await lookupCustomer(num);
        if (c && normalizeNumber(composeNumber.value) === num) {
          matchedCustomer.value = c;
        }
      }, 300);
    });
    const startComposeChat = () => {
      const num = normalizeNumber(composeNumber.value);
      if (num.length < 7) return;
      showCompose.value = false;
      openChat(
        matchedCustomer.value || { name: num, contact: num }
      );
    };
    const normalizeNumber = (n) => (n || "").replace(/\D+/g, "");
    const lookupCustomer = async (number) => {
      const num = normalizeNumber(number);
      if (num.length < 7) return null;
      try {
        const res = await fetch(`/customers/lookup?contact=${encodeURIComponent(num)}`, {
          headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
          credentials: "same-origin"
        });
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    };
    const getUnreadCount = (contact) => {
      const num = normalizeNumber(contact);
      if (!num) return 0;
      const conv = conversations.value.find((c) => normalizeNumber(c.number) === num);
      return (conv == null ? void 0 : conv.unreadCount) || 0;
    };
    const money = (v) => `$${Number(v || 0).toFixed(2)}`;
    const dateTime = (v) => v ? new Date(v).toLocaleString() : "—";
    const TYPE_LABELS = { delivery: "Delivery", dining: "Dining", "on-way": "On the way" };
    const typeLabel = (t) => TYPE_LABELS[t] || t || "—";
    const statusClass = (s) => {
      const v = String(s || "").toLowerCase();
      if (["completed", "paid", "done"].includes(v)) return "ui-badge--success";
      if (["on-way", "on the way", "delivering", "shipped"].includes(v)) return "ui-badge--warning";
      if (["preparing", "pending", "processing", "in progress"].includes(v)) return "ui-badge--info";
      return "ui-badge--muted";
    };
    const showOrders = ref(false);
    const ordersCustomer = ref(null);
    const ordersLoading = ref(false);
    const allOrders = computed(() => props.orders);
    const foodItems = computed(() => props.foodItems);
    const itemName = (id) => {
      var _a2;
      return ((_a2 = foodItems.value.find((i) => i.id === id)) == null ? void 0 : _a2.name) || `Item #${id}`;
    };
    const orderLines = (o) => o.order_items || o.orderItems || [];
    const customerOrders = computed(() => {
      var _a2;
      const cid = (_a2 = ordersCustomer.value) == null ? void 0 : _a2.id;
      if (!cid) return [];
      return allOrders.value.filter((o) => o.customer_id === cid).slice().sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    });
    const customerOrdersTotal = computed(
      () => customerOrders.value.reduce((s, o) => s + Number(o.grand_total || 0), 0)
    );
    const openOrders = (customer) => {
      ordersCustomer.value = customer;
      showOrders.value = true;
    };
    const showCalls = ref(false);
    const callsCustomer = ref(null);
    const allCalls = ref([]);
    const callTime = (c) => c.timestamp || c.time || c.createdAt || c.date || null;
    const callDirection = (c) => (c.direction || c.type || "").toLowerCase() === "outgoing" ? "outgoing" : "incoming";
    const callStatusClass = (s) => {
      const v = String(s || "").toLowerCase();
      if (["ringing", "offer"].includes(v)) return "ui-badge--info";
      if (["rejected", "missed", "declined"].includes(v)) return "ui-badge--muted";
      if (["accepted", "answered"].includes(v)) return "ui-badge--success";
      return "ui-badge--muted";
    };
    const callsForNumber = (contact) => {
      const num = normalizeNumber(contact);
      if (!num) return [];
      const tail = num.slice(-10);
      return allCalls.value.filter((c) => {
        const cn = normalizeNumber(c.from || c.number || c.callerJid);
        return cn && (cn === num || cn.endsWith(tail));
      });
    };
    const getCallCount = (contact) => callsForNumber(contact).length;
    const customerCalls = computed(() => {
      var _a2;
      const list = callsForNumber((_a2 = callsCustomer.value) == null ? void 0 : _a2.contact);
      return list.slice().sort((a, b) => new Date(callTime(b) || 0) - new Date(callTime(a) || 0));
    });
    const openCalls = (customer) => {
      callsCustomer.value = customer;
      showCalls.value = true;
    };
    const loadConnectionAndConversations = async () => {
      try {
        const status = await whatsapp.status();
        whatsappConnected.value = !!status.connected;
        const res = await whatsapp.conversations();
        conversations.value = res.conversations || [];
      } catch (err) {
        whatsappConnected.value = false;
      }
    };
    const scrollToBottom = () => {
      nextTick(() => {
        const el = messagesContainer.value;
        if (el) el.scrollTop = el.scrollHeight;
      });
    };
    const loadMessages = async () => {
      var _a2;
      const num = normalizeNumber((_a2 = chatCustomer.value) == null ? void 0 : _a2.contact);
      if (!num) return;
      try {
        const res = await whatsapp.messages(num, { limit: 100 });
        messages.value = (res.messages || []).slice().reverse();
        scrollToBottom();
      } catch (err) {
        console.error(err);
      }
    };
    const openChat = async (customer) => {
      const num = normalizeNumber(customer.contact);
      if (!num) {
        alert("This customer has no valid contact number.");
        return;
      }
      chatCustomer.value = customer;
      messages.value = [];
      showChat.value = true;
      loadingMessages.value = true;
      await loadConnectionAndConversations();
      await loadMessages();
      loadingMessages.value = false;
      clearInterval(pollTimer);
      pollTimer = setInterval(loadMessages, 5e3);
    };
    const sendMessage = async () => {
      var _a2, _b;
      const text = messageInput.value.trim();
      const num = normalizeNumber((_a2 = chatCustomer.value) == null ? void 0 : _a2.contact);
      if (!text && !attachment.value || !num) return;
      sendingMessage.value = true;
      try {
        let res;
        if (attachment.value) {
          const fd = new FormData();
          fd.append("number", num);
          fd.append("file", attachment.value);
          if (text) fd.append("caption", text);
          res = await whatsapp.sendMedia(fd);
        } else {
          res = await whatsapp.sendMessage({ number: num, message: text });
        }
        if (res.success) {
          messageInput.value = "";
          clearAttachment();
          await loadMessages();
        } else {
          alert(res.message || "Failed to send message.");
        }
      } catch (err) {
        alert(((_b = err.data) == null ? void 0 : _b.message) || err.message || "Failed to send message.");
      } finally {
        sendingMessage.value = false;
      }
    };
    const formatMessageTime = (ts) => {
      if (!ts) return "";
      return new Date(ts).toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const openModal = () => {
      form.clearErrors();
      form.id = null;
      form.name = "";
      form.email = "";
      form.contact = "";
      form.address = "";
      form.date_of_birth = "";
      showModal.value = true;
    };
    const editCustomer = (c) => {
      form.clearErrors();
      form.id = c.id;
      form.name = c.name ?? "";
      form.email = c.email ?? "";
      form.contact = c.contact ?? "";
      form.address = c.address ?? "";
      form.date_of_birth = c.date_of_birth ? String(c.date_of_birth).slice(0, 10) : "";
      showModal.value = true;
    };
    const saveCustomer = () => {
      const opts = {
        preserveScroll: true,
        onSuccess: () => {
          showModal.value = false;
        }
      };
      if (form.id) {
        form.put(`/customers/${form.id}`, opts);
      } else {
        form.post("/customers", opts);
      }
    };
    const deleteCustomer = (id) => {
      if (!confirm("Are you sure?")) return;
      router.delete(`/customers/${id}`, { preserveScroll: true });
    };
    const formatDate = (v) => v ? new Date(v).toLocaleDateString() : "—";
    watch(showChat, (open) => {
      if (!open) {
        clearInterval(pollTimer);
        pollTimer = null;
        clearAttachment();
      }
    });
    onMounted(() => {
      loadConnectionAndConversations();
      refreshCalls();
      callTimer = setInterval(refreshCalls, 5e3);
    });
    onBeforeUnmount(() => {
      clearInterval(pollTimer);
      clearInterval(callTimer);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-2c45fe49>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        title: "Customers",
        subtitle: "Manage customer records."
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2c45fe49${_scopeId}>Message a Number</button>`);
            if (unref(can)("customers.create")) {
              _push2(`<button class="ui-btn ui-btn--primary" data-v-2c45fe49${_scopeId}>+ Add Customer</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: openCompose
              }, "Message a Number"),
              unref(can)("customers.create") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--primary",
                onClick: openModal
              }, "+ Add Customer")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DataTable, {
        columns,
        rows: rows.value,
        index: "",
        searchable: "",
        query: search.value,
        "onUpdate:query": ($event) => search.value = $event,
        "search-placeholder": "Search customers…",
        "empty-text": "No customers found."
      }, {
        "cell:name": withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="cust-name-btn"${ssrRenderAttr("title", `View ${row.name}'s details`)} data-v-2c45fe49${_scopeId}>${ssrInterpolate(row.name)}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "cust-name-btn",
                onClick: ($event) => openOrders(row),
                title: `View ${row.name}'s details`
              }, toDisplayString(row.name), 9, ["onClick", "title"])
            ];
          }
        }),
        actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([{ "has-unread": getUnreadCount(row.contact) > 0 }, "ui-btn ui-btn--ghost ui-btn--sm ui-btn-icon"])}" title="Chat on WhatsApp" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-2c45fe49${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-v-2c45fe49${_scopeId}></path></svg>`);
            if (getUnreadCount(row.contact) > 0) {
              _push2(`<span class="unread-badge" data-v-2c45fe49${_scopeId}>${ssrInterpolate(getUnreadCount(row.contact))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button><button class="${ssrRenderClass([{ "has-calls": getCallCount(row.contact) > 0 }, "ui-btn ui-btn--ghost ui-btn--sm ui-btn-icon ui-btn-icon--call"])}" title="Call history" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" data-v-2c45fe49${_scopeId}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" data-v-2c45fe49${_scopeId}></path></svg>`);
            if (getCallCount(row.contact) > 0) {
              _push2(`<span class="call-badge" data-v-2c45fe49${_scopeId}>${ssrInterpolate(getCallCount(row.contact))}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button>`);
            if (unref(can)("customers.update")) {
              _push2(`<button class="ui-btn ui-btn--ghost ui-btn--sm" data-v-2c45fe49${_scopeId}>Edit</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(can)("customers.delete")) {
              _push2(`<button class="ui-btn ui-btn--danger ui-btn--sm" data-v-2c45fe49${_scopeId}>Delete</button>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("button", {
                class: ["ui-btn ui-btn--ghost ui-btn--sm ui-btn-icon", { "has-unread": getUnreadCount(row.contact) > 0 }],
                onClick: ($event) => openChat(row),
                title: "Chat on WhatsApp"
              }, [
                (openBlock(), createBlock("svg", {
                  viewBox: "0 0 24 24",
                  width: "16",
                  height: "16",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" })
                ])),
                getUnreadCount(row.contact) > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "unread-badge"
                }, toDisplayString(getUnreadCount(row.contact)), 1)) : createCommentVNode("", true)
              ], 10, ["onClick"]),
              createVNode("button", {
                class: ["ui-btn ui-btn--ghost ui-btn--sm ui-btn-icon ui-btn-icon--call", { "has-calls": getCallCount(row.contact) > 0 }],
                onClick: ($event) => openCalls(row),
                title: "Call history"
              }, [
                (openBlock(), createBlock("svg", {
                  viewBox: "0 0 24 24",
                  width: "16",
                  height: "16",
                  fill: "currentColor"
                }, [
                  createVNode("path", { d: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
                ])),
                getCallCount(row.contact) > 0 ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "call-badge"
                }, toDisplayString(getCallCount(row.contact)), 1)) : createCommentVNode("", true)
              ], 10, ["onClick"]),
              unref(can)("customers.update") ? (openBlock(), createBlock("button", {
                key: 0,
                class: "ui-btn ui-btn--ghost ui-btn--sm",
                onClick: ($event) => editCustomer(row)
              }, "Edit", 8, ["onClick"])) : createCommentVNode("", true),
              unref(can)("customers.delete") ? (openBlock(), createBlock("button", {
                key: 1,
                class: "ui-btn ui-btn--danger ui-btn--sm",
                onClick: ($event) => deleteCustomer(row.id)
              }, "Delete", 8, ["onClick"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Pagination, {
        paginator: props.customers,
        only: ["customers"]
      }, null, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showModal.value,
        "onUpdate:modelValue": ($event) => showModal.value = $event,
        title: unref(form).id ? "Edit Customer" : "Add Customer",
        width: "560px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2c45fe49${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} data-v-2c45fe49${_scopeId}>Save</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showModal.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                onClick: saveCustomer,
                disabled: unref(form).processing
              }, "Save", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              label: "Name",
              placeholder: "Name",
              error: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              label: "Email",
              type: "email",
              placeholder: "Email",
              error: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).contact,
              "onUpdate:modelValue": ($event) => unref(form).contact = $event,
              label: "Contact",
              placeholder: "Contact",
              error: unref(form).errors.contact
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).address,
              "onUpdate:modelValue": ($event) => unref(form).address = $event,
              label: "Address",
              type: "textarea",
              placeholder: "Address",
              error: unref(form).errors.address
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(form).date_of_birth,
              "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
              label: "Date of Birth",
              type: "date",
              error: unref(form).errors.date_of_birth
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: unref(form).name,
                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                label: "Name",
                placeholder: "Name",
                error: unref(form).errors.name
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).email,
                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                label: "Email",
                type: "email",
                placeholder: "Email",
                error: unref(form).errors.email
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).contact,
                "onUpdate:modelValue": ($event) => unref(form).contact = $event,
                label: "Contact",
                placeholder: "Contact",
                error: unref(form).errors.contact
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).address,
                "onUpdate:modelValue": ($event) => unref(form).address = $event,
                label: "Address",
                type: "textarea",
                placeholder: "Address",
                error: unref(form).errors.address
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"]),
              createVNode(_sfc_main$2, {
                modelValue: unref(form).date_of_birth,
                "onUpdate:modelValue": ($event) => unref(form).date_of_birth = $event,
                label: "Date of Birth",
                type: "date",
                error: unref(form).errors.date_of_birth
              }, null, 8, ["modelValue", "onUpdate:modelValue", "error"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showChat.value,
        "onUpdate:modelValue": ($event) => showChat.value = $event,
        width: "440px",
        "hide-header": "",
        flush: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="chat-header" data-v-2c45fe49${_scopeId}><div class="chat-header__avatar" data-v-2c45fe49${_scopeId}>${ssrInterpolate((((_a3 = chatCustomer.value) == null ? void 0 : _a3.name) || "?").charAt(0).toUpperCase())}</div><div class="chat-header__info" data-v-2c45fe49${_scopeId}><div class="chat-header__name" data-v-2c45fe49${_scopeId}>${ssrInterpolate(((_b2 = chatCustomer.value) == null ? void 0 : _b2.name) || "Unknown")}</div><div class="chat-header__number" data-v-2c45fe49${_scopeId}>${ssrInterpolate((_c = chatCustomer.value) == null ? void 0 : _c.contact)}</div></div><button class="chat-header__close" data-v-2c45fe49${_scopeId}>×</button></div><div class="chat-container" data-v-2c45fe49${_scopeId}><div class="chat-messages" data-v-2c45fe49${_scopeId}>`);
            if (!whatsappConnected.value) {
              _push2(`<div class="chat-banner" data-v-2c45fe49${_scopeId}> WhatsApp not connected — showing saved messages </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (loadingMessages.value) {
              _push2(`<div class="chat-notice" data-v-2c45fe49${_scopeId}>Loading messages…</div>`);
            } else if (displayMessages.value.length === 0) {
              _push2(`<div class="chat-empty" data-v-2c45fe49${_scopeId}>No messages yet</div>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(displayMessages.value, (msg) => {
                _push2(`<div class="${ssrRenderClass([{ "chat-message--outgoing": msg.direction === "outgoing" }, "chat-message"])}" data-v-2c45fe49${_scopeId}><div class="chat-message__bubble" data-v-2c45fe49${_scopeId}>`);
                if (msg.media) {
                  _push2(`<!--[-->`);
                  if (msg.media.kind === "image" || msg.media.kind === "sticker") {
                    _push2(`<img${ssrRenderAttr("src", msg.media.url)} class="${ssrRenderClass([{ "chat-message__image--sticker": msg.media.kind === "sticker" }, "chat-message__image"])}" alt="attachment" data-v-2c45fe49${_scopeId}>`);
                  } else if (msg.media.kind === "video") {
                    _push2(`<video${ssrRenderAttr("src", msg.media.url)} class="chat-message__video" controls preload="metadata" data-v-2c45fe49${_scopeId}></video>`);
                  } else if (msg.media.kind === "audio") {
                    _push2(`<audio${ssrRenderAttr("src", msg.media.url)} class="chat-message__audio" controls preload="metadata" data-v-2c45fe49${_scopeId}></audio>`);
                  } else {
                    _push2(`<a${ssrRenderAttr("href", msg.media.url)}${ssrRenderAttr("download", msg.media.filename)} target="_blank" rel="noopener" class="chat-message__doc" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-2c45fe49${_scopeId}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" data-v-2c45fe49${_scopeId}></path><polyline points="14 2 14 8 20 8" data-v-2c45fe49${_scopeId}></polyline></svg><span class="chat-message__doc-name" data-v-2c45fe49${_scopeId}>${ssrInterpolate(msg.media.filename)}</span></a>`);
                  }
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                if (msg.text) {
                  _push2(`<div class="chat-message__text" data-v-2c45fe49${_scopeId}>${ssrInterpolate(msg.text)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="chat-message__time" data-v-2c45fe49${_scopeId}>${ssrInterpolate(formatMessageTime(msg.timestamp))}</div></div></div>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</div>`);
            if (attachment.value) {
              _push2(`<div class="chat-attachment" data-v-2c45fe49${_scopeId}>`);
              if (attachmentIsImage.value) {
                _push2(`<img${ssrRenderAttr("src", attachmentPreview.value)} class="chat-attachment__thumb" alt="preview" data-v-2c45fe49${_scopeId}>`);
              } else {
                _push2(`<div class="chat-attachment__icon" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-2c45fe49${_scopeId}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" data-v-2c45fe49${_scopeId}></path><polyline points="14 2 14 8 20 8" data-v-2c45fe49${_scopeId}></polyline></svg></div>`);
              }
              _push2(`<span class="chat-attachment__name" data-v-2c45fe49${_scopeId}>${ssrInterpolate(attachment.value.name)}</span><button class="chat-attachment__remove" data-v-2c45fe49${_scopeId}>×</button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="chat-input-row" data-v-2c45fe49${_scopeId}><button class="chat-attach-btn" title="Attach file"${ssrIncludeBooleanAttr(!whatsappConnected.value || sendingMessage.value) ? " disabled" : ""} data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-2c45fe49${_scopeId}><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" data-v-2c45fe49${_scopeId}></path></svg></button><input type="file" accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar" class="chat-file-input" data-v-2c45fe49${_scopeId}><input${ssrRenderAttr("value", messageInput.value)} type="text" class="chat-input" placeholder="Type a message"${ssrIncludeBooleanAttr(!whatsappConnected.value || sendingMessage.value) ? " disabled" : ""} data-v-2c45fe49${_scopeId}><button class="chat-send-btn"${ssrIncludeBooleanAttr(!messageInput.value.trim() && !attachment.value || !whatsappConnected.value || sendingMessage.value) ? " disabled" : ""} title="Send" data-v-2c45fe49${_scopeId}>`);
            if (!sendingMessage.value) {
              _push2(`<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" data-v-2c45fe49${_scopeId}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" data-v-2c45fe49${_scopeId}></path></svg>`);
            } else {
              _push2(`<span class="chat-send-spinner" data-v-2c45fe49${_scopeId}></span>`);
            }
            _push2(`</button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "chat-header" }, [
                createVNode("div", { class: "chat-header__avatar" }, toDisplayString((((_d = chatCustomer.value) == null ? void 0 : _d.name) || "?").charAt(0).toUpperCase()), 1),
                createVNode("div", { class: "chat-header__info" }, [
                  createVNode("div", { class: "chat-header__name" }, toDisplayString(((_e = chatCustomer.value) == null ? void 0 : _e.name) || "Unknown"), 1),
                  createVNode("div", { class: "chat-header__number" }, toDisplayString((_f = chatCustomer.value) == null ? void 0 : _f.contact), 1)
                ]),
                createVNode("button", {
                  class: "chat-header__close",
                  onClick: ($event) => showChat.value = false
                }, "×", 8, ["onClick"])
              ]),
              createVNode("div", { class: "chat-container" }, [
                createVNode("div", {
                  class: "chat-messages",
                  ref_key: "messagesContainer",
                  ref: messagesContainer
                }, [
                  !whatsappConnected.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "chat-banner"
                  }, " WhatsApp not connected — showing saved messages ")) : createCommentVNode("", true),
                  loadingMessages.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "chat-notice"
                  }, "Loading messages…")) : displayMessages.value.length === 0 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "chat-empty"
                  }, "No messages yet")) : (openBlock(true), createBlock(Fragment, { key: 3 }, renderList(displayMessages.value, (msg) => {
                    return openBlock(), createBlock("div", {
                      key: msg.key,
                      class: ["chat-message", { "chat-message--outgoing": msg.direction === "outgoing" }]
                    }, [
                      createVNode("div", { class: "chat-message__bubble" }, [
                        msg.media ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          msg.media.kind === "image" || msg.media.kind === "sticker" ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: msg.media.url,
                            class: ["chat-message__image", { "chat-message__image--sticker": msg.media.kind === "sticker" }],
                            onClick: ($event) => openImage(msg.media.url),
                            alt: "attachment"
                          }, null, 10, ["src", "onClick"])) : msg.media.kind === "video" ? (openBlock(), createBlock("video", {
                            key: 1,
                            src: msg.media.url,
                            class: "chat-message__video",
                            controls: "",
                            preload: "metadata"
                          }, null, 8, ["src"])) : msg.media.kind === "audio" ? (openBlock(), createBlock("audio", {
                            key: 2,
                            src: msg.media.url,
                            class: "chat-message__audio",
                            controls: "",
                            preload: "metadata"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("a", {
                            key: 3,
                            href: msg.media.url,
                            download: msg.media.filename,
                            target: "_blank",
                            rel: "noopener",
                            class: "chat-message__doc"
                          }, [
                            (openBlock(), createBlock("svg", {
                              viewBox: "0 0 24 24",
                              width: "26",
                              height: "26",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            }, [
                              createVNode("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
                              createVNode("polyline", { points: "14 2 14 8 20 8" })
                            ])),
                            createVNode("span", { class: "chat-message__doc-name" }, toDisplayString(msg.media.filename), 1)
                          ], 8, ["href", "download"]))
                        ], 64)) : createCommentVNode("", true),
                        msg.text ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "chat-message__text"
                        }, toDisplayString(msg.text), 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "chat-message__time" }, toDisplayString(formatMessageTime(msg.timestamp)), 1)
                      ])
                    ], 2);
                  }), 128))
                ], 512),
                attachment.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "chat-attachment"
                }, [
                  attachmentIsImage.value ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: attachmentPreview.value,
                    class: "chat-attachment__thumb",
                    alt: "preview"
                  }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "chat-attachment__icon"
                  }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      width: "32",
                      height: "32",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }),
                      createVNode("polyline", { points: "14 2 14 8 20 8" })
                    ]))
                  ])),
                  createVNode("span", { class: "chat-attachment__name" }, toDisplayString(attachment.value.name), 1),
                  createVNode("button", {
                    class: "chat-attachment__remove",
                    onClick: clearAttachment
                  }, "×")
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "chat-input-row" }, [
                  createVNode("button", {
                    class: "chat-attach-btn",
                    title: "Attach file",
                    disabled: !whatsappConnected.value || sendingMessage.value,
                    onClick: ($event) => _ctx.$refs.fileInput.click()
                  }, [
                    (openBlock(), createBlock("svg", {
                      viewBox: "0 0 24 24",
                      width: "22",
                      height: "22",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createVNode("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" })
                    ]))
                  ], 8, ["disabled", "onClick"]),
                  createVNode("input", {
                    ref_key: "fileInput",
                    ref: fileInput,
                    type: "file",
                    accept: "image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.rar",
                    class: "chat-file-input",
                    onChange: onFileSelected
                  }, null, 544),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => messageInput.value = $event,
                    type: "text",
                    class: "chat-input",
                    placeholder: "Type a message",
                    onKeyup: withKeys(sendMessage, ["enter"]),
                    disabled: !whatsappConnected.value || sendingMessage.value
                  }, null, 40, ["onUpdate:modelValue", "disabled"]), [
                    [vModelText, messageInput.value]
                  ]),
                  createVNode("button", {
                    class: "chat-send-btn",
                    onClick: sendMessage,
                    disabled: !messageInput.value.trim() && !attachment.value || !whatsappConnected.value || sendingMessage.value,
                    title: "Send"
                  }, [
                    !sendingMessage.value ? (openBlock(), createBlock("svg", {
                      key: 0,
                      viewBox: "0 0 24 24",
                      width: "22",
                      height: "22",
                      fill: "currentColor"
                    }, [
                      createVNode("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" })
                    ])) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "chat-send-spinner"
                    }))
                  ], 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showCall.value,
        "onUpdate:modelValue": ($event) => showCall.value = $event,
        title: "WHATSAPP",
        width: "360px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b2, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="call-card" data-v-2c45fe49${_scopeId}><div class="call-avatar" data-v-2c45fe49${_scopeId}>${ssrInterpolate((((_a3 = incomingCall.value) == null ? void 0 : _a3.name) || ((_b2 = incomingCall.value) == null ? void 0 : _b2.number) || "?").charAt(0).toUpperCase())}</div><div class="call-name" data-v-2c45fe49${_scopeId}>${ssrInterpolate(((_c = incomingCall.value) == null ? void 0 : _c.name) || "Unknown")}</div><div class="call-number" data-v-2c45fe49${_scopeId}>${ssrInterpolate((_d = incomingCall.value) == null ? void 0 : _d.number)}</div><div class="call-status" data-v-2c45fe49${_scopeId}>Incoming voice call…</div><button class="call-reject" title="Reject call" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" data-v-2c45fe49${_scopeId}><path d="M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" data-v-2c45fe49${_scopeId}></path></svg></button></div>`);
          } else {
            return [
              createVNode("div", { class: "call-card" }, [
                createVNode("div", { class: "call-avatar" }, toDisplayString((((_e = incomingCall.value) == null ? void 0 : _e.name) || ((_f = incomingCall.value) == null ? void 0 : _f.number) || "?").charAt(0).toUpperCase()), 1),
                createVNode("div", { class: "call-name" }, toDisplayString(((_g = incomingCall.value) == null ? void 0 : _g.name) || "Unknown"), 1),
                createVNode("div", { class: "call-number" }, toDisplayString((_h = incomingCall.value) == null ? void 0 : _h.number), 1),
                createVNode("div", { class: "call-status" }, "Incoming voice call…"),
                createVNode("button", {
                  class: "call-reject",
                  title: "Reject call",
                  onClick: rejectIncomingCall
                }, [
                  (openBlock(), createBlock("svg", {
                    viewBox: "0 0 24 24",
                    width: "24",
                    height: "24",
                    fill: "currentColor"
                  }, [
                    createVNode("path", { d: "M21 15.46l-5.27-.61-2.52 2.52a15.045 15.045 0 01-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" })
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showCompose.value,
        "onUpdate:modelValue": ($event) => showCompose.value = $event,
        title: "Message a Number",
        width: "480px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2c45fe49${_scopeId}>Cancel</button><button class="ui-btn ui-btn--primary"${ssrIncludeBooleanAttr(normalizeNumber(composeNumber.value).length < 7) ? " disabled" : ""} data-v-2c45fe49${_scopeId}> Start Chat </button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showCompose.value = false
              }, "Cancel", 8, ["onClick"]),
              createVNode("button", {
                class: "ui-btn ui-btn--primary",
                disabled: normalizeNumber(composeNumber.value).length < 7,
                onClick: startComposeChat
              }, " Start Chat ", 8, ["disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: composeNumber.value,
              "onUpdate:modelValue": ($event) => composeNumber.value = $event,
              label: "Phone Number",
              placeholder: "e.g. 923001234567 (country code, digits only)"
            }, null, _parent2, _scopeId));
            if (matchedCustomer.value) {
              _push2(`<p class="compose-match" data-v-2c45fe49${_scopeId}> Matches customer: <strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(matchedCustomer.value.name)}</strong></p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: composeNumber.value,
                "onUpdate:modelValue": ($event) => composeNumber.value = $event,
                label: "Phone Number",
                placeholder: "e.g. 923001234567 (country code, digits only)"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              matchedCustomer.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "compose-match"
              }, [
                createTextVNode(" Matches customer: "),
                createVNode("strong", null, toDisplayString(matchedCustomer.value.name), 1)
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showOrders.value,
        "onUpdate:modelValue": ($event) => showOrders.value = $event,
        title: `Orders — ${((_a2 = ordersCustomer.value) == null ? void 0 : _a2.name) || ""}`,
        width: "640px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2c45fe49${_scopeId}>Close</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showOrders.value = false
              }, "Close", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b2, _c, _d, _e, _f;
          if (_push2) {
            if (ordersLoading.value) {
              _push2(`<p class="ord-hint" data-v-2c45fe49${_scopeId}>Loading orders…</p>`);
            } else {
              _push2(`<!--[--><div class="ord-summary" data-v-2c45fe49${_scopeId}><div data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Total Orders</span><strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(customerOrders.value.length)}</strong></div><div data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Total Spent</span><strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(money(customerOrdersTotal.value))}</strong></div><div data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Contact</span><strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(((_a3 = ordersCustomer.value) == null ? void 0 : _a3.contact) || "—")}</strong></div><div data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Date of Birth</span><strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(formatDate((_b2 = ordersCustomer.value) == null ? void 0 : _b2.date_of_birth))}</strong></div></div><div class="ord-detail" data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Address</span><p data-v-2c45fe49${_scopeId}>${ssrInterpolate(((_c = ordersCustomer.value) == null ? void 0 : _c.address) || "—")}</p></div>`);
              if (!customerOrders.value.length) {
                _push2(`<p class="ord-hint" data-v-2c45fe49${_scopeId}>This customer has no orders yet.</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--[-->`);
              ssrRenderList(customerOrders.value, (o) => {
                _push2(`<div class="ord-card" data-v-2c45fe49${_scopeId}><div class="ord-card__head" data-v-2c45fe49${_scopeId}><strong data-v-2c45fe49${_scopeId}>Order #${ssrInterpolate(o.id)}</strong><span class="${ssrRenderClass([statusClass(o.status), "ui-badge"])}" data-v-2c45fe49${_scopeId}>${ssrInterpolate(o.status || "—")}</span><span class="${ssrRenderClass([o.paid ? "ui-badge--success" : "ui-badge--muted", "ui-badge"])}" data-v-2c45fe49${_scopeId}>${ssrInterpolate(o.paid ? "Paid" : "Unpaid")}</span><span class="ord-card__type" data-v-2c45fe49${_scopeId}>${ssrInterpolate(typeLabel(o.type))}</span><span class="ord-card__date" data-v-2c45fe49${_scopeId}>${ssrInterpolate(dateTime(o.order_datetime))}</span></div><table class="data-table ord-items" data-v-2c45fe49${_scopeId}><thead data-v-2c45fe49${_scopeId}><tr data-v-2c45fe49${_scopeId}><th data-v-2c45fe49${_scopeId}>Item</th><th style="${ssrRenderStyle({ "text-align": "center" })}" data-v-2c45fe49${_scopeId}>Qty</th><th style="${ssrRenderStyle({ "text-align": "right" })}" data-v-2c45fe49${_scopeId}>Subtotal</th></tr></thead><tbody data-v-2c45fe49${_scopeId}>`);
                if (!orderLines(o).length) {
                  _push2(`<tr data-v-2c45fe49${_scopeId}><td colspan="3" class="data-table__empty" data-v-2c45fe49${_scopeId}>No items on this order.</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(orderLines(o), (it) => {
                  _push2(`<tr data-v-2c45fe49${_scopeId}><td data-v-2c45fe49${_scopeId}>${ssrInterpolate(itemName(it.fooditems_id))} `);
                  if (it.add_note) {
                    _push2(`<small class="ord-note" data-v-2c45fe49${_scopeId}>${ssrInterpolate(it.add_note)}</small>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</td><td style="${ssrRenderStyle({ "text-align": "center" })}" data-v-2c45fe49${_scopeId}>${ssrInterpolate(it.quantity)}</td><td style="${ssrRenderStyle({ "text-align": "right" })}" data-v-2c45fe49${_scopeId}>${ssrInterpolate(money(it.sub_total))}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table><div class="ord-card__foot" data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>Grand Total</span><strong data-v-2c45fe49${_scopeId}>${ssrInterpolate(money(o.grand_total))}</strong></div></div>`);
              });
              _push2(`<!--]--><!--]-->`);
            }
          } else {
            return [
              ordersLoading.value ? (openBlock(), createBlock("p", {
                key: 0,
                class: "ord-hint"
              }, "Loading orders…")) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode("div", { class: "ord-summary" }, [
                  createVNode("div", null, [
                    createVNode("span", null, "Total Orders"),
                    createVNode("strong", null, toDisplayString(customerOrders.value.length), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", null, "Total Spent"),
                    createVNode("strong", null, toDisplayString(money(customerOrdersTotal.value)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", null, "Contact"),
                    createVNode("strong", null, toDisplayString(((_d = ordersCustomer.value) == null ? void 0 : _d.contact) || "—"), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("span", null, "Date of Birth"),
                    createVNode("strong", null, toDisplayString(formatDate((_e = ordersCustomer.value) == null ? void 0 : _e.date_of_birth)), 1)
                  ])
                ]),
                createVNode("div", { class: "ord-detail" }, [
                  createVNode("span", null, "Address"),
                  createVNode("p", null, toDisplayString(((_f = ordersCustomer.value) == null ? void 0 : _f.address) || "—"), 1)
                ]),
                !customerOrders.value.length ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "ord-hint"
                }, "This customer has no orders yet.")) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(customerOrders.value, (o) => {
                  return openBlock(), createBlock("div", {
                    key: o.id,
                    class: "ord-card"
                  }, [
                    createVNode("div", { class: "ord-card__head" }, [
                      createVNode("strong", null, "Order #" + toDisplayString(o.id), 1),
                      createVNode("span", {
                        class: ["ui-badge", statusClass(o.status)]
                      }, toDisplayString(o.status || "—"), 3),
                      createVNode("span", {
                        class: ["ui-badge", o.paid ? "ui-badge--success" : "ui-badge--muted"]
                      }, toDisplayString(o.paid ? "Paid" : "Unpaid"), 3),
                      createVNode("span", { class: "ord-card__type" }, toDisplayString(typeLabel(o.type)), 1),
                      createVNode("span", { class: "ord-card__date" }, toDisplayString(dateTime(o.order_datetime)), 1)
                    ]),
                    createVNode("table", { class: "data-table ord-items" }, [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", null, "Item"),
                          createVNode("th", { style: { "text-align": "center" } }, "Qty"),
                          createVNode("th", { style: { "text-align": "right" } }, "Subtotal")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        !orderLines(o).length ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "3",
                            class: "data-table__empty"
                          }, "No items on this order.")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(orderLines(o), (it) => {
                          return openBlock(), createBlock("tr", {
                            key: it.id
                          }, [
                            createVNode("td", null, [
                              createTextVNode(toDisplayString(itemName(it.fooditems_id)) + " ", 1),
                              it.add_note ? (openBlock(), createBlock("small", {
                                key: 0,
                                class: "ord-note"
                              }, toDisplayString(it.add_note), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { style: { "text-align": "center" } }, toDisplayString(it.quantity), 1),
                            createVNode("td", { style: { "text-align": "right" } }, toDisplayString(money(it.sub_total)), 1)
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "ord-card__foot" }, [
                      createVNode("span", null, "Grand Total"),
                      createVNode("strong", null, toDisplayString(money(o.grand_total)), 1)
                    ])
                  ]);
                }), 128))
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Modal, {
        modelValue: showCalls.value,
        "onUpdate:modelValue": ($event) => showCalls.value = $event,
        title: `Calls — ${((_b = callsCustomer.value) == null ? void 0 : _b.name) || ""}`,
        width: "440px"
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="ui-btn ui-btn--ghost" data-v-2c45fe49${_scopeId}>Close</button>`);
          } else {
            return [
              createVNode("button", {
                class: "ui-btn ui-btn--ghost",
                onClick: ($event) => showCalls.value = false
              }, "Close", 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="ord-summary ord-summary--calls" data-v-2c45fe49${_scopeId}><span data-v-2c45fe49${_scopeId}>${ssrInterpolate(customerCalls.value.length)} recent call${ssrInterpolate(customerCalls.value.length === 1 ? "" : "s")}</span></p>`);
            if (!customerCalls.value.length) {
              _push2(`<p class="ord-hint" data-v-2c45fe49${_scopeId}>No recent calls for this number.</p>`);
            } else {
              _push2(`<ul class="call-list" data-v-2c45fe49${_scopeId}><!--[-->`);
              ssrRenderList(customerCalls.value, (c, i) => {
                _push2(`<li class="call-list__item" data-v-2c45fe49${_scopeId}><span class="${ssrRenderClass([`call-list__icon--${callDirection(c)}`, "call-list__icon"])}" data-v-2c45fe49${_scopeId}><svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" data-v-2c45fe49${_scopeId}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" data-v-2c45fe49${_scopeId}></path></svg></span><span class="call-list__meta" data-v-2c45fe49${_scopeId}><span class="call-list__dir" data-v-2c45fe49${_scopeId}>${ssrInterpolate(callDirection(c) === "outgoing" ? "Outgoing" : "Incoming")} call</span><span class="call-list__time" data-v-2c45fe49${_scopeId}>${ssrInterpolate(formatMessageTime(callTime(c)))}</span></span><span class="${ssrRenderClass([callStatusClass(c.status), "ui-badge"])}" data-v-2c45fe49${_scopeId}>${ssrInterpolate(c.status || "—")}</span></li>`);
              });
              _push2(`<!--]--></ul>`);
            }
          } else {
            return [
              createVNode("p", { class: "ord-summary ord-summary--calls" }, [
                createVNode("span", null, toDisplayString(customerCalls.value.length) + " recent call" + toDisplayString(customerCalls.value.length === 1 ? "" : "s"), 1)
              ]),
              !customerCalls.value.length ? (openBlock(), createBlock("p", {
                key: 0,
                class: "ord-hint"
              }, "No recent calls for this number.")) : (openBlock(), createBlock("ul", {
                key: 1,
                class: "call-list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(customerCalls.value, (c, i) => {
                  return openBlock(), createBlock("li", {
                    key: c.id || c.callId || i,
                    class: "call-list__item"
                  }, [
                    createVNode("span", {
                      class: ["call-list__icon", `call-list__icon--${callDirection(c)}`]
                    }, [
                      (openBlock(), createBlock("svg", {
                        viewBox: "0 0 24 24",
                        width: "15",
                        height: "15",
                        fill: "currentColor"
                      }, [
                        createVNode("path", { d: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
                      ]))
                    ], 2),
                    createVNode("span", { class: "call-list__meta" }, [
                      createVNode("span", { class: "call-list__dir" }, toDisplayString(callDirection(c) === "outgoing" ? "Outgoing" : "Incoming") + " call", 1),
                      createVNode("span", { class: "call-list__time" }, toDisplayString(formatMessageTime(callTime(c))), 1)
                    ]),
                    createVNode("span", {
                      class: ["ui-badge", callStatusClass(c.status)]
                    }, toDisplayString(c.status || "—"), 3)
                  ]);
                }), 128))
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      if (lightboxUrl.value) {
        _push(`<div class="chat-lightbox" data-v-2c45fe49><img${ssrRenderAttr("src", lightboxUrl.value)} class="chat-lightbox__img" alt="attachment" data-v-2c45fe49></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/pages/Customers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Customers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c45fe49"]]);
export {
  Customers as default
};
