<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { HomeRoute } from "../../../router";

const router = useRouter();
const name = ref<string>("");

function save() {
  if (name.value === "") return alert("Please enter a valid name!");
  router.push({ name: HomeRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row justify-center text-center">
      <span></span>
      <p class="ml-7 grow text-2xl font-light">Sign Up</p>
      <button @click="save">Save</button>
    </div>

    <label class="mb-2 mt-8 block font-medium text-gray-900 text-primary-dark">
      Name
    </label>
    <input
      v-model="name"
      type="text"
      class="block h-16 w-full rounded-lg border border-primary-light p-2.5 text-2xl text-gray-900"
      placeholder="Use a human name!"
    />
  </div>
</template>
