<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { AddItemRoute } from "../../../router";
import { useGroup, useItem } from "../../../store";
import { useSearch } from "../../../composable/Search";
import InventoryCard from "./InventoryCard.vue";
import BurgerMenu from "../../components/SideDrawer.vue";

const router = useRouter();
const groupStore = useGroup();
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
    <div class="mb-3">
      <BurgerMenu /><span class="ml-4 text-3xl">
        {{ groupStore.currentGroup.name }}
      </span>
    </div>

    <div class="relative mb-6">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5 text-gray-500"
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
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900"
        placeholder="Search by item name"
        required
      />

      <button
        class="absolute bottom-2.5 right-2.5 rounded-lg bg-gray-400 px-4 py-2 text-sm font-medium text-white"
        @click="clearSearchInput"
      >
        clear
      </button>
    </div>

    <div class="mb-2 ml-3 text-xl">
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

    <!-- Extra padding after last item shown so that users can scroll past the FAB -->
    <br class="my-24" />

    <button
      class="z-90 fixed bottom-20 right-8 h-14 w-14 rounded-full bg-blue-500 p-0 shadow"
      @click="router.push({ name: AddItemRoute.name })"
    >
      <svg
        viewBox="0 0 20 20"
        enable-background="new 0 0 20 20"
        class="inline-block h-6 w-6"
      >
        <path
          fill="#FFFFFF"
          d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
        />
      </svg>
    </button>
  </div>
</template>
