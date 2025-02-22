import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import EditMenu from '../../components/DropdownEditMenu';
import { Base_URL } from '../../server/baseURL';

function DashboardCard01({ onEditEmployee, onViewEmployee }) {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${Base_URL}/api/employees`);
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data); // Initialize filtered employees with all employees
      } catch (err) {
        console.error('Error fetching employees:', err);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchEmployees();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEmployees(employees); // Show all employees if search is empty
    } else {
      const filtered = employees.filter(
        (employee) =>
          employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEmployees(filtered); // Filter employees based on search query
    }
  }, [searchQuery, employees]);

  const handleEdit = (employee) => {
    onEditEmployee(employee);
  };

  const handleView = (employee) => {
    onViewEmployee(employee);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${Base_URL}/api/employees/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        // Remove the deleted employee from the state
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
        setFilteredEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );

        // Show success message
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        });
      } catch (err) {
        console.error('Error:', err.message);

        // Show error message
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete employee.',
          icon: 'error',
        });
      }
    }
  };

  return (
    <div className="col-span-full xl:col-span-12 dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="flex justify-center md:justify-end pb-4 border-b border-gray-100 dark:border-gray-700/60">
        <input
          type="search"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div>
        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
          </div>
        )}

        {/* No Data Available */}
        {!isLoading && filteredEmployees.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-6">
            No data available.
          </div>
        )}

        {/* Card */}
        {!isLoading && filteredEmployees.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredEmployees.map((employee) => (
              <div key={employee._id}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <div className="px-5 pt-5">
                  <header className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2"></h2>
                    {/* Menu button */}
                    <EditMenu align="right" className="relative inline-flex">
                      <li>
                        <button
                          onClick={() => handleView(employee)}
                          className="font-medium text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                          View
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleEdit(employee)}
                          className="font-medium text-sm 
                          text-blue-500 hover:text-blue-700
                           dark:text-blue-300 dark:hover:text-gray-200 flex py-1 px-3" to="#0">
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3" to="#0">
                          Delete
                        </button>
                      </li>
                    </EditMenu>
                  </header>
                  <div className="p-3">
                    {/* Employee Image */}
                    <div className="flex justify-center">
                      <img
                        className="w-24 h-24 rounded-full object-cover border"
                        src={employee.image}
                        alt={employee.name}
                        // style={{ display: imageLoaded ? 'block' : 'none' }}
                      />
                    </div>

                    {/* Employee Details */}
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.designation}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.phone}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{employee.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard01;