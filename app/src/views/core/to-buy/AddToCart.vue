<script setup lang="ts">
import { useRouter } from "vue-router";
import { useItem, useMisc } from "../../../store";
import { ToBuyRoute } from "../../../router";
import { useSuggest } from "../../../composable/Suggest";

const router = useRouter();
const itemStore = useItem();
const miscStore = useMisc();

const selectedUnit = ref<(typeof miscStore.units)[number]>(
  miscStore.units[0] ?? "unit"
);

const { searchInput, results, hideDropDown, selectSuggestion } = useSuggest(
  itemStore.itemsArray,
  {
    keys: ["name"],
    threshold: 0.5,
    resultLimit: 10,
  }
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

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Item Name
    </label>
    <input
      v-model="searchInput"
      type="text"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
      placeholder="E.g. Apples"
    />

    <!-- Suggestion dropdown -->
    <div
      id="dropdown"
      class="h- z-10 w-full overflow-y-auto rounded-md border border-gray-300"
      :class="{ hidden: hideDropDown }"
    >
      <div
        v-for="{ item } in results"
        :key="item.id"
        class="border-b border-gray-200 px-5 py-3"
        @click="selectSuggestion(item.name)"
      >
        {{ item.name }}
      </div>
    </div>

    <br />

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Quantity
    </label>
    <div class="flex flex-row space-x-4">
      <input
        type="text"
        class="block min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
        value="1"
      />

      <select
        v-model="selectedUnit"
        class="block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
      >
        <option
          v-for="unit in miscStore.units"
          :key="unit"
          :value="unit"
          :selected="selectedUnit === unit"
        >
          {{ unit }}
        </option>
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
