// pages/nft-marketplace/index.tsx
import { FC } from 'react';
import NFTCard from '@/components/nft/NftCard';

// This would typically come from an API or database
const nfts = [
  { id: '1', name: 'Sports Car NFT', image: '/virtus.webp', price: '0.6' },
  { id: '2', name: 'Sub SUV Car NFT', image: '/xuv-3xo.webp', price: '0.4' },
  { id: '3', name: 'Luxury Sub SUV NFT', image: '/creta.webp', price: '0.5' },
  { id: '4', name: 'Luxury 7 Seater NFT', image: '/innova-crysta.webp', price: '0.8' },
  // Add more NFTs...
];

const NFTMarketplace: FC = () => {
  return (
    <div className=" h-screen w-full bg-black">
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