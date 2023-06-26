<script setup lang="ts">
import { CreateGroupRoute } from "../../router";
import BurgerMenu from "../components/SideDrawer.vue";
</script>

<template>
  <div>
    <div class="mb-3">
      <BurgerMenu /><span class="ml-4 font-Indie text-3xl">Hello!</span>
    </div>

    <div class="flex h-[70vh] w-full flex-col items-center justify-center">
      <img src="../../assets/welcome.svg" />
      <p class="font-light">Manage your groceries in a group</p>

      <!-- button for creating a new group -->
      <router-link :to="{ name: CreateGroupRoute.name }" class="mt-8">
        + New Group
      </router-link>
    </div>
  </div>
</template>
