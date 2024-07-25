// pages/nft-marketplace/index.tsx
"use client"
import { FC, useEffect, useState } from 'react';
import NFTCard from '@/components/nft/NftCard';
import { fetchData } from "../../utils/api";
import { NFT } from '@/types/nft';

const NFTMarketplace: FC = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssetData = () => fetchData<NFT[]>('/nft/getAssetData');

  useEffect(() => {
    async function loadAssetData() {
      try {
        const data = await fetchAssetData();
        setNfts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load NFT data');
        setLoading(false);
      }
    }

    loadAssetData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="h-screen w-full bg-black">
      <div className='px-4 max-w-5xl mx-auto'>
        <h1 className="text-3xl font-bold py-6 text-white">NFT Marketplace</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} {...nft} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;