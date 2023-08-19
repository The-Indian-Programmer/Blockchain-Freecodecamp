import React, { useState } from 'react'
import Metamask from '../images/metamask.svg'
import Coinbase from '../images/coinbase.svg'
import Mew from "../images/mew.png"
import Authereum from "../images/authereum.png"
import Fortmatic from "../images/fortmatic.png"
import Portis from "../images/portis.png"
import Torus from "../images/torus.png"
import WalletConnect from "../images/walletconnect.png"
import '../styles/WallertConnect.css'
import { useDispatch, useSelector } from 'react-redux'
import { handleWalletConnect } from '../redux/authentication'
import { ethers } from 'ethers';
const WalletConnectModal = ({ closeModal }) => {
   
    // Redux dispatch
    const dispatch = useDispatch()
   


    // Function to handle wallet connect
    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try {
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();

                    const network = await provider.getNetwork();

                    dispatch(handleWalletConnect({ isConnected: true, connection: provider.connection ? provider.connection.url : null, chainId: network.chainId, address }))
                    localStorage.setItem('isConnected', true)
                    closeModal()
                } catch (err) {
                    dispatch(handleWalletConnect({ isConnected: false, connection: null, chainId: null, address: null }))
                    localStorage.setItem('isConnected', false)
                    closeModal()
                }
            } else {
                dispatch(handleWalletConnect({ isConnected: false, connection: null, chainId: null, address: null }))
                localStorage.setItem('isConnected', false)
                closeModal()
            }
        } catch (error) {
            dispatch(handleWalletConnect({ isConnected: false, connection: null, chainId: null, address: null }))
            localStorage.setItem('isConnected', false)
            closeModal()
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 ">
            <div className="bg-white rounded-lg p-1 transform transition-transform ease-out duration-300 translate-x-0 w-full mx-3 md:w-1/2 lg:w-1/2 relative">
                <button
                    className="absolute -top-7 -right-5  mt-3 mr-3 text-gray-500 hover:text-gray-800 cursor-pointer bg-white rounded-full p-2 transition-all ease-out duration-300 border border-gray-500 hover:border-gray-800"
                    onClick={() => closeModal()}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <div className="flex flex-col justify-between mt-10">
                    <button onClick={connectWallet} className="relative flex items-center text-white font-extrabold px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 border border-gray-500 mb-2 rounded overflow-hidden transition-all">
                        <img className='walleticon' src={Metamask} /> Connect with Metamask
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 text-white font-extrabold  bg-gradient-to-r from-blue-500 to-indigo-500 border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Coinbase} /> Connect with Coinbase
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 font-extrabold bg-gradient-to-r from-green-500 to-blue-500 text-white border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={WalletConnect} /> Connect with WalletConnect
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Portis} /> Connect with Portis
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 font-extrabold  bg-gradient-to-r from-orange-500 to-yellow-500 text-white border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Fortmatic} /> Connect with Fortmatic
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-white border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Torus} /> Connect with Torus
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 font-extrabold bg-gradient-to-r from-red-500 to-pink-500 text-white border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Authereum} /> Connect with Authereum
                    </button>
                    <button disabled={true} className="flex items-center px-4 py-2 font-extrabold bg-gradient-to-r from-indigo-500 to-blue-500 text-white border border-gray-500 mb-2 rounded disabled:opacity-30">
                        <img className='walleticon' src={Mew} /> Connect with MEW wallet
                    </button>

                </div>
            </div>
        </div>

    )
}

export default WalletConnectModal
