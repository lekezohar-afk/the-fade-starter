import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-extrabold text-gray-900">The Fade</h1>
        <p className="text-xl text-gray-500 italic mt-1">
          The global directory of Black barbershops.
        </p>

        <div className="mt-6 space-y-2">
          <p className="text-lg font-semibold text-gray-900">
            For the backpacker and the businessman.
          </p>
          <p className="text-lg font-semibold text-gray-900">
            For the student, the diplomat, the dad.
          </p>
          <p className="text-md text-gray-600">
            Wherever you go, find a barber you can trust.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Join the Movement
          </h2>
          <p className="text-md text-gray-600 mt-1">
            We’re building the largest community-powered database of Black barbers in the world — and we need you.
          </p>
          <ul className="list-disc list-inside text-md text-gray-700 mt-3 space-y-1">
            <li><strong>Submit a barbershop:</strong> Know a great shop? Add it to our directory.</li>
            <li><strong>Search barbers by city:</strong> Launching soon in London, NYC, and Lagos — and expanding fast.</li>
            <li><strong>Leave a review:</strong> Know a trusted and reliable barber?</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link to="/submit">
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
              Add a Barbershop
            </button>
          </Link>
          <Link to="/shops">
            <button className="bg-white border border-black px-6 py-3 rounded hover:bg-gray-100">
              View All Shops
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}