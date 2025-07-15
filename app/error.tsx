'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const GlobalError = ({ error, reset }: ErrorProps) => {
    useEffect(() => {
        console.error('Caught an error:', error);
    }, [error]);

    console.log(error.name)
    return (
        <div className="h-full flex justify-center items-center">
            <div>
                <h1 className="text-3xl font-bold">Unexpected Error</h1>
                <p>An unknown error occurred. Please try again later.</p>
                <button
                    onClick={reset}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default GlobalError;
