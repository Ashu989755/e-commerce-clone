import { X } from 'lucide-react';
import React, { useState } from 'react';
import { HourlyPrice, PaymentIcon } from "../assets/image";
import { useNavigate } from 'react-router-dom';


function BusinessEstimate({ isOpen, closeModal, estimateList }) {
  
  

  const navigate = useNavigate(); 
  const [type, setType] = useState(null); 

  const handleHourlyClick = (item) => {
    navigate("/send-estimates-contract", { state: { estimateList, type: 0 } });
  };

  const handleFixedClick = (item) => {
    navigate("/send-estimates-contract", { state: { estimateList, type: 1} }); 
  };

  return (
    <>
      {isOpen && (
        <div id='add_modal' className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              {/* Modal Content */}
              <div className="bg-white">
                <div className="">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mod_hd absolute right-4 top-3">
                      <button type="button" onClick={closeModal}>
                        <X color='#3C3C3C' />
                      </button>
                    </div>
                   
                    <div className='px-8 py-10'>
                      <h2 className='text-xl font-semibold text-center mb-6'>Estimate</h2>
                      {/* Buttons */}
                      <div className="flex justify-center flex-col gap-3">
                        <button 
                          onClick={handleHourlyClick} 
                          className={`bg-white rounded-xl text-dark border-2 px-4 py-3 text-left flex items-center mb-3 gap-4 ${type === 0 ? 'border-blue-500' : ''}`}
                        >
                          <img src={HourlyPrice} alt="" />
                          Hourly job estimate
                        </button>
                        <button 
                          onClick={handleFixedClick} 
                          className={`bg-white rounded-xl text-dark border-2 px-4 py-3 flex items-center gap-4 ${type === 1 ? 'border-blue-500' : ''}`}
                        >
                          <img src={PaymentIcon} alt="" />
                          Fixed job estimate
                        </button>
                      </div>
                    </div>
                
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BusinessEstimate;
