"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { SeatBooking } from "@prisma/client";

interface MyBookingsProps {
    myBookings: SeatBooking[]
}

export default function MyBookings({
    myBookings }:
    MyBookingsProps) {

    const [selectedBooking, setSelectedBooking] = useState<string | null>(myBookings[0]?.id || null);
    const tableRef = useRef<HTMLDivElement>(null);

    const downloadAsImageOrPDF = async () => {
        if (!tableRef.current) return;

        const canvas = await html2canvas(tableRef.current, {
            useCORS: true,
            scale: 2,
        });

        const image = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(image);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`ticket-${selectedBooking}.pdf`);
    };

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-100 border-r border-gray-200">
                <ScrollArea className="p-4">
                    <ul>
                        {myBookings.map((booking) => (
                            <li
                                key={booking.id}
                                className={cn(
                                    "cursor-pointer p-2 rounded-md",
                                    selectedBooking === booking.id
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-200"
                                )}
                                onClick={() => setSelectedBooking(booking.id)}
                            >
                                Seat {booking.seatNumber} - {booking.totalAmount}$
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </aside>

            <main className="flex-1 p-6">
                {selectedBooking ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
                        <div ref={tableRef} className="bg-white p-4 rounded-lg shadow-md">
                            <table className="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">Field</th>
                                        <th className="border border-gray-300 px-4 py-2">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myBookings
                                        .filter((b) => b.id === selectedBooking)
                                        .map((booking) => (
                                            <>
                                                <tr key="id">
                                                    <td className="border border-gray-300 px-4 py-2">Booking ID</td>
                                                    <td className="border border-gray-300 px-4 py-2">{booking.id}</td>
                                                </tr>
                                                <tr key="seatNumber">
                                                    <td className="border border-gray-300 px-4 py-2">Seat Number</td>
                                                    <td className="border border-gray-300 px-4 py-2">{booking.seatNumber}</td>
                                                </tr>
                                                <tr key="bookedAt">
                                                    <td className="border border-gray-300 px-4 py-2">Booked At</td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        {new Date(booking.bookedAt).toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr key="tableLayoutId">
                                                    <td className="border border-gray-300 px-4 py-2">Table Layout ID</td>
                                                    <td className="border border-gray-300 px-4 py-2">{booking.tableLayoutId}</td>
                                                </tr>
                                                <tr key="totalAmount">
                                                    <td className="border border-gray-300 px-4 py-2">Total Amount</td>
                                                    <td className="border border-gray-300 px-4 py-2">${booking.totalAmount}</td>
                                                </tr>
                                                <tr key="timeSlote">
                                                    <td className="border border-gray-300 px-4 py-2">Time Slot</td>
                                                    <td className="border border-gray-300 px-4 py-2">{booking.timeSlote}</td>
                                                </tr>
                                                <tr key="orderItemId">
                                                    <td className="border border-gray-300 px-4 py-2">Order Item ID</td>
                                                    <td className="border border-gray-300 px-4 py-2">{booking.orderItemId}</td>
                                                </tr>
                                            </>
                                        ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-6">
                                <QRCodeSVG
                                    value={JSON.stringify(
                                        myBookings.find((b) => b.id === selectedBooking) || {}
                                    )}
                                    size={128}
                                />
                            </div>
                        </div>
                        <button
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={downloadAsImageOrPDF}
                        >
                            Download as PDF
                        </button>
                    </div>
                ) : (
                    <p>Select a booking to view details.</p>
                )}
            </main>
        </div>
    );
}
