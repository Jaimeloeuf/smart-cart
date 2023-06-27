<script setup lang="ts">
import { useRouter } from "vue-router";
import { useGroup } from "../../store";
import { HomeRoute, CreateGroupRoute } from "../../router";
import BurgerMenu from "../components/SideDrawer.vue";

// If there is already a current group set, then redirect to the Home view,
// as the Welcome view should only be shown to new users without any group.
// If the user already belong in groups but do not have a current group set,
// on app load it will just choose one group to be the current group.
if (useGroup().currentGroupID !== undefined) {
  useRouter().push({ name: HomeRoute.name });
}
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
