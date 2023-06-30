<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { StartRoute, OTPRoute } from "../../../router";

const router = useRouter();
const phone = ref<number | undefined>(undefined);

function next() {
  const phoneNumber = parseInt(phone.value?.toString() ?? "");
  if (!Number.isInteger(phoneNumber))
    return alert("Please enter a valid phone number!");

  router.push({ name: OTPRoute.name, params: { phoneNumber } });
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row justify-center text-center">
      <router-link :to="{ name: StartRoute.name }">Back</router-link>
      <p class="grow text-2xl font-light">Log In</p>
      <button @click="next">Next</button>
    </div>

    <label class="mb-2 mt-8 block font-medium text-primary-dark">
      Phone Number
    </label>
    <div class="flex">
      <span
        class="inline-flex items-center rounded-l-md border border-r-0 border-primary-light bg-gray-50 px-3 text-2xl"
      >
        🇸🇬
      </span>

      <input
        v-model="phone"
        type="tel"
        class="w-full flex-1 rounded-lg rounded-l-none border border-primary-light p-2.5 text-2xl font-light"
        @keydown.enter="next"
      />
    </div>
  </div>
</template>
