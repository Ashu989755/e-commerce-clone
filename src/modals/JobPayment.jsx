import React, {useState} from 'react'
import { X } from 'lucide-react'



function JobPayment({isOpen,closeModal,setValueT, handleBookAppointment}) {
 console.log(handleBookAppointment)
  
  const handleInsideAppClick = () => {
    setValueT(1); 
    handleBookAppointment(1);
    closeModal() ;
  };

  const handleOutsideAppClick = () => {
    setValueT(2);
    handleBookAppointment(2);
    closeModal() ;
  };

  return (
    <div>
    {/* <button onClick={openModal}>Open Modal</button> */}
  { isOpen && (
      <div id='add_modal' className="fixed z-[9999] inset-0 overflow-y-auto"     >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity"
            onClick={closeModal}>
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true">&#8203;</span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Modal Content */}
            <div className="bg-white ">
              <div className="">
                <div className="mt-3 py-5 px-10 text-center sm:mt-0 sm:text-left">
                  <div className="relative">
                    <h3 className='text-lg font-semibold'>Job Payment</h3>
                     <p>How would you like to pay?</p>       
                    <div className="inp my-4 relative">
                    <button
                     onClick={handleInsideAppClick}
                     class="w-full text-dark_link py-4 bg-white font-medium rounded-lg border border-gray-900">Inside The App</button>
                    </div>

                    <div className="">
                        <button 
                        onClick={handleOutsideAppClick}
                        class="w-full bg-dark_link py-4 text-white font-medium rounded-lg">Outside The App</button>
                    </div>

                  </div>
                  <div className="mod_hd absolute right-4 top-3">
                    <button type="button" onClick={closeModal} >
                    <X color='#3C3C3C' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
</div>
  )
}

export default JobPayment