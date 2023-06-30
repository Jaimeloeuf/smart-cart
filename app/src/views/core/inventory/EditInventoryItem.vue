<script setup lang="ts">
import { reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import { useItem, useMisc, useNotif } from "../../../store";
import { ItemDetailRoute } from "../../../router";
// import { numberOfDaysFromToday } from "../../../utils/numberOfDaysFromToday";

const props = defineProps<{ itemID: string }>();

const router = useRouter();
const itemStore = useItem();
const miscStore = useMisc();
const notifStore = useNotif();

const originalItem = itemStore.getItem(props.itemID);

const item = reactive(structuredClone(toRaw(originalItem)));

// Convert ISODateTime strings into yyyy-mm-dd expected by input[type="date"]
item.batches.forEach((batch) => {
  batch.purchaseDate = batch.purchaseDate.substring(0, 10);
  batch.expiry = batch.expiry.substring(0, 10);
});

async function updateItem() {
  // Convert yyyy-mm-dd strings used by input[type="date"] into ISODateTime strings
  // @todo tmp hack
  // This will cause warnings to be shown since the format is changed and the
  // HTML element will complain, but should be fine since it redirects away soon.
  item.batches.forEach((batch) => {
    batch.purchaseDate = new Date(batch.purchaseDate).toISOString();
    batch.expiry = new Date(batch.expiry).toISOString();
  });

  await itemStore.updateItem(item);

  notifStore.setSnackbar("Item updated!");
  router.push({ name: ItemDetailRoute.name, params: { itemID: props.itemID } });
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-row justify-center text-center">
      <button @click="router.back">Back</button>
      <p class="grow text-xl">Edit</p>
      <button @click="updateItem">Save</button>
    </div>

    <div class="mb-4">
      <label class="block font-medium text-primary-dark">Item Name*</label>
      <input
        v-model="item.name"
        type="text"
        class="block w-full rounded-lg border border-primary-light p-2.5 text-gray-900"
        placeholder="E.g. Apples"
      />
    </div>

    <div class="mb-4">
      <label class="block font-medium text-primary-dark">Category</label>
      <select
        v-model="item.category"
        class="block w-full appearance-none rounded-lg bg-primary-bg p-2.5 text-gray-900"
      >
        <option
          v-for="category in miscStore.categories"
          :key="category"
          :value="category"
          :selected="item.category === category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <div v-for="(batch, i) in item.batches" :key="i">
      <div class="relative flex items-center py-5">
        <div class="flex-grow border-t"></div>
        <span class="mx-4 flex-shrink font-thin">Batch {{ i + 1 }}</span>
        <div class="flex-grow border-t"></div>
      </div>

      <label class="mb-6 block font-medium text-primary-dark">
        Quantity

        <div class="flex flex-row space-x-4">
          <input
            v-model="batch.quantity"
            type="number"
            class="block min-w-0 flex-1 rounded-lg border border-primary-light p-2.5 text-gray-900"
          />

          <select
            v-model="batch.unit"
            class="block flex-1 rounded-lg bg-primary-bg p-2.5 text-gray-900"
          >
            <option
              v-for="unit in miscStore.units"
              :key="unit"
              :value="unit"
              :selected="batch.unit === unit"
            >
              {{ unit }}
            </option>
          </select>
        </div>
      </label>

      <div class="mb-6">
        <label class="font-medium text-primary-dark">Purchase Date</label>
        <input
          v-model="batch.purchaseDate"
          type="date"
          class="w-full appearance-none rounded-lg bg-primary-bg p-3 text-gray-900"
        />
      </div>

      <div class="mb-6">
        <label class="font-medium text-primary-dark">Expiry Date</label>
        <input
          v-model="batch.expiry"
          type="date"
          class="w-full appearance-none rounded-lg bg-primary-bg p-3 text-gray-900"
        />
      </div>
    </div>

    <div class="mt-12 text-primary-dark">*Compulsory field</div>
  </div>
</template>
