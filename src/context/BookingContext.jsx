import React, { createContext, useState, useContext } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBookingModal = () => setIsBookingOpen(true);
  const closeBookingModal = () => setIsBookingOpen(false);

  return (
    <BookingContext.Provider value={{ isBookingOpen, openBookingModal, closeBookingModal }}>
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
