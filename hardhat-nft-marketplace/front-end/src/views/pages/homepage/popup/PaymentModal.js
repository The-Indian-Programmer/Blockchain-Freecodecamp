import React from 'react'
import Ethereum from "../../../../images/ethereum.png"
const PaymentModal = ({show, handleCancel, handleSubmit}) => {

    const [formData, setFormData] = React.useState({
        name: '',
        eth: ''
    })

    const [error, setError] = React.useState({
        name: '',
        eth: ''
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const handleEthereumPayment = () => {
        if (name == '' || name.length < 5) return setError({name: 'Name is required and must be at least 5 characters long'})
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 sm:w-1/2 h-4/5">
                <div className="flex justify-between items-center mb-56">
                    <h3 className="text-xl ">Contribute</h3>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onclick="closeModal()">Close</button>
                </div>
                <img src={Ethereum} alt="Ethereum" className="w-20 h-20 mx-auto mb-6" />

                <div className="mb-4">
                    <label for="name" className="block text-gray-700 font-medium mb-2">Name</label>
                    <input type="text" id="name" name='name' className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Enter your name'/>
                </div>
                <div className="mb-4">
                    <label for="eth" className="block text-gray-700 font-medium mb-2">Ethereum</label>
                    <input type="number" name='eth' id="eth" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" placeholder='Enter eth amount'/>
                </div>

                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none" onClick={handleEthereumPayment}>Pay Now</button>
            </div>
        </div>
    )
}

export default PaymentModal
