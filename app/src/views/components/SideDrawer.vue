<script setup lang="ts">
import { ref } from "vue";
import { useGroup } from "../../store";
import { CreateGroupRoute, GroupDetailsRoute } from "../../router";
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
    class="fixed left-0 top-0 z-40 h-screen w-9/12 max-w-sm -translate-x-full transition-transform"
    :class="{ 'translate-x-0': showDrawer, 'shadow-2xl': showDrawer }"
  >
    <div
      class="flex h-full flex-col items-start justify-between space-y-2 bg-gray-50 p-4 font-medium"
    >
      <p class="p-2 text-gray-900" @click="showDrawer = false">
        <span class="text-2xl">SmartCart</span>
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
          <div
            v-for="(group, i) in groupStore.groupsArray"
            :key="i"
            class="flex flex-row"
          >
            <button
              class="inline-flex grow rounded-lg p-2 pl-7 pr-4 text-gray-900 transition duration-75"
              :class="{ 'bg-gray-200': group.id === groupStore.currentGroupID }"
              @click="selectGroup(group.id)"
            >
              {{ i + 1 }}. {{ group.name }}
            </button>

            <router-link
              :to="{
                name: GroupDetailsRoute.name,
                params: { groupID: group.id },
              }"
              class="inline rounded-full border border-gray-50 p-2 pt-3"
            >
              <svg
                width="3"
                height="13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 11.25C0 10.9185 0.131696 10.6005 0.366117 10.3661C0.600537 10.1317 0.918479 10 1.25 10C1.58152 10 1.89946 10.1317 2.13388 10.3661C2.3683 10.6005 2.5 10.9185 2.5 11.25C2.5 11.5815 2.3683 11.8995 2.13388 12.1339C1.89946 12.3683 1.58152 12.5 1.25 12.5C0.918479 12.5 0.600537 12.3683 0.366117 12.1339C0.131696 11.8995 0 11.5815 0 11.25ZM0 6.25C0 5.91848 0.131696 5.60054 0.366117 5.36612C0.600537 5.1317 0.918479 5 1.25 5C1.58152 5 1.89946 5.1317 2.13388 5.36612C2.3683 5.60054 2.5 5.91848 2.5 6.25C2.5 6.58152 2.3683 6.89946 2.13388 7.13388C1.89946 7.3683 1.58152 7.5 1.25 7.5C0.918479 7.5 0.600537 7.3683 0.366117 7.13388C0.131696 6.89946 0 6.58152 0 6.25ZM0 1.25C0 0.918479 0.131696 0.600537 0.366117 0.366117C0.600537 0.131696 0.918479 0 1.25 0C1.58152 0 1.89946 0.131696 2.13388 0.366117C2.3683 0.600537 2.5 0.918479 2.5 1.25C2.5 1.58152 2.3683 1.89946 2.13388 2.13388C1.89946 2.3683 1.58152 2.5 1.25 2.5C0.918479 2.5 0.600537 2.3683 0.366117 2.13388C0.131696 1.89946 0 1.58152 0 1.25Z"
                  fill="black"
                />
              </svg>
            </router-link>
          </div>

          <!-- button for creating a new group -->
          <router-link
            :to="{ name: CreateGroupRoute.name }"
            class="group flex w-full rounded-lg p-2 pl-4 text-gray-900 transition duration-75"
          >
            + New Group
          </router-link>
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
