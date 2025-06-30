import React from 'react'
import Header from "./Header";
import './AboutUs.css';
function AboutUs() {
  return (
    <div>
        <Header />
        <div className='about-container' style={{ backgroundImage:`url(/public/video/WhatsApp Image 2023-03-22 at 11.29.50 PM.jpeg)`}}>
        <h1 > Our Mission:</h1>
        <p>At Furry Tales, our mission is to provide a one-stop haven for pet lovers, offering a curated selection of top-notch products and expert advice to enhance the well-being of your beloved companions. We strive to foster a community that celebrates the joy and bond between pets and their owners, ensuring every visit to our site is a tail-wagging experience.</p>
        </div>
    </div>
  )
}

export default AboutUs
