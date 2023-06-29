<script setup lang="ts">
import { useGroup, useWasted } from "../../store";
import BurgerMenu from "../components/SideDrawer.vue";

const groupStore = useGroup();
const wastedStore = useWasted();
</script>

<template>
  <div class="mb-3">
    <BurgerMenu /><span class="ml-4 text-3xl">
      {{ groupStore.currentGroup.name }}
    </span>
  </div>

  <div class="mb-2 text-xl text-[#9E2706]">Groceries to Finish This Week</div>

  <div class="mb-10 flex flex-row rounded-lg bg-[#9E2706] bg-opacity-10 p-1">
    <table class="m-2 h-fit w-full text-left text-sm">
      <thead class="border-b border-gray-500">
        <tr>
          <th scope="col" class="px-6 py-2">Item</th>
          <th scope="col" class="px-6 py-2">Quantity</th>
          <th scope="col" class="px-6 py-2">Expiry</th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-full w-full">
          <th scope="row" class="px-6 py-2 font-normal" rowspan="2">
            Spring Onion
          </th>
          <td class="px-6 py-2">1 stalk</td>
          <td class="px-6 py-2">1 day</td>
        </tr>
        <tr>
          <td class="px-6 py-2">5 stalks</td>
          <td class="px-6 py-2">7 days</td>
        </tr>
        <tr>
          <th scope="row" class="px-6 py-2 font-normal">Apples</th>
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
        <div>{{ wastedStore.wastedGroceriesAmount }} groceries</div>
        <div>thrown out in the past month</div>
      </div>
      <img class="grow" src="../../assets/LadyEating.svg" />
    </div>
  </div>

  <div class="mb-4 text-xl">Groceries Wasted</div>
  <div class="mb-4 flex flex-row rounded-lg bg-[#B2B2B2] bg-opacity-10 p-6">
    <table class="m-auto h-fit w-full text-left">
      <thead class="w-full border-b border-gray-500 border-opacity-50">
        <tr>
          <th scope="col" class="px-6 py-3">Item</th>
          <th scope="col" class="px-6 py-3">Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in wastedStore.cartArray" :key="i">
          <th scope="row" class="px-6 py-2 font-normal">{{ item.name }}</th>
          <td class="px-6 py-2">{{ item.quantity + " " + item.unit }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
