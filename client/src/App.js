import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { dateFormatter } from "./utils/dateFormatter";
import { useFetchAvailableSlots } from "./services/useFetchAvailableSlots";
import { toast } from "sonner";

function AppointmentDetails({ value, appointment, setAppointment, setReValidate, bookAppointment }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-lg p-4 shadow-sm min-w-72" id="calendar_container">
        <div className="appointment_info mb-4">
          <button
            className="text-sm font-medium"
            onClick={() => setAppointment((prev) => ({ ...prev, slotTime: "" }))}
          >
            Back
          </button>
          <h2 className="text-xl font-bold text-gray-400 mb-2">Booking details</h2>
          <p>
            <span className="font-medium">Date:</span>
            {dateFormatter(value)}
          </p>
          <p>
            <span className="font-medium">Time:</span>
            {appointment.slotTime}
          </p>
        </div>
        <form className="personal_details" onSubmit={bookAppointment}>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Please enter your name"
              className="rounded-md outline-none border border-gray-500 px-3 py-1 focus:border-blue-500"
              required
              onChange={(e) => setAppointment((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <button type="submit" className="w-full py-1 font-medium bg-blue-500 text-white rounded-lg">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

function AppointmentBooking({ value, onChange, data, onSelectTimeSlot }) {
  const { days } = data;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        <div className="border rounded-lg p-4 shadow-sm" id="calendar_container">
          <div className="appointment_info mb-4">
            <h2 className="text-xl font-bold text-gray-400">Book an appointment</h2>
          </div>
          <div className="available_slots">
            <h2 className="text-xl font-bold mb-2">Select Date & Time</h2>
            <Calendar
              onChange={onChange}
              value={value}
              showNeighboringMonth={false}
              className="rounded-md"
              locale="in-IN"
            />
          </div>
        </div>
        <div className="border rounded-lg shadow-sm p-4 min-w-60 flex flex-col" id="slots_list_container">
          <p className="mb-4 text-lg font-medium">{dateFormatter(value)}</p>
          {days
            .filter((d) => d.date === value.toISOString().split("T")[0])[0]
            .spots.map((spot, i) => (
              <button
                key={i}
                className={`slot p-2 mb-2  hover:text-white transition-all rounded-md font-medium text-lg text-center cursor-pointer ${spot.status === "booked" ? 'bg-red-400' : '  border hover:bg-blue-500 text-blue-500 border-blue-500 '}`}
                onClick={() => onSelectTimeSlot(spot.slotTime)}
                disabled={spot.status === "booked"}
              >
                {spot.slotTime}
                {spot.status === "booked" && `(${spot.status.toUpperCase()})`}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [value, onChange] = useState(new Date());
  const [appointment, setAppointment] = useState({
    date: "",
    slotTime: "",
    name: "",
  });

  const { data, loading, setReValidate } = useFetchAvailableSlots();

  const onSelectTimeSlot = (slotTime) => {
    setAppointment((prev) => ({ ...prev, date: value.toISOString().split("T")[0], slotTime }));
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + "/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      });

      const responseJson = await response.json();
      console.log({ responseJson });

      if (responseJson.success) {
        setAppointment({
          date: "",
          name: "",
          slotTime: "",
        });
        setReValidate((prev) => !prev);
        toast(responseJson.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return "Hang on for a minute...";

  if (appointment.slotTime) {
    return (
      <AppointmentDetails
        value={value}
        appointment={appointment}
        setAppointment={setAppointment}
        setReValidate={setReValidate}
        bookAppointment={bookAppointment}
      />
    );
  }

  return (
    <AppointmentBooking
      value={value}
      onChange={onChange}
      data={data}
      onSelectTimeSlot={onSelectTimeSlot}
    />
  );
}

export default App;
