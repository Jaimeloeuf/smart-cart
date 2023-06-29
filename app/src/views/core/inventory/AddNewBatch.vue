<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useItem, useMisc } from "../../../store";
import { InventoryRoute } from "../../../router";

const props = defineProps<{ itemID: string }>();

const router = useRouter();
const itemStore = useItem();
const miscStore = useMisc();

const item = itemStore.getItem(props.itemID);

const quantity = ref<number>(1);
const selectedUnit = ref<(typeof miscStore.units)[number]>(
  miscStore.units[0] ?? "unit"
);
const purchaseDate = ref<string>("");
const expiryDate = ref<string>("");

async function save() {
  await itemStore.addBatch(item.id, {
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
    <div class="mb-6 flex flex-row justify-center text-center">
      <button @click="cancel">Cancel</button>
      <p class="grow text-2xl font-light">New Batch</p>
      <button @click="save">Save</button>
    </div>

    <div class="mb-6">
      <p class="text-lg text-primary-dark">Item*</p>
      <p>{{ item.name }}</p>
    </div>

    <div class="mb-6">
      <p class="text-lg text-primary-dark">Category</p>
      <p>{{ item.category }}</p>
    </div>

    <div class="mb-6">
      <p class="text-lg text-primary-dark">Quantity</p>
      <div class="flex flex-row space-x-4">
        <input
          v-model="quantity"
          type="number"
          class="block min-w-0 flex-1 rounded-lg border border-gray-300 p-2.5 text-gray-900"
        />

        <select
          v-model="selectedUnit"
          class="block flex-1 rounded-lg border border-gray-300 bg-primary-bg p-2.5 text-gray-900"
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
    </div>

    <div class="mb-6">
      <p class="text-lg text-primary-dark">Purchase Date</p>
      <input
        v-model="purchaseDate"
        type="date"
        class="w-full appearance-none rounded-lg border border-gray-300 bg-primary-bg p-2.5 text-gray-900"
      />
    </div>

    <div>
      <p class="text-lg text-primary-dark">Expiry Date</p>
      <input
        v-model="expiryDate"
        type="date"
        class="w-full appearance-none rounded-lg border border-gray-300 bg-primary-bg p-2.5 text-gray-900"
      />
    </div>
  </div>

  <div class="mt-8 text-primary-dark">*Compulsory field</div>
</template>
