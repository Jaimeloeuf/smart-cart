<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useItem, useMisc } from "../../../store";
import { InventoryRoute } from "../../../router";
import { useSuggest } from "../../../composable/Suggest";

const router = useRouter();
const itemStore = useItem();
const miscStore = useMisc();

const quantity = ref<number>(1);
const selectedCategory = ref<(typeof miscStore.categories)[number]>(
  miscStore.categories[0] ?? "None"
);
const selectedUnit = ref<(typeof miscStore.units)[number]>(
  miscStore.units[0] ?? "unit"
);
const purchaseDate = ref<string>("");
const expiryDate = ref<string>("");

const { searchInput, results, hideDropDown, selectSuggestion } = useSuggest(
  itemStore.itemsArray,
  {
    keys: ["name"],
    threshold: 0.5,
    resultLimit: 10,
  }
);

async function addItem() {
  await itemStore.addItem({
    name: searchInput.value,
    category: selectedCategory.value,
    quantity: quantity.value,
    unit: selectedUnit.value,
    purchaseDate: purchaseDate.value,
    expiry: expiryDate.value,
  });

  router.push({ name: InventoryRoute.name });
}

function cancel() {
  if (!confirm("Cancel?")) return;

  router.push({ name: InventoryRoute.name });
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
    <div class="flex">
      <input
        v-model="searchInput"
        type="text"
        class="block w-full min-w-0 flex-1 rounded-none rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
        placeholder="E.g. Apples"
      />

      <span
        class="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900"
      >
        scan receipt
      </span>
    </div>

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
      Category
    </label>
    <select
      v-model="selectedCategory"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
    >
      <option
        v-for="category in miscStore.categories"
        :key="category"
        :value="category"
        :selected="selectedCategory === category"
      >
        {{ category }}
      </option>
    </select>

    <br />

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Quantity
    </label>
    <div class="flex flex-row space-x-4">
      <input
        v-model="quantity"
        type="number"
        class="block min-w-0 flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
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

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Purchase Date
    </label>
    <input
      v-model="purchaseDate"
      type="date"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
    />

    <br />
    <br />

    <label class="mb-2 block text-sm font-medium text-gray-900">
      Expiry Date
    </label>
    <input
      v-model="expiryDate"
      type="date"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
    />

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
        @click="addItem"
      >
        add
      </button>
    </div>
  </div>
</template>
