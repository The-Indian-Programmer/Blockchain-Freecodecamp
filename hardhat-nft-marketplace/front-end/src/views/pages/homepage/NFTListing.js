import React, { useState } from 'react'
import NftInfoModal from '../../../common-components/NftInfoModal'
import { isEmpty } from '../../../configs/Funtions'

const NFTListing = () => {

    const [nftInfo, showNftInfo] = useState({})

    const nftList = [
        {
            id: 1,
            name: 'NFT 1',
            imageUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
            price: '0.1',
        },
        {
            id: 2,
            name: 'NFT 1',
            imageUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
            price: '0.1',
        },
        {
            id: 3,
            name: 'NFT 1',
            imageUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
            price: '0.1',
        },
        {
            id: 4,
            name: 'NFT 1',
            imageUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
            price: '0.1',
        },
        {
            id: 5,
            name: 'NFT 1',
            imageUrl: 'https://www.giantbomb.com/a/uploads/scale_medium/0/6087/2437349-pikachu.png',
            price: '0.1',
        },

    ]
    return (
        <React.Fragment>
            <div>
                <div className="">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
                        {nftList.map((item, index) => {
                            return (<div key={index} onClick={() => showNftInfo(item)} className="max-w-sm overflow-hidden shadow-lg bg-black rounded-lg border-gray-200 border-2" role='button'>
                                <img className="w-full h-96 p-2" src={item.imageUrl} alt="NFT Image 1" />
                                <div className="px-6 py-4 flex justify-between">
                                    <div className="font-bold text-xl mb-2 text-white">{item.name}</div>
                                    <p className="text-white text-base">Price: {item.price} ETH</p>
                                </div>
                            </div>)
                        })}

                    </div>
                </div>
            </div>
            {!isEmpty(nftInfo) && <NftInfoModal show={!isEmpty(nftInfo)} data={nftInfo } handleClose={() => showNftInfo({})}/>}
        </React.Fragment>
    )
}

export default NFTListing
