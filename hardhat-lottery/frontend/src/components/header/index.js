import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/'
import WalletConnectModal from '../../common-components/WalletConnectModal'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../configs/Funtions';
import Metamask from '../../images/metamask.svg'
import Coinbase from '../../images/coinbase.svg'
import Mew from "../../images/mew.png"
import Authereum from "../../images/authereum.png"
import Fortmatic from "../../images/fortmatic.png"
import Portis from "../../images/portis.png"
import Torus from "../../images/torus.png"
import ConfirmationModal from '../../common-components/ConfirmationModal';
import { handleWalletDisconnect } from '../../redux/authentication';
import { ethers } from 'ethers';
const Header = () => {
    // Local state
    const [scrolling, setScrolling] = useState(false);
    const [showConnectModal, setConnectModal] = useState(false);
    const [showConfirmationModal, setConfirmationModal] = useState(false);
    const [confirmationModalData, setConfirmationModalData] = useState({});

    // Redux state
    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch();


    const handleConfirmationModal = (data) => {
        setConfirmationModal(data.status);
        if (data.status) {
            let newData = {
                title: 'Are you sure you want to disconnect?',
                onSubmit: () => {
                    disConnectWallet();
                },
                onCancel: () => {
                    setConfirmationModal(false);
                }
            }
            setConfirmationModalData(newData);
        } else {
            setConfirmationModalData({});
            setConfirmationModal(false);
        }
    }

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // const isEmptyUserData = () => {
    //     let keys = !isEmpty(userData) ? Object.keys(userData) : [];
    //     let empty = true;
    //     keys.forEach((key) => {
    //         if (!isEmpty(userData[key])) {
    //             empty = false;
    //         }
    //     })
    //     return empty;
    // }

    let isWalletConnected = false;
    if (isEmpty(userData.address) && isEmpty(userData.isConnected)) {
        isWalletConnected = false;
    } else {
        isWalletConnected = true;
    }


    useEffect(() => {
        if (!isWalletConnected) return
        let newData = {
            title: 'Are you sure you want to disconnect?',
            onSubmit: () => {
                disConnectWallet();
            },
            onCancel: () => {
                setConfirmationModal(false);
            }
        }
        setConfirmationModalData(newData);
    }, [isWalletConnected])



    const ConnectWalletAddress = ({ address, connection, handleConfirmationModal }) => {
        let img = null;

        if (connection) {
            if (connection == 'metamask') {
                img = Metamask;
            } else if (connection == 'coinbase') {
                img = Coinbase;
            } else if (connection == 'mew') {
                img = Mew;
            } else if (connection == 'authereum') {
                img = Authereum;
            } else if (connection == 'fortmatic') {
                img = Fortmatic;
            } else if (connection == 'portis') {
                img = Portis;
            } else if (connection == 'torus') {
                img = Torus;
            } else {
                img = null;
            }
        }

        return (
            <button
                className={`${scrolling ? 'border border-blue-600' : 'bg-white text-blue-500'} flex items-center px-4 py-2  border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 hover:text-black `}
                onClick={() => handleConfirmationModal()}
            >
                {!isEmpty(img) ? <img src={img} className="w-5 h-5 mr-2" /> : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    {/* Replace the SVG path with the actual SVG icon code */}
                    <path
                        fillRule="evenodd"
                        d="M10 2C5.581 2 2 5.582 2 10s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm0 1.091C6.307 3.091 3.09 6.308 3.09 10c0 3.692 3.216 6.909 6.91 6.909 3.692 0 6.909-3.216 6.909-6.91 0-3.692-3.217-6.909-6.91-6.909zm4.606 11.57a.416.416 0 01-.606.604 5.707 5.707 0 01-5.096 0 .416.416 0 11-.605-.604 6.538 6.538 0 005.706 0zm-1.808-3.394a.415.415 0 00-.594 0 3.752 3.752 0 01-5.924 0 .416.416 0 10-.594.594 4.584 4.584 0 005.659 0 .416.416 0 000-.594zm-2.205-2.202a.415.415 0 00-.594 0c-1.234 1.233-1.234 3.243 0 4.476a.416.416 0 10.594-.594c-.86-.86-.86-2.261 0-3.122a.415.415 0 000-.594zm2.205-2.202c-.86-.86-2.261-.86-3.122 0a.416.416 0 00-.594.594c1.233 1.233 1.233 3.243 0 4.476a.416.416 0 10.594.594c1.234-1.233 1.234-3.243 0-4.476zm2.202 2.202c-.86.86-.86 2.261 0 3.122a.416.416 0 10.594-.594c-.86-.86-.86-2.261 0-3.122a.416.416 0 10-.594-.594zm-6.697-.594a.416.416 0 10-.594.594 2.96 2.96 0 010 4.188.416.416 0 10.594-.594 2.128 2.128 0 000-2.999zm4.188 2.999a.416.416 0 10-.594-.594 2.96 2.96 0 010-4.188.416.416 0 10.594.594 2.128 2.128 0 000 2.999z"
                        clipRule="evenodd"
                    />
                </svg>}
                {address && address.slice(0, 6) + '...' + address.slice(-4)}
            </button>
        )
    }


    const disConnectWallet = async () => {
        try {
            if (window.ethereum && window.ethereum.isConnected()) {
                // Disconnect the wallet by resetting the provider and signer
                window.ethereum.provider = null;
                window.ethereum.chainId = null;
                // window.ethereum.disconnect()
                // Clear the local storage and Redux state related to the wallet connection
                dispatch(handleWalletDisconnect());
                handleConfirmationModal({ status: false });
                localStorage.setItem('isConnected', false);
            } else {
                // console.log(window.ethereum);
            }
        } catch (error) {
            console.error('Error disconnecting the wallet:', error);
        }
    }

 

    return (
        <>
            <nav className={`${scrolling ? 'bg-white text-blue-500' : 'text-white bg-gradient-to-r from-blue-500 to-purple-600'} py-4 px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0`}>
                <Link to='/' className="flex items-center" role='button'>
                    <svg className="h-6 w-6 text-white bg-blue-500 rounded-full p-1 ">
                        <path className="fill-current" d="M9.313 14.92c-.028.193-.07.379-.124.56l-.375 1.499h5.373l-.374-1.499a3.001 3.001 0 0 0-.124-.56l-.506-1.52a4.468 4.468 0 0 0-.468-1.015L12 10.5l-.218-.655a4.468 4.468 0 0 0-.468 1.015l-.506 1.52zM16.5 5h-2V3a2 2 0 0 0-4 0v2h-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-1 10H6V7h9v8z" />
                    </svg>

                    <span className='ml-3 md:block lg:block hidden font-extrabold text-xl bg-none hover:bg-none'>Buy me a coffee</span>
                </Link>
                {(!isWalletConnected) ? <button onClick={() => setConnectModal(true)} className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2 2v10m6-10v10m4-10v10M5 15h14" />
                    </svg>
                    Connect Wallet
                </button> : <ConnectWalletAddress handleConfirmationModal={() => handleConfirmationModal({ status: true })} address={userData.address} connection={userData.connection} />}

            </nav>
            {showConnectModal && <WalletConnectModal closeModal={() => setConnectModal(false)} />}

            {showConfirmationModal && <ConfirmationModal isOpen={showConfirmationModal} closeModal={() => handleConfirmationModal({ status: false })} title={confirmationModalData.title} onSubmit={confirmationModalData.onSubmit} onCancel={confirmationModalData.onCancel} />}
        </>
    )
}

export default Header
