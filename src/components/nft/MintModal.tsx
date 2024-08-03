"use client"
import React from 'react';
import { MintSuccessModalProps } from '@/types/nft';


const MintSuccessModal: React.FC<MintSuccessModalProps> = ({ isOpen, tokenId, to, tokenURI, onClose }) => {
  if (!isOpen) return null;

  // Convert tokenId to string if it's an object (e.g., BigNumber)
  const tokenIdStr = typeof tokenId === 'object' ? tokenId.toString() : tokenId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-xl">
        <p className="mb-4 text-green-600 text-2xl font-bold">Successful Mint!</p>
        <p>Your Token ID is: {tokenIdStr}</p>
        <p>Address Minted: {to}</p>
        <p>Token URI: {tokenURI}</p>
        <button onClick={onClose} className="mt-4 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          OK
        </button>
      </div>
    </div>
  );
};

export default MintSuccessModal;
