<script setup lang="ts">
/* Build time variables injected in by vite, configured in vite.config.js */

const buildTime = new Date(__vite_inject.buildTime);

// Calculate the version using git branch and commit hash
const version =
  __vite_inject.gitBranch +
  " " +
  __vite_inject.commitHash.slice(0, 6).toString();
</script>

<template>
  <div class="text-xs font-extralight">
    Version: {{ version }}
    <br />
    Build Time: {{ buildTime }}
  </div>
</template>
