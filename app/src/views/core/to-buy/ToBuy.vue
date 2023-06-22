<script setup lang="ts">
import { ref } from "vue";
import { useSearch } from "../../../composable/Search";
import { useItem } from "../../../store";
import InventoryCard from "./ToBuyCard.vue";

const itemStore = useItem();

/** Ref to the DOM element so that it can be cleared by `clearSearchInputHandler` */
const searchField = ref<HTMLInputElement | null>(null);

const { searchInput, results, clearSearchInput } = useSearch(
  itemStore.itemsArray,
  { keys: ["name"], threshold: 0.5, resultLimit: 10 },
  () => searchField.value?.focus()
);
</script>

<template>
  <div>
    <div class="mb-2 text-3xl">Tan Family</div>

    <div class="relative mb-6">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <input
        ref="searchField"
        v-model="searchInput"
        type="search"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Search by item name"
        required
      />

      <button
        class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="clearSearchInput"
      >
        clear
      </button>
    </div>

    <div class="ml-6 text-xl">
      <template v-if="searchInput === ''">
        {{ itemStore.itemsArray.length }}
      </template>
      <template v-else>
        {{ results.length }}
      </template>
      items
    </div>

    <!-- Show all items if user did not search for anything -->
    <template v-if="searchInput === ''">
      <template v-for="item in itemStore.itemsArray" :key="item.id">
        <InventoryCard :item="item" />
      </template>
    </template>

    <template v-else-if="results.length === 0">
      <p class="text-2xl">Nothing matched your input</p>
    </template>

    <!-- Search results -->
    <template v-else>
      <template v-for="{ item } in results" :key="item.id">
        <InventoryCard :item="item" />
      </template>
    </template>
  </div>
</template>
