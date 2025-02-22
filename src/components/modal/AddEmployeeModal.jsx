import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Base_URL } from '../../server/baseURL';

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeCreated, selectedEmployee }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [designation, setDesignation] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    // Error states
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        designation: '',
        image: '',
    });

    // Populate form fields when selectedEmployee changes
    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setEmail(selectedEmployee.email);
            setPhone(selectedEmployee.phone);
            setAddress(selectedEmployee.address);
            setDesignation(selectedEmployee.designation);
            setImagePreview(selectedEmployee.image); // Use Cloudinary URL directly
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

    //   const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //       // Check file size (300KB = 300 * 1024 bytes)
    //       if (file.size > 300 * 1024) {
    //         setErrors((prevErrors) => ({
    //           ...prevErrors,
    //           image: 'Image must be less than 300KB',
    //         }));
    //         setImage(null); // Clear the image state
    //         setImagePreview(null); // Clear the image preview
    //         return; // Stop further execution
    //       }

    //       // If the file is valid, proceed
    //       setErrors((prevErrors) => ({
    //         ...prevErrors,
    //         image: '', // Clear any previous image error
    //       }));
    //       setImage(file);
    //       setImagePreview(URL.createObjectURL(file)); // Preview the selected image
    //     }
    //   };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (300KB = 300 * 1024 bytes)
            if (file.size > 300 * 1024) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    image: 'Image must be less than 300KB',
                }));
                setImage(null); // Clear the image state
                setImagePreview(null); // Clear the image preview
                return; // Stop further execution
            }

            // If the file is valid, proceed
            setErrors((prevErrors) => ({
                ...prevErrors,
                image: '', // Clear any previous image error
            }));
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Preview the selected image
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop if validation fails
        }

        // Check if the image error exists before submitting
        if (errors.image) {
            return;
        }

        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('designation', designation);
        if (image) formData.append('image', image); // Append image file

        try {
            const url = selectedEmployee
                ? `${Base_URL}/api/employees/${selectedEmployee._id}`
                : `${Base_URL}/api/employees`;
            const method = selectedEmployee ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save employee');
            }

            const data = await response.json();
            console.log('Employee saved:', data);
            onClose();
            onEmployeeCreated();

            // Show success message
            Swal.fire({
                title: `${selectedEmployee ? 'Updated!' : 'Created!'}`,
                text: `Your file has been ${selectedEmployee ? 'updated' : 'created'}.`,
                icon: 'success',
            });
        } catch (err) {
            console.error('Error:', err.message);

            // Show error message
            Swal.fire({
                title: 'Error!',
                text: err.message,
                icon: 'error',
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };


    const handleResetImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            phone: '',
            address: '',
            designation: '',
            image: '',
        };

        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!phone.trim()) {
            newErrors.phone = 'Contact is required';
            isValid = false;
        }

        if (!address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        if (!designation.trim()) {
            newErrors.designation = 'Designation is required';
            isValid = false;
        }

        if (!selectedEmployee && !image) {
            newErrors.image = 'Image is required';
            isValid = false;
        }

        // Check image size
        if (image && image.size > 300 * 1024) {
            newErrors.image = 'Image must be less than 300KB';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!validateForm()) {
    //       return; // Stop if validation fails
    //     }

    //     setLoading(true); // Start loading

    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('email', email);
    //     formData.append('phone', phone);
    //     formData.append('address', address);
    //     formData.append('designation', designation);
    //     if (image) formData.append('image', image); // Append image file

    //     try {
    //       const url = selectedEmployee
    //         ? `${Base_URL}/api/employees/${selectedEmployee._id}`
    //         : `${Base_URL}/api/employees`;
    //       const method = selectedEmployee ? 'PUT' : 'POST';

    //       const response = await fetch(url, {
    //         method,
    //         body: formData,
    //       });

    //       if (!response.ok) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.error || 'Failed to save employee');
    //       }

    //       const data = await response.json();
    //       console.log('Employee saved:', data);
    //       onClose();
    //       onEmployeeCreated();

    //       // Show success message
    //       Swal.fire({
    //         title: `${selectedEmployee ? 'Updated!' : 'Created!'}`,
    //         text: `Your file has been ${selectedEmployee ? 'updated' : 'created'}.`,
    //         icon: 'success',
    //       });
    //     } catch (err) {
    //       console.error('Error:', err.message);

    //       // Show error message
    //       Swal.fire({
    //         title: 'Error!',
    //         text: err.message,
    //         icon: 'error',
    //       });
    //     } finally {
    //       setLoading(false); // Stop loading
    //     }
    //   };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
            <div className="bg-white h-[550px] overflow-y-scroll dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative z-10">
                <h2 className="text-xl font-semibold mb-4">
                    {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Contact</label>
                        <input
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Designation Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Designation</label>
                        <select
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        >
                            <option value="">Select Designation</option>
                            <option value="HR">HR</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                        </select>
                        {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
                    </div>

                    {/* Address Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        {imagePreview && (
                            <div className="mt-2 relative">
                                <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                                <button
                                    type="button"
                                    onClick={handleResetImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        {/* <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 flex items-center justify-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                selectedEmployee ? 'Update' : 'Submit'
              )}
            </button> */}
                        <button
                            type="submit"
                            className={`px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-lg hover:bg-violet-600 flex items-center justify-center ${errors.image ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading || errors.image} // Disable if loading or image error exists
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                            ) : (
                                selectedEmployee ? 'Update' : 'Submit'
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;