import React from 'react'
import Header_two from '../layout/Header_two'
import Footer_two from '../layout/Footer_two'

function PrivacyPolicy() {
  return (
    <>
      <Header_two></Header_two>
      <section className='pt-20 bg-dark_link grid content-center min-h-72'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1">
                    <div className="">
                        <h3 className='text-3xl font-bold text-center text-white my-3'>Privacy Policy</h3>
                        <p className='text-center text-white'>Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida condimentum.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className='py-20'>
            <div className="container mx-auto">
                <div className="w-4/5 mx-auto">
                    <h3 className='font-bold text-dark_link text-xl'>Information Collection and Use</h3>
                    <p className='my-5'>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
                    <h3 className='font-bold text-dark_link text-xl'>Personal Data</h3>
                    <p className='my-5'>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service</p>
                    <h3 className='font-bold text-dark_link text-xl'>Usage Data</h3>
                    <p className='my-5'>[Your Company Name] ("us", "we", or "our") operates [Your Website/Service] (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p> 
                    <h3 className='font-bold text-dark_link text-xl'>Accounts</h3>
                    <p className='my-5'>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
                    <p className='my-5'>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>
               </div>
            </div>
        </section>

      <Footer_two></Footer_two>
    </>
  )
}

export default PrivacyPolicy
