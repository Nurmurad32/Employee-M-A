import React, { useState } from 'react';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import AddEmployeeModal from '../components/modal/AddEmployeeModal';
import ViewEmployeeModal from '../components/modal/ViewEmployeeModal';

const EmployeeTableView = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isViewEmployeeModalOpen, setIsViewEmployeeModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Add this line

  const openAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(true);
  };

  const handleEmployeeCreated = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    setIsAddEmployeeModalOpen(true); // Open the modal
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee); // Set the selected employee
    setIsViewEmployeeModalOpen(true); // Open the modal
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="flex justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Table View</h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          {/* Add view button */}
          <button
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
            onClick={openAddEmployeeModal}
          >
            <svg
              className="shrink-0 fill-current text-white dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-1">Add Employee</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <DashboardCard10 key={refreshKey} onEditEmployee={handleEditEmployee} onViewEmployee={handleViewEmployee} />
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddEmployeeModalOpen}
        onClose={() => {
          setIsAddEmployeeModalOpen(false);
          setSelectedEmployee(null); // Reset selected employee when modal is closed
        }}
        onEmployeeCreated={handleEmployeeCreated}
        selectedEmployee={selectedEmployee} // Pass the selected employee
      />

      {/* View Employee Modal */}
      <ViewEmployeeModal
        isViewOpen={isViewEmployeeModalOpen}
        onViewClose={() => {
          setIsViewEmployeeModalOpen(false);
          setSelectedEmployee(null); // Reset selected employee when modal is closed
        }}
        selectedEmployee={selectedEmployee} // Pass the selected employee
      />
    </div>
  );
};

export default EmployeeTableView;