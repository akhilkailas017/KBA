import React from 'react'

const Contact = () => {
  return (
    <>
    <div className="bg-amber-500 pt-20" id="contact">
                    <div className="mx-auto p-8 max-w-lg">
                      <form action="" className="space-y-5">

                        <h1 className="text-center text-4xl font-bold" >Contact</h1>

                        <div className="flex flex-col">
                          <label for="" className="">Full Name</label>
                          <input type="text" name="" placeholder="Enter name" id="" className=" px-4 py-2  border border-2 border-amber-300"/>
                        </div>
                        <div className="flex flex-col" >
                          <label for="">Email</label>
                          <input type="email" name="" id="" placeholder="Enter email" className=" px-4 py-2 border border-2 border-amber-300 "/>
                        </div>
                        <div className="flex flex-col" >
                          <label for="">Message</label>
                          <textarea name="" id="" placeholder="Enter Message" className="px-4 py-2 border border-2 border-amber-300 h-56"></textarea>
                        </div>
                        <div className="flex justify-center">
                          <input type="submit" value="Submit" className="px-4 py-2 bg-rose-600"/>
                        </div>
                      </form>
                    </div>
                  </div>
    </>
  )
}

export default Contact