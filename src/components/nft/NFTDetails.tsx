// components/NFTDetails.tsx
import { NFTD,Variant } from '@/types/nft';

interface NFTDetailsProps {
  nftDescription: NFTD;
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ nftDescription }) => {
  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-4">{nftDescription.name}</h1>
      <p className="text-2xl mb-4 text-gray-300">{`${nftDescription.price} ETH`}</p>
      <p className="mb-6 text-gray-400">{nftDescription.description}</p>
      <h2 className="text-xl font-semibold mb-2">Variants:</h2>
      <ul className="list-disc pl-5 text-gray-400">
      {nftDescription.variants.map((variant, index) => (
            <li className='text-white' key={index}>
              {typeof variant === 'string' ? variant : JSON.stringify(variant)}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default NFTDetails;
