<script setup lang="ts">
import { ItemDetailRoute, AddBatchRoute } from "../../../router";
import type { Item } from "../../../types";
import DaysLeftPill from "./DaysLeftPill.vue";

defineProps<{ item: Item }>();
</script>

<template>
  <router-link
    :to="{ name: ItemDetailRoute.name, params: { itemID: item.id } }"
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
          <DaysLeftPill :expiryDate="batch.expiry" />
        </p>
      </template>

      <template v-else>
        <p
          v-for="(batch, i) in item.batches"
          :key="i"
          class="mt-2 text-gray-700"
        >
          --- Batch {{ i + 1 }}: {{ batch.quantity }} {{ batch.unit }}
          <DaysLeftPill :expiryDate="batch.expiry" />
        </p>
      </template>

      <router-link
        :to="{ name: AddBatchRoute.name, params: { itemID: item.id } }"
        class="w-fit pt-4 font-medium text-blue-500"
      >
        + New Batch
      </router-link>
    </div>
  </router-link>
</template>
