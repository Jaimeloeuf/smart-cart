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
  <div class="ml-6 text-xl text-[#9E2706]">
      Groceries to finish this week:
  </div>
  
  <div class="mb-4 flex flex-row rounded-lg border border-gray-200 bg-white p-6 shadow">
      <table class="text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" class="px-6 py-3">
                      Item
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Quantity
                  </th>
                  <th scope="col" class="px-6 py-3">
                      Expiry
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white" rowspan="2">
                      Spring Onion
                  </th>
                  <td class="px-6 py-4">
                      1 stalk
                  </td>
                  <td class="px-6 py-4">
                      -2 days
                  </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  
                  <td class="px-6 py-4">
                      5 stalks
                  </td>
                  <td class="px-6 py-4">
                      7 days
                  </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-normal dark:text-white">
                      Apples
                  </th>
                  <td class="px-6 py-4">
                      Black
                  </td>
                  <td class="px-6 py-4">
                      5 days
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
  <div class="ml-6 text-xl text-[#24484E]">
      Let's do our part to
  </div>
  <div class="ml-6 text-3xl text-[#24484E] font-Indie">
      SAVE FOOD
  </div>
  <div class="flex flex-row"> 
    <div class="mb-4 rounded-lg border border-gray-200 bg-[#24484E] p-6 shadow bg-opacity-10 font-Indie text-2xl text-center">
        <div> 2 groceries </div>
        <div> thrown out in the past month </div>
    </div>
    <img class ="grow" src="../../assets/Vector.svg" />
  </div>
  <div class="ml-6 text-xl text-black">
      Groceries wasted
  </div>
</template>
