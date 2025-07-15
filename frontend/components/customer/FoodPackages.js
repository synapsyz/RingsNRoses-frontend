"use client";
import React, { useState, useRef, useEffect } from 'react';

// --- Data for Menus, Prices, and Images ---
const menuData = {
  veg: {
    name: 'Vegetarian',
    price: 999,
    menu: [
      { name: 'Paneer Tikka', img: 'https://placehold.co/600x400/28A745/FFFFFF?text=Paneer+Tikka' },
      { name: 'Dal Makhani', img: 'https://placehold.co/600x400/28A745/FFFFFF?text=Dal+Makhani' },
      { name: 'Mixed Veg Korma', img: 'https://placehold.co/600x400/28A745/FFFFFF?text=Veg+Korma' },
      { name: 'Jeera Rice & Naan', img: 'https://placehold.co/600x400/28A745/FFFFFF?text=Rice+%26+Naan' },
    ],
  },
  'non-veg': {
    name: 'Non-Vegetarian',
    price: 1299,
    menu: [
      { name: 'Chicken Tandoori', img: 'https://placehold.co/600x400/DC3545/FFFFFF?text=Chicken+Tandoori' },
      { name: 'Butter Chicken', img: 'https://placehold.co/600x400/DC3545/FFFFFF?text=Butter+Chicken' },
      { name: 'Mutton Rogan Josh', img: 'https://placehold.co/600x400/DC3545/FFFFFF?text=Rogan+Josh' },
      { name: 'Jeera Rice & Naan', img: 'https://placehold.co/600x400/DC3545/FFFFFF?text=Rice+%26+Naan' },
    ],
  },
};

// --- Helper: Compact Food Package Selector ---
const FoodTypeSelector = ({ preference, onPreferenceChange }) => {
  const options = [
    { id: 'veg', label: 'Veg', color: 'green' },
    { id: 'non-veg', label: 'Non-Veg', color: 'red' },
  ];

  return (
    <div className="flex items-center space-x-2 sm:space-x-3">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onPreferenceChange(option.id)}
          className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            preference === option.id
              ? `bg-${option.color}-500 text-white shadow-md ring-${option.color}-500`
              : `bg-gray-100 text-gray-700 hover:bg-gray-200 ring-gray-300`
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// --- Helper: Image Modal (Popup) ---
const ImageModal = ({ isOpen, onClose, imageUrl, imageName }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4 transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative bg-white p-4 rounded-lg shadow-xl max-w-2xl w-full transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <img src={imageUrl} alt={imageName} className="w-full h-auto object-contain rounded-md max-h-[80vh]" />
                <p className="text-center font-bold text-lg mt-4 text-gray-800">{imageName}</p>
            </div>
        </div>
    );
};

// --- Helper: Inline Image Slider ---
const ImageSlider = ({ menu, onImageClick }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        const el = scrollRef.current;
        if (el) {
            const isScrollable = el.scrollWidth > el.clientWidth;
            setCanScrollLeft(isScrollable && el.scrollLeft > 5);
            setCanScrollRight(isScrollable && el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
        }
    };
    
    useEffect(() => {
        const el = scrollRef.current;
        if(el) {
          checkScrollButtons();
          el.addEventListener('scroll', checkScrollButtons);
          window.addEventListener('resize', checkScrollButtons);
          return () => {
              el.removeEventListener('scroll', checkScrollButtons);
              window.removeEventListener('resize', checkScrollButtons);
          };
        }
    }, [menu]);

    const scroll = (direction) => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = direction === 'left' ? -160 : 160;
            el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full">
            {canScrollLeft && (
                <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity" aria-label="Scroll Left">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
            )}
            <div ref={scrollRef} className="flex items-center space-x-4 overflow-x-auto p-2 scrollbar-hide" style={{ scrollSnapType: 'x mandatory' }}>
                {menu.map((item, index) => (
                    <div key={index} className="relative group flex-shrink-0 w-36 rounded-lg overflow-hidden shadow-md bg-white cursor-pointer" style={{ scrollSnapAlign: 'start' }} onClick={() => onImageClick(item.img, item.name)}>
                        <img src={item.img} alt={item.name} className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                            <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2 py-1 rounded-md">View</span>
                        </div>
                        <p className="text-center text-xs font-semibold p-2 text-gray-700 truncate">{item.name}</p>
                    </div>
                ))}
            </div>
            {canScrollRight && (
                <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity" aria-label="Scroll Right">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            )}
        </div>
    );
};

// --- The Main Reusable Component ---
const FoodPackages = () => {
  const [foodPreference, setFoodPreference] = useState('veg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: '', name: '' });
  const currentPackage = menuData[foodPreference];

  const handleImageClick = (imageUrl, imageName) => {
    setSelectedImage({ url: imageUrl, name: imageName });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scale-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
      <div className="w-full bg-white border border-gray-200 p-6 rounded-xl shadow-sm space-y-4 dark:bg-neutral-900 dark:border-neutral-700">
        <div className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold text-md dark:text-neutral-200">Package Types:</span>
            <FoodTypeSelector preference={foodPreference} onPreferenceChange={setFoodPreference} />
        </div>
        <div className="flex items-baseline">
            <h3 className="text-gray-500 font-medium mr-2 dark:text-neutral-400">Starting Price:</h3>
            <p className="text-2xl font-bold text-teal-600 dark:text-teal-500">
                ₹{currentPackage.price}
                <span className="text-sm font-normal text-gray-500 dark:text-neutral-400">/plate</span>
            </p>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-700"></div>
        <div>
            <h3 className="text-gray-700 font-semibold mb-2 dark:text-neutral-200">Includes:</h3>
            <ImageSlider menu={currentPackage.menu} onImageClick={handleImageClick} />
        </div>
      </div>
      <ImageModal isOpen={isModalOpen} onClose={closeModal} imageUrl={selectedImage.url} imageName={selectedImage.name} />
    </>
  );
};

export default FoodPackages;
