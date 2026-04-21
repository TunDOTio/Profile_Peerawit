<script setup>
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <main class="portfolio-main">
    <HeroSection />
    <ProjectsSection />
    <ContactSection />
  </main>
</template>

<style scoped>
.portfolio-main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
