<template>
  <section class="trainers">
    <div class="container">

      <div class="heading">
        <span>OUR TEAM</span>
        <h1>Meet Our Trainers</h1>
        <p>Professional trainers ready to help you reach your goals.</p>
      </div>

      <div class="trainers-grid">

        <div class="trainer-card" v-for="trainer in trainers" :key="trainer.id">

          <div class="trainer-image">
            <img :src="trainer.image" :alt="trainer.name">
          </div>

          <div class="trainer-info">
            <h2>{{ trainer.name }}</h2>
            <h3>{{ trainer.specialty }}</h3>
            <p>{{ trainer.experience }} Years Experience</p>
            <p class="description">{{ trainer.description }}</p>

            <button @click="showTrainer(trainer)">View Profile</button>
          </div>

        </div>

      </div>
      <div v-if="selectedTrainer" class="profile">
  <img :src="selectedTrainer.image" :alt="selectedTrainer.name">

  <h2>{{ selectedTrainer.name }}</h2>
  <h3>{{ selectedTrainer.specialty }}</h3>
  <p>{{ selectedTrainer.experience }} Years Experience</p>
  <p>{{ selectedTrainer.description }}</p>

  <button @click="selectedTrainer = null">Close</button>
</div>

    </div>
  </section>
</template>

<script>
import trainer1 from '../assets/trainer1.jpeg'
import trainer2 from '../assets/trainer2.jpeg'
import trainer3 from '../assets/trainer3.jpeg'
import trainer4 from '../assets/trainer4.jpeg'
import trainer5 from '../assets/trainer5.jpeg'
import trainer6 from '../assets/trainer6.jpeg'
var trainers = [
  {
    id: 1,
    name: "Ahmed Ali",
    specialty: "Fitness Trainer",
    experience: 5,
    description: "Helps you build a healthy body and improve your overall fitness.",
    image: trainer2
  },
  {
    id: 2,
    name: "Omar Hassan",
    specialty: "Strength Coach",
    experience: 7,
    description: "Specialized in strength training and building muscle safely.",
    image: trainer3
  },
  {
    id: 3,
    name: "Sara Mohamed",
    specialty: "Personal Trainer",
    experience: 4,
    description: "Creates personalized workouts to help you reach your fitness goals.",
    image: trainer1
  },
  {
    id: 4,
    name: "Youssef Ahmed",
    specialty: "Cardio Trainer",
    experience: 6,
    description: "Helps improve endurance, stamina, and cardiovascular fitness.",
    image: trainer4
  },
  {
    id: 5,
    name: "Mariam Adel",
    specialty: "Yoga Trainer",
    experience: 5,
    description: "Focuses on flexibility, balance, relaxation, and body control.",
    image: trainer5
  },
  {
    id: 6,
    name: "Mahmoud Samir",
    specialty: "CrossFit Coach",
    experience: 8,
    description: "Specialized in functional training, endurance, and high-intensity workouts.",
    image: trainer6
  }
]

export default {
 data() {
  return {
    trainers,
    selectedTrainer: null
  }
},

methods: {
  showTrainer(trainer) {
    this.selectedTrainer = trainer
  }
}
}
</script>

<style scoped>

.trainers {
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

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  align-items: stretch;
}

.trainer-card {
  background: #0A0E17;
  border: 1px solid #3A1030;
  border-radius: 18px;
  overflow: hidden;
  transition: 0.3s;
}

.trainer-card:hover {
  transform: translateY(-10px);
  border-color: #FF2E9A;
  box-shadow: 0 10px 30px rgba(255, 46, 154, 0.2);
}

.trainer-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.trainer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.trainer-image:hover img {
  transform: scale(1.08);
}

.trainer-info {
  padding: 25px;
  text-align: center;
}

.trainer-info h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.trainer-info h3 {
  margin: 0 0 12px;
  color: #FF2E9A;
  font-size: 16px;
}

.trainer-info p {
  color: #8C8C8C;
  margin-bottom: 20px;
}

.trainer-info button {
  padding: 11px 25px;
  border: none;
  border-radius: 25px;
  background: #FF2E9A;
  color: #F5F5F5;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.trainer-info button:hover {
  background: #FF6FC4;
}
.description {
  color: #8C8C8C;
  font-size: 14px;
  line-height: 1.6;
  min-height: 45px;
}
.profile {
  margin-top: 40px;
  padding: 30px;
  background: #0A0E17;
  border: 1px solid #FF2E9A;
  border-radius: 18px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(255, 46, 154, 0.15);
  animation: profileIn 0.4s ease;
}
.profile h2 {
  color: #F5F5F5;
  margin-bottom: 10px;
}

.profile h3 {
  color: #FF2E9A;
  margin-bottom: 15px;
}

.profile p {
  color: #8C8C8C;
  margin: 8px 0;
}

.profile img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #FF2E9A;
  margin-bottom: 20px;
}

.profile button {
  margin-top: 20px;
  padding: 10px 25px;
  border: none;
  border-radius: 8px;
  background: #FF2E9A;
  color: #F5F5F5;
  cursor: pointer;
}
@keyframes profileIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (max-width: 900px) {

  .trainers-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 600px) {

  .trainers {
    padding: 60px 20px;
  }

  .heading h1 {
    font-size: 34px;
  }

  .trainers-grid {
    grid-template-columns: 1fr;
  }

}

</style>