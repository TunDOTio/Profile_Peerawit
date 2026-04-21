<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    id: 1,
    title: 'DindinAI For MFU',
    description: 'An intelligent conversational assistant built to streamline customer support and handle inquiries automatically 24/7.',
    image: '/assets/project_chatbot.png',
    tags: ['Vue', 'Node.js', 'AI', 'Chatbot']
  },
  {
    id: 2,
    title: 'CCTVmap MFU',
    description: 'A full-stack online store with real-time inventory management, secure payments, and an intuitive user interface.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
    tags: ['React', 'Next.js', 'Stripe']
  },
  {
    id: 3,
    title: 'Room Booking System forMFU',
    description: 'A web application for Mae Fah Luang University staff to book rooms. Built with Vue 3 (Frontend) and Express.js (Backend API Gateway). Features include MFU SSO (OAuth2) integration, real-time room availability search, booking management, bilingual support, and a custom modern Dark Glassmorphism UI.',
    image: '/assets/Roombooking.png',
    tags: ['Vue 3', 'Node.js', 'OAuth2', 'Docker']
  }
]);

const selectedProject = ref(null);
const isImageZoomed = ref(false);

const openDetails = (project) => {
  selectedProject.value = project;
  isImageZoomed.value = false;
  document.body.style.overflow = 'hidden';
};

const closeDetails = () => {
  selectedProject.value = null;
  isImageZoomed.value = false;
  document.body.style.overflow = '';
};

const toggleZoom = () => {
  isImageZoomed.value = !isImageZoomed.value;
};
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
            <div class="project-overlay" @click="openDetails(project)">
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

    <!-- Trello-style Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click.self="closeDetails">
      <div class="modal-card">
        <button class="close-modal" @click="closeDetails">&times;</button>
        
        <!-- Top 30% Image -->
        <div class="modal-cover" @click="toggleZoom">
          <img :src="selectedProject.image" :alt="selectedProject.title" />
          <div class="expand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
            <span>Click to Expand</span>
          </div>
        </div>

        <!-- Bottom 70% Content -->
        <div class="modal-body">
          <div class="modal-header-content">
             <div class="project-tags">
               <span v-for="tag in selectedProject.tags" :key="tag" class="tag">{{ tag }}</span>
             </div>
             <h2 class="modal-title">{{ selectedProject.title }}</h2>
          </div>
          
          <div class="modal-details">
            <h3>Description</h3>
            <p>{{ selectedProject.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Image Zoom Overlay -->
    <div v-if="isImageZoomed" class="zoom-overlay" @click="toggleZoom">
      <button class="close-zoom" @click.stop="toggleZoom">&times;</button>
      <img :src="selectedProject.image" class="zoomed-image" />
    </div>

  </section>
</template>

<style scoped>
.projects-section {
  min-height: 100vh;
  padding: 100px 0;
  position: relative;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
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
  .modal-card {
    height: 90vh;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-card {
  background: var(--color-bg-base);
  width: 100%;
  max-width: 800px;
  height: 80vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid var(--color-border);
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.modal-cover {
  height: 30%;
  width: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
}

.modal-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-cover:hover img {
  transform: scale(1.05);
}

.expand-icon {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0,0,0,0.6);
  padding: 8px 14px;
  border-radius: 8px;
  color: white;
  font-size: 0.85rem;
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-cover:hover .expand-icon {
  opacity: 1;
}

.modal-body {
  height: 70%;
  padding: 2.5rem;
  overflow-y: auto;
  background: linear-gradient(to bottom, var(--color-bg-surface), var(--color-bg-base));
}

.modal-header-content {
  margin-bottom: 2rem;
}

.modal-title {
  font-size: 2.2rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.modal-details h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-details h3::before {
  content: '';
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-accent-primary);
}

.modal-details p {
  color: var(--color-text-primary);
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Zoom Overlay */
.zoom-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
  padding: 2rem;
}

.zoomed-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0,0,0,0.5);
  animation: zoomPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.close-zoom {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  color: white;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  z-index: 1101;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.close-zoom:hover {
  opacity: 1;
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes zoomPop {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
