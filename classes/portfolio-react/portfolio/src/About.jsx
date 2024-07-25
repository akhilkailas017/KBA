import React from 'react'
import profilephoto from './assets/akhil.jpg'

const About = () => {
  return (
    <>
    <div className="border-b-2 bg-amber-500" id="about">
        <h1 className="text-4xl text-center pt-20">Akhil Kailas</h1>
        <div className="flex  w-1/2 mx-auto mt-4 text-xl h-80">
          <div>
            <img src={profilephoto} alt="" className="h-60 w-44 mr-52"/>
          </div>
          <div>
            <p className="text-justify ">I am a Passionate and dedicated fresher with a strong interest
              in web
              development. Possessing a solid
              understanding of HTML, CSS, and JavaScript, along with a keen eye for design and usability. Eager to
              apply theoretical knowledge gained through coursework to real-world projects. Highly motivated to
              learn and adapt to new technologies and frameworks in the ever-evolving field of web development.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About