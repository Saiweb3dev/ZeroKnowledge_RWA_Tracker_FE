// types/nft.ts

export interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
}

export interface NFTD{
  name:string;
  description:string;
  image:string;
  variants:string[]
  price:string
}