import { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data/data.json';

const CitySelector = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  
  // Popular cities to be featured at the top with images
  const popularCities = ['Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune'];
  
  useEffect(() => {
    // Extract unique cities from the data
    const allCities = data.pricing.map(item => ({
      city: item.city,
      state: item.state
    }));
    
    setCities(allCities);
    setFilteredCities(allCities);
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = cities.filter(
        item => item.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
                item.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(cities);
    }
  }, [searchTerm, cities]);
  
  const handleCitySelect = (city) => {
    onCitySelect(city);
  };

  // Function to get the image URL for a city
  const getCityImageUrl = (city) => {
    return `/images/top-cities/${city.toLowerCase()}.jpg`;
  };

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.2,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.35,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-2xl font-bold mb-6 text-center text-primary"
      >
        Select Your City
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mb-6"
      >
        <div className="relative">
          <input
            id='citySearch'
            type="text"
            placeholder="Search city or state..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-2 top-2 bg-primary text-white p-1 rounded-md">
            <Search />
          </button>
        </div>
      </motion.div>
      
      {/* Popular Cities with Images - only show when not searching */}
      <AnimatePresence>
        {!searchTerm && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-8"
          >
            <h3 className="text-lg font-medium mb-4 text-primary">Popular Cities</h3>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {popularCities.map(city => {
                const cityData = cities.find(c => c.city === city);
                if (!cityData) return null;
                
                return (
                  <motion.div 
                    key={city} 
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCitySelect(cityData)}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    variants={itemVariants}
                  >
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      <img 
                        src={getCityImageUrl(city)} 
                        alt={city} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-primary text-white text-center">
                      <h4 className="font-medium">{city}</h4>
                      <p className="text-xs opacity-80">{cityData.state}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* No Results Message */}
      <AnimatePresence>
        {searchTerm && filteredCities.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center py-8"
          >
            <motion.div 
              className="inline-block mb-4 p-3 bg-accent/10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
            >
              <MapPin size={32} className="text-accent" />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-semibold mb-2 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              We couldn't find "{searchTerm}"
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              We're expanding rapidly to new cities across India!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <button 
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
              >
                View All Available Cities
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* All Cities List */}
      <AnimatePresence>
        {filteredCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-lg font-medium mb-4 text-primary">
              {searchTerm ? "Search Results" : "All Cities"}
            </h3>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCities.map((city, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-white border border-gray-200 rounded-md group cursor-pointer hover:bg-accent hover:text-white transition-colors"
                  onClick={() => handleCitySelect(city)}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                  variants={itemVariants}
                >
                  <p className="font-medium">{city.city}</p>
                  <p className="text-xs text-gray-500 group-hover:text-white/80">{city.state}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CitySelector;