<script setup lang="ts">
import { useRouter } from "vue-router";
import { useItem } from "../../../store";

const props = defineProps<{ itemID: string }>();

const router = useRouter();
const itemStore = useItem();

const item = itemStore.getItem(props.itemID);
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row">
      <p class="grow text-3xl">{{ item.name }}</p>

      <button
        class="rounded-lg bg-gray-100 px-5 py-2.5 text-sm"
        @click="router.back"
      >
        back
      </button>
    </div>

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Item Name
    </label>
    <div class="flex">
      <input
        type="text"
        class="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
        :value="item.name"
        disabled
      />
    </div>

    <br />

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Category
    </label>
    <div class="flex">
      <input
        type="text"
        class="block w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
        :value="item.category"
        disabled
      />
    </div>

    <br />

    <div v-for="(batch, i) in item.batches" :key="i">
      {{ batch }}
    </div>
  </div>
</template>
