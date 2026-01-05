<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExchangeStore } from '@/stores/exchangeStore'
import { useExchangeConfigStore } from '@/stores/exchangeConfigStore'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const exchangeStore = useExchangeStore()
const configStore = useExchangeConfigStore()

// Selected currencies in the modal
const selectedCurrencies = ref<string[]>([])

// Search text for filtering currencies
const searchText = ref('')

// Available currencies from the exchange store
const availableCurrencies = computed(() => {
  if (!exchangeStore.exchangeData?.rates) return []
  return Object.keys(exchangeStore.exchangeData.rates).sort()
})

// Filtered currencies based on search text
const filteredCurrencies = computed(() => {
  if (!searchText.value) return availableCurrencies.value
  
  const search = searchText.value.toUpperCase()
  return availableCurrencies.value.filter((currency) => {
    const currencyName = getCurrencyName(currency).toUpperCase()
    return currency.includes(search) || currencyName.includes(search)
  })
})

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
  ARS: 'Argentine Peso',
  AED: 'UAE Dirham',
  AFN: 'Afghan Afghani',
  ALL: 'Albanian Lek',
  AMD: 'Armenian Dram',
  ANG: 'Netherlands Antillean Guilder',
  AOA: 'Angolan Kwanza',
  AWG: 'Aruban Florin',
  AZN: 'Azerbaijani Manat'
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
  return flagMap[currencyCode] || '🌐'
}

// Toggle currency selection
const toggleCurrency = (currency: string) => {
  const index = selectedCurrencies.value.indexOf(currency)
  if (index > -1) {
    selectedCurrencies.value.splice(index, 1)
  } else {
    selectedCurrencies.value.push(currency)
  }
}

// Check if currency is selected
const isSelected = (currency: string): boolean => {
  return selectedCurrencies.value.includes(currency)
}

// Save configuration and close modal
const saveConfiguration = () => {
  if (selectedCurrencies.value.length === 0) {
    alert('Please select at least one currency')
    return
  }
  
  configStore.setCurrencies(selectedCurrencies.value)
  emit('close')
}

// Cancel and close modal
const cancel = () => {
  selectedCurrencies.value = []
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        @click.self="cancel"
      >
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-sky-500 to-blue-600 p-8 text-white">
            <h2 class="text-3xl font-bold">Currency Configuration</h2>
            <p class="mt-2 text-sky-100">Please select your currencies for conversion</p>
          </div>

          <!-- Body -->
          <div class="p-8 overflow-y-auto max-h-[50vh]">
            <!-- Search Input -->
            <div class="mb-6">
              <div class="relative">
                <input
                  v-model="searchText"
                  type="text"
                  placeholder="Search currencies..."
                  class="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                />
                <svg
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                v-for="currency in filteredCurrencies"
                :key="currency"
                @click="toggleCurrency(currency)"
                :class="[
                  'flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200',
                  isSelected(currency)
                    ? 'border-sky-500 bg-sky-50 shadow-md scale-105'
                    : 'border-gray-200 hover:border-sky-300 hover:bg-gray-50'
                ]"
              >
                <span class="text-2xl">{{ getFlagEmoji(currency) }}</span>
                <div class="text-left flex-1">
                  <p class="font-bold text-slate-800">{{ currency }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ getCurrencyName(currency) }}</p>
                </div>
                <div v-if="isSelected(currency)" class="flex-shrink-0">
                  <svg class="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </div>

            <!-- Selected count -->
            <div v-if="selectedCurrencies.length > 0" class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                {{ selectedCurrencies.length }} {{ selectedCurrencies.length === 1 ? 'currency' : 'currencies' }} selected
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="border-t border-gray-200 p-6 flex justify-end space-x-4">
            <button
              @click="cancel"
              class="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="saveConfiguration"
              :disabled="selectedCurrencies.length === 0"
              :class="[
                'px-6 py-3 rounded-xl font-semibold text-white transition-colors',
                selectedCurrencies.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-sky-500 hover:bg-sky-600'
              ]"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
}
</style>
