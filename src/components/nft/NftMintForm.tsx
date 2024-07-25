// components/NftMintForm.tsx
"use client";

import { useState } from 'react';

interface NftMintFormProps {
  onSubmit: (formData: { name: string; address: string; variant: string }) => void;
  variants: string[]; // Add this line
}

const NftMintForm: React.FC<NftMintFormProps> = ({ onSubmit, variants }) => {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    variant: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // Update state based on the input/select element change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Call the onSubmit prop with the current form data
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-8 bg-black text-white">
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
    <div className="mb-6">
      <input
        type="text"
        name="address"
        placeholder="ETH Public Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors placeholder-gray-500 text-white"
      />
    </div>
    <div className="mb-8">
        <select
          name="variant"
          value={formData.variant}
          onChange={handleChange}
          required
          className="w-full p-3 bg-black border-b-2 border-white focus:outline-none focus:border-gray-300 transition-colors text-white appearance-none"
        >
          <option value="" disabled>Select Variant</option>
          {variants.map((variant, index) => (
            <option key={index} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      </div>
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
