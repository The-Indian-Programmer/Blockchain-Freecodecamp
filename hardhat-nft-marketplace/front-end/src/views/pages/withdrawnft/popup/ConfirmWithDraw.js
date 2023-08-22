import React from 'react'

const ConfirmWithDraw = ({show, handleSubmit, handleClose}) => {
  return (
    <div class="fixed inset-0 flex justify-center items-center z-50 " id="modal">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-95"></div>
      <div class="modal-container bg-gray-950 text-white w-full sm:w-5/6 lg:w-1/2 mx-auto rounded shadow-lg z-50 p-6">
        <h2 class="text-xl font-semibold mb-4">Confirmation</h2>
        <p class="text-white mb-6">Are you sure you want to withdraw nft ?</p>
        
        <div class="flex justify-end">
          <button onClick={handleClose} class="bg-gray-400 border-2 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-2" id="cancelButton">
            Cancel
          </button>
          <button onClick={handleSubmit} class="bg-red-500 border-2 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" id="confirmButton">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmWithDraw
