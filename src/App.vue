<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/navbas/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0EA8F2]">
    <Navbar />

    <RouterView />
  </div>
</template>

<style scoped>
/* Estilos personalizados adicionais, se necessário */
</style>
