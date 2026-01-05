<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <h1 class="text-3xl font-bold text-sky-400 tracking-wide">Currency Exchange</h1>
        </div>
        
        <!-- Horizontal Menu -->
        <div class="flex space-x-12">
          <RouterLink to="/" class="text-gray-400 hover:text-gray-600 font-medium transition-colors">Home</RouterLink>
          <RouterLink to="/exchange" class="text-gray-400 hover:text-gray-600 font-medium transition-colors">Exchange</RouterLink>
          <RouterLink to="/info" class="text-gray-400 hover:text-gray-600 font-medium transition-colors">Info</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
