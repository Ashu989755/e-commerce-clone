import React from 'react'
import Header_two from '../layout/Header_two'
import Footer_two from '../layout/Footer_two'

function Terms_Conditions() {
  return (
    <>
    <Header_two></Header_two>
        <section className='pt-20 bg-dark_link grid content-center min-h-72'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1">
                    <div className="">
                        <h3 className='text-3xl font-bold text-center text-white my-3'>Terms & Conditions</h3>
                        <p className='text-center text-white'>Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida condimentum.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className='py-20'>
            <div className="container mx-auto">
                <div className="w-4/5 mx-auto">
                    <p className='my-5'>Please read these terms and conditions carefully before using [Your Website/Service] (the "Service") operated by [Your Company Name] ("us", "we", or "our").</p>
                    <p className='my-5'>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service</p>
                    <h3 className='font-bold text-dark_link text-xl'>Termination</h3>
                    <p className='my-5'>All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
                    <h3 className='font-bold text-dark_link text-xl'>Governing Law</h3>
                    <p className='my-5'>These Terms shall be governed and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.</p>
                    <p className='my-5'>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect</p>
                    <p className='my-5'>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p> 
                    <h3 className='font-bold text-dark_link text-xl'>Contact Us</h3>
                    <p className='my-5'>If you have any questions about these Terms, please contact us at [Your Contact Information].</p>
               </div>
            </div>
        </section>



    <Footer_two></Footer_two>  
    </>
  )
}

export default Terms_Conditions
