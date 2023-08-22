import React from 'react'
import { useHistory } from 'react-router-dom';

const NftInfoModal = ({ show, data, handleClose }) => {

  /* Router vars */
  const history = useHistory();


  /* Local vars */
  let nftData = {
    id: data.id,
    name: data.name,
    imageUrl: data.imageUrl,
    ownerAddress: '0x6dAb17F4f762E4816040Da6FF3c5c234E1d5aD6C',
    price: data.price,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel justo ut massa ultrices pretium nec nec massa.',

  }
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 rounded-lg" id="modal">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-95"></div>

      <div className="modal-container bg-black text-white w-full sm:w-2/3 xl:w-1/2 lg:w-1/2 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto h-full sm:h-5/6 md:h-5/6 lg:h-5/6 xl:h-5/6 m-2">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{nftData.name}</h2>
            <button onClick={handleClose} className="modal-close p-2">
              Close
            </button>
          </div>

          <img src={nftData.imageUrl} alt={nftData.name} className="w-full sm:w-96 lg:w-96 md:w-96 xl:w-96 sm:h-96 lg:h-96 md:h-96 xl:h-96 mt-4 rounded h-96 px-7" />

          <h2 className="text-xl font-semibold">{nftData.name}</h2>
          <p className="mt-4 text-white">{nftData.description}</p>
          <div className="mt-4">
            <p className="text-white">Price: <span className='font-bold'>{nftData.price} ETH</span></p>
            <p className="text-white">Owner: <span className='font-bold'>{nftData.ownerAddress}</span></p>
            <p className="text-white">Date Minted: <span className='font-bold'>August 22, 2023</span></p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 px-3 mt-10">
          <button onClick={() => history.push(`/withdraw/${nftData.id}`)} className=" hover:bg-red-600 border-2 border-red-800 w-full text-white font-semibold py-2 px-4 rounded">
            Withdraw NFT
          </button>
          <button onClick={() => history.push(`/update-nft/${nftData.id}`)} className="bg-gray-100 hover:bg-black hover:border-white hover:text-white border-2  w-full text-black font-semibold py-2 px-4 rounded">
            Update NFT
          </button>
        </div>
      </div>
    </div>
  )
}

export default NftInfoModal
