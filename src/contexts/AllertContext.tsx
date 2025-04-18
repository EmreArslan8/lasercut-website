'use client';

import WheelOfPrizes from '@/components/Wheel';
import { createContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { wheelItems } from '@/lib/utils/wheelItems';

interface Coupon {
  code: string;
  option: string;
}

interface AllertContextState {
  isWheelModalOpen: boolean;
  isResultModalOpen: boolean;
  onClose: () => void;
  mustStartSpinning: boolean;
  prizeNumber: number;
  handleSpinClick: () => void;
  handleStopSpinning: () => void;
  selectedCoupon: Coupon | null;
}

export const AllertContext = createContext<AllertContextState>({} as AllertContextState);

export const AllertContextProvider = ({ children }: { children: ReactNode }) => {
  const [isWheelModalOpen, setIsWheelModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    const coupon_timestamp = localStorage.getItem('coupon_timestamp');
    if (!coupon_timestamp) {
      setIsWheelModalOpen(true);
    }
  }, []);

  const onClose = () => {
    setIsWheelModalOpen(false);
    setMustStartSpinning(false);
  };

  const handleSpinClick = () => {
    const randomPrizeIndex = Math.floor(Math.random() * wheelItems.length);
    setPrizeNumber(randomPrizeIndex);
    setMustStartSpinning(true);
    localStorage.setItem('coupon_timestamp', Date.now().toString());
  };

  const handleStopSpinning = () => {
    setSelectedCoupon(wheelItems[prizeNumber]);
    setIsResultModalOpen(true);
  };

  const value = useMemo(
    () => ({
      isWheelModalOpen,
      isResultModalOpen,
      onClose,
      mustStartSpinning,
      prizeNumber,
      handleSpinClick,
      handleStopSpinning,
      selectedCoupon,
    }),
    [isWheelModalOpen, isResultModalOpen, mustStartSpinning, prizeNumber, selectedCoupon]
  );

  return (
    <AllertContext.Provider value={value}>
      {isWheelModalOpen && (
        <WheelOfPrizes
          open={isWheelModalOpen}
          onClose={onClose}
          mustStartSpinning={mustStartSpinning}
          prizeNumber={prizeNumber}
          onSpinClick={handleSpinClick}
          onStopSpinning={handleStopSpinning}
          selectedCoupon={selectedCoupon}
          isResultModalOpen={isResultModalOpen}
        />
      )}
      {children}
    </AllertContext.Provider>
  );
};
