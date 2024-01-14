const { createAppointment, getAppointmentSlots } = require('../controllers/Appointment.controller');

const router = require('express').Router();

router.route('/').post(createAppointment).get(getAppointmentSlots)


module.exports = router