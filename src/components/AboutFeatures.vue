<template>
  <section class="features-bar">
    <div class="container">
      <div class="features-grid">
        
        <!-- About Section -->
        <div class="about-col">
          <h3 class="about-title display-font">ABOUT OUR GYM</h3>
          <p class="about-desc">
            We provide top quality equipment, expert trainers and a motivating environment to help you reach your full potential.
          </p>
          <RouterLink to="/about" class="learn-more-link">
            LEARN MORE <span class="arrow">→</span>
          </RouterLink>
        </div>

        <!-- Features Icons Section -->
        <div class="features-items">
          
          <div class="feature-card">
            <div class="feature-icon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6.5 6.5 11 11"/>
                <path d="m21 21-1 1a2 2 0 0 1-2.8 0l-2.5-2.5a2 2 0 0 1 0-2.8l1-1"/>
                <path d="m3 3 1-1a2 2 0 0 1 2.8 0l2.5 2.5a2 2 0 0 1 0 2.8l-1 1"/>
                <path d="m18 22 4-4"/>
                <path d="m2 6 4-4"/>
                <path d="m3 10 7-7"/>
                <path d="m14 21 7-7"/>
              </svg>
            </div>
            <h4 class="feature-title display-font">MODERN EQUIPMENT</h4>
            <p class="feature-desc">State-of-the-art machines for the best results.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon2">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h4 class="feature-title display-font">EXPERT TRAINERS</h4>
            <p class="feature-desc">Certified coaches to guide you at every step.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon3">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
              </svg>
            </div>
            <h4 class="feature-title display-font">DIFFERENT CLASSES</h4>
            <p class="feature-desc">Wide variety of classes for all fitness levels.</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon4">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h4 class="feature-title display-font">FLEXIBLE HOURS</h4>
            <p class="feature-desc">Work out on your time with flexible schedule.</p>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.features-bar {
  background-color: var(--color-surface, #080b12);
  border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));
  padding: 56px 0;
  color: #ffffff;
  position: relative;
  z-index: 3;
}

.features-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 40px;
  align-items: center;
}

/* About Column */
.about-col {
  padding-right: 32px;
  border-right: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
}

.about-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-bottom: 12px;
}

.about-desc {
  font-size: 13.5px;
  color: var(--color-text-muted, #9aa0a6);
  line-height: 1.6;
  margin-bottom: 20px;
}

.learn-more-link {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: var(--color-primary-light, #3b7dff);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.learn-more-link:hover {
  gap: 12px;
  text-shadow: 0 0 12px rgba(var(--bs-primary-rgb), 0.6);
}

/* Features List */
.features-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  text-align: center;
  padding: 20px 12px;
  border-radius: 12px;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.feature-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--color-border);
  box-shadow: 0 10px 30px -10px rgba(var(--bs-primary-rgb), 0.3);
}

.feature-icon1 {
  color: var(--color-primary-light, #3b7dff);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.feature-card:hover .feature-icon1 {
  transform: scale(1.15);
  filter: drop-shadow(0 0 12px rgba(var(--bs-primary-rgb), 0.8));
}

.feature-icon2 {
  color: var(--color-accent-2, #3b7dff);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.feature-card:hover .feature-icon2 {
  transform: scale(1.15);
  filter: drop-shadow(0 0 12px rgba(var(--bs-primary-rgb), 0.8));
}

.feature-icon3 {
  color: #f5312a;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.feature-card:hover .feature-icon3 {
  transform: scale(1.15);
  filter: drop-shadow(0 0 12px rgba(var(--bs-primary-rgb), 0.8));
}

.feature-icon4 {
  color: var(--color-accent-1, #3b7dff);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.feature-card:hover .feature-icon4 {
  transform: scale(1.15);
  filter: drop-shadow(0 0 12px rgba(var(--bs-primary-rgb), 0.8));
}

.feature-title {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
  color: #ffffff;
}

.feature-desc {
  font-size: 12.5px;
  color: var(--color-text-muted, #9aa0a6);
  line-height: 1.5;
  margin: 0;
}

/* Responsive */
@media (max-width: 1100px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
  .about-col {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));
    padding-bottom: 30px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .features-items {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .features-items {
    grid-template-columns: 1fr;
  }
}
</style>