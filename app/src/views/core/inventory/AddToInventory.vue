<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useItem, useMisc, useNotif } from "../../../store";
import { InventoryRoute, AddBatchRoute } from "../../../router";
import { useSuggest } from "../../../composable/Suggest";

const props = defineProps<{
  defaultName?: string;
  defaultQuantity?: string;
  defaultUnit?: string;
}>();

const router = useRouter();
const itemStore = useItem();
const miscStore = useMisc();
const notifStore = useNotif();

const quantity = ref<number>(
  props.defaultQuantity === undefined ? 1 : parseInt(props.defaultQuantity)
);
const selectedUnit = ref<(typeof miscStore.units)[number]>(
  props.defaultUnit ?? miscStore.units[0] ?? "unit"
);
const selectedCategory = ref<(typeof miscStore.categories)[number]>(
  miscStore.categories[0] ?? "None"
);
const purchaseDate = ref<string>("");
const expiryDate = ref<string>("");

const { searchInput, results, hideDropDown, selectSuggestion } = useSuggest(
  itemStore.itemsArray,
  {
    keys: ["name"],
    threshold: 0.5,
    resultLimit: 10,
  },

  undefined,

  // Function that runs on user clicking a suggested item name.
  // Will redirect user to the add new batch to inventory view if item already exists
  function (selectedSuggestion: string) {
    const inventoryItem = itemStore.itemsArray.find(
      (item) => item.name === selectedSuggestion
    );

    // This should not happen, but if it does not exists, just return
    if (inventoryItem === undefined) return;

    // Show snackbar notification to let user know about the redirect reason.
    notifStore.setSnackbar(
      "You have this item in your Inventory, add a new batch instead!",
      8
    );

    router.push({
      name: AddBatchRoute.name,
      params: { itemID: inventoryItem.id },
    });
  }
);

async function addItem() {
  await itemStore.addItem({
    name: props.defaultName ?? searchInput.value,
    category: selectedCategory.value,
    quantity: quantity.value,
    unit: selectedUnit.value,

    // Convert yyyy-mm-dd strings used by input[type="date"] into ISODateTime strings
    purchaseDate: new Date(purchaseDate.value).toISOString(),
    expiry: new Date(expiryDate.value).toISOString(),
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
    <div class="mb-8 flex flex-row justify-center text-center">
      <button @click="cancel">Cancel</button>
      <p class="grow text-xl">New Item</p>
      <button @click="addItem">Save</button>
    </div>

    <div
      class="w-full rounded-lg border bg-primary-dark p-3 text-center text-white"
    >
      <svg
        class="m-0 inline-block h-5 w-6 p-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 16C3.56 16 3.1832 15.8432 2.8696 15.5296C2.556 15.216 2.39947 14.8395 2.4 14.4V12H4V14.4H13.6V12H15.2V14.4C15.2 14.84 15.0432 15.2168 14.7296 15.5304C14.416 15.844 14.0395 16.0005 13.6 16H4ZM2.4 7.2V1.6C2.4 1.16 2.5568 0.783201 2.8704 0.469601C3.184 0.156001 3.56053 -0.000531975 4 1.35823e-06H10.4L15.2 4.8V7.2H13.6V5.6H9.6V1.6H4V7.2H2.4ZM0 10.4V8.8H17.6V10.4H0Z"
          fill="white"
        />
      </svg>

      Scan Receipt
      <input id="image-upload" type="file" class="hidden" />
    </div>

    <div class="my-6 flex items-center">
      <div class="h-px flex-grow bg-gray-400"></div>
      <span class="flex-shrink px-4 font-light"> OR </span>
      <div class="h-px flex-grow bg-gray-400"></div>
    </div>

    <label class="mb-2 block font-medium text-primary-dark">Item Name*</label>
    <template v-if="defaultName !== undefined">
      <input
        :value="defaultName"
        type="text"
        class="block w-full rounded-lg border border-primary-light p-2.5 text-gray-900"
        disabled
      />
    </template>
    <template v-else>
      <input
        v-model="searchInput"
        type="text"
        class="block w-full rounded-lg border border-primary-light p-2.5 text-gray-900"
        placeholder="E.g. Apples"
      />
    </template>

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

    <label class="mb-2 block font-medium text-primary-dark">Category</label>
    <select
      v-model="selectedCategory"
      class="block w-full appearance-none rounded-lg bg-primary-bg p-2.5 text-gray-900"
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

    <label class="mb-4 block font-medium text-primary-dark">
      Quantity

      <div class="flex flex-row space-x-4">
        <input
          v-model="quantity"
          type="number"
          class="block min-w-0 flex-1 rounded-lg border border-primary-light p-2.5 text-gray-900"
        />

        <select
          v-model="selectedUnit"
          class="block flex-1 rounded-lg bg-primary-bg p-2.5 text-gray-900"
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
    </label>

    <div class="mb-4">
      <label class="font-medium text-primary-dark">Purchase Date</label>
      <input
        v-model="purchaseDate"
        type="date"
        class="w-full appearance-none rounded-lg bg-primary-bg p-3 text-gray-900"
      />
    </div>

    <div class="mb-4">
      <label class="font-medium text-primary-dark">Expiry Date</label>
      <input
        v-model="expiryDate"
        type="date"
        class="w-full appearance-none rounded-lg bg-primary-bg p-3 text-gray-900"
      />
    </div>

    <div class="mt-6 text-primary-dark">*Compulsory field</div>
  </div>
</template>
