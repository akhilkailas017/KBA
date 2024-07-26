import React from 'react'
import htmlphoto from './assets/html.png'
import cssphoto from './assets/css.png'
import javascriptphoto from './assets/javascript.png'
import bootstrapphoto from './assets/bootstrap.png'

const Skills = () => {
  return (
    <>
    <div className="bg-amber-500 pb-60" id="skills">
        <h1 className="text-4xl text-center pt-20 pb-8 font-bold">Skills</h1>
        <div className="flex justify-between">
          <div className="">
            <img src={htmlphoto} alt="" className=" "/><br/>
              <label for="" className="text-xl font-semibold">HTML</label>
            </div>
              <div className="skill-1">
                <img src={cssphoto} alt="" className=" "/><br/>
                  <label for="" className="text-xl font-semibold">CSS</label>
                </div>
                  <div className="skill-1">
                    <img src={javascriptphoto} alt="" className=" "/><br/>
                      <label for="" className="text-xl font-semibold">JavaScript</label>
                    </div>
                      <div className="skill-1">
                        <img src={bootstrapphoto} alt="" className=" "/><br/>
                          <label for="" className="text-xl font-semibold">Bootstrap</label>
                        </div>
                      </div>
                  </div>
    </>
  )
}

export default Skills