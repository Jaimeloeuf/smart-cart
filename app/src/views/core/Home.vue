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
  <div class="mb-4 text-xl text-[#9E2706]">Groceries to finish this week:</div>

  <div class="mb-4 flex flex-row rounded-lg bg-[#9E2706] bg-opacity-10 p-6">
    <table class="text-left text-sm text-gray-500">
      <thead
        class="w-full border-b border-black border-opacity-50 text-base text-gray-700"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Item</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
          <th scope="col" class="px-6 py-3">Expiry</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th
            scope="row"
            class="whitespace-normal px-6 py-4 font-medium text-gray-900"
            rowspan="2"
          >
            Spring Onion
          </th>
          <td class="px-6 py-4">1 stalk</td>
          <td class="whitespace-nowrap px-6 py-4">-2 days</td>
        </tr>
        <tr>
          <td class="px-6 py-4">5 stalks</td>
          <td class="px-6 py-4">7 days</td>
        </tr>
        <tr>
          <th
            scope="row"
            class="whitespace-normal px-6 py-4 font-medium text-gray-900"
          >
            Apples
          </th>
          <td class="px-6 py-4">Black</td>
          <td class="px-6 py-4">5 days</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="text-xl text-[#24484E]">Let's do our part to</div>
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
  <div class="mb-4 text-xl text-black">Groceries wasted</div>
  <div
    class="mb-4 flex flex-row rounded-lg border border-gray-200 bg-white p-6"
  >
    <table class="text-left text-sm text-gray-500">
      <thead
        class="w-full border-b border-black border-opacity-50 text-base text-gray-700"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Item</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th
            scope="row"
            class="whitespace-normal px-6 py-4 font-medium text-gray-900"
          >
            Peanut Butter
          </th>
          <td class="px-6 py-4">1/4 jar</td>
        </tr>
        <tr class="bg-white">
          <th
            scope="row"
            class="whitespace-normal px-6 py-4 font-medium text-gray-900"
          >
            Bread
          </th>
          <td class="px-6 py-4">2 slices</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
