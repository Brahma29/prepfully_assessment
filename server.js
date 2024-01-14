const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//Routes
const appointmentRoutes = require('./routes/Appointment.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Api is running..."
    })
})

app.use('/api/v1/appointments', appointmentRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App is listening at port: ${process.env.PORT}`)
})