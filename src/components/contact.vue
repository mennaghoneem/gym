<template>
  <section class="contact">
    <div class="container">

      <div class="heading">
        <span>GET IN TOUCH</span>
        <h1>Contact Us</h1>
        <p>Have a question? We are here to help.</p>
      </div>

      <div class="contact-content">

        <div class="contact-info">

          <div class="info-card">
            <h3>Phone</h3>
            <p>01001432177</p>
          </div>

          <div class="info-card">
            <h3>Email</h3>
            <p>ebrahemabdulla59@gmail.com</p>
          </div>

          <div class="info-card">
            <h3>Address</h3>
            <p>mansora, Egypt</p>
          </div>

        </div>

        <form class="contact-form">

          <input type="text" placeholder="Your Name">

          <input type="email" placeholder="Your Email">

          <textarea placeholder="Your Message"></textarea>

          <button type="submit">Send Message</button>

        </form>
  


 
</div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.contact {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.contact-info {
  display: grid;
  gap: 20px;
}

.info-card {
  background: #0A0E17;
  padding: 25px;
  border: 1px solid #3A1030;
  border-radius: 18px;
  transition: 0.3s;
}

.info-card:hover {
  border-color: #FF2E9A;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(255, 46, 154, 0.15);
}

.info-card h3 {
  color: #FF2E9A;
  margin-bottom: 10px;
}

.info-card p {
  color: #8C8C8C;
}

.contact-form {
  background: #0A0E17;
  padding: 30px;
  border: 1px solid #3A1030;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: #0D0A0E;
  color: #F5F5F5;
  border: 1px solid #3A1030;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #FF2E9A;
}

.contact-form textarea {
  height: 150px;
  resize: none;
}

.contact-form button {
  padding: 13px 25px;
  border: none;
  border-radius: 25px;
  background: #FF2E9A;
  color: #F5F5F5;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.contact-form button:hover {
  background: #FF6FC4;
}

@media (max-width: 800px) {

  .contact-content {
    grid-template-columns: 1fr;
  }

}

@media (max-width: 600px) {

  .contact {
    padding: 60px 20px;
  }

  .heading h1 {
    font-size: 34px;
  }

}

</style>