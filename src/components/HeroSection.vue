<script setup>
</script>

<template>
  <section v-reveal class="hero-section">
    <div class="container hero-content">
      <div class="hero-badge">Welcome to my portfolio</div>
      <h1 class="hero-title">
        Hi, I'm <span class="gradient-text">Peerawit</span>
      </h1>
      <p class="hero-subtitle">
        I create beautiful, modern, and engaging digital experiences. 
        Transforming ideas into interactive and high-performance applications.
      </p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary">View My Work</a>
        <a href="#contact" class="btn btn-outline">Contact Me</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: 100px;
  color: var(--color-accent-primary);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5.5rem);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  margin-bottom: 2.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
