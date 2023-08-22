import React from 'react'

const index = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-500 to-gray-600 py-6">
  <div className="container mx-auto px-4">
    <div className="flex justify-center items-center space-x-6">
      {/* <!-- Web3 Icon --> */}
      <a href="#" className="text-white transition-colors duration-300">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* <!-- Replace with your web3 icon SVG --> */}
        </svg>
      </a>
      {/* <!-- Facebook Icon --> */}
      <a href="#" className="text-white transition-colors duration-300">
        <i className="fab fa-facebook"></i>
      </a>
      {/* <!-- Instagram Icon --> */}
      <a href="#" className="text-white transition-colors duration-300">
        <i className="fab fa-instagram"></i>
      </a>
      {/* <!-- GitHub Icon --> */}
      <a href="#" className="text-white transition-colors duration-300">
        <i className="fab fa-github"></i>
      </a>
      {/* <!-- LinkedIn Icon --> */}
      <a href="#" className="text-white transition-colors duration-300">
        <i className="fab fa-linkedin"></i>
      </a>
    </div>
  </div>
</footer>

  )
}

export default index
