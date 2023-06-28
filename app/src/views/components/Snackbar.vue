<script setup lang="ts">
import { useNotif } from "../../store";

const notifStore = useNotif();
</script>

<template>
  <div
    class="fixed bottom-10 flex w-full max-w-sm items-center rounded-lg bg-gray-500 p-3 text-sm text-white shadow"
  >
    <div class="font-normal">{{ notifStore.snackBarMessage }}</div>
    <button
      type="button"
      class="whitespace-nowrap text-gray-50"
      @click="notifStore.hideSnackbar"
    >
      Got it
    </button>
  </div>
</template>
