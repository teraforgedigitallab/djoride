import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Car, Phone, Mail, Building, User, CheckCircle, Info, CreditCard, DollarSign, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import PriceDisplay from './PriceDisplay';

const razorPayImage = "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg";

const BookingForm = ({ cabDetails, onBack, userData = null, selectedCity }) => {
    // Default user data (in a real app, this would come from authentication)
    const defaultUserData = userData || {
        fullName: 'John Doe',
        companyName: 'ABC Corporation',
        email: 'john.doe@example.com',
        phone: '+1 234-567-8900'
    };

    // Get tomorrow's date for the default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultDate = tomorrow.toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        // User details (these would be pre-filled from auth in a real app)
        fullName: defaultUserData.fullName,
        companyName: defaultUserData.companyName,
        email: defaultUserData.email,
        phone: defaultUserData.phone,

        // Booking details
        travelers: 1,
        vehicles: 1,
        travelDate: defaultDate,
        travelTime: '10:00',
        pickupLocation: '',
        dropoffLocation: '',
        specialRequirements: '',

        // Additional traveler contact
        travelerName: '',
        travelerPhone: '',
        travelerEmail: '',

        // Payment method
        paymentMethod: 'corporate',
    });

    const [focused, setFocused] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Set focus state for input animations
    const handleFocus = (name) => {
        setFocused(prev => ({ ...prev, [name]: true }));
    };

    const handleBlur = (name) => {
        setFocused(prev => ({ ...prev, [name]: false }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // In a real app, this would send data to an API
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            console.log('Booking submitted:', { cabDetails, formData });
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting booking:", error);
        } finally {
            setSubmitting(false);
        }
    };

    // Format package type for display
    const formatPackageType = (type) => {
        if (type === '4hr40km') return '4 Hours / 40 KM';
        if (type === '8hr80km') return '8 Hours / 80 KM';
        if (type === 'airport') return 'Airport Transfer';
        return type;
    };

    // Input field styling with focus state
    const getInputClass = (name) => {
        return `w-full p-3 border ${focused[name] ? 'border-primary shadow-sm' : 'border-gray-300'} rounded-lg transition-all duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary`;
    };

    return (
        <AnimatePresence mode="wait">
            {submitted ? (
                // ...existing submitted state code...
                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="bg-primary text-white p-5 text-center">
                        <CheckCircle size={60} className="mx-auto mb-3" />
                        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                        <p className="text-white/90">Your reservation has been successfully processed.</p>
                    </div>

                    <div className="p-6 text-center">
                        <p className="mb-4 text-gray-700">
                            A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
                        </p>
                        <p className="mb-6 text-gray-700">
                            Your driver will be waiting for you at {formData.pickupLocation} on {new Date(formData.travelDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {formData.travelTime}.
                        </p>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6 inline-block">
                            <p className="text-lg font-bold text-primary">Booking Reference</p>
                            <p className="text-2xl font-mono tracking-wide">{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                        </div>

                        <Button onClick={onBack} size="lg">
                            Return to Dashboard
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header */}
                    <div className="bg-primary text-white p-4 md:p-5">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={onBack}
                                className="flex items-center text-white/90 hover:text-white text-sm"
                            >
                                <ArrowLeft size={16} className="mr-1" />
                                Back to selection
                            </button>
                            <h2 className="text-lg md:text-xl font-bold">Complete Your Booking</h2>
                        </div>
                    </div>

                    <div className="p-4 md:p-6">
                        {/* Booking Summary Card */}
                        <motion.div
                            className="mb-6 bg-gradient-to-r from-primary/5 to-gray-50 p-5 rounded-lg border border-gray-200"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <h3 className="text-primary font-bold text-lg mb-4 flex items-center">
                                <CheckCircle size={18} className="mr-2" />
                                Booking Summary
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm font-medium mb-1 text-gray-500">Selected Vehicle</p>
                                    <p className="text-xl font-bold text-primary">{cabDetails.model}</p>
                                    <p className="text-sm text-gray-600">{cabDetails.carType}</p>
                                    <div className="flex items-center mt-2 text-sm text-gray-700">
                                        <Users size={14} className="mr-1 text-gray-500" />
                                        <span><span className="font-medium">Capacity:</span> {cabDetails.capacity} persons</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-sm text-gray-700">
                                        <MapPin size={14} className="mr-1 text-gray-500" />
                                        <span><span className="font-medium">City:</span> {selectedCity.city}, {selectedCity.state}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <p className="text-sm font-medium mb-1 text-gray-500">Package Details</p>
                                    <p className="text-md font-bold">{formatPackageType(cabDetails.packageType)}</p>
                                    <PriceDisplay
                                        price={cabDetails.price}
                                        className="text-2xl font-bold text-primary mt-2"
                                        showOriginal={true}
                                    />
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                        <CheckCircle size={12} className="mr-1" />
                                        <span>All inclusive</span>
                                    </div>
                                    <div className="flex items-center mt-1 text-xs text-gray-500">
                                        <CheckCircle size={12} className="mr-1" />
                                        <span>Free cancellation (24h prior)</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Rest of the form remains the same... */}
                        <form onSubmit={handleSubmit}>
                            {/* User Details Card */}
                            <motion.div
                                className="mb-6 p-5 rounded-lg border border-gray-200 bg-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                            >
                                <h3 className="font-bold text-primary mb-4 flex items-center">
                                    <Building size={16} className="mr-2" />
                                    Business Account Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm font-medium mb-1 text-gray-700">Account Holder</p>
                                        <p className="font-medium">{formData.fullName}</p>
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <Briefcase size={14} className="mr-1" />
                                            {formData.companyName}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <p className="text-sm font-medium mb-1 text-gray-700">Contact Information</p>
                                        <p className="flex items-center text-sm">
                                            <Mail size={14} className="mr-2 text-gray-500" />
                                            {formData.email}
                                        </p>
                                        <p className="flex items-center text-sm mt-1">
                                            <Phone size={14} className="mr-2 text-gray-500" />
                                            {formData.phone}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Traveler Contact Details */}
                            <motion.div
                                className="mb-6 p-5 rounded-lg border border-gray-200 bg-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <h3 className="font-bold text-primary mb-3 flex items-center">
                                    <User size={16} className="mr-2" />
                                    Traveler Contact Details
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 flex items-center bg-blue-50 p-2 rounded-lg">
                                    <Info size={14} className="mr-2 text-blue-500" />
                                    Please provide contact details for the actual traveler (if different from account holder)
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="travelerName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Traveler Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="travelerName"
                                                type="text"
                                                name="travelerName"
                                                value={formData.travelerName}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('travelerName')}
                                                onBlur={() => handleBlur('travelerName')}
                                                placeholder="Enter traveler's full name"
                                                className={getInputClass('travelerName')}
                                                autoComplete="name"
                                            />
                                            <User size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="travelerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                                            Traveler Phone
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="travelerPhone"
                                                type="tel"
                                                name="travelerPhone"
                                                value={formData.travelerPhone}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('travelerPhone')}
                                                onBlur={() => handleBlur('travelerPhone')}
                                                placeholder="Enter traveler's contact number"
                                                className={getInputClass('travelerPhone')}
                                                autoComplete="tel"
                                            />
                                            <Phone size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="travelerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                        Traveler Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="travelerEmail"
                                            type="email"
                                            name="travelerEmail"
                                            value={formData.travelerEmail}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('travelerEmail')}
                                            onBlur={() => handleBlur('travelerEmail')}
                                            placeholder="Enter traveler's email address"
                                            className={getInputClass('travelerEmail')}
                                            autoComplete="email"
                                        />
                                        <Mail size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Trip Details */}
                            <motion.div
                                className="mb-6 p-5 rounded-lg border border-gray-200 bg-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            >
                                <h3 className="font-bold text-primary mb-4 flex items-center">
                                    <Calendar size={16} className="mr-2" />
                                    Trip Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">
                                            Date of Travel
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="travelDate"
                                                type="date"
                                                name="travelDate"
                                                value={formData.travelDate}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('travelDate')}
                                                onBlur={() => handleBlur('travelDate')}
                                                min={defaultDate}
                                                className={`${getInputClass('travelDate')} pr-10`}
                                                required
                                                style={{
                                                    colorScheme: 'normal',
                                                }}
                                            />
                                            <Calendar size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />

                                            {/* This element hides the default calendar icon */}
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-10 pointer-events-none py-1">
                                                <div className="h-full w-6 bg-white"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="travelTime" className="block text-sm font-medium text-gray-700 mb-1">
                                            Time of Travel
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="travelTime"
                                                type="time"
                                                name="travelTime"
                                                value={formData.travelTime}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('travelTime')}
                                                onBlur={() => handleBlur('travelTime')}
                                                className={`${getInputClass('travelTime')} pr-10`}
                                                required
                                                style={{
                                                    colorScheme: 'normal',
                                                }}
                                            />
                                            <Clock size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />

                                            {/* This element hides the default time icon */}
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-10 pointer-events-none py-1">
                                                <div className="h-full w-6 bg-white"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                                            Number of Travelers
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="travelers"
                                                type="number"
                                                name="travelers"
                                                value={formData.travelers}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('travelers')}
                                                onBlur={() => handleBlur('travelers')}
                                                min="1"
                                                max="20"
                                                className={getInputClass('travelers')}
                                                required
                                            />
                                            <Users size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="vehicles" className="block text-sm font-medium text-gray-700 mb-1">
                                            Number of Vehicles
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="vehicles"
                                                type="number"
                                                name="vehicles"
                                                value={formData.vehicles}
                                                onChange={handleInputChange}
                                                onFocus={() => handleFocus('vehicles')}
                                                onBlur={() => handleBlur('vehicles')}
                                                min="1"
                                                max="10"
                                                className={getInputClass('vehicles')}
                                                required
                                            />
                                            <Car size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Location Details */}
                            <motion.div
                                className="mb-6 p-5 rounded-lg border border-gray-200 bg-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                            >
                                <h3 className="font-bold text-primary mb-4 flex items-center">
                                    <MapPin size={16} className="mr-2" />
                                    Location Details
                                </h3>

                                <div className="mb-4">
                                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Pickup Location
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="pickupLocation"
                                            type="text"
                                            name="pickupLocation"
                                            value={formData.pickupLocation}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('pickupLocation')}
                                            onBlur={() => handleBlur('pickupLocation')}
                                            placeholder={`Enter address in ${selectedCity.city}`}
                                            className={getInputClass('pickupLocation')}
                                            required
                                        />
                                        <MapPin size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        <div className="absolute right-10 top-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                                            {selectedCity.city}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Drop-off Location
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="dropoffLocation"
                                            type="text"
                                            name="dropoffLocation"
                                            value={formData.dropoffLocation}
                                            onChange={handleInputChange}
                                            onFocus={() => handleFocus('dropoffLocation')}
                                            onBlur={() => handleBlur('dropoffLocation')}
                                            placeholder={`Enter address in ${selectedCity.city}`}
                                            className={getInputClass('dropoffLocation')}
                                            required
                                        />
                                        <MapPin size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                                        <div className="absolute right-10 top-3 bg-primary/10 text-primary text-xs px-2 py-1 rounded-md">
                                            {selectedCity.city}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="specialRequirements" className="block text-sm font-medium text-gray-700 mb-1">
                                        Special Requirements (Optional)
                                    </label>
                                    <textarea
                                        id="specialRequirements"
                                        name="specialRequirements"
                                        value={formData.specialRequirements}
                                        onChange={handleInputChange}
                                        onFocus={() => handleFocus('specialRequirements')}
                                        onBlur={() => handleBlur('specialRequirements')}
                                        placeholder="Any special instructions for the driver?"
                                        className={`${getInputClass('specialRequirements')} h-24 resize-none`}
                                    />
                                </div>
                            </motion.div>

                            {/* Payment Method */}
                            <motion.div
                                className="mb-6 p-5 rounded-lg border border-gray-200 bg-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.4 }}
                            >
                                <h3 className="font-bold text-primary mb-4 flex items-center">
                                    <DollarSign size={16} className="mr-2" />
                                    Payment Method
                                </h3>

                                <div className="p-3 rounded-lg border border-primary bg-primary/5">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <CreditCard size={20} className="text-primary" />
                                        </div>
                                        <div className="ml-3 flex-grow">
                                            <p className="font-medium">Pay via RazorPay</p>
                                            <p className="text-sm text-gray-600 mb-2">Secure payment processing</p>

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                <div className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs flex items-center font-medium">
                                                    <span className="text-gray-700 mr-1">UPI</span>
                                                    <CheckCircle size={12} className="text-green-500" />
                                                </div>
                                                <div className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs flex items-center font-medium">
                                                    <span className="text-gray-700 mr-1">Credit Card</span>
                                                    <CheckCircle size={12} className="text-green-500" />
                                                </div>
                                                <div className="bg-white px-3 py-1.5 rounded border border-gray-200 text-xs flex items-center font-medium">
                                                    <span className="text-gray-700 mr-1">Debit Card</span>
                                                    <CheckCircle size={12} className="text-green-500" />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 mt-3">
                                                <img src={razorPayImage} alt="RazorPay" className="h-5" />
                                                <p className="text-xs text-gray-500 ml-1">Powered by Razorpay</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Terms and Conditions */}
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                            >
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 text-primary focus:ring-primary border-primary rounded accent-primary"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-700">
                                            I agree to the <a href="#" className="font-medium text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="font-medium text-primary hover:underline">Privacy Policy</a>
                                        </label>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                className="flex justify-end"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                            >
                                <Button
                                    type="submit"
                                    size="md"
                                    className={`w-full md:w-auto ${submitting ? 'opacity-80' : ''}`}
                                    disabled={submitting}
                                >
                                    {submitting ? 'Processing...' : 'Confirm Booking'}
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookingForm;