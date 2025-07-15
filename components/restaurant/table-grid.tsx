"use client";

import { saveTable } from "@/actions/restaurant/saveTablelayout";
import { toast } from "@/app/hooks/use-toast";
import { useOrder } from "@/app/hooks/useOrder";
import { SeatBooking, TableLayout } from "@prisma/client";
import React, { useState } from "react";

interface SeatReservationProps {
    mode: "user" | "host";
    tableLayout?: TableLayout
    restaurantId: string
    myBooking?: SeatBooking
}

export default function TableGrid({ mode, restaurantId, tableLayout, myBooking }: SeatReservationProps) {

    const [rows, setRows] = useState<number>(tableLayout?.rows || 0);
    const [cols, setCols] = useState<number>(tableLayout?.cols || 0);
    const [selectedSeats, setSelectedSeats] = useState<string[]>(tableLayout?.selectedSeats || []);
    const [disabledSeats, setDisabledSeats] = useState<string[]>(tableLayout?.disabledSeats || []);
    const [disableMode, setDisableMode] = useState<boolean>(false);

    const { setCurrentSelectedSeat, currentSelectedSeat, setTableId } = useOrder();



    const handleSeatClick = (row: number, col: number) => {
        const seatId = `${row}-${col}`;

        if (mode === "host" && disableMode) {
            if (disabledSeats.includes(seatId)) {
                setDisabledSeats(disabledSeats.filter((seat) => seat !== seatId));
            } else {
                setDisabledSeats([...disabledSeats, seatId]);
            }
        } else if (mode === "user") {
            if (!disabledSeats.includes(seatId)) {
                if (selectedSeats.includes(seatId)) {
                    setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
                } else {
                    setCurrentSelectedSeat(seatId);
                    setTableId(tableLayout?.id!);
                }
            }
        }
    };

    const renderGrid = () => {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const rowCells = [];
            for (let col = 0; col < cols; col++) {
                const seatId = `${row}-${col}`;
                const isSelected = selectedSeats.includes(seatId);
                const isDisabled = disabledSeats.includes(seatId);
                const mySeat = seatId === currentSelectedSeat;

                rowCells.push(
                    <div
                        key={seatId}
                        className={`w-10 h-10 m-1 flex items-center justify-center border rounded-lg cursor-pointer ${isDisabled
                            ? "bg-red-500 cursor-not-allowed"
                            : isSelected
                                ? "bg-slate-500"
                                : mySeat ? "bg-blue-500" : "bg-gray-300"
                            }`}
                        onClick={() => handleSeatClick(row, col)}
                    >
                        {seatId}
                    </div>
                );
            }
            grid.push(
                <div key={row} className="flex justify-center">
                    {rowCells}
                </div>
            );
        }
        return grid;
    };

    const handleSave = async () => {
        if (mode !== "host") return;
        if (rows == 0 || cols == 0) {
            toast({
                variant: "destructive",
                description: "Can not save, increase row or cloumns"
            })
            return
        }
        try {
            await saveTable({
                rows,
                cols,
                disabledSeats,
                restaurantId
            });
            toast({ description: "Table layout saved!" });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to save table configuration."
            });
        }
    };

    // const handleUserSelection = async () => {
    //     if (mode !== "user") return;
    //     try {
    //         await bookTable({
    //             seatId: currentSelectedSeat,
    //             tableId: tableLayout?.id!,
    //             userId: user?.id!
    //         })
    //         alert("Seats selected!");
    //     } catch (error) {
    //         console.error(error);
    //         toast({ description: "Failed to select seats." });
    //     }
    // };

    return (
        <div className="p-4">
            {mode === "host" && (
                <div className="flex items-end justify-center mb-4 space-x-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rows</label>
                        <input
                            type="number"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="block w-16 p-2 mt-1 border border-gray-300 rounded-md"
                            min="1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Columns</label>
                        <input
                            type="number"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                            className="block w-16 p-2 mt-1 border border-gray-300 rounded-md"
                            min="1"
                        />
                    </div>
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                        onClick={() => setDisableMode(!disableMode)}
                    >
                        {disableMode ? "Exit Disable Mode" : "Disable Seats"}
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-green-500 rounded-lg"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            )}
            <div className="flex flex-col items-center">{renderGrid()}</div>
        </div>
    );
}
