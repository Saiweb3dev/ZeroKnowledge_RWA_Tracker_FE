// components/NFTCard.tsx
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
}

const NFTCard: FC<NFTCardProps> = ({ id, name, image, price }) => {
  return (
    <Link href={`/nft-marketplace/${id}`}>
      <div className="border rounded-lg p-4 hover:shadow-lg transition">
        <Image src={image} alt={name} width={200} height={200} />
        <h3 className="text-lg text-white font-semibold mt-2">{name}</h3>
        <p className="text-gray-600">{price} ETH</p>
      </div>
    </Link>
  );
};

export default NFTCard;