import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

function MyCalendar() {
    // State to track whether the calendar is visible
    const [isCalendarVisible, setCalendarVisible] = useState(false);

    // State to track the selected date
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to show/hide the calendar
    const toggleCalendar = () => {
        setCalendarVisible(!isCalendarVisible);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            <button onClick={toggleCalendar}>
                {isCalendarVisible ? 'Hide Calendar' : 'Show Calendar'}
            </button>
            {isCalendarVisible && (
                <div>
                    <Calendar className="CalendarCSS" onChange={handleDateChange} value={selectedDate} />
                    <p>Selected Date: {selectedDate.toDateString()}</p>
                </div>
            )}
        </div>
    );
}

export default MyCalendar;
