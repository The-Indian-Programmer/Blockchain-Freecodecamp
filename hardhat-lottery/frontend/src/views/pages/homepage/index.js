import React from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
import { isWalletConnected } from '../../../configs/Funtions'
import Swal from 'sweetalert2'
import PaymentModal from './popup/PaymentModal'
const HomePage = () => {

  const PAYABLE_VALUE = ethers.utils.parseEther('0.1')


  // Redux vars
  const userData = useSelector(state => state.auth.userData)

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


  const handleEthPaymentSubmit = async (ethAmount) => {
    
  }



  return (
    <React.Fragment>

      <div className='homepage'>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-96 px-8 h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-white text-3xl font-bold mb-4">WEB3 FundMe</h2>
            <p className="text-white text-lg mb-6">Fund 0.1 Ethers</p>
            <button onClick={handleContribute} className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300">Contribute Now</button>
          </div>
        </div>
      </div>

     {showPaymentModal && <PaymentModal handleSubmit={handleEthPaymentSubmit} handleCancel={() => setShowPaymentModal(false)}/>}
    </React.Fragment>
  )
}

export default HomePage
