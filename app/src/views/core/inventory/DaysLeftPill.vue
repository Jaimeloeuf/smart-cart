<script setup lang="ts">
import type { ISODateTimeString } from "../../../types";
import { numberOfDaysFromToday } from "../../../utils/numberOfDaysFromToday";

const props = defineProps<{ expiryDate: ISODateTimeString }>();
const daysLeft = numberOfDaysFromToday(props.expiryDate);
</script>

<template>
  <!-- Defaults to red colour, and change colour based on days left -->
  <span
    class="ml-2 rounded-lg p-1.5 text-sm text-white"
    :class="{
      'bg-[#D34A24]': daysLeft <= 7,
      'bg-[#4D7C0F]': daysLeft > 7,
    }"
  >
    {{ daysLeft }} day
  </span>
</template>
