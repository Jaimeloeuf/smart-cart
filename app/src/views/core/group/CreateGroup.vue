<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGroup } from "../../../store";
import { GroupCreatedRoute } from "../../../router";

const router = useRouter();
const groupStore = useGroup();
const name = ref<string>("");

function cancel() {
  if (!confirm("Cancel?")) return;

  // Go back instead of going to a fixed route since the previous route could
  // be any route that can trigger create group from SideDrawer component or
  // the welcome page when the user first creates a new account with no groups.
  router.back();
}

async function save() {
  if (name.value === "") return alert("Please enter a group name!");

  if (!confirm("Confirm?")) return;

  await groupStore.createNewGroup(name.value);

  router.push({ name: GroupCreatedRoute.name });
}
</script>

<template>
  <div>
    <div class="mb-2 flex flex-row justify-center text-center">
      <button @click="cancel">Cancel</button>
      <p class="grow text-2xl font-light">New Group</p>
      <button @click="save">Save</button>
    </div>

    <label class="mb-2 mt-8 block text-sm font-medium text-gray-900">
      Group Name
    </label>
    <input
      v-model="name"
      type="text"
      class="block h-16 w-full rounded-lg border border-blue-200 p-2.5 text-gray-900"
      placeholder="Use a cute name!"
    />
  </div>
</template>
