import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import logo from '../assets/images/dapp-logo.png'
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const [certificateid, setCertificateid] = useState("");
    const navigate = useNavigate();

    const searchcertificate = (e) => {
        e.preventDefault()
        if (certificateid.trim()) {
            navigate(`/viewcertificate/${certificateid}`);
        }
    };

    return (
        <>

            <br />
            <div className="content ">

                <h1 className="text-[35px] font-semibold mt-[20px]  text-center ml-[165px]">Certificate Dapp</h1>


                <div className="">
                    <img src={logo} className="w-[276px] mb-[20px] mx-auto " />
                </div>



                <div className=" ">
                    <form className="mx-auto  w-[350px] pl-[10px]" onSubmit={searchcertificate}>
                        <input type="text" name="text" placeholder="Enter Certificate ID to View" className="w-[250px] h-[28px] border-2 px-1 border-solid border-[#228FFB] pl-[10px] font-[14px] outline-none"
                            value={certificateid}
                            onChange={(e) => setCertificateid(e.target.value)}
                        />




                        <button type="submit" className="h-[35px] w-[80px] bg-[#13ACCC] border-none rounded-[1px] text-white">Search</button>
                    </form>
                </div>

            </div>

        </>
    )
}

export default Homepage