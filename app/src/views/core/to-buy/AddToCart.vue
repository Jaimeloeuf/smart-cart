<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCart, useItem, useMisc, useNotif } from "../../../store";
import { ToBuyRoute, CartItemDetailRoute } from "../../../router";
import { useSuggest } from "../../../composable/Suggest";

const router = useRouter();
const cartStore = useCart();
const itemStore = useItem();
const miscStore = useMisc();
const notifStore = useNotif();

const quantity = ref<number>(1);
const selectedUnit = ref<(typeof miscStore.units)[number]>(
  miscStore.units[0] ?? "unit"
);

const { searchInput, results, hideDropDown, selectSuggestion } = useSuggest(
  // Combines both existing cart items and inventory items for suggestion.
  [...cartStore.cartArray, ...itemStore.itemsArray],
  {
    keys: ["name"],
    threshold: 0.5,
    resultLimit: 10,
  },

  undefined,

  // Function that runs on user clicking a suggested item name.
  // Will redirect user to the cart item detail view if item already exists in cart.
  function (selectedSuggestion: string) {
    // Check if the selected item name suggestion is an existing item
    const existingItem = cartStore.cartArray.find(
      (cartItem) => cartItem.name === selectedSuggestion
    );

    if (existingItem !== undefined) {
      // Show snackbar notification to let user know about the redirect reason.
      notifStore.setSnackbar("Note: You have this item in your cart");

      router.push({
        name: CartItemDetailRoute.name,
        params: { cartItemID: existingItem.id },
      });
    }
    // If it is not an item in cart, then the suggestion must have came from inventory.
    else {
      notifStore.setSnackbar("Note: You have this item in inventory!");
    }
  }
);

async function addToCart() {
  if (searchInput.value === "") return alert("Please enter a valid item name.");

  // @todo Include links to the uploaded images

  await cartStore.addToCart({
    name: searchInput.value,
    quantity: quantity.value,
    unit: selectedUnit.value,
  });

  router.push({ name: ToBuyRoute.name });
}

function cancel() {
  if (!confirm("Cancel?")) return;
  router.push({ name: ToBuyRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-row justify-center text-center">
      <button @click="cancel">Cancel</button>
      <p class="grow text-xl">New Item</p>
      <button @click="addToCart">Save</button>
    </div>

    <label class="mb-2 mt-8 block font-medium text-blue-500">Item Name*</label>
    <input
      v-model="searchInput"
      type="text"
      class="block w-full rounded-lg border border-blue-200 p-2.5 text-gray-900"
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

    <label class="mb-2 block font-medium text-blue-500">Quantity</label>
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

    <label for="image-upload">
      <label class="mb-2 block font-medium text-blue-500">Image</label>

      <div
        class="w-full rounded-lg border border-gray-300 bg-blue-500 p-2.5 text-center text-white"
      >
        Upload
        <input id="image-upload" type="file" class="hidden" />
      </div>
    </label>
  </div>

  <div class="mt-8 text-blue-500">*Compulsory field</div>
</template>
