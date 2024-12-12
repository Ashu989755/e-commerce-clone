import { X } from 'lucide-react'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChooseDocuments from './ChooseDocuments';


function Estimates({isOpen, closeModal, state ,}) {
  console.log(state,"=====")
  
  const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate("/send-estimates", { state: state });
  };

  const [ChooseDocument, setChooseDocument] = useState(false);
  const showChooseDocument = () =>
    { 
    
    setChooseDocument(true);
   
  }
  const closeChooseDocument = () => setChooseDocument(false)

  // const openChooseDocuments = (jobDetail) => {
  //   setChooseDocuments(true);
  // };
  // const closeChooseDocuments = () => {
  //   setChooseDocuments(false);
  // };
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
                      <h2 className='text-xl font-semibold text-center mb-2'>Estimate</h2>
                      <p className='text-center mb-6'>How would you like to send estimate?</p>
                      {/* Buttons */}
                      <div className="flex justify-center flex-col gap-3">
                        <button className="rounded-xl text-[#303030] border-[#303030] border-2 px-4 py-3 text-left flex items-center mb-2 gap-4  justify-center" 
                         onClick={showChooseDocument}
                        >Choose from documents</button>
                        <button onClick={handleNavigate} className="bg-[#303030] rounded-xl t text-white border-2 px-4 py-4 flex items-center gap-4 text-center justify-center">Create new</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ChooseDocuments isOpen={ChooseDocument} closeModal={closeChooseDocument} />
        </div>
        
      )}    
    </>
  )
}

export default Estimates