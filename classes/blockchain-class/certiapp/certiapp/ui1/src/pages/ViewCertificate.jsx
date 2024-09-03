import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import logo from '../assets/images/dapp-logo.png'

const ViewCertificate = () => {

  const { id } = useParams();
  console.log(id);
  const [certificate, setCertificate] = useState({});

  useEffect(() => {
      const fetchCertificates = async () => {
        try {
          const res = await fetch(`/api/certificates/${id}`);
          const data = await res.json();
          console.log("data", data)
          setCertificate(data);
          console.log(certificate);
        } catch (error) {
          console.log(error);
        } 
      };
      fetchCertificates();
    }, []);


  return (
    <>
    <div className="mx-auto w-[1200px] pt-[50px] h-[530px] rounded-[5px] bg-[#F5F9F8] mt-[50px] shadow-2xl">
			<h3 className="text-center text-[25px]">Kerala Blockchain Academy</h3>
			<img src={logo} className="w-[20%] mx-auto mt-[10px]"/>
			<br/><br/>

			<p className="text-[19px] text-center">{`This is to certify that ${certificate.candidatename} has successfully completed ${certificate.course} course with grade ${certificate.grade} on ${certificate.date}`} </p>
			
		</div>
    </>
  )
}

export default ViewCertificate