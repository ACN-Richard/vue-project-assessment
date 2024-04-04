<script setup>
const props = defineProps({
  title: String,
  message: String
})
</script>

<template>
  <div class="text-center">
    <p class="font-semibold text-2xl text-gray-500">{{ title }}</p>
    <p class="text-gray-500 mt-6">{{ message }}</p>
  </div>
</template>