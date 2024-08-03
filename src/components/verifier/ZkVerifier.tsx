"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ApiResponse } from '../../types/api';
import VerificationCompleteModal from './VerificationModal';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
const ZkVerifier: React.FC = () => {
  // State hooks for form inputs and API response
  const [address, setAddress] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [inputKey, setInputKey] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal,setShowModal] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSessionId(null);

    try {
      // Send POST request to the API
      const response = await axios.post<ApiResponse>('http://localhost:8080/api/verify', {
        address,
        id,
        inputString:inputKey
      });
      if (response.data.sessionId) {
        setSessionId(response.data.sessionId);
        setShowModal(true);
      } else {
        setError('Session ID not received');
      }
      
      setShowModal(true);
    } catch (err) {
      // Handle errors, including Axios errors
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.error || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (sessionId) {
      router.push(`/Assetverifier/result?sessionId=${encodeURIComponent(sessionId)}`);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12 bg-white rounded-lg shadow-xl ">
      <h1 className="text-2xl text-black font-bold mb-6">ZkVerifier</h1>
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Input field for Ethereum address */}
    <div>
      <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
        Ethereum Address
      </label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        placeholder="0x..."
      />
    </div>
    
    {/* Input field for ID */}
    <div>
      <label htmlFor="id" className="block text-sm font-semibold text-gray-700">
        ID
      </label>
      <input
        type="text"
        id="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        placeholder="Enter ID"
      />
    </div>
    
    {/* Input field for input string */}
    <div>
      <label htmlFor="inputKey" className="block text-sm font-semibold text-gray-700">
        Input Key
      </label>
      <input
        type="text"
        id="inputKey"
        value={inputKey}
        onChange={(e) => setInputKey(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                   focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
        placeholder="Enter input key"
      />
    </div>
    
    {/* Submit button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : 'Verify'}
    </button>
  </form>

  {/* Error message display */}
  {error && (
    <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
      <p className="font-bold">Error</p>
      <p>{error}</p>
    </div>
  )}

   <VerificationCompleteModal isOpen={showModal} onClose={handleModalClose} />
</div>
  );
};

export default ZkVerifier;