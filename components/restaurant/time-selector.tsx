"use client";

import { useOrder } from "@/app/hooks/useOrder";
import { TimeSlote } from "@prisma/client";

const TimeSelector = () => {
    const timeSlots = [
        { id: "A", time: "10:00 AM - 12:00 PM" },
        { id: "B", time: "12:00 PM - 2:00 PM" },
        { id: "C", time: "2:00 PM - 4:00 PM" },
        { id: "D", time: "4:00 PM - 6:00 PM" },
        { id: "E", time: "6:00 PM - 8:00 PM" },
        { id: "F", time: "8:00 PM - 10:00 PM" },
    ];

    const { setSelectedTime, selectedTime } = useOrder();

    const handleSelect = (timeSlotId: TimeSlote) => {
        setSelectedTime(timeSlotId);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm font-medium">Select a time slot:</p>
            <div className="flex flex-wrap gap-4">
                {timeSlots.map(({ id, time }) => (
                    <button
                        key={id}
                        onClick={() => handleSelect(id as TimeSlote)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium 
                            ${selectedTime === id
                                ? "bg-blue-300 text-blue-500 font-bold hover:bg-blue-200"
                                : "bg-white text-gray-700 border-gray-300"
                            }
                            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeSelector;
