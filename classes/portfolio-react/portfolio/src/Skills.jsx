import React from 'react'

const Skills = () => {
  return (
    <>
    <div className="bg-amber-500 pb-60" id="skills">
        <h1 className="text-4xl text-center pt-20 pb-8 font-bold">Skills</h1>
        <div className="flex justify-between">
          <div className="">
            <img src="images/html.png" alt="" className=" "/><br/>
              <label for="" className="text-xl font-semibold">HTML</label>
            </div>
              <div className="skill-1">
                <img src="images/css.png" alt="" className=" "/><br/>
                  <label for="" className="text-xl font-semibold">CSS</label>
                </div>
                  <div className="skill-1">
                    <img src="images/javascript.png" alt="" className=" "/><br/>
                      <label for="" className="text-xl font-semibold">JavaScript</label>
                    </div>
                      <div className="skill-1">
                        <img src="images/bootstrap.png" alt="" className=" "/><br/>
                          <label for="" className="text-xl font-semibold">Bootstrap</label>
                        </div>
                      </div>
                  </div>
    </>
  )
}

export default Skills