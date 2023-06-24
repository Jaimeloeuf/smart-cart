<script setup lang="ts">
import { useRoute } from "vue-router";
import { HomeRoute, InventoryRoute, ToBuyRoute } from "../../router";

const route = useRoute();
</script>

<template>
  <div
    v-show="route.meta.showNavBar"
    class="fixed bottom-0 left-0 h-16 w-full border-t border-gray-200 bg-white"
  >
    <div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
      <router-link
        :to="{ name: HomeRoute.name }"
        class="group inline-flex flex-col items-center justify-center px-5"
      >
        <!--
          Have to use v-show to toggle instead of v-if to prevent image loading
          lag during toggles, as v-show only hides when unused and loads it on
          first load, so there should be no image loading lag.
        -->
        <img
          v-show="route.name === HomeRoute.name"
          src="../../assets/navbar-icons/home-active.svg"
        />
        <img
          v-show="route.name !== HomeRoute.name"
          src="../../assets/navbar-icons/home.svg"
        />

        <span class="text-sm text-gray-500">Home</span>
      </router-link>

      <router-link
        :to="{ name: InventoryRoute.name }"
        class="group inline-flex flex-col items-center justify-center px-5"
      >
        <!--
          Have to use v-show to toggle instead of v-if to prevent image loading
          lag during toggles, as v-show only hides when unused and loads it on
          first load, so there should be no image loading lag.
        -->
        <img
          v-show="route.name === InventoryRoute.name"
          src="../../assets/navbar-icons/inventory-active.svg"
        />
        <img
          v-show="route.name !== InventoryRoute.name"
          src="../../assets/navbar-icons/inventory.svg"
        />

        <span class="text-sm text-gray-500">Inventory</span>
      </router-link>

      <router-link
        :to="{ name: ToBuyRoute.name }"
        class="group inline-flex flex-col items-center justify-center px-5"
      >
        <!--
          Have to use v-show to toggle instead of v-if to prevent image loading
          lag during toggles, as v-show only hides when unused and loads it on
          first load, so there should be no image loading lag.
        -->
        <img
          v-show="route.name === ToBuyRoute.name"
          src="../../assets/navbar-icons/cart-active.svg"
        />
        <img
          v-show="route.name !== ToBuyRoute.name"
          src="../../assets/navbar-icons/cart.svg"
        />

        <span class="text-sm text-gray-500">Cart</span>
      </router-link>
    </div>
  </div>
</template>
