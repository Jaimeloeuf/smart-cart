<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGroup } from "../../../store";
import { GroupCreatedRoute } from "../../../router";
import type { Group } from "../../../types";

const props = defineProps<{ groupID: Group["id"] }>();

const router = useRouter();
const groupStore = useGroup();
const group = groupStore.getGroup(props.groupID);
const name = ref<string>(group.name);

async function save() {
  if (name.value === "") return alert("Please enter a group name!");

  if (!confirm("Confirm?")) return;

  await groupStore.updateGroupName(group.id, name.value);

  router.push({ name: GroupCreatedRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row justify-center text-center">
      <button @click="router.back">Cancel</button>
      <p class="grow text-2xl font-light">New Group</p>
      <button @click="save">Save</button>
    </div>

    <label class="mb-2 mt-8 block text-sm font-medium text-gray-900">
      Group Name
    </label>
    <input
      v-model="name"
      type="text"
      class="block h-16 w-full rounded-lg border border-blue-200 p-2.5 text-2xl text-gray-900"
      placeholder="Use a cute name!"
    />
  </div>
</template>
