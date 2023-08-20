import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, isWalletConnected } from "../../../configs/Funtions";
import Swal from "sweetalert2";
import PaymentModal from "./popup/PaymentModal";
import { handleEnterLottery } from "../../../redux/commonStore";
import LotteryInformation from "./LotterInformation.js";
import Alert from "../../../common-components/Alert";
import RecentWinner from "./RecentWinner";
import { Link } from "react-router-dom";
import moment from "moment";
import { useWallet } from "../../../custom-hooks/useWallet";
const HomePage = () => {
  const dispatch = useDispatch();

  // Redux vars
  const userData = useSelector((state) => state.auth.userData);
  const contractData = useSelector((state) => state.contractData.contractData);
  const lastTimeStamp = useSelector((state) => state.contractData.lastTimeStamp);
  const interval = useSelector((state) => state.contractData.interval);

  /* Local vars */
  let lastTriggerTime = null;
  let intervalTime = null;
  if (!isEmpty(lastTimeStamp)) {
    lastTriggerTime = new Date(parseInt(lastTimeStamp) * 1000);
  }

  if (!isEmpty(interval)) {
    intervalTime = parseInt(interval);
  }

  



  // State vars
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);

  // function to handle eth payment
  const handleContribute = () => {
    if (!isEmpty(userData) && isWalletConnected(userData) && userData.chainId !== 11155111) {
      Swal.fire("Please connect to sepolia chain", "", "question");
      return;
    }
    if (isWalletConnected(userData)) {
      setShowPaymentModal(true);
    } else {
      Swal.fire("Connect your wallet", "", "question");
    }
  };

  const handleEthPaymentSubmit = async (data) => {
    data = {
      ...data,
      contractAddress: contractData.contractAddress,
      provider: contractData.provider,
    };
    const response = await dispatch(handleEnterLottery(data));
    if (response.meta.requestStatus === "fulfilled") {
      setShowPaymentModal(false);
      localStorage.setItem("astTransactionHash", response.payload.hash);
    }
  };

  return (
    <React.Fragment>
      <div className="homepage ">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 ">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className=" flex items-center justify-center ">
              <Link
                to="/funders"
                className="text-white  hover:text-blue-100 transition duration-300 ease-in-out font-semibold text-xl border-b-2 border-blue-500"
              >
                View All Participants
              </Link>
            </div>
            
            <h2 className="text-white text-3xl font-bold mb-4 mt-5">
              WEB3 FundMe
            </h2>
            <p className="text-white text-lg mb-6">
             <span className="font-extrabold">Last Winner on : </span> {moment(new Date(lastTriggerTime)).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p className="text-white text-lg mb-6">
             <span className="font-extrabold">Winner is calculated after every {intervalTime} seconds if we have at least 1 participant in lottery.</span> 
            </p>
            <button
              onClick={handleContribute}
              className="bg-white text-blue-500 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-500 hover:text-white transition duration-300"
            >
              Contribute Now 0.01 Ethers
            </button>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          handleSubmit={handleEthPaymentSubmit}
          handleCancel={() => setShowPaymentModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default HomePage;
