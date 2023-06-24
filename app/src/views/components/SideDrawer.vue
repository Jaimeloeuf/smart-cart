<script setup lang="ts">
import { ref } from "vue";
import { useGroup } from "../../store";
import type { Group } from "../../types";

const showDrawer = ref<boolean>(false);
const showGroups = ref<boolean>(true);

const groupStore = useGroup();

function selectGroup(groupID: Group["id"]) {
  groupStore.setCurrentGroup(groupID);
  showDrawer.value = false;
}
</script>

<template>
  <button
    type="button"
    class="m-1 mt-2 inline-flex rounded-lg text-sm text-gray-500"
    @click="showDrawer = !showDrawer"
  >
    <svg
      class="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      />
    </svg>
  </button>

  <!--
    Custom invisible overlay across the entire screen to simulate click away
    from side drawer to close it. Using custom w/h instead of h-screen w-screen
    to prevent the screen from growing.
  -->
  <div
    v-if="showDrawer"
    class="absolute z-40 h-[96vh] w-[96vw]"
    @click="showDrawer = false"
  ></div>

  <aside
    class="fixed left-0 top-0 z-40 h-screen w-4/6 max-w-sm -translate-x-full transition-transform"
    :class="{ 'translate-x-0': showDrawer, 'shadow-2xl': showDrawer }"
  >
    <div
      class="flex h-full flex-col items-start justify-between space-y-2 bg-gray-50 p-4 font-medium"
    >
      <p class="p-2 text-gray-900">
        <span class="text-2xl">Smart Cart</span>
        <span class="ml-3 text-3xl">🥹🫶🏻✨</span>
      </p>

      <div class="w-full">
        <button
          type="button"
          class="group flex w-full rounded-lg p-2 text-gray-900 transition duration-75"
          @click="showGroups = !showGroups"
        >
          <svg
            class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="ml-3 flex-1 text-left"> Groups </span>
          <svg
            class="h-6 w-6"
            :class="{ '-rotate-90': !showGroups }"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="mt-2 space-y-2" :class="{ hidden: !showGroups }">
          <button
            v-for="(group, i) in groupStore.groupsArray"
            :key="i"
            class="group flex w-full rounded-lg p-2 pl-7 text-gray-900 transition duration-75"
            :class="{ 'bg-gray-200': group.id === groupStore.currentGroupID }"
            @click="selectGroup(group.id)"
          >
            {{ i + 1 }}. {{ group.name }}
          </button>

          <!-- @todo Build the button and UI for creating a new group -->
        </div>
      </div>

      <!-- Spacer divider that takes up all the space in the middle -->
      <div class="grow"></div>

      <button
        class="flex w-full p-2 text-start text-gray-700"
        @click="() => {}"
      >
        <svg
          class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>

        <span class="ml-3 flex-1">settings</span>
      </button>

      <button
        class="flex w-full p-2 text-start text-gray-700"
        @click="() => {}"
      >
        <svg
          class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span class="ml-3 flex-1">help me!</span>
      </button>

      <button
        class="flex w-full p-2 text-start text-gray-700"
        @click="() => {}"
      >
        <svg
          class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
        <span class="ml-3 flex-1">logout</span>
      </button>
    </div>
  </aside>
</template>
