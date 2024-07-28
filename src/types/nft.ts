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
  message: string;
  contractAddress: string;
  contractABI: any[]; // Consider specifying a more precise type for contractABI
  data: MintData; // Using the MintData interface for the data field
  tokenURI: string;
}
