import React from "react";
import { isEmpty } from "../../../configs/Funtions";
import { useSelector } from "react-redux";

const RecentWinner = () => {
  const recentWinner = useSelector((state) => state.contractData.recentWinner);

  return (
    <>
   {!isEmpty(recentWinner)  && <div >
      <h1 className="text-xl text-white font-semibold mb-4">RecentWinner</h1>
      <ul className="space-y-2">
        <li className="bg-white shadow-md rounded p-4">
          <span className="font-semibold break-words">{recentWinner}</span>
        </li>
      </ul>
    </div>}
    </>
  );
};

export default RecentWinner;
