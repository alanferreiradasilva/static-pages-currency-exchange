<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <RouterLink to="/">
            <h1 class="hidden md:inline text-3xl font-bold text-sky-400 tracking-wide">Currency Exchange</h1>

            <svg class="inline md:hidden w-16 h-16 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </RouterLink>
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
