<template>
  <section class="about">
    <div class="container">

      <div class="heading">
        <span>ABOUT US</span>
        <h1>More Than Just A Gym</h1>
        <p>
          We help you become stronger, healthier, and more confident.
        </p>
      </div>

      <div class="about-content">

        <div class="about-text">
          <h2>Train Hard. Stay Strong.</h2>

          <p>
            Our gym is a place where fitness meets motivation.
            We provide professional trainers, modern equipment,
            and a friendly environment to help you achieve your goals.
          </p>

          <p>
            Whether you want to build muscle, lose weight, improve
            your fitness, or simply live a healthier lifestyle,
            we are here to support you every step of the way.
          </p>
        </div>

        <div class="features">

          <div class="feature">
            <h3>Professional Trainers</h3>
            <p>Experienced trainers ready to guide and motivate you.</p>
          </div>

          <div class="feature">
            <h3>Modern Equipment</h3>
            <p>Quality equipment for effective and safe workouts.</p>
          </div>

          <div class="feature">
            <h3>Healthy Lifestyle</h3>
            <p>Helping you build strong and healthy habits.</p>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.about {
  min-height: 100vh;
  padding: 80px 30px;
  background: #0D0A0E;
  color: #F5F5F5;
}

.container {
  max-width: 1200px;
  margin: auto;
}

.heading {
  text-align: center;
  margin-bottom: 55px;
}

.heading span {
  color: #FF2E9A;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 3px;
}

.heading h1 {
  font-size: 45px;
  margin: 12px 0;
  color: #FF2E9A;
}

.heading p {
  color: #8C8C8C;
  font-size: 16px;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.about-text {
  background: #0A0E17;
  padding: 35px;
  border: 1px solid #3A1030;
  border-radius: 18px;
}

.about-text h2 {
  color: #F5F5F5;
  font-size: 28px;
  margin-bottom: 20px;
}

.about-text p {
  color: #8C8C8C;
  line-height: 1.8;
  margin-bottom: 15px;
}

.features {
  display: grid;
  gap: 20px;
}

.feature {
  background: #0A0E17;
  padding: 25px;
  border: 1px solid #3A1030;
  border-radius: 18px;
  transition: 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
  border-color: #FF2E9A;
  box-shadow: 0 10px 30px rgba(255, 46, 154, 0.15);
}

.feature h3 {
  color: #FF2E9A;
  margin-bottom: 10px;
}

.feature p {
  color: #8C8C8C;
  line-height: 1.6;
}

@media (max-width: 800px) {

  .about-content {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 600px) {

  .about {
    padding: 60px 20px;
  }

  .heading h1 {
    font-size: 34px;
  }

}

</style>