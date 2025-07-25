import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CitySelector from '../components/CitySelector';
import CabModel from '../components/CabModel';
import BookingForm from '../components/BookingForm';
import PriceDisplay from '../components/PriceDisplay';
import data from '../data/data.json';

const Book = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedCab, setSelectedCab] = useState(null);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const selectedCabRef = useRef(null);

    // For a real app, this would come from authentication context
    const mockUserData = {
        fullName: 'John Doe',
        companyName: 'ABC Corporation',
        email: 'john.doe@example.com',
        phone: '+1 234-567-8900'
    };

    useEffect(() => {
        if (selectedCity) {
            const cityData = data.pricing.find(item =>
                item.city === selectedCity.city && item.state === selectedCity.state
            );

            if (cityData) {
                const models = [];
                Object.entries(cityData.pricing).forEach(([modelName, modelPricing]) => {
                    const modelInfo = data.categories.find(category => category.model === modelName);
                    if (modelInfo) {
                        models.push({
                            ...modelInfo,
                            pricing: modelPricing
                        });
                    }
                });
                setAvailableModels(models);
            }
        }
    }, [selectedCity]);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedCab(null);
        setShowBookingForm(false);
    };

    const handleCabSelect = (cab) => {
        setSelectedCab(cab);
        if (cab) {
            setTimeout(() => {
                if (selectedCabRef.current) {
                    selectedCabRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }, 50);
        }
    };

    const handleProceedToBooking = () => {
        setShowBookingForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToSelection = () => {
        setShowBookingForm(false);
    };

    const formatPackageType = (packageType) => {
        if (packageType === '4hr40km') return '4 Hours / 40 KM';
        if (packageType === '8hr80km') return '8 Hours / 80 KM';
        if (packageType === 'airport') return 'Airport Transfer';
        return packageType;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3, staggerChildren: 0.06 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="container mx-auto px-3 pt-32 pb-10 max-w-5xl min-h-screen" ref={selectedCabRef}>
            <AnimatePresence mode="wait">
                {!selectedCity ? (
                    <motion.div
                        key="city-selector"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                    >
                        <CitySelector onCitySelect={handleCitySelect} />
                    </motion.div>
                ) : showBookingForm ? (
                    <motion.div
                        key="booking-form"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                    >
                        <BookingForm
                            cabDetails={selectedCab}
                            onBack={handleBackToSelection}
                            userData={mockUserData}
                            selectedCity={selectedCity}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="cab-selection"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                    >
                        <motion.div
                            className="flex items-center justify-between mb-3 bg-white/95 backdrop-blur-sm px-3 py-4 md:py-6 sticky top-0 z-10 rounded-md shadow-sm"
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-primary">{selectedCity.city}, {selectedCity.state}</h1>
                                <p className="text-xs text-gray-600">Select your preferred car</p>
                            </div>
                            <motion.button
                                onClick={() => setSelectedCity(null)}
                                className="flex items-center px-2 py-1 rounded-md text-primary text-sm cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                                Change City
                            </motion.button>
                        </motion.div>

                        <div>
                            <AnimatePresence>
                                {selectedCab && (
                                    <motion.div
                                        className="mb-4 p-3 md:p-4 bg-primary/10 rounded-lg border border-primary"
                                        initial={{ opacity: 0, y: 15, height: 0 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            height: 'auto',
                                            transition: { duration: 0.25 }
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -8,
                                            height: 0,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="flex items-start gap-1 mb-1">
                                            <CheckCircle className="text-primary mt-0.5" size={16} />
                                            <h3 className="font-medium text-sm text-primary">Your Selection</h3>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div className="mb-2 sm:mb-0">
                                                <p className="text-sm"><span className="font-medium">Car:</span> {selectedCab.model}</p>
                                                <p className="text-sm text-gray-700"><span className="font-medium">Type:</span> {selectedCab.carType}</p>
                                                <p className="text-sm text-gray-700"><span className="font-medium">Package:</span> {formatPackageType(selectedCab.packageType)}</p>
                                            </div>
                                            <div className="flex flex-col items-start sm:items-end">
                                                <PriceDisplay
                                                    price={selectedCab.price}
                                                    className="text-2xl font-bold text-primary"
                                                    showOriginal={true}
                                                />
                                                <p className="text-xs text-gray-500 mb-1.5">All inclusive</p>
                                                <motion.button
                                                    className="bg-accent text-white py-2 px-3 text-sm rounded-md hover:bg-opacity-90 flex items-center cursor-pointer"
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    onClick={handleProceedToBooking}
                                                >
                                                    <Calendar size={14} className="mr-1" />
                                                    Proceed to Booking
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-4">
                            {availableModels.map((model, index) => (
                                <CabModel
                                    key={index}
                                    model={model.model}
                                    carType={model.carType}
                                    capacity={model.capacity}
                                    luggage={model.luggage}
                                    handbag={model.handbag}
                                    image={model.image}
                                    features={model.features}
                                    pricing={model.pricing}
                                    onSelect={handleCabSelect}
                                    currentSelection={selectedCab}
                                />
                            ))}
                        </div>

                        {availableModels.length === 0 && (
                            <motion.div
                                className="text-center p-6 text-gray-500 bg-gray-50 rounded-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <p className="text-sm">No cab models available for this city.</p>
                                <p className="text-xs mt-1">Please select a different city or check back later.</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Book;