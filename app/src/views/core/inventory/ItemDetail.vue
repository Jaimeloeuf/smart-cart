<script setup lang="ts">
import { useRouter } from "vue-router";
import { useItem } from "../../../store";
import { InventoryRoute, EditInventoryItemRoute } from "../../../router";
import { numberOfDaysFromToday } from "../../../utils/numberOfDaysFromToday";
import { getDateString } from "../../../utils/getDateString";

const props = defineProps<{ itemID: string }>();

const router = useRouter();
const itemStore = useItem();

const item = itemStore.getItem(props.itemID);

async function deleteItem() {
  await itemStore.deleteItem(item.id);
  router.push({ name: InventoryRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-row justify-center text-center">
      <router-link :to="{ name: InventoryRoute.name }">Back</router-link>
      <p class="grow text-xl">Details</p>
      <router-link
        :to="{ name: EditInventoryItemRoute.name, params: { itemID: item.id } }"
      >
        Edit
      </router-link>
    </div>

    <div class="mb-2 flex flex-row">
      <p class="grow text-primary-dark">Item</p>
      <p class="font-light">{{ item.name }}</p>
    </div>

    <div class="mb-2 flex flex-row">
      <p class="grow text-primary-dark">Category</p>
      <p class="font-light">{{ item.category }}</p>
    </div>

    <div v-for="(batch, i) in item.batches" :key="i">
      <div class="relative flex items-center py-5">
        <div class="flex-grow border-t"></div>
        <span class="mx-4 flex-shrink font-thin">Batch {{ i + 1 }}</span>
        <div class="flex-grow border-t"></div>
      </div>

      <div class="flex flex-row justify-between">
        <div>Quantity</div>
        <div>{{ batch.quantity }} {{ batch.unit }}</div>
      </div>

      <div class="flex flex-row justify-between">
        <div>Purchase</div>
        <div>{{ getDateString(batch.purchaseDate) }}</div>
      </div>

      <div class="flex flex-row justify-between">
        <div>Expiry</div>
        <div>{{ numberOfDaysFromToday(batch.expiry) }} day</div>
      </div>

      <div class="mt-3 flex flex-row space-x-6">
        <button
          class="w-full flex-grow rounded-lg border border-primary-dark p-3.5 font-medium text-primary-dark"
          @click="itemStore.throwBatch(item.id, batch.id)"
        >
          <svg
            class="m-0 inline-block h-5 w-6 p-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0H1.23077C0.551034 0 0 0.551034 0 1.23077V1.84615C0 2.52589 0.551034 3.07692 1.23077 3.07692H16C16.6797 3.07692 17.2308 2.52589 17.2308 1.84615V1.23077C17.2308 0.551034 16.6797 0 16 0Z"
              fill="#45719E"
            />
            <path
              d="M1.6326 4.30762C1.58936 4.30739 1.54655 4.31627 1.50698 4.33369C1.4674 4.35111 1.43194 4.37668 1.40291 4.40872C1.37388 4.44076 1.35193 4.47857 1.33849 4.51966C1.32504 4.56076 1.32042 4.60423 1.3249 4.64724L2.33683 14.3611C2.33662 14.3639 2.33662 14.3667 2.33683 14.3695C2.3897 14.8188 2.6057 15.2331 2.94383 15.5336C3.28195 15.8342 3.71866 16.0001 4.17106 15.9999H13.0591C13.5114 15.9999 13.9479 15.8339 14.2859 15.5334C14.6238 15.2328 14.8397 14.8187 14.8926 14.3695V14.3615L15.903 4.64724C15.9075 4.60423 15.9028 4.56076 15.8894 4.51966C15.876 4.47857 15.854 4.44076 15.825 4.40872C15.7959 4.37668 15.7605 4.35111 15.7209 4.33369C15.6813 4.31627 15.6385 4.30739 15.5953 4.30762H1.6326ZM11.2041 11.2572C11.2626 11.3141 11.3093 11.382 11.3413 11.457C11.3733 11.532 11.3901 11.6127 11.3907 11.6942C11.3912 11.7758 11.3756 11.8567 11.3446 11.9321C11.3137 12.0076 11.268 12.0762 11.2103 12.1338C11.1527 12.1915 11.0841 12.2371 11.0086 12.268C10.9331 12.299 10.8522 12.3146 10.7707 12.314C10.6891 12.3133 10.6085 12.2965 10.5335 12.2645C10.4585 12.2324 10.3906 12.1858 10.3337 12.1272L8.61529 10.4088L6.89644 12.1272C6.7805 12.2399 6.62489 12.3024 6.46324 12.3012C6.3016 12.3001 6.14689 12.2354 6.03256 12.1211C5.91823 12.0068 5.85346 11.8522 5.85224 11.6905C5.85102 11.5289 5.91346 11.3732 6.02606 11.2572L7.7449 9.53839L6.02606 7.81954C5.91346 7.70356 5.85102 7.54792 5.85224 7.38627C5.85346 7.22462 5.91823 7.06995 6.03256 6.95567C6.14689 6.84139 6.3016 6.77668 6.46324 6.77554C6.62489 6.77439 6.7805 6.8369 6.89644 6.94954L8.61529 8.668L10.3337 6.94954C10.4497 6.8369 10.6053 6.77439 10.7669 6.77554C10.9286 6.77668 11.0833 6.84139 11.1976 6.95567C11.312 7.06995 11.3767 7.22462 11.3779 7.38627C11.3792 7.54792 11.3167 7.70356 11.2041 7.81954L9.48529 9.53839L11.2041 11.2572Z"
              fill="#45719E"
            />
          </svg>

          Throw
        </button>
        <button
          class="w-full flex-grow rounded-lg bg-primary-dark p-3.5 font-medium text-white"
          @click="itemStore.finishBatch(item.id, batch.id)"
        >
          <svg
            class="m-0 inline-block h-5 w-6 p-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8ZM7.54347 11.424L12.1493 5.66613L11.3173 5.00053L7.38987 9.90827L4.608 7.5904L3.92533 8.4096L7.54347 11.4251V11.424Z"
              fill="white"
            />
          </svg>

          Finished
        </button>
      </div>
    </div>

    <button class="mb-8 mt-6 w-full text-red-700" @click="deleteItem">
      <p class="text-center">Delete Item</p>
    </button>
  </div>
</template>
