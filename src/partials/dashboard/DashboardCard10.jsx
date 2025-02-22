import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Base_URL } from '../../server/baseURL';

function DashboardCard10({ onEditEmployee, onViewEmployee }) {
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
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="flex justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Employees</h2>
        <input
          type="search"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
        />
      </header>
      <div className="p-3">
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

        {/* Table */}
        {!isLoading && filteredEmployees.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Designation</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Contact</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Address</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                          <img
                            className=" rounded-full object-cover border"
                            src={employee.image}
                            alt={employee.name}
                            width="40"
                            height="40"
                            // style={{ display: imageLoaded ? 'block' : 'none' }}
                          />
                        </div>
                        <div className="text-xs text-gray-800 dark:text-gray-100">{employee.name}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-xs">{employee.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left text-xs text-green-500">{employee.designation}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-xs text-center">{employee.phone}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-xs text-center">{employee.address}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-xs text-center">
                        <button
                          onClick={() => handleView(employee)}
                          className="text-green-500 hover:text-green-700 mr-2"
                        >
                          View
                        </button>{' '}
                        <br />
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardCard10;