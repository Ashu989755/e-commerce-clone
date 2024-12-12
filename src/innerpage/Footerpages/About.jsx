import React, { useState } from 'react'
import Header_two from '../layout/Header_two'
import Footer_two from '../layout/Footer_two'
import Accordion from '../../Landingpage/Accordion';

function About() {
    const [activeTab, setActiveTab] = useState('Description');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
  return (
    <>  
    <Header_two></Header_two>
      <section className='pt-20 bg-dark_link grid content-center min-h-72'>
        <div className="container mx-auto">
            <div className="grid grid-cols-1">
                <div className="">
                    <h3 className='text-3xl font-bold text-center text-white my-3'>About Us</h3>
                    <p className='text-center text-white'>Lorem ipsum dolor sit amet consectetur. Tempus urna et gravida condimentum.</p>
                </div>
            </div>
        </div>
      </section>

      <section className='min-h-screen'>
        <div className="container mx-auto">
            <div className="tab-bar w-2/4 mx-auto mt-14 !border-0 transition-all">
                <button 
                className={activeTab === 'Description' ? 'active !rounded-xl' : 'shadow-md !rounded-xl'}
                onClick={() => handleTabClick('Description')}
                >
                Description
                </button>
                <button
                className={activeTab === 'Vision' ? 'active !rounded-xl' : 'shadow-md !rounded-xl'}
                onClick={() => handleTabClick('Vision')}
                >
                Vision
                </button>
                <button
                className={activeTab === 'Copyright' ? 'active !rounded-xl' : 'shadow-md !rounded-xl'}
                onClick={() => handleTabClick('Copyright')}
                >
                Copyright
                </button>
                <button
                className={activeTab === 'FAQs' ? 'active !rounded-xl' : 'shadow-md !rounded-xl'}
                onClick={() => handleTabClick('FAQs')}
                >
                FAQs
                </button>
            </div>
            <div className="tab-content py-5 transition-all">
                {activeTab === 'Description' && 
                <>
                    <div className="p-4 w-3/4 mx-auto">
                        <h4 className='text-dark_link font-semibold text-lg'>About our App</h4>
                        <p className='text-main_gray my-5 text-sm'>Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim </p>
                        <p className='text-main_gray my-5 text-sm'>Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim </p>
                    </div>
                </>
                    
                
                }
                {activeTab === 'Vision' && 

                <>
                    <div className="p-4 w-3/4 mx-auto">
                        <h4 className='text-dark_link font-semibold text-lg'>Our Vision</h4>
                        <p className='text-main_gray my-5 text-sm'>Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim </p>
                        <p className='text-main_gray my-5 text-sm'>Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim </p>
                    </div>
                    
                </>
                
        }

        {activeTab === 'Copyright' && 
        <>
            <div className="p-4 w-3/4 mx-auto">
                <div className="grid grid-cols-2">
                    <div className="col-span-1 border-r p-3 pe-16">
                        <div className="mb-14">
                            <h4 className='text-dark_link font-semibold text-lg'>Our Vision</h4>
                            <i className='text-sm'>@ 2023 at OurReview <br />
                            All Rights Reserved</i>
                        </div>
                        <div className="mb-5">
                            <h4 className='text-dark_link font-semibold text-lg mb-4'>Our Vision</h4>
                            <p className='text-sm'>Please refer to the Terms of Use and Privacy Policy for more information about app usage, data handling, and limitations of liability.</p>
                        </div>


                    </div>
                    <div className="col-span-1 p-3 ps-16">
                            <div className="mb-5">
                                <h4 className='text-dark_link font-bold text-lg mb-3'>App Version</h4>
                                <ul className='text-sm'>
                                    <li className='font-medium text-dark_link flex mb-4'><span className='inline-block w-3/12'>App Version.</span> <span className='w-3/4 inline-block px-4'>2.0.1</span></li>
                                    <li className='font-medium text-dark_link flex mb-4'><span className='inline-block w-3/12'>Release Date</span> <span className='w-3/4 inline-block px-4'>August 8, 2023</span></li>
                                    <li className='font-medium text-dark_link flex mb-4'><span className='inline-block w-3/12'>Changelog</span>
                                    <span className='w-3/4 inline-block px-4'>
                                        <ul className='list-disc flex flex-col gap-3.5'>
                                            <li>Added new feature : User Profile Customization</li>
                                            <li>Improved Performance and Stability</li>
                                            <li>Bug Fixes</li>
                                        </ul>
                                    </span>
                                    
                                    </li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>

        </>

}

                {activeTab === 'FAQs' && 
                   <div className="p-4 w-3/4 mx-auto">
                        <Accordion
                                title="Who can use OurReview ?"
                                content="Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim"
                            />

                        <Accordion
                                title="Can customers see the reviews I submit ?"
                                content="Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim"
                            /> 

                         <Accordion
                                title="What info to add in my Reviews ?"
                                content="Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim"
                            />

                        <Accordion
                                title="Can I interact with other service professionals ?"
                                content="Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim sed tellus. Nisl sit dictum ut gravida dis.Lorem ipsum dolor sit amet consectetur. Sit in sed tortor lacus semper blandit orci facilisi egestas. Tortor arcu ut eu eu dignissim"
                            />          
                   </div>
                }
            </div>
        </div>

      </section>

     <Footer_two></Footer_two> 
    </>
  )
}

export default About