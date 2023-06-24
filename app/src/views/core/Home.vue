<script setup lang="ts">
import { useGroup } from "../../store";
import BurgerMenu from "../components/SideDrawer.vue";

const groupStore = useGroup();
</script>

<template>
  <div class="mb-3">
    <BurgerMenu /><span class="ml-4 text-3xl">
      {{ groupStore.currentGroup.name }}
    </span>
  </div>
</template>
