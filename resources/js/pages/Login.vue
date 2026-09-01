<template>
  <div class="auth-card">
    <h1 class="auth-card__title">Sign in</h1>
    <p class="auth-card__subtitle">Enter your credentials to access the dashboard.</p>

    <form @submit.prevent="submit">
      <FormField
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        :error="form.errors.email"
      />
      <FormField
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="••••••••"
        :error="form.errors.password"
      />

      <button type="submit" class="ui-btn ui-btn--primary ui-btn--block" :disabled="form.processing">
        {{ form.processing ? "Signing in…" : "Sign in" }}
      </button>
    </form>

    <div class="auth-card__footer">
      <Link href="/forgot-password">Forgot password?</Link>
      <span> · </span>
      <Link href="/register">Create account</Link>
    </div>
  </div>
</template>

<script setup>
import { Link, useForm } from "@inertiajs/vue3";
import LoginLayout from "../layouts/LoginLayout.vue";
import FormField from "../components/ui/FormField.vue";

defineOptions({ layout: LoginLayout });

const form = useForm({ email: "", password: "" });

const submit = () => {
  form.post("/login", {
    onFinish: () => form.reset("password"),
  });
};
</script>
