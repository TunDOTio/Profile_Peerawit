<script setup>
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div v-reveal class="contact-box">
        <h2 class="contact-title">Let's Work <span class="gradient-text">Together</span></h2>
        <p class="contact-subtitle">
          I'm currently available for freelance work and new opportunities. 
          If you have a project that needs some creative touch, I'd love to hear about it.
        </p>
        <div class="contact-links">
          <a href="mailto:hello@example.com" class="btn btn-primary">Say Hello</a>
          <div class="social-links">
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} Peerawit. All rights reserved.</p>
    </footer>
  </section>
</template>

<style scoped>
.contact-section {
  padding-top: 100px;
  position: relative;
}

.contact-box {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 4rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.contact-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 1.5rem;
}

.contact-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.social-links {
  display: flex;
  gap: 1.5rem;
}

.social-link {
  color: var(--color-text-secondary);
  font-weight: 500;
  position: relative;
}

.social-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent-primary);
  transition: width 0.3s ease;
}

.social-link:hover {
  color: white;
}

.social-link:hover::after {
  width: 100%;
}

.footer {
  text-align: center;
  padding: 3rem 0;
  margin-top: 4rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  border-top: 1px solid var(--color-border);
}
</style>
