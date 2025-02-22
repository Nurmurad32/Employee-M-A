import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import AddEmployeeModal from '../components/modal/AddEmployeeModal';

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

    // Function to open the modal
    //   const openAddEmployeeModal = () => {
    //     setIsAddEmployeeModalOpen(true);
    //   };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main content */}
                <main className="grow">
                    <Outlet />
                </main>
            </div>

            {/* Add Employee Modal */}
            {/* <AddEmployeeModal
                isOpen={isAddEmployeeModalOpen}
                onClose={() => setIsAddEmployeeModalOpen(false)}
            /> */}
        </div>
    );
}

export default Layout;