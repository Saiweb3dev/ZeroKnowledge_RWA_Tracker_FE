"use client";
// Import necessary components, types, and utilities at the top
import NFTDetailsComp from "@/components/nft/NFTDetails";
import NftMintForm from "@/components/nft/NftMintForm";
import useFetchNFTDescription from "@/hooks/useFetchNFTDescription";
import { MintResponse } from "@/types/nft";
import { postData } from "@/utils/api";
import { ethers } from "ethers";
import Image from "next/image";
import { useSignMessage } from "wagmi";

// Define the component that displays NFT details and allows users to mint an NFT
export default function NFTDetails({ params }: { params: { id: string } }) {
  const { signMessageAsync } = useSignMessage(); // Hook for signing messages

  // Fetch NFT description asynchronously
  const { nftDescription, loading, error } = useFetchNFTDescription(params.id);

  // Function to handle the submission of the mint form
  const handleMintSubmit = async (formData: {
    name: string;
    address: string;
    variant: string;
    key: string;
  }) => {
    try {
      // Sign a message to verify the user's intent to mint an NFT
      const signature = await signMessageAsync({ message: "Mint NFT" });

      // Prepare the data to send to the backend, including the signature and additional NFT details
      const updatedFormData = {
        ...formData,
        carName: nftDescription?.name ?? "", // Default values for missing properties
        mintedPrice: nftDescription?.price ?? 0,
        signature,
      };

      // Send the prepared data to the backend to initiate the minting process
      const responseRaw = await postData("/nft/mintNFT", updatedFormData);

      //Type convertion
      const response: MintResponse = responseRaw as MintResponse;

      // Check the backend response to determine the next steps
      if (response.message === "Signature verified. Ready to mint.") {
        const minterData: MintResponse = {
          key: formData.key,
          message: response.message,
          contractAddress: response.contractAddress,
          contractABI: response.contractABI,
          data: response.data,
          tokenURI: response.tokenURI,
        };
        await mintNFT(minterData);
      } else {
        console.error("Unexpected server response:", response);
        throw new Error(
          `Failed to prepare for minting: ${response.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Failed to mint NFT:", error);
    }
  };

  const mintNFT = async (response: MintResponse) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          response.contractAddress,
          response.contractABI,
          signer
        );

        const tx = await contract.safeMint(
          await signer.getAddress(),
          response.tokenURI,
          { gasLimit: ethers.utils.hexlify(1000000) }
        );

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log("NFT minted successfully!");

        // Extract event data
        const event = receipt.events?.find(
          (e: any) => e.event === "AssetMinted"
        );
        if (event) {
          const [tokenId, to, tokenURI] = event.args;

          // Second API call to update backend with minting results
          await updateMintingData({
            key: response.key,
            tokenId: tokenId.toString(),
            address: to,
            tokenURI,
            txHash: receipt.transactionHash,
          });
        } else {
          console.error("AssetMinted event not found in transaction receipt");
        }
      } catch (err) {
        console.error("Error minting NFT:", err);
        console.log("Failed to mint NFT. Please try again.");
      }
    } else {
      console.log("Ethereum provider not found. Please install MetaMask.");
    }
  };
  const updateMintingData = async (mintingData: {
    key: string;
    tokenId: string;
    address: string;
    tokenURI: string;
    txHash: string;
  }) => {
    try {
      const response = await postData("/nft/updateMintingData", mintingData);
    } catch (error) {
      console.error("Failed to update minting data:", error);
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
              variants={nftDescription?.variants || []} // Map through NFT variants
            />
          </div>
        </div>

        <NFTDetailsComp nftDescription={nftDescription!} />
      </div>
    </div>
  );
}
