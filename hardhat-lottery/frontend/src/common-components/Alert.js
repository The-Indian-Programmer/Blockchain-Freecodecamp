import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransactionResponse } from "../redux/commonStore";
import { isEmpty } from "../configs/Funtions";

function Alert({ message, type, show, handleCancel, handleSubmit }) {
  /* Resux Vars*/
  const transactionResponse = useSelector(
    (state) => state.contractData.transactionResponse
  );
  const dispatch = useDispatch();

  /* Local Vars*/
  let alertColor =
    "bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md";

  let svgColor = "fill-current h-6 w-6 text-blue-500 mr-4";

  if (type === "success")
    alertColor =
      "bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md";
  if (type === "error")
    alertColor =
      "bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md";
  if (type === "warning")
    alertColor =
      "bg-yellow-100 border-t-4 border-yellow-500 rounded-b text-yellow-900 px-4 py-3 shadow-md";

  if (type === "success") svgColor = "fill-current h-6 w-6 text-green-500 mr-4";
  if (type === "error") svgColor = "fill-current h-6 w-6 text-red-500 mr-4";
  if (type === "warning")
    svgColor = "fill-current h-6 w-6 text-yellow-500 mr-4";

  if (type === "success") type = "Success";
  if (type === "error") type = "Error";
  if (type === "warning") type = "Warning";

  useEffect(() => {
    if (!isEmpty(transactionResponse.message)) {
      setTimeout(() => {
        let body = { message: "", status: "" };
        dispatch(updateTransactionResponse(body));
      }, 3000);
    }
  }, [transactionResponse]);

  return show ? (
    <div className={alertColor} role="alert">
      <div className="flex">
        <div className="py-1">
          <svg
            className={svgColor}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z" />
            <path d="M11 7h2v7h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{type}</p>
          <p className="text-sm">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6.22 6.22l7.56 7.56m0-7.56L6.22 13.78" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Alert;
