import React from 'react'

const Projects = () => {
  return (
    <>
    <div className="bg-rose-600" id="projects">
                    <h1 className="text-4xl text-center pt-20 font-bold">Project</h1>
                    <div className="flex pb-60 gap-10 pt-20">
                      <div className="">

                        <div >
                          <p className="pb-10 text-center font-semibold text-2xl">Digital Passport Verification System Using Blockchain</p>
                          <p className="text-justify p-5 text-xl"> The Digital Passport Verification System is a web-based application
                            developed using Solidity, ReactJs, and EtherJs technologies. This project aims to enhance the
                            security and efficiency of passport verification processes by leveraging the decentralized
                            nature of blockchain technology. </p>
                          <div className=" text-xl text-center">
                            <a
                              href="https://github.com/akhilkailas017/Digital-Passport-Verification-System-Using-Blockchain.git"><input
                                type="button" value="Project Link" className="p-2 bg-amber-500"/></a>
                          </div>
                        </div>
                      </div>
                      <div className="">

                        <div>
                          <p className="pb-10 text-center font-semibold text-2xl">Floor Mat Detection and Classification</p>
                          <p className="text-justify p-5 text-xl">The Floor Mat Detection and Classification project is a Python-based
                            application developed using the YOLOv5 algorithm. The purpose of this project is to accurately
                            detect and classify different types of floor mats in real-time. </p>
                          <div className="text-xl text-center">
                            <a href="https://github.com/akhilkailas017/Object-Detection-using-Yolov5.git"><input
                              type="button" value="Project Link" className="p-2 bg-amber-500 "/></a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
    </>
  )
}

export default Projects