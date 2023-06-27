<script setup lang="ts">
import { useGroup } from "../../store";
import BurgerMenu from "../components/SideDrawer.vue";

const groupStore = useGroup();
</script>

<template>
  <div class="mb-3">
    <BurgerMenu /><span class="ml-4 text-3xl">
      {{ groupStore.currentGroup.name }}
    </span>
  </div>

  <div class="mb-2 text-xl text-[#9E2706]">Groceries to Finish This Week</div>

  <div class="mb-10 flex flex-row rounded-lg bg-[#9E2706] bg-opacity-10 p-1">
    <table class="text-left text-sm">
      <thead class="w-full border-b border-gray-500">
        <tr>
          <th scope="col" class="px-6 py-2">Item</th>
          <th scope="col" class="px-6 py-2">Quantity</th>
          <th scope="col" class="px-6 py-2">Expiry</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="px-6 py-2" rowspan="2">Spring Onion</th>
          <td class="px-6 py-2">1 stalk</td>
          <td class="px-6 py-2">1 day</td>
        </tr>
        <tr>
          <td class="px-6 py-2">5 stalks</td>
          <td class="px-6 py-2">7 days</td>
        </tr>
        <tr>
          <th scope="row" class="px-6 py-2">Apples</th>
          <td class="px-6 py-2">Black</td>
          <td class="px-6 py-2">5 days</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="mb-4">
    <div class="text-xl text-[#24484E]">Let's Do Our Part to</div>
    <div class="font-Indie text-3xl text-[#24484E]">SAVE FOOD</div>
    <div class="flex flex-row">
      <div
        class="mb-4 rounded-lg border border-gray-200 bg-[#24484E] bg-opacity-10 p-6 text-center font-Indie text-2xl"
      >
        <div>2 groceries</div>
        <div>thrown out in the past month</div>
      </div>
      <img class="grow" src="../../assets/Vector.svg" />
    </div>
  </div>

  <div class="mb-4 text-xl">Groceries Wasted</div>
  <div class="mb-4 flex flex-row rounded-lg border border-gray-200 p-6">
    <table class="text-left">
      <thead class="w-full border-b border-gray-500 border-opacity-50">
        <tr>
          <th scope="col" class="px-6 py-3">Item</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="px-6 py-2">Peanut Butter</th>
          <td class="px-6 py-2">1/4 jar</td>
        </tr>
        <tr>
          <th scope="row" class="px-6 py-2">Bread</th>
          <td class="px-6 py-2">2 slices</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
