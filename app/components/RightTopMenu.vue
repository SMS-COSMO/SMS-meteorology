<template>
  <div class="flex justify-center items-center gap-4 text-base">
    <button class="inline-flex justify-center items-center" @click="toggleDark">
      <div class="i-ri-sun-line dark:i-ri-moon-line" />
    </button>
    <a class="inline-flex justify-center items-center dark:text-white" :href="repository.url" target="_blank">
      <div i-ri-github-line />
    </a>
  </div>
</template>

<script setup lang="ts">
import { repository } from "~/../package.json";

const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>
