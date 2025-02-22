import React, { useState, useEffect } from 'react';
import defaultProfile from "../../images/default_profile.jpg"

const ViewEmployeeModal = ({ isViewOpen, onViewClose, selectedEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [designation, setDesignation] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Populate form fields when selectedEmployee changes
    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setEmail(selectedEmployee.email);
            setPhone(selectedEmployee.phone);
            setAddress(selectedEmployee.address);
            setDesignation(selectedEmployee.designation);
            setImagePreview(selectedEmployee.image);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setDesignation('');
            setImage(null);
            setImagePreview(null);
        }
    }, [selectedEmployee]);

    if (!isViewOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onViewClose()}
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-10">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Employee Information
                </h2>
                <hr />
                <form className='my-3'>
                    {/* Image Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Employee Image</label>
                        {imagePreview
                            ? (<div className="mt-2 relative flex justify-center">
                                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />

                            </div>)
                            : <div className="mt-2 relative flex justify-center">
                                <img src={defaultProfile} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                            </div>
                        }
                    </div>

                    <table className="table-auto w-full mb-3">
                        <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                            <tr className='mb-4'>
                                <td >
                                    <label className="block text-sm font-medium">Name</label>
                                </td>
                                <td className='p-1'>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className='mb-4'>
                                <td>
                                    <label className="block text-sm font-medium">Email</label>
                                </td>
                                <td className='p-1'>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className='pb-4'>
                                <td>
                                    <label className="block text-sm font-medium">Contact</label>
                                </td>
                                <td className='p-1'>
                                    <input
                                        type="number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className='pb-4'>
                                <td>
                                    <label className="block text-sm font-medium">Designation</label>
                                </td>
                                <td className='p-1'>
                                    <input
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr className='pb-4'>
                                <td>
                                    <label className="block text-sm font-medium">Address</label>
                                </td>
                                <td className='p-1'>
                                    <textarea
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                        readOnly

                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                </form>
                {/* Close Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onViewClose}
                        className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeModal;