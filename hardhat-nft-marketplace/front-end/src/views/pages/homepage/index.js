import React from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
import { isWalletConnected } from '../../../configs/Funtions'
import Swal from 'sweetalert2'
import PaymentModal from './popup/PaymentModal'
import NFTListing from './NFTListing'
import { useHistory } from 'react-router-dom'
const HomePage = () => {

  const PAYABLE_VALUE = ethers.utils.parseEther('0.1')


  // Redux vars
  const userData = useSelector(state => state.auth.userData)


  /* Routes vars */
  const history = useHistory()

  // State vars
  const [showPaymentModal, setShowPaymentModal] = React.useState(false)

  // function to handle handleEthereumPayment
  const handleEthereumPayment = async () => {

  }

  // function to handle eth payment
  const handleContribute = () => {
    if (isWalletConnected(userData)) {
      setShowPaymentModal(true)
    } else {
      Swal.fire('Connect your wallet', '', 'question')
    }
  }




  return (
    <React.Fragment>

      <div className='homepage'>
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-8 mt-16">
          <div class="flex justify-end p-4">
            <button onClick={() => history.push('/add-nft')} class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center space-x-2">
              Add NFT
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <NFTListing />
        </div>
      </div>

      {/* <PaymentModal /> */}
    </React.Fragment>
  )
}

export default HomePage
