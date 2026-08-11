import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isOnlineConsultation, setIsOnlineConsultation] = useState(false);

  const openBookingModal = (onlineMode = false) => {
    setIsOnlineConsultation(onlineMode);
    setIsBookingOpen(true);
  };

  const openOnlineConsultationModal = () => {
    setIsOnlineConsultation(true);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setIsOnlineConsultation(false);
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, isOnlineConsultation, openBookingModal, openOnlineConsultationModal, closeBookingModal }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
