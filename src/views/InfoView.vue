<script setup lang="ts">
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="bg-white rounded-3xl p-10 shadow-lg max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-slate-800 mb-4 text-center">
        How to Use Currency Exchange
      </h1>
      <p class="text-center text-gray-600 mb-12">
        Follow these simple steps to convert currencies in real-time
      </p>

      <!-- Steps -->
      <div class="space-y-8">
        <!-- Step 1 -->
        <div class="border-l-4 border-sky-500 pl-6 py-4">
          <div class="flex items-center space-x-3 mb-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white font-bold text-lg">
              1
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Configure Your Currencies</h2>
          </div>
          <p class="text-gray-700 mb-4 ml-13">
            When you first access the Exchange page, you'll be prompted to select the currencies you want to track. 
            You can choose multiple currencies from the list.
          </p>
          <div class="ml-13 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">•</span>
                <span>Click on any currency to add it to your selection</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">•</span>
                <span>Use the search bar to quickly find specific currencies</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">•</span>
                <span>Selected currencies will be highlighted with a checkmark</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">•</span>
                <span>Click "Save Configuration" when you're done</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="border-l-4 border-green-500 pl-6 py-4">
          <div class="flex items-center space-x-3 mb-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">
              2
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Convert Currencies</h2>
          </div>
          <p class="text-gray-700 mb-4 ml-13">
            After configuring your currencies, you'll see input fields for each selected currency. 
            Simply type in any field to convert values automatically.
          </p>
          <div class="ml-13 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start space-x-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Type numbers in any currency field</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-green-500 mt-1">•</span>
                <span>All other currencies will update automatically in real-time</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Values are formatted with thousands separators (.) and decimals (,)</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-green-500 mt-1">•</span>
                <span>Numbers are entered like a calculator - digits move from right to left</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="border-l-4 border-purple-500 pl-6 py-4">
          <div class="flex items-center space-x-3 mb-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white font-bold text-lg">
              3
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Refresh Exchange Rates</h2>
          </div>
          <p class="text-gray-700 mb-4 ml-13">
            Exchange rates are updated periodically. You can manually refresh them to get the latest rates from the API.
          </p>
          <div class="ml-13 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start space-x-2">
                <span class="text-purple-500 mt-1">•</span>
                <span>Click the "Refresh Rates" button to update exchange rates</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-purple-500 mt-1">•</span>
                <span>Your current values will be recalculated with the new rates</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-purple-500 mt-1">•</span>
                <span>Check the "Last updated" timestamp at the bottom to see when rates were last fetched</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="border-l-4 border-orange-500 pl-6 py-4">
          <div class="flex items-center space-x-3 mb-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg">
              4
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Reconfigure Currencies</h2>
          </div>
          <p class="text-gray-700 mb-4 ml-13">
            Want to track different currencies? You can easily reconfigure your selection at any time.
          </p>
          <div class="ml-13 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start space-x-2">
                <span class="text-orange-500 mt-1">•</span>
                <span>Click the "Configure" button to change your currency selection</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-orange-500 mt-1">•</span>
                <span>Your previous configuration will be cleared</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-orange-500 mt-1">•</span>
                <span>Select new currencies and save to update your view</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-orange-500 mt-1">•</span>
                <span>Your configuration is saved automatically in your browser</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-12 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-200">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-800 mb-2">Important Information</h3>
            <ul class="space-y-2 text-gray-700 text-sm">
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">→</span>
                <span>Exchange rates are provided by a third-party API and updated regularly</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">→</span>
                <span>Your currency configuration is stored locally in your browser</span>
              </li>
              <li class="flex items-start space-x-2">
                <span class="text-sky-500 mt-1">→</span>
                <span>This tool is for informational purposes only - always verify rates before making financial decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-8 text-center">
        <RouterLink 
          to="/exchange"
          class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-4 rounded-full uppercase tracking-wide transition-colors shadow-lg"
        >
          Start Converting Now
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ml-13 {
  margin-left: 3.25rem;
}
</style>
