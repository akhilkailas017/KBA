import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/dapp-logo.png';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { CertModuleCert } from '../scdata/deployed_addresses.json';

const ViewCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);
  const { id } = useParams(); 
  const [certificate, setCertificate] = useState(null); 

  useEffect(() => {
    async function getcert(searchId) {
      try {
        const signer = await provider.getSigner();
        const instance = new Contract(CertModuleCert, abi, signer);
        const result = await instance.Certificates(searchId);
        console.log(result); 
        
        setCertificate({
          name: result[0],
          course: result[1],
          grade: result[2],
          date: result[3],
        });
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    }

    if (id) {
      getcert(id); 
    }
  }, [id]); 

  return (
    <>
      <div className="mx-auto w-[1200px] pt-[50px] h-[530px] rounded-[5px] bg-[#F5F9F8] mt-[50px] shadow-2xl">
        <h3 className="text-center text-[25px]">Kerala Blockchain Academy</h3>
        <img src={logo} className="w-[20%] mx-auto mt-[10px]" alt="KBA Logo" />
        <br /><br />

        {certificate ? (
          <p className="text-[19px] text-center">
            {`This is to certify that ${certificate.name} has successfully completed the ${certificate.course} course with grade ${certificate.grade} on ${certificate.date}.`}
          </p>
        ) : (
          <p className="text-[19px] text-center">Loading certificate details...</p>
        )}
      </div>
    </>
  );
};

export default ViewCertificate;
