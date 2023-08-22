import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ConfirmWithDraw from './popup/ConfirmWithDraw';

const WithDrawNFT = () => {

    /* State Vars */
    const [showConfirmationModal, setShowConfirmationModal]  = useState(false)

    /* Router vars */
    const history = useHistory();

    const nftData = {
        name: 'NFT Name',
        image: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Nulla facilisi. Nulla facilisi.',
        price: '1.5 ETH',
        owner: 'John Doe',
        edition: '1 of 10',
        mintingDate: 'August 22, 2023',
    };
    return (
        <React.Fragment>
        <div className='withdrawnft'>
            <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-2 mt-16 py-10 w-full">
                <button onClick={() => history.goBack()} className="flex items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                </button>
                <div className="flex flex-col w-full md:flex-row  h-screen">
                    {/* Image (Left on larger screens, Top on smaller screens) */}
                    <img src={nftData.image} alt="NFT Image" className="md:w-auto rounded md:mr-6 mb-4 md:mb-0 w-full sm:h-96 xl:h-5/6 md:h-5/6 lg:h-5/6" />

                    {/* Information (Right on larger screens, Below the image on smaller screens) */}
                    <div className="mt-10 lg:mt-0 xl:mt-0 md:mt-0 max-w-md  p-0">
                        <h2 className="text-2xl text-white font-semibold">{nftData.name}</h2>
                        <p className="text-white mt-2">{nftData.description}</p>
                        <p className="text-white mt-2">Price: {nftData.price}</p>
                        <p className="text-white">Owner: {nftData.owner}</p>
                        <p className="text-white">Edition: {nftData.edition}</p>
                        <p className="text-white">Date Minted: {nftData.mintingDate}</p>

                        {/* Withdraw Button */}
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-0 rounded mt-16 w-full"
                          onClick={() => setShowConfirmationModal(true)}
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {showConfirmationModal && <ConfirmWithDraw show={showConfirmationModal} handleClose={() => setShowConfirmationModal(false)}  handleSubmit={() => setShowConfirmationModal(false)} />}
        </React.Fragment>
    )
}

export default WithDrawNFT
