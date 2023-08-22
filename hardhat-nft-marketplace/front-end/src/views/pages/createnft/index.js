import { useFormik } from 'formik';
import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { isEmpty } from '../../../configs/Funtions';
const CreateOrAddNFT = () => {
    /* Router vars */
    const history = useHistory();
    const {id} = useParams();


    /* Formik Vars */
    const formik = useFormik({
        initialValues: {
            nftAddress: '0x6dAb17F4f762E4816040Da6FF3c5c234E1d5aD6C',
            tokenID: '',
            price: ''
        },
        validationSchema: Yup.object({
            nftAddress: Yup.string().required('Required field').matches(/^0x[a-fA-F0-9]{40}$/, 'Invalid address'),
            tokenID: Yup.number().min(0, 'TokenId must be greater than 0').required('Required field'),
            price: Yup.number().positive('Value must be greater than 0').required('Required field'),
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    });
    return (
        <div className='withdrawnft'>
            <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-2 mt-16 py-10 w-full ">
                <div className='w-full sm:w-5/6 lg:w-5/6 mx-auto'>

                    <button onClick={() => history.goBack()} className="flex items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Home
                    </button>
                    <form className='mt-10 h-screen' onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-white text-sm font-semibold mb-2">
                                NFT Address
                            </label>
                            <input
                                type="text"
                                name='nftAddress'
                                className={`w-full py-2 px-3 border rounded shadow-sm ${formik.touched.nftAddress && formik.errors.nftAddress && 'border-red-900'} focus:outline-none focus:ring focus:border-blue-500`}
                                placeholder="Enter NFT Address"
                                value={formik.values.nftAddress}
                                readOnly={!isEmpty(id)}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.nftAddress && formik.errors.nftAddress && <span className='text-red-900'>{formik.errors.nftAddress}</span>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm font-semibold mb-2">
                                Token ID
                            </label>
                            <input
                                type="text"
                                name='tokenID'
                                className={`w-full py-2 px-3 border rounded shadow-sm ${formik.touched.tokenID && formik.errors.tokenID && 'border-red-900'} focus:outline-none focus:ring focus:border-blue-500`}
                                placeholder="Enter Token ID"
                                readOnly={!isEmpty(id)}
                                value={formik.values.tokenID}
                                onChange={isEmpty(id) && formik.handleChange}
                            />
                            {formik.touched.tokenID && formik.errors.tokenID && <span className='text-red-900'>{formik.errors.tokenID}</span>}
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm font-semibold mb-2">
                                Price
                            </label>
                            <input
                                type="text"
                                name='price'
                                className={`w-full py-2 px-3 border rounded shadow-sm ${formik.touched.price && formik.errors.price && 'border-red-900'} focus:outline-none focus:ring focus:border-blue-500`}
                                placeholder="Enter Price in ETH"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.price && formik.errors.price && <span className='text-red-900'>{formik.errors.price}</span>}

                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 w-full" type='submit'
                        >
                             {!isEmpty(id) ? 'Update NFT' : 'Add NFT'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateOrAddNFT
