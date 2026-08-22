<template>
<div class="schedule-section">
<!-- Schedule Button -->
<button class="schedule-btn" @click="openSchedule">

      Schedule
</button>
<!-- Overlay + Modal -->
<div

      v-if="showSchedule"

      class="modal-overlay"

      @click.self="closeSchedule"
>
<div class="schedule-modal">
<!-- Header -->
<div class="modal-header">
<h2>Weekly Schedule</h2>
<button class="close-btn" @click="closeSchedule">

            ×
</button>
</div>
<!-- Schedule Table -->
<div class="schedule-table-wrapper">
<table class="schedule-table">
<thead>
<tr>
<th>Day</th>
<th>Time</th>
<th>Class</th>
<th>Trainer</th>
</tr>
</thead>
<tbody>
<tr

                v-for="(item, index) in schedule"

                :key="index"
>
<td>{{ item.day }}</td>
<td>{{ item.time }}</td>
<td>{{ item.class }}</td>
<td>{{ item.trainer }}</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</template>
<script setup>

import { ref } from 'vue'

const showSchedule = ref(false)

const schedule = [

  {

    day: 'Monday',

    time: '09:00 AM - 10:00 AM',

    class: 'Yoga',

    trainer: 'Sarah'

  },

  {

    day: 'Monday',

    time: '05:00 PM - 06:00 PM',

    class: 'Strength Training',

    trainer: 'Ahmed'

  },

  {

    day: 'Tuesday',

    time: '10:00 AM - 11:00 AM',

    class: 'Cardio',

    trainer: 'Mariam'

  },

  {

    day: 'Tuesday',

    time: '06:00 PM - 07:00 PM',

    class: 'CrossFit',

    trainer: 'Omar'

  },

  {

    day: 'Wednesday',

    time: '09:00 AM - 10:00 AM',

    class: 'Pilates',

    trainer: 'Nour'

  },

  {

    day: 'Wednesday',

    time: '05:00 PM - 06:00 PM',

    class: 'Boxing',

    trainer: 'Karim'

  },

  {

    day: 'Thursday',

    time: '10:00 AM - 11:00 AM',

    class: 'Yoga',

    trainer: 'Sarah'

  },

  {

    day: 'Thursday',

    time: '06:00 PM - 07:00 PM',

    class: 'Strength Training',

    trainer: 'Ahmed'

  },

  {

    day: 'Friday',

    time: '09:00 AM - 10:00 AM',

    class: 'Cardio',

    trainer: 'Mariam'

  },

  {

    day: 'Friday',

    time: '05:00 PM - 06:00 PM',

    class: 'Full Body',

    trainer: 'Omar'

  },

  {

    day: 'Saturday',

    time: '11:00 AM - 12:00 PM',

    class: 'CrossFit',

    trainer: 'Karim'

  },

  {

    day: 'Sunday',

    time: '04:00 PM - 05:00 PM',

    class: 'Pilates',

    trainer: 'Nour'

  }

]

function openSchedule() {

  showSchedule.value = true

}

function closeSchedule() {

  showSchedule.value = false

}
</script>
<style scoped>

.schedule-section {

  display: flex;

  justify-content: center;

  align-items: center;

}

.schedule-btn {

  padding: 12px 25px;

  border: none;

  border-radius: 8px;

  background: #000;

  color: white;

  font-size: 16px;

  cursor: pointer;

  transition: 0.3s;

}

.schedule-btn:hover {

  background: #333;

}

/* Overlay */

.modal-overlay {

  position: fixed;

  inset: 0;

  background: rgba(0, 0, 0, 0.65);

  display: flex;

  justify-content: center;

  align-items: center;

  z-index: 9999;

  padding: 20px;

}

/* Modal */

.schedule-modal {

  width: 90%;

  max-width: 900px;

  max-height: 85vh;

  background: white;

  border-radius: 15px;

  padding: 25px;

  overflow-y: auto;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);

}

/* Header */

.modal-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 20px;

}

.modal-header h2 {

  margin: 0;

  font-size: 28px;

  color: #111;

}

.close-btn {

  width: 40px;

  height: 40px;

  border: none;

  border-radius: 50%;

  background: #eee;

  color: #111;

  font-size: 28px;

  line-height: 1;

  cursor: pointer;

}

.close-btn:hover {

  background: #ddd;

}

/* Table */

.schedule-table-wrapper {

  width: 100%;

  overflow-x: auto;

}

.schedule-table {

  width: 100%;

  border-collapse: collapse;

  min-width: 650px;

}

.schedule-table th,

.schedule-table td {

  padding: 14px;

  text-align: left;

  border-bottom: 1px solid #ddd;

}

.schedule-table th {

  background: #111;

  color: white;

  font-weight: 600;

}

.schedule-table td {

  color: #333;

  background: white;

}

.schedule-table tr:hover td {

  background: #f5f5f5;

}

/* Responsive */

@media (max-width: 600px) {

  .modal-overlay {

    padding: 10px;

  }

  .schedule-modal {

    width: 95%;

    padding: 18px;

    max-height: 90vh;

  }

  .modal-header h2 {

    font-size: 22px;

  }

  .schedule-table th,

  .schedule-table td {

    padding: 10px;

    font-size: 14px;

  }

}
</style>
 