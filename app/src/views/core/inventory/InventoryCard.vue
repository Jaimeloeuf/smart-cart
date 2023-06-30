<script setup lang="ts">
import { ItemDetailRoute, AddBatchRoute } from "../../../router";
import type { Item } from "../../../types";
import DaysLeftPill from "./DaysLeftPill.vue";

defineProps<{ item: Item }>();
</script>

<template>
  <router-link
    :to="{ name: ItemDetailRoute.name, params: { itemID: item.id } }"
    class="m-3 flex flex-row items-center justify-between border-b border-gray-300 pb-3"
  >
    <div class="flex flex-col">
      <h5 class="text-xl text-gray-800">
        {{ item.name }}
      </h5>

      <template v-if="item.batches.length === 0">
        <p class="font-extralight text-gray-600">
          Nothing left, click to add a new batch!
        </p>
      </template>

      <template v-else-if="item.batches.length === 1">
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
          Batch {{ i + 1 }}: {{ batch.quantity }} {{ batch.unit }}
          <DaysLeftPill :expiryDate="batch.expiry" />
        </p>
      </template>

      <router-link
        :to="{ name: AddBatchRoute.name, params: { itemID: item.id } }"
        class="w-fit pt-4 font-medium text-primary-dark"
      >
        + New Batch
      </router-link>
    </div>

    <div>
      <svg
        class="m-0 inline-block h-5 w-3 p-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.58525 13.723L7.79722 7.51715C7.87096 7.44327 7.92331 7.36324 7.95427 7.27705C7.98524 7.19085 8.00048 7.09851 7.99999 7C7.99999 6.9015 7.98475 6.80915 7.95427 6.72296C7.9238 6.63676 7.87145 6.55673 7.79722 6.48285L1.58525 0.258575C1.41321 0.0861917 1.19815 0 0.940091 0C0.682026 0 0.460829 0.0923483 0.276497 0.277045C0.0921659 0.461741 0 0.677221 0 0.923483C0 1.16974 0.0921659 1.38522 0.276497 1.56992L5.69584 7L0.276497 12.4301C0.104455 12.6025 0.0184326 12.815 0.0184326 13.0677C0.0184326 13.3203 0.110599 13.5388 0.29493 13.723C0.479261 13.9077 0.694315 14 0.940091 14C1.18587 14 1.40092 13.9077 1.58525 13.723Z"
          fill="black"
        />
      </svg>
    </div>
  </router-link>
</template>
