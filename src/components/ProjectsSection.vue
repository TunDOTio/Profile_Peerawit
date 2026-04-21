<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    id: 1,
    title: 'Chatbot Project',
    description: 'An intelligent conversational assistant built to streamline customer support and handle inquiries automatically 24/7.',
    image: '/assets/project_chatbot.png',
    tags: ['Vue', 'Node.js', 'AI', 'Chatbot']
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A full-stack online store with real-time inventory management, secure payments, and an intuitive user interface.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    tags: ['React', 'Next.js', 'Stripe']
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    description: 'Interactive data visualization dashboard providing deep insights into user metrics and business performance.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    tags: ['Vue', 'D3.js', 'Tailwind']
  }
]);
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <div v-reveal class="section-header">
        <h2 class="section-title">Featured <span class="gradient-text">Projects</span></h2>
        <p class="section-subtitle">Here are some of my recent works that showcase my skills and passion for building great products.</p>
      </div>

      <div class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
          v-reveal
        >
          <div class="project-image-wrapper">
            <img :src="project.image" :alt="project.title" class="project-image" />
            <div class="project-overlay">
              <span class="view-project-btn">View Details</span>
            </div>
          </div>
          <div class="project-info">
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  padding: 100px 0;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.project-card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition-smooth);
  backdrop-filter: blur(10px);
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-accent-primary);
  box-shadow: 0 20px 40px -10px rgba(124, 58, 237, 0.15);
}

.project-image-wrapper {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 5, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-smooth);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-project-btn {
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: white;
  font-weight: 500;
  backdrop-filter: blur(4px);
  transform: translateY(20px);
  transition: var(--transition-smooth);
}

.project-card:hover .view-project-btn {
  transform: translateY(0);
}

.project-info {
  padding: 2rem;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  background: rgba(124, 58, 237, 0.1);
  color: #a855f7;
  border-radius: 100px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}

.project-description {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
