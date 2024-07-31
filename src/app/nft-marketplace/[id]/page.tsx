"use client"
// Import necessary components, types, and utilities at the top
import NftMintForm from "@/components/nft/NftMintForm";
import { MintResponse, NFTD } from "@/types/nft";
import { postData } from "@/utils/api";
import { ethers } from "ethers";
import Image from "next/image";
import { useState } from "react";
import { useSignMessage } from "wagmi";
import useFetchNFTDescription from "@/hooks/useFetchNFTDescription";
import NFTDetailsComp from "@/components/nft/NFTDetails";

// Define the component that displays NFT details and allows users to mint an NFT
export default function NFTDetails({ params }: { params: { id: string } }) {
  const { signMessageAsync } = useSignMessage(); // Hook for signing messages

  // Fetch NFT description asynchronously
  const { nftDescription, loading, error } = useFetchNFTDescription(params.id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle the submission of the mint form
  const handleMintSubmit = async (formData: {
    name: string;
    address: string;
    variant: string;
    key:string;
  }) => {
    try {
      // Sign a message to verify the user's intent to mint an NFT
      const signature = await signMessageAsync({ message: "Mint NFT" });

      // Prepare the data to send to the backend, including the signature and additional NFT details
      const updatedFormData = {
        ...formData,
        carName: nftDescription?.name ?? '', // Default values for missing properties
        mintedPrice: nftDescription?.price ?? 0,
        signature,
      };

      console.log("Data sent to server ----> ",updatedFormData)

      // Send the prepared data to the backend to initiate the minting process
      const responseRaw = await postData("/nft/mintNFT", updatedFormData);
      
      //Type convertion
      const response: MintResponse = responseRaw as MintResponse;
      console.log('API response:', response);

      // Check the backend response to determine the next steps
      if (response.message === "Signature verified. Ready to mint.") {
        
        // Initialize Ethereum provider and signer if available
        if (typeof window.ethereum !== "undefined") {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Interact with the smart contract to mint the NFT
          const contract = new ethers.Contract(response.contractAddress, response.contractABI, signer);
          try {
            const tx = await contract.safeMint(
              await signer.getAddress(),
              response.tokenURI,
              { gasLimit: ethers.utils.hexlify(1000000) } // Manual gas limit
            );
            console.log("Transaction sent:", tx.hash);
          console.log("Minted Address ---> ",await signer.getAddress())
          console.log("URI sent to contract ---> ",response.tokenURI)
            // Wait for the transaction to be mined
            await tx.wait();
            console.log("NFT minted successfully!");
          } catch (err) {
            console.error("Error minting NFT:", err);
            console.log("Failed to mint NFT. Please try again.");
          }
        } else {
          console.log("Ethereum provider not found. Please install MetaMask.");
        }
      } else {
        console.error('Unexpected server response:', response);
        throw new Error(`Failed to prepare for minting: ${response.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  };


  // Conditional rendering based on the fetch status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        {error}
      </div>
    );
  }

  // Render the NFT details and minting form
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-black rounded-lg shadow-xl overflow-hidden border flex flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <div className="relative h-64 md:h-80">
              <Image
                src={nftDescription?.image || ""}
                alt={nftDescription?.name || "NFT Image"}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4">
            <NftMintForm
              onSubmit={handleMintSubmit}
              variants={(nftDescription?.variants || [])} // Map through NFT variants
            />
          </div>
        </div>

        <NFTDetailsComp nftDescription={nftDescription!} /> 
      </div>
    </div>
  );
}
