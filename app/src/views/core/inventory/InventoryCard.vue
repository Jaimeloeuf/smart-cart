<script setup lang="ts">
import { ItemDetailRoute } from "../../../router";
import type { Item } from "../../../types";

defineProps<{ item: Item }>();
</script>

<template>
  <router-link
    :to="{ name: ItemDetailRoute.name, params: { itemID: 1 } }"
    class="mb-4 flex flex-row rounded-lg border border-gray-200 bg-white p-6 shadow"
  >
    <div class="flex flex-col">
      <h5 class="text-xl font-medium text-gray-800">
        {{ item.name }}
      </h5>

      <template v-if="item.batches.length === 1">
        <p
          v-for="(batch, i) in item.batches"
          :key="i"
          class="mt-2 text-gray-700"
        >
          {{ batch.quantity }} {{ batch.unit }}
          <span class="ml-2 rounded-lg bg-red-600 p-1.5 text-sm text-white">
            <!-- @todo Calculate date difference -->
            3 days left
          </span>
        </p>
      </template>

      <template v-else>
        <p
          v-for="(batch, i) in item.batches"
          :key="i"
          class="mt-2 text-gray-700"
        >
          --- Batch {{ i + 1 }}: {{ batch.quantity }} {{ batch.unit }}
          <span class="ml-2 rounded-lg bg-red-600 p-1.5 text-sm text-white">
            <!-- @todo Calculate date difference -->
            3 days left
          </span>
        </p>
      </template>
    </div>
  </router-link>
</template>
