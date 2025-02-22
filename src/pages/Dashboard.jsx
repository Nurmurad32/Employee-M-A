import React from 'react';
import Datepicker from '../components/Datepicker';

function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto h-[80vh] flex flex-col">
      {/* Dashboard actions */}
      <div className="flex justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Datepicker align="right" />
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 flex justify-center items-center">
        {/* Welcome Message Box */}
        <div className="col-span-8 flex justify-center items-center p-6 md:py-16 md:px-30 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center">
            Welcome to <br /> Employee Management App
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;