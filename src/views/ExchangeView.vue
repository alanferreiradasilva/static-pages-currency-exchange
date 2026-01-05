<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useExchangeStore } from '@/stores/exchangeStore'
import { useExchangeConfigStore } from '@/stores/exchangeConfigStore'
import ExchangeConfigModal from '@/components/modals/ExchangeConfigModal.vue'

const exchangeStore = useExchangeStore()
const configStore = useExchangeConfigStore()

// Modal state
const showConfigModal = ref(false)

// Check if configuration is empty
const isConfigEmpty = computed(() => configStore.exchangeConfigData.length === 0)

// Store currency values for each input
const currencyValues = ref<Record<string, number>>({})

// Currency names mapping
const currencyNames: Record<string, string> = {
  USD: 'US Dollar',
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
  AUD: 'Australian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  MXN: 'Mexican Peso',
  ARS: 'Argentine Peso'
}

// Initialize currency values
const initializeCurrencyValues = () => {
  // Set USD to 1 as default base
  const baseCurrency = 'USD'
  const baseValue = 1

  configStore.exchangeConfigData.forEach((currency) => {
    if (currency === baseCurrency) {
      currencyValues.value[currency] = baseValue
    } else {
      // Convert base value to other currencies
      const convertedValue = exchangeStore.convertCurrency(
        baseValue,
        baseCurrency,
        currency
      )
      currencyValues.value[currency] = convertedValue !== null ? convertedValue : 0
    }
  })
  
  // Initialize raw input values
  initializeRawInputs()
}

// Handle currency value change
const handleCurrencyChange = (changedCurrency: string, newValue: number) => {
  if (!exchangeStore.exchangeData) return

  // Update the changed currency value
  currencyValues.value[changedCurrency] = newValue

  // Convert to all other currencies
  configStore.exchangeConfigData.forEach((currency) => {
    if (currency !== changedCurrency) {
      const convertedValue = exchangeStore.convertCurrency(
        newValue,
        changedCurrency,
        currency
      )
      if (convertedValue !== null) {
        currencyValues.value[currency] = convertedValue
        // Update raw input value for the converted currency
        const cents = Math.round(convertedValue * 100)
        rawInputValues.value[currency] = cents.toString()
      }
    }
  })
}

// Get currency name
const getCurrencyName = (code: string): string => {
  return currencyNames[code] || code
}

// Get flag emoji for currency
const getFlagEmoji = (currencyCode: string): string => {
  const flagMap: Record<string, string> = {
    USD: '🇺🇸',
    BRL: '🇧🇷',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    CAD: '🇨🇦',
    AUD: '🇦🇺',
    CHF: '🇨🇭',
    CNY: '🇨🇳',
    INR: '🇮🇳',
    MXN: '🇲🇽',
    ARS: '🇦🇷'
  }
  return flagMap[currencyCode] || '🏳️'
}

// Fetch exchange rates on mount
onMounted(async () => {
  await exchangeStore.fetchExchangeRates('USD')
  
  // Show modal if config is empty
  if (isConfigEmpty.value) {
    showConfigModal.value = true
  } else {
    initializeCurrencyValues()
  }
})

// Watch for config changes
watch(
  () => configStore.exchangeConfigData,
  () => {
    if (!isConfigEmpty.value) {
      initializeCurrencyValues()
    }
  },
  { deep: true }
)

// Close modal handler
const handleModalClose = () => {
  showConfigModal.value = false
  if (!isConfigEmpty.value) {
    initializeCurrencyValues()
  }
}

// Refresh exchange rates
const refreshRates = async () => {
  await exchangeStore.fetchExchangeRates('USD')
  
  // Recalculate all currency values based on the first currency
  if (configStore.exchangeConfigData.length > 0 && exchangeStore.exchangeData) {
    const firstCurrency = configStore.exchangeConfigData[0] || ''
    const firstValue = currencyValues.value[firstCurrency] || 1
    
    // Trigger recalculation
    handleCurrencyChange(firstCurrency, firstValue)
  }
}

// Reconfigure currencies
const reconfigureCurrencies = () => {
  // Clear configuration from store
  configStore.clearCurrencies()
  
  // Clear from localStorage
  localStorage.removeItem('exchangeConfig')
  
  // Clear currency values
  currencyValues.value = {}
  rawInputValues.value = {}
  
  // Show modal
  showConfigModal.value = true
}

// Format number with thousands separator (.) and decimal separator (,)
const formatCurrency = (value: number): string => {  
  const parts = value.toFixed(2).split('.') || []
  const integerPart = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const decimalPart = parts[1]
  return `${integerPart},${decimalPart}`
}

// Store for raw input values (cents representation)
const rawInputValues = ref<Record<string, string>>({})

