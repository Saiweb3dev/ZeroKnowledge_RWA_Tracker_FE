// app/nft-marketplace/[id]/page.tsx
"use client"

import Image from 'next/image';
import { fetchData } from '@/utils/api';
import { useEffect, useState } from 'react';
import { NFTD } from '@/types/nft';
import NftMintForm from '@/components/nft/NftMintForm';

export default function NFTDetails({ params }: { params: { id: string } }) {
  // State for NFT description, loading status, and error handling
  const [nftDescription, setNftDescription] = useState<NFTD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch asset description
  const fetchAssetDescription = () => fetchData(`/nft/getAssetDescription/${params.id}`);

  // Effect hook to load asset description on component mount
  useEffect(() => {
    async function loadAssetDescription() {
      try {
        const data = await fetchAssetDescription();
        setNftDescription(data as NFTD);
      } catch (err) {
        console.error(err);
        setError('Failed to load asset description.');
      } finally {
        setLoading(false);
      }
    }
    loadAssetDescription();
  }, [params.id]); // Added params.id as a dependency

  // Handler for mint form submission
  const handleMintSubmit = (formData: { name: string; address: string; variant: string }) => {
    console.log("Submitting form data:", formData);
    // TODO: Implement API call to submit the form data
    // For example: submitMintFormData(formData);
  };

  // Loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">{error}</div>;
  }

  // Render NFT details
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-black rounded-lg shadow-xl overflow-hidden border flex flex-col">
        {/* Top section: Image and Form */}
        <div className="flex flex-col md:flex-row">
          {/* Left: NFT Image */}
          <div className="w-full md:w-1/2 p-4">
            <div className="relative h-64 md:h-80">
              <Image 
                src={nftDescription?.image || ''} 
                alt={nftDescription?.name || 'NFT Image'} 
                layout="fill" 
                objectFit="cover"
              />
            </div>
          </div>

          {/* Right: Minting Form */}
          <div className="w-full md:w-1/2 p-4">
            <NftMintForm 
              onSubmit={handleMintSubmit} 
              variants={nftDescription?.variants || []} 
            />
          </div>
        </div>

        {/* Bottom section: NFT Details */}
        <div className="w-full p-6">
          <h1 className="text-3xl font-bold mb-4">{nftDescription?.name}</h1>
          <p className="text-2xl mb-4 text-gray-300">{nftDescription?.price} ETH</p>
          <p className="mb-6 text-gray-400">{nftDescription?.description}</p>
          <h2 className="text-xl font-semibold mb-2">Variants:</h2>
          <ul className="list-disc pl-5 text-gray-400">
            {nftDescription?.variants.map((variant, index) => (
              <li key={index}>{variant}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}