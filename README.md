# ZK_RWA_Tracker Frontend Documentation

## Project Overview

ZK_RWA_Tracker is a platform that utilizes zero-knowledge proofs to verify real-world assets. The frontend interacts with smart contracts for NFT minting and asset verification, while the backend handles the verification process.

## Core Features

1. NFT Marketplace
2. Asset Verification

## Navigation

The frontend consists of two main navigation buttons:

1. NFT Marketplace
2. Verify Asset

### NFT Marketplace

The NFT Marketplace section allows users to:

- Browse available NFTs representing verified real-world assets
- Purchase NFTs using the deployed smart contract
- View detailed information about each NFT and its corresponding asset

### Verify Asset

The Verify Asset section enables users to:

- Submit asset details for verification
- Interact with the backend to process zero-knowledge proofs
- Receive detailed information about the verified asset

## Technical Stack

Next.js, Typescript , TailwindCSS

## Smart Contract Integration

The frontend interacts with the deployed smart contract for:

- Fetching available NFTs
- Handling NFT purchases
- Minting new NFTs upon successful asset verification

## Backend Integration

The frontend communicates with the backend for:

- Submitting asset details for verification
- Receiving verification results
- Retrieving detailed asset information

## User Flow

1. User navigates to the ZK_RWA_Tracker platform
2. User chooses between NFT Marketplace and Verify Asset
3. In NFT Marketplace:
   - Browse available NFTs
   - Select an NFT to purchase
   - Complete the transaction using the integrated smart contract
4. In Verify Asset:
   - Submit asset details for verification
   - Wait for the backend to process the zero-knowledge proof
   - Receive verification results and detailed asset information

