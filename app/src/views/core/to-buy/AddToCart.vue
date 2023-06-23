<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useItem } from "../../../store";
import { ToBuyRoute } from "../../../router";
import { useSearch } from "../../../composable/Search";

const router = useRouter();
const itemStore = useItem();

/** Ref to the DOM element so that it can be cleared by `clearSearchInputHandler` */
const searchField = ref<HTMLInputElement | null>(null);

const { searchInput, results } = useSearch(
  itemStore.itemsArray,
  { keys: ["name"], threshold: 0.5, resultLimit: 10 },
  () => searchField.value?.focus()
);

function cancel() {
  router.push({
    name: ToBuyRoute.name,
  });
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row">
      <p class="grow text-3xl">New Item</p>

      <button
        class="rounded-lg bg-gray-400 px-5 py-2.5 text-sm font-medium text-white"
        @click="cancel"
      >
        cancel
      </button>
    </div>

    <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
      Item Name
    </label>
    <!-- @todo Auto suggest as they type -->
    <input
      v-model="searchInput"
      type="text"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
      placeholder="E.g. Apples"
    />

    <br />

    <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
      Quantity
    </label>
    <div class="flex flex-row space-x-4">
      <input
        type="text"
        class="block min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
        value="1"
      />

      <select
        class="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
      >
        <option selected>Unit</option>
        <option value="OT">Bag</option>
      </select>
    </div>

    <br />

    <label for="image-upload">
      <div
        class="w-full rounded-lg border border-gray-300 bg-blue-500 p-2.5 text-center text-white"
      >
        Upload Image
        <input id="image-upload" type="file" class="hidden" />
      </div>
    </label>

    <br />
    <br />

    <div class="flex flex-row space-x-2">
      <button
        class="rounded-lg bg-gray-400 px-5 py-2.5 text-sm font-medium text-white"
        @click="cancel"
      >
        cancel
      </button>

      <button
        class="grow rounded-lg bg-green-500 px-5 py-2.5 text-sm font-medium text-white"
      >
        save
      </button>
    </div>
  </div>
</template>
