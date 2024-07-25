import * as React from 'react';
import { Connector, useConnect } from 'wagmi';

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const [showModal, setShowModal] = React.useState(false);

  const handleConnectClick = () => {
    setShowModal(true); // Show the modal when "Connect" is clicked
  };

  const handleWalletSelect = (connector:any) => {
    connect({ connector });
    setShowModal(false); // Close the modal after a wallet is selected
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Button to open modal */}
      {!showModal && (
        <button 
          onClick={handleConnectClick}
          className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          Connect
        </button>
      )}

      {/* Modal for wallet options */}
      {showModal && (
        <div className="fixed inset-0 p-16 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black text-center px-6 py-28 rounded-md text-sm font-medium hover:bg-gray-200">
            <h2 className="text-4xl font-semibold">Connect Wallet</h2>
            <div className='flex flex-row space-x-6 m-6'>

            
            {connectors.map((connector) => (
              <button 
                key={connector.uid} 
                onClick={() => handleWalletSelect(connector)}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-200 hover:text-black transition duration-300 w-fit "
              >
                {connector.name}
              </button>
            ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
