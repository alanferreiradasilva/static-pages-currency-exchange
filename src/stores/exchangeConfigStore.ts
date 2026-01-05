import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useExchangeConfigStore = defineStore('exchangeConfig', () => {
  // State - stores selected currency codes
  const exchangeConfigData = ref<string[]>([])

  // Load config from localStorage on initialization
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('exchangeConfig')
    if (saved) {
      try {
        exchangeConfigData.value = JSON.parse(saved)
      } catch (err) {
        console.error('Error loading exchange config from localStorage:', err)
      }
    }
  }

  // Save config to localStorage whenever it changes
  watch(
    exchangeConfigData,
    (newValue) => {
      localStorage.setItem('exchangeConfig', JSON.stringify(newValue))
    },
    { deep: true }
  )

  // Action to add a currency to the list
  function addCurrency(currencyCode: string) {
    if (!exchangeConfigData.value.includes(currencyCode)) {
      exchangeConfigData.value.push(currencyCode)
    }
  }

  // Action to remove a currency from the list
  function removeCurrency(currencyCode: string) {
    const index = exchangeConfigData.value.indexOf(currencyCode)
    if (index > -1) {
      exchangeConfigData.value.splice(index, 1)
    }
  }

  // Action to toggle a currency (add if not present, remove if present)
  function toggleCurrency(currencyCode: string) {
    if (exchangeConfigData.value.includes(currencyCode)) {
      removeCurrency(currencyCode)
    } else {
      addCurrency(currencyCode)
    }
  }

  // Action to check if a currency is selected
  function isCurrencySelected(currencyCode: string): boolean {
    return exchangeConfigData.value.includes(currencyCode)
  }

  // Action to set the entire list of currencies
  function setCurrencies(currencies: string[]) {
    exchangeConfigData.value = currencies
  }

  // Action to clear all selected currencies
  function clearCurrencies() {
    exchangeConfigData.value = []
  }

  // Load initial data
  loadFromLocalStorage()

  return {
    // State
    exchangeConfigData,
    // Actions
    addCurrency,
    removeCurrency,
    toggleCurrency,
    isCurrencySelected,
    setCurrencies,
    clearCurrencies
  }
})
