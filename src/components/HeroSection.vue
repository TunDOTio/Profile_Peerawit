<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const roles = ['Web Applications', 'AI Chatbots', 'Digital Experiences', 'Enterprise Solutions','Prompt Engineering'];
const currentRole = ref('');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimer;

const typeEffect = () => {
  const currentText = roles[roleIndex];
  
  if (isDeleting) {
    currentRole.value = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentRole.value = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before typing next
  }

  typeTimer = setTimeout(typeEffect, typeSpeed);
};

onMounted(() => {
  typeTimer = setTimeout(typeEffect, 500);
});

onUnmounted(() => {
  clearTimeout(typeTimer);
});
</script>

<template>
  <section v-reveal class="hero-section">
    <!-- Glowing Orbs Background -->
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <div class="container hero-content">
      <div class="hero-badge">Welcome to my portfolio</div>
      <h1 class="hero-title">
        Hi, I'm <span class="gradient-text">Peerawit</span>
      </h1>
      <p class="hero-subtitle">
        I specialize in Prompt Engineering <br />
        <span class="typewriter-text">{{ currentRole }}<span class="cursor">|</span></span>
      </p>
      <div class="hero-actions">
        <a href="#projects" class="btn btn-primary glow-btn">View My Work</a>
        <a href="#contact" class="btn btn-outline">Contact Me</a>
      </div>
    </div>
    
    <!-- Scroll Down Indicator -->
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <span class="scroll-text">Scroll Down</span>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;
}

/* Glowing Orbs */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;
  animation: float 10s ease-in-out infinite;
  pointer-events: none;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: rgba(124, 58, 237, 0.25);
  top: -100px;
  left: -100px;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: rgba(56, 189, 248, 0.15);
  bottom: 10vh;
  right: -50px;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 1;
  position: relative;
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
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: var(--color-text-secondary);
  margin-bottom: 3.5rem;
  line-height: 1.5;
  min-height: 5rem; /* prevent layout shift during typing */
}

.typewriter-text {
  color: var(--color-text-primary);
  font-weight: 600;
  background: linear-gradient(135deg, #a855f7, #38bdf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cursor {
  color: var(--color-text-primary);
  -webkit-text-fill-color: initial;
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.glow-btn {
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
  transition: all 0.3s ease;
}

.glow-btn:hover {
  box-shadow: 0 0 30px rgba(124, 58, 237, 0.6);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
  animation: fade-in-up 2s ease forwards 1s; /* delayed start */
  opacity: 0; /* initial state for animation */
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid var(--color-text-secondary);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: var(--color-text-secondary);
  border-radius: 2px;
  animation: scroll-wheel 2s infinite;
}

.scroll-text {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}

@keyframes fade-in-up {
  0% { opacity: 0; transform: translate(-50%, 20px); }
  100% { opacity: 0.7; transform: translate(-50%, 0); }
}
</style>
