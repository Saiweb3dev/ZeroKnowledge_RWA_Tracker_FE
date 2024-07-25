import * as React from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [showModal, setShowModal] = React.useState(false);

  // Helper function to format wallet address
  const formatAddress = (address:string) => `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;

  // Modal structure defined inline
  const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-black p-4 rounded shadow-lg w-full max-w-xs space-y-4 border-2 border-white">
          {children}
          <button 
            className='bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition duration-300 w-full'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Address as button */}
      {address && (
        <button 
          className="text-sm font-medium text-gray-300 hover:text-gray-500 border px-4 rounded-lg"
          onClick={() => setShowModal(true)}
        >
          {formatAddress(address)}
        </button>
      )}

      {/* Inline modal for disconnect button */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-semibold">Disconnect Wallet</h2>
        <p className="text-gray-600">Are you sure you want to disconnect?</p>
        <button 
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium border hover:bg-white hover:text-black transition duration-300 w-full mt-4"
          onClick={() => {
            disconnect();
            setShowModal(false); // Close modal after disconnecting
          }}
        >
          Disconnect
        </button>
      </Modal>
    </div>
  );
}
