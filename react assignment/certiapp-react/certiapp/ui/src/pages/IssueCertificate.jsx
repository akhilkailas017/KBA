import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const IssueCertificate = () => {

const [course,setCourse]=useState('Certified Blockchain Associate')
const [certificateid,setCertificateid]=useState('')
const [candidatename,setCandidatename]=useState('')
const [grade,setGrade]=useState('S')
const [date,setDate]=useState('')

const navigate=useNavigate()

  const submitForm = (e) => {
    e.preventDefault()
    const newcertificate = {
      course,
      certificateid,
      candidatename,
      grade,
      date
    }
    const res = issuenewCertificate(newcertificate)
    toast.success("cerificate issued sucessful")
    navigate('/')
    console.log(res);

  }

  const issuenewCertificate = async (newcertificate) => {
    try {
      const response = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newcertificate),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw error;
    }
  };


  return (
    <>
      

      <h3 className="text-[25px] font-bold">Certificate Dapp</h3>
      <br />

      <div className="w-[1050px] h-[550px] mt-[10px] mx-auto bg-[#F5F9F8] pl-[80px] pt-[50px]">
        <div className="">
          <h3 className="text-[25px] font-[Arial] mb-[15px]">Issue New Certificate</h3>

          <form onSubmit={submitForm}>



            <label className="text-[15px]">Select Course *</label>
            <br />
            <select
              name="course"
              className="h-[25px] w-[522px] border border-[#000000]"
              value={course}
                    onChange={(e) => setCourse(e.target.value)}
            >
              <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
              <option value="Developer Essential for Blockchain">Developer Essential for Blockchain</option>
              <option value="Blockchain Foundation Programe">Blockchain Foundation Programe</option>
            </select>




            <br />
            <br />
            <label className="text-[15px]">Certificate ID *</label>
            <br />
            <input
              type="text"
              name="name"
              required
              className="h-[25px] w-[522px] border border-[#000000]"
              value={certificateid}
                    onChange={(e) => setCertificateid(e.target.value)}
            />
            <br />
            <br />




            <label className="text-[15px]">Candidate name *</label>
            <br />
            <input
              type="text"
              name="cname"
              required
              className="h-[25px] w-[522px] border border-[#000000]"
              value={candidatename}
                    onChange={(e) => setCandidatename(e.target.value)}
            />
            <br />
            <br />



            <label className="text-[15px]">Select Grade *</label>
            <br />
            <select
              name="grade"
              required
              className="h-[25px] w-[522px] border border-[#000000]"
              defaultValue="A"
              value={grade}
                    onChange={(e) => setGrade(e.target.value)}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <br />
            <br />



            <label className="text-[15px]">Issue Date *</label>
            <br />
            <input
              type="date"
              name="issuedate"
              required
              className="h-[25px] w-[522px] border border-[#000000]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <br />



            <input
              type="submit"
              value="Issue Certificate"
              className="btn-issue-submit h-[35px] w-[135px] bg-[#02D0F7] border-none"
             
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default IssueCertificate;