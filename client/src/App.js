import "./App.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { dateFormatter } from "./utils/dateFormatter";

function App() {
  const [value, onChange] = useState(new Date());
  const [appointment, setAppointment] = useState({
    date: "",
    slotTime: "",
    name: "",
  });

  const onSelectTimeSlot = (slotTime) => {
    setAppointment((prev) => ({ ...prev, date: value, slotTime }));
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);

  if (appointment.slotTime) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="border rounded-lg p-4 shadow-sm min-w-72"
          id="calendar_container"
        >
          <div className="appointment_info mb-4">
            <button
              className="text-sm font-medium"
              onClick={() =>
                setAppointment((prev) => ({ ...prev, slotTime: "" }))
              }
            >
              Back
            </button>
            <h2 className="text-xl font-bold text-gray-400 mb-2">
              Booking details
            </h2>

            <p>
              <span className="font-medium">Date:</span>
              {dateFormatter(value)}
            </p>
            <p>
              <span className="font-medium">Time:</span>
              {appointment.slotTime}
            </p>
          </div>

          <div className="personal_details">
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Please enter your name"
                className="rounded-md outline-none border border-gray-500 px-3 py-1 focus:border-blue-500"
              />
            </div>

            <button className="w-full py-1 font-medium bg-blue-500 text-white rounded-lg">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        <div
          className="border rounded-lg p-4 shadow-sm"
          id="calendar_container"
        >
          <div className="appointment_info mb-4">
            <h2 className="text-xl font-bold text-gray-400">
              Book an appointment
            </h2>
          </div>

          <div className="available_slots">
            <h2 className="text-xl font-bold mb-2">Select Date & Time</h2>
            <Calendar
              onChange={onChange}
              value={value}
              showNeighboringMonth={false}
              className="rounded-md"
            />
          </div>
        </div>
        <div
          className="border rounded-lg shadow-sm p-4 min-w-60"
          id="slots_list_container"
        >
          <p className="mb-4 text-lg font-medium">{dateFormatter(value)}</p>
          {Array(6)
            .fill(0)
            .map((date, i) => (
              <div
                key={i}
                className="slot p-2 mb-2 hover:bg-blue-500 hover:text-white transition-all cursor-pointer border text-blue-500 border-blue-500 rounded-md font-medium text-lg text-center"
                onClick={() => onSelectTimeSlot("12:30 AM")}
              >
                12:30 AM
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
