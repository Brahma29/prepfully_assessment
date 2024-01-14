let availableSlots = require('../data/slots.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * Route /appointments
 * METHOD GET
 * Description This controller returns the list of appointment slots
 * return {success: Boolean, message: String, slots: Array<{date: Date, status: ENUM("available", "booked"), spots: Array<{status : ENUM("available" |"booked"), timeSlot : TIME}>}>}
 */

const getAppointmentSlots = (req, res, next) => {
    try {
        return res.status(200).json({ success: true, message: "Appintments fetched successfully.", slots: availableSlots })
    } catch {
        return next(error)
    }
}

/**
 * Route /appointments
 * METHOD POST
 * Description This controller handles the logic of creating an appointment
 * return {success: Boolean, message: String, appointment: Appointment}
 */

const createAppointment = (req, res, next) => {
    try {
        const { date, slotTime, name } = req.body;
        console.log("body", req.body)

        let appointments = [];

        try {
            appointments = JSON.parse(fs.readFileSync('./data/appointments.json', 'utf-8'));
        } catch (error) {
            return next(error);
        }

        const day = availableSlots.days.find(day => day.date === date);

        if (!day) {
            return res.status(404).json({ success: false, message: 'Date not found' });
        }

        const spot = day.spots.find(spot => spot.slotTime === slotTime && spot.status === 'available');

        if (!spot) {
            return res.status(400).json({ success: false, message: 'Appointment already booked' });
        }

        spot.status = 'booked';

        const newAppointment = {
            id: uuidv4(),
            date,
            slotTime,
            name,
        };

        appointments.push(newAppointment);

        fs.writeFileSync('./data/appointments.json', JSON.stringify(appointments, null, 2));

        fs.writeFileSync('./data/slots.json', JSON.stringify(availableSlots, null, 2));

        res.status(201).json({ success: true, message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        return next(error)
    }
}


module.exports = { createAppointment, getAppointmentSlots }