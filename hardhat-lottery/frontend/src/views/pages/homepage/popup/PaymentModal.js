import React from "react";
import Ethereum from "../../../../images/ethereum.png";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../../../../common-components/Alert";
import { isEmpty } from "../../../../configs/Funtions";
const PaymentModal = ({ show, handleCancel, handleSubmit }) => {
  const enteranceFee = useSelector(
    (state) => state.contractData.contractData.eth
  );
  const isLoading = useSelector(
    (state) => state.contractData.transactionLoading
  );
  const transactionResponse = useSelector(
    (state) => state.contractData.transactionResponse
  );

  const formik = useFormik({
    initialValues: {
      eth: "",
    },
    validationSchema: Yup.object({
      eth: Yup.number()
        .required("Required")
        .min(enteranceFee, `Minimum ${enteranceFee} eth required`),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 rounded-lg">
        <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 sm:w-1/2 h-4/5">

          <div className="flex justify-between items-center">
            <h3 className="text-xl ">Contribute</h3>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={handleCancel}
            >
              Close
            </button>
          </div>
          {!isEmpty(transactionResponse.message) && <Alert className='mx-5 mt-12' type={transactionResponse.status} message={transactionResponse.message} show={!isEmpty(transactionResponse.message)} />}


          <form onSubmit={formik.handleSubmit} className=" mt-40">
            <img
              src={Ethereum}
              alt="Ethereum"
              className="w-20 h-20 mx-auto mb-6"
            />

            <div className="mb-4">
              <label for="eth" className="block text-gray-700 font-medium mb-2">
                Ethereum
              </label>
              <input
                type="number"
                name="eth"
                value={formik.values.eth}
                id="eth"
                className={`w-full border rounded-lg px-3 py-2 ${
                  formik.touched.eth && formik.errors.eth && "border-red-500"
                }`}
                placeholder="Enter eth amount"
                onChange={formik.handleChange}
              />
              {formik.touched.eth && formik.errors.eth && (
                <span className="text-red-700">{formik.errors.eth}</span>
              )}
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentModal;
