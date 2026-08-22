<template>
  <div class="about-page">
    <div class="container">
      <!-- Hero Header -->
      <header class="about-header">
        <h1 class="title">WE ARE <span class="highlight">GYM FITNESS</span></h1>
        <p class="subtitle">
          Empowering your journey to a healthier, stronger, and more confident version of yourself.
        </p>
      </header>

      <!-- Stats Grid -->
      <section class="stats-grid">
        <div class="stat-card">
          <span class="stat-number">5+</span>
          <span class="stat-label">Years Experience</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">1200+</span>
          <span class="stat-label">Active Members</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">25+</span>
          <span class="stat-label">Expert Coaches</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">100%</span>
          <span class="stat-label">Dedication</span>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="values-section">
        <div class="value-card">
          <h3>Our Mission</h3>
          <p>
            To provide top-tier fitness facilities, personalized guidance, and a supportive community for everyone to reach their personal goals.
          </p>
        </div>

        <div class="value-card">
          
          <h3>Our Vision</h3>
          <p>
            To transform lives through movement, consistency, and expert coaching, making wellness an enjoyable lifestyle.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background-color: var(--color-bg);
  color: var(--color-text);
  padding: 60px 20px;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.about-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 16px;
  color: var(--color-text);
}

.highlight {
  color: var(--color-primary-light, var(--color-primary));
}

.subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Stats Styling */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary-light, var(--color-primary));
}

.stat-number {
  font-size: 2.4rem;
  font-weight: 800;
  color: var(--color-primary-light, var(--color-primary));
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

/* Values Styling */
.values-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.value-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 36px;
  text-align: left;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
}


.value-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
}

.value-card p {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}

/* Responsiveness */
@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .values-section {
    grid-template-columns: 1fr;
  }
  .title {
    font-size: 2.2rem;
  }
}
</style>