import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExchangeRateResponse } from './models/exchange-model'

export const useExchangeStore = defineStore('exchange', () => {
  // State
  const exchangeData = ref<ExchangeRateResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Action to fetch exchange rates
  async function fetchExchangeRates(baseCurrency: string = 'USD') {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      
      if (!response.ok) {
        throw new Error('Error fetching exchange rates')
      }

      const data = await response.json()
      exchangeData.value = data as ExchangeRateResponse
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Error fetching exchange rates:', err)
    } finally {
      loading.value = false
    }
  }

  // Getter to obtain conversion rate between two currencies
  function getConversionRate(from: string, to: string): number | null {
    if (!exchangeData.value?.rates) return null
    
    const fromRate = exchangeData.value.rates[from]
    const toRate = exchangeData.value.rates[to]
    
    if (!fromRate || !toRate) return null
    
    return toRate / fromRate
  }

  // Getter to convert amount between currencies
  function convertCurrency(amount: number, from: string, to: string): number | null {
    const rate = getConversionRate(from, to)
    if (rate === null) return null
    
    return amount * rate
  }

  return {
    // State
    exchangeData,
    loading,
    error,
    // Actions
    fetchExchangeRates,
    getConversionRate,
    convertCurrency
  }
})
