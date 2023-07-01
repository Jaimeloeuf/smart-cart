<script setup lang="ts">
import { LoginRoute } from "../../router";
</script>

<template>
  <div>
    <!-- @todo Temporary hack using negative margins to fix the expanded svg issue -->
    <div
      class="-my-20 flex h-screen w-full flex-col items-center justify-center"
    >
      <img src="../../assets/logo.svg" />
      <p class="-mt-20 font-light">Manage Groceries to Reduce Food Waste</p>

      <router-link
        :to="{ name: LoginRoute.name }"
        class="mt-36 w-full rounded-lg bg-primary-dark p-3.5 text-center font-medium text-white"
      >
        Get Started
      </router-link>
    </div>
  </div>
</template>
