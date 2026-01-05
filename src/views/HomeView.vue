<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#FFFFFF] rounded-4xl p-10 shadow-lg">
        <!-- left side - text -->
        <div class="space-y-8">
          <h1 class="text-5xl lg:text-6xl font-bold text-[#28215C] leading-tight">
            Currency Services
          </h1>
          
          <p class="text-gray-500 text-lg leading-relaxed">
            Vestibulum molestie nisl nec nunc viverra efficitur.
            efficitur quam tristique rhoncus. Proin ut est lectus. 
            Nunc quis sagittis porta.
          </p>
          
          <!-- Features List -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-sky-500 rounded-full"></div>
              <p class="text-gray-700">Fusce luctus blandit nus.</p>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-sky-500 rounded-full"></div>
              <p class="text-gray-700">Ut imperdiet dui et tincidunt mattis.</p>
            </div>
          </div>
          
          <!-- Button -->
          <button class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-full uppercase tracking-wide transition-colors shadow-lg">
            Get Started
          </button>
        </div>
        
        <!-- Right Side - Image/Illustration -->
        <div class="relative">
          <div class="aspect-square max-w-lg mx-auto">
            <!-- Placeholder for the illustration -->
            <div class="w-full h-full bg-gradient-to-br from-sky-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-xl">
              <svg class="w-32 h-32 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
