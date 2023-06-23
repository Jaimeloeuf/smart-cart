<script setup lang="ts">
import type { ISODateTimeString } from "../../../types";
import { numberOfDaysFromToday } from "../../../utils/numberOfDaysFromToday";

const props = defineProps<{ expiryDate: ISODateTimeString }>();
const daysLeft = numberOfDaysFromToday(props.expiryDate);
</script>

<template>
  <!-- Defaults to red colour, and change colour based on days left -->
  <span
    class="ml-2 rounded-lg bg-red-600 p-1.5 text-sm text-white"
    :class="{ 'bg-amber-600': daysLeft > 3, 'bg-lime-700': daysLeft > 7 }"
  >
    {{ daysLeft }} day
  </span>
</template>
