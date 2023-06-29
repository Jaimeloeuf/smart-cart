<script setup lang="ts">
import { useNotif } from "../../store";

const notifStore = useNotif();
</script>

<template>
  <div class="fixed inset-x-0 bottom-10 w-full px-4">
    <div
      class="flex w-full flex-row justify-between rounded-lg bg-gray-500 p-3 text-sm text-white shadow"
    >
      <p>{{ notifStore.snackBarMessage }}</p>
      <button
        type="button"
        class="whitespace-nowrap text-gray-50 underline"
        @click="notifStore.hideSnackbar"
      >
        Got it
      </button>
    </div>
  </div>
</template>
