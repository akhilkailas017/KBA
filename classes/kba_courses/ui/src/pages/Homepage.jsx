import Button from '../components/Button'
import CourseCards from '../components/CourseCards'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'


import React from 'react'

const Homepage = () => {
  return (
    <>
     
      {/* <Hero /> */}
      <CourseCards isHome={true} />
      <Button />
    </>
  )
}

export default Homepage