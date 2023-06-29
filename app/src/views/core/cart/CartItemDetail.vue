<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCart, useItem } from "../../../store";
import {
  CartRoute,
  EditCartItemRoute,
  AddItemRoute,
  AddBatchRoute,
} from "../../../router";

const props = defineProps<{ cartItemID: string }>();

const router = useRouter();
const cartStore = useCart();
const itemStore = useItem();

const item = cartStore.getItem(props.cartItemID);

/**
 * Transfer to inventory will do 1 of two things.
 *
 * 1. if cart item is an existing item in inventory, this will add a new batch
 * where they just add in purchase date + expiry date.
 *
 * 2. if cart item is not an existing item in inventory, this will add a new
 * ITEM to inventory. Where I would need to ask for all the details except name
 * + quantity/unit.
 */
function transferToInventory() {
  const existsInInventory = itemStore.itemsArray.find(
    (inventoryItem) => inventoryItem.name === item.name
  );

  // Add a new batch if item already exists in inventory
  if (existsInInventory !== undefined)
    router.push({
      name: AddBatchRoute.name,
      params: { itemID: existsInInventory.id },
      query: { defaultQuantity: item.quantity, defaultUnit: item.unit },
    });
  else
    router.push({
      name: AddItemRoute.name,
      query: {
        defaultName: item.name,
        defaultQuantity: item.quantity,
        defaultUnit: item.unit,
      },
    });

  // Fire and forget to let this run in the background
  cartStore.removeItem(item.id);
}

function deleteItem() {
  // Fire and forget to let this run in the background
  cartStore.removeItem(item.id);

  router.push({ name: CartRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-row justify-center text-center">
      <router-link :to="{ name: CartRoute.name }">Back</router-link>
      <p class="grow text-xl">Details</p>
      <router-link :to="{ name: EditCartItemRoute.name }">Edit</router-link>
    </div>

    <div class="mb-2 flex flex-row text-xl">
      <p class="grow text-primary-dark">Item</p>
      <p class="font-light">{{ item.name }}</p>
    </div>

    <div class="mb-6 flex flex-row text-xl">
      <p class="grow text-primary-dark">Quantity</p>
      <p class="font-light">{{ item.quantity }} {{ item.unit }}</p>
    </div>

    <div class="mb-6 flex flex-row flex-nowrap overflow-x-scroll">
      <img
        v-for="(imageLink, i) in item.images"
        :key="i"
        :src="imageLink"
        class="aspect-square w-2/5 object-cover"
      />
    </div>

    <button
      class="mb-4 w-full rounded-lg border border-primary-dark p-3.5 font-medium text-primary-dark"
      @click="transferToInventory"
    >
      <svg
        class="m-0 inline-block h-3 w-3 p-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.93982 9.76292C6.85248 9.85027 6.74878 9.91956 6.63466 9.96683C6.52054 10.0141 6.39822 10.0384 6.2747 10.0384C6.15117 10.0384 6.02886 10.0141 5.91474 9.96683C5.80061 9.91956 5.69692 9.85027 5.60957 9.76292C5.52223 9.67558 5.45294 9.57189 5.40567 9.45776C5.3584 9.34364 5.33407 9.22133 5.33407 9.0978C5.33407 8.97428 5.3584 8.85196 5.40567 8.73784C5.45294 8.62372 5.52223 8.52002 5.60957 8.43268L8.08057 5.96043L0.941161 5.96043C0.691536 5.96043 0.452136 5.86126 0.275624 5.68475C0.0991125 5.50824 -5.14984e-05 5.26884 -5.14984e-05 5.01921C-5.14984e-05 4.76959 0.0991125 4.53019 0.275624 4.35368C0.452136 4.17716 0.691536 4.078 0.941161 4.078L8.08057 4.078L5.60957 1.60575C5.52223 1.51841 5.45294 1.41471 5.40567 1.30059C5.3584 1.18647 5.33407 1.06415 5.33407 0.940627C5.33407 0.817102 5.3584 0.694787 5.40567 0.580665C5.45294 0.466542 5.52223 0.362848 5.60957 0.275503C5.69692 0.188158 5.80061 0.118872 5.91474 0.0716012C6.02886 0.0243303 6.15117 -9.20333e-10 6.2747 0C6.39822 9.2033e-10 6.52054 0.0243303 6.63466 0.0716012C6.74878 0.118872 6.85248 0.188158 6.93982 0.275503L11.0184 4.35409C11.1058 4.44139 11.1752 4.54507 11.2225 4.6592C11.2698 4.77333 11.2942 4.89566 11.2942 5.01921C11.2942 5.14276 11.2698 5.2651 11.2225 5.37923C11.1752 5.49336 11.1058 5.59704 11.0184 5.68434L6.93982 9.76292Z"
          fill="#45719E"
        />
      </svg>
      Transfer to Inventory
    </button>

    <button class="fixed inset-x-0 bottom-10 text-red-600" @click="deleteItem">
      Delete Item
    </button>
  </div>
</template>
