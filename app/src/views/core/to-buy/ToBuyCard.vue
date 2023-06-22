<script setup lang="ts">
import type { Item } from "../../../types/Item";

defineProps<{ item: Item }>();
</script>

<template>
  <!-- @todo Add router destination -->
  <router-link
    :to="{ name: '' }"
    class="mb-4 flex flex-row rounded-lg border border-gray-200 bg-white shadow"
  >
    <img
      class="h-full w-32 rounded-l-lg object-cover"
      src="https://static.libertyprim.com/files/familles/pomme-large.jpg"
    />

    <div class="flex flex-col p-6">
      <h5 class="text-xl font-medium text-gray-800">
        {{ item.name }}
      </h5>

      <p class="mt-2 text-gray-700">
        <!-- @todo -->
        Buy: {{ Math.round(Math.random() * 10) + 1 }}
      </p>
    </div>
  </router-link>
</template>
