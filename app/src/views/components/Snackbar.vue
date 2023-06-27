<script setup lang="ts">
import { useNotif } from "../../store";

const notifStore = useNotif();
</script>

<template>
  <div
    class="fixed bottom-10 flex w-full max-w-sm items-center rounded-lg bg-gray-500 p-4 text-white shadow"
    role="alert"
  >
    <div class="text-sm font-normal">{{ notifStore.snackBarMessage }}</div>
    <div class="ml-auto flex items-center space-x-2">
      <button
        type="button"
        class="text-gray-50"
        @click="notifStore.hideSnackbar"
      >
        Got it
      </button>
    </div>
  </div>
</template>
