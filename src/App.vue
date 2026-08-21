<template>
  <div>
    <Trainers />
    <About />
    <Contact />
  </div>
</template>

<script>
import Trainers from './components/Trainers.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

export default {
  components: {
    Trainers,
    About,
    Contact
  }
}
</script>