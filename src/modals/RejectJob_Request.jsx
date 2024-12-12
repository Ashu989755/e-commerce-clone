import { X } from 'lucide-react'
import React from 'react'

function RejectJob_Request({isOpen,closeModal}) {
  return (
    <>  
           <div>
        {/* <button onClick={openModal}>Open Modal</button> */}
      {isOpen && (
          <div id='add_modal' className="fixed z-[9999] inset-0 overflow-y-auto"     >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity"
                onClick={closeModal}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                {/* Modal Content */}
                <div className="bg-white">
                    <div className="mt-3 py-5 px-10 text-center sm:mt-0 sm:text-left">

                      <div className="relative">
                        <h3 className='text-lg font-semibold'>Reject Job Request</h3>

                        <div className="inp my-4 relative">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                            <label class="form-check-label ms-3" for="gridRadios1">
                            Unavailable for this day/time
                            </label>
                        </div>
                        </div>

                        <div className="inp my-4 relative">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                            <label class="form-check-label ms-3" for="gridRadios1">
                            Job is too far away
                            </label>
                        </div>                
                        </div>
                        <div className="inp my-4 relative">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                            <label class="form-check-label ms-3" for="gridRadios1">
                            Other
                            </label>
                        </div>      
                        </div>
                        <div className="inp my-4 relative">
                        <div class="form-check">
                        <textarea class="form-control border w-full h-32" rows="3"></textarea>
                        </div>      
                        </div>
                        <div className="">
                            <button class="w-full bg-dark_link py-4 text-white font-medium rounded-lg">Add</button>
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
        )}
    </div>     
    </>
  )
}

export default RejectJob_Request