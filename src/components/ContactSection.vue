<script setup>
import { ref } from 'vue';

const skills = ref([
  { name: 'Vue.js', category: 'Front End' },
  { name: 'Node.js', category: 'Back end' },
  { name: 'MySQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Docker', category: 'container Application' },
  { name: 'OAuth2 / JWT', category: 'Security' },
  { name: 'FastAPI', category: 'Backend API Framework' },
  { name: 'Javascript', category: 'Front & Back end' },
  { name: 'Go2rtc', category: 'Backend Streaming Framework' }
]);
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container content-wrapper">
      
      <!-- Skills Box -->
      <div v-reveal class="content-box">
        <h2 class="box-title">My <span class="gradient-text">Skills</span></h2>
        <div class="skills-list">
          <div v-for="skill in skills" :key="skill.name" class="skill-row">
            <span class="skill-name">{{ skill.name }}</span>
            <span class="skill-separator">-</span>
            <span class="skill-category">{{ skill.category }}</span>
          </div>
        </div>
      </div>

      <!-- Contact Box -->
      <div v-reveal class="content-box">
        <h2 class="box-title">Let's Work <span class="gradient-text">Together</span></h2>
        <p class="box-subtitle">
          I'm currently available for freelance work and new opportunities. 
          If you have a project that needs some creative touch, I'd love to hear about it.
        </p>
        <div class="contact-links">
          <div class="email-wrapper">
            <a href="mailto:tuntun.peerawit@gmail.com" class="btn btn-primary">Say Hello</a>
            <a href="mailto:tuntun.peerawit@gmail.com" class="email-link">tuntun.peerawit@gmail.com</a>
          </div>
          <div class="social-links">
            <a href="https://github.com/TunDOTio" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>
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
  min-height: 100vh;
  padding-top: 100px;
  position: relative;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
}

.content-box {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.5rem 1.5rem;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  margin-bottom: 1rem;
}

.box-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: left;
  margin: 1rem auto 0;
  max-width: 400px;
}

.skill-row {
  display: flex;
  align-items: center;
  font-size: 1.05rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.skill-row:last-child {
  border-bottom: none;
}

.skill-name {
  font-weight: 600;
  color: var(--color-text-primary);
  min-width: 130px;
}

.skill-separator {
  color: var(--color-accent-primary);
  margin: 0 0.8rem;
}

.skill-category {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.email-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.email-link {
  color: var(--color-text-secondary);
  font-size: 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: var(--color-accent-primary);
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

@media (max-width: 768px) {
  .contact-section {
    padding-top: 80px;
    height: auto;
  }
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  .content-box {
    padding: 2rem 1rem;
  }
  .box-title {
    font-size: 2rem;
  }
}
</style>
