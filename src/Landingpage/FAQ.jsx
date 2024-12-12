import React from 'react'
import Accordion from './Accordion'

function FAQ() {
  return (
    <>
      <div className="max-w-5xl	w-11/12 mx-auto p-4">
      <Accordion
        title=" What is the purpose of our job reviews?"
        content="Our platform empowers professionals by offering real, honest job reviews. Whether you’re a job seeker or an experienced worker, these reviews provide valuable insights to help you make informed career decisions."
      />
      <Accordion
        title="How can I share my job experience?"
        content="It’s simple! Create an account, navigate to the review section, and start sharing your job experience. Your feedback helps others in the community make better career choices."
      />
      <Accordion
        title="Why should I rate customers?"
        content="Rating customers fosters a transparent and supportive community. Your ratings contribute to a positive work environment by highlighting respectful and reliable customers."
      />
      <Accordion
        title="Are the reviews anonymous?"
        content="Yes, all reviews are anonymous to protect your privacy and encourage honest feedback."
      />
    </div>
    </>
  )
}

export default FAQ