// Initialize raw input values
const initializeRawInputs = () => {
  configStore.exchangeConfigData.forEach((currency) => {
    const cents = Math.round((currencyValues.value[currency] || 0) * 100)
    rawInputValues.value[currency] = cents.toString().padStart(3, '0')
  })
}

// Format raw input (cents) to display string
const formatRawInput = (rawValue: string): string => {
  // Ensure at least 3 digits (for 0,00)
  const padded = rawValue.padStart(3, '0')
  const len = padded.length
  
  // Split into integer and decimal parts
  let integerPart = padded.slice(0, len - 2) || '0'
  const decimalPart = padded.slice(len - 2)
  
  // Remove leading zeros, but keep at least one digit
  integerPart = integerPart.replace(/^0+/, '') || '0'
  
  // Add thousand separators
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  
  return `${formattedInteger},${decimalPart}`
}

// Handle input with currency mask behavior (digits move left)
const handleFormattedInput = (currency: string, event: Event) => {
  const input = event.target as HTMLInputElement
  let rawValue = input.value
  
  // Extract only digits
  const digits = rawValue.replace(/\D/g, '')
  
  // Limit to reasonable number of digits (16 digits = 14 integer + 2 decimal)
  const limitedDigits = digits.slice(0, 16)
  
  // Store raw value
  rawInputValues.value[currency] = limitedDigits || '0'
  
  // Convert to actual number (divide by 100 to account for cents)
  const numericValue = parseInt(limitedDigits || '0') / 100
  
  // Update formatted display
  input.value = formatRawInput(limitedDigits)
  
  // Update the currency values and trigger conversion
  handleCurrencyChange(currency, numericValue)
}

// Get display value for input
const getDisplayValue = (currency: string): string => {
  if (rawInputValues.value[currency]) {
    return formatRawInput(rawInputValues.value[currency])
  }
  return formatCurrency(currencyValues.value[currency] || 0)
}
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Configuration Modal -->
    <ExchangeConfigModal :show="showConfigModal" @close="handleModalClose" />

    <div class="bg-white rounded-3xl p-10 shadow-lg max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-slate-800 mb-8 text-center">
        Currency Exchange
      </h1>

      <!-- Loading state -->
      <div v-if="exchangeStore.loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading exchange rates...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="exchangeStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-600">{{ exchangeStore.error }}</p>
      </div>

      <!-- Currency inputs -->
      <div v-else-if="!isConfigEmpty" class="space-y-6">
        <div
          v-for="currency in configStore.exchangeConfigData"
          :key="currency"
          class="border border-gray-200 rounded-xl p-6 hover:border-sky-300 transition-colors"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center space-x-3">
              <span class="text-3xl">{{ getFlagEmoji(currency) }}</span>
              <div>
                <p class="text-sm text-gray-500 uppercase tracking-wide">{{ currency }}</p>
                <p class="text-lg font-semibold text-slate-700">{{ getCurrencyName(currency) }}</p>
              </div>
            </div>
          </div>
          
          <input
            type="text"
            :value="getDisplayValue(currency)"
            @input="(e) => handleFormattedInput(currency, e)"
            @focus="(e) => (e.target as HTMLInputElement).select()"
            class="w-full text-2xl font-bold text-slate-800 border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-sky-500 transition-colors"
            :placeholder="`Enter ${currency} amount`"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-4 mt-8">
          <button
            @click="refreshRates"
            :disabled="exchangeStore.loading"
            class="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-full uppercase tracking-wide transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm"
          >
            <svg
              class="w-5 h-5"
              :class="{ 'animate-spin': exchangeStore.loading }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{{ exchangeStore.loading ? 'Updating...' : 'Refresh Rates' }}</span>
          </button>

          <button
            @click="reconfigureCurrencies"
            class="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-full uppercase tracking-wide transition-colors shadow-lg flex items-center space-x-2 text-sm"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Configure</span>
          </button>
        </div>

        <!-- Last update info -->
        <div v-if="exchangeStore.exchangeData" class="text-center text-sm text-gray-500 mt-6">
          <p>Last updated: {{ new Date(exchangeStore.exchangeData.time_last_update_utc).toLocaleString() }}</p>
        </div>
      </div>

      <!-- Empty state - show when config is empty and modal is closed -->
      <div v-else-if="isConfigEmpty && !showConfigModal" class="text-center py-12">
        <div class="text-6xl mb-4">💱</div>
        <h3 class="text-2xl font-bold text-slate-800 mb-3">No Currencies Selected</h3>
        <p class="text-gray-600 mb-6">Please configure your currencies to start converting</p>
        <button
          @click="showConfigModal = true"
          class="px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors shadow-lg"
        >
          Configure Currencies
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Remove arrows from number input */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>