// types/nft.ts

export interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
}

export interface Variant {
  id: number;
  name: string;
}
export interface NFTD {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  variants: Variant[];
}

// types/nft.ts

export interface MintData {
  name: string;
  address: string;
  variant: string;
  carName: string;
  mintedPrice: number; // Assuming mintedPrice is a number
  signature: string;
}

export interface MintResponse {
  key:string;
  message: string;
  contractAddress: string;
  contractABI: any[]; // Consider specifying a more precise type for contractABI
  data: MintData; // Using the MintData interface for the data field
  tokenURI: string;
}

export interface MintSuccessModalProps {
  isOpen: boolean;
  tokenId: string | object; // Allow tokenId to be either a string or an object
  to: string;
  tokenURI: string;
  onClose: () => void;
}

