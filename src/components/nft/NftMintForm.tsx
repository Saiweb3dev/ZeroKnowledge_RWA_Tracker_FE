// components/NftMintForm.tsx
"use client";

import { Variant } from "@/types/nft";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ConnectWallet from "../wallet/ConnectButton";

// Define props interface for the component
interface NftMintFormProps {
  onSubmit: (formData: {
    name: string;
    address: string;
    variant: string;
    key: string;
  }) => void;
  variants: Variant[];
}

const NftMintForm: React.FC<NftMintFormProps> = ({ onSubmit, variants }) => {
  const { address, isConnected } = useAccount();
  
  // Initialize form data state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    variant: "",
    key: "",
  });

  // Update address in form data when wallet is connected
  useEffect(() => {
    if (address) {
      setFormData((prevData) => ({
        ...prevData,
        address: address,
      }));
    }
  }, [address]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name !== "address") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  // Show connect wallet button if not connected
  if (!isConnected) {
    return (
      <div className="w-full p-8 bg-black text-white">
        <p className="text-red-500 mb-4">
          Please connect your wallet to mint NFTs.
        </p>
        <ConnectWallet />
      </div>
    );
  }

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="w-full p-8 bg-black text-white">
      {/* Name input */}
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-500 text-white"
        />
      </div>
      
      {/* Address input (read-only) */}
      <div className="mb-6">
        <input
          type="text"
          name="address"
          placeholder="ETH Public Address"
          value={formData.address}
          readOnly
          className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-500 text-white"
        />
      </div>
      
      {/* Key input */}
      <div className="mb-6">
        <input
          type="text"
          name="key"
          value={formData.key}
          onChange={handleChange}
          placeholder="Key"
          className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-500 text-white"
        />
      </div>
      
      {/* Variant selection */}
      <div className="mb-8">
        <select
          name="variant"
          value={formData.variant}
          onChange={handleChange}
          required
          className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors text-white appearance-none"
        >
          <option value="" disabled>
            Select Variant
          </option>
          {variants.map((variant, index) => (
            <option key={index} value={JSON.stringify(variant)}>
              {typeof variant === "string" ? variant : JSON.stringify(variant)}
            </option>
          ))}
        </select>
      </div>
      
      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-white text-black font-bold py-4 px-6 rounded-full hover:bg-gray-200 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        Mint NFT
      </button>
    </form>
  );
};

export default NftMintForm;