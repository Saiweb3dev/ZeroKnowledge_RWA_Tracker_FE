// app/nft-marketplace/[id]/page.tsx
import Image from 'next/image';

// This would typically come from an API or database
const nfts = [
  { id: '1', name: 'Sports Car NFT', image: '/virtus.webp', price: '0.6' },
  { id: '2', name: 'Sub SUV Car NFT', image: '/xuv-3xo.webp', price: '0.4' },
  { id: '3', name: 'Luxury Sub SUV NFT', image: '/creta.webp', price: '0.5' },
  { id: '4', name: 'Luxury 7 Seater NFT', image: '/innova-crysta.webp', price: '0.8' },
];

const getNFTDetails = (id: string) => {
  const nft = nfts.find(nft => nft.id === id);
  
  if (!nft) {
    throw new Error('NFT not found');
  }

  return {
    ...nft,
    description: `A beautiful ${nft.name.toLowerCase()}...`
  };
};

export default function NFTDetails({ params }: { params: { id: string } }) {
  let nft;
  try {
    nft = getNFTDetails(params.id);
  } catch (error) {
    return <div className="text-white text-center">NFT not found</div>;
  }

  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-black rounded-lg shadow-xl overflow-hidden border">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <div className="relative h-64 lg:h-full">
              <Image 
                src={nft.image} 
                alt={nft.name} 
                layout="fill" 
                objectFit="cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4">{nft.name}</h1>
            <p className="text-2xl mb-4 text-gray-300">{nft.price} ETH</p>
            <p className="mb-6 text-gray-400">{nft.description}</p>
            <button className="w-full bg-white text-black font-bold py-3 px-4 rounded hover:bg-gray-200 transition duration-300">
              Buy NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}