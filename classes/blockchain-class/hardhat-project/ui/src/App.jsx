import { useState } from 'react';
import './App.css'
import { BrowserProvider, Contract } from 'ethers'
import { abi } from './scdata/Cert.json'
import { CertModuleCert } from './scdata/deployed_addresses.json'

function App() {

  const provider=new BrowserProvider(window.ethereum);
  async function connectToMetamask(){
    const signer=await provider.getSigner()
    console.log("address",signer);
  }

  const [id,setId]=useState('');
  const [name,setName]=useState('');
  const [course,setCourse]=useState('')
  const [grade,setGrade]=useState('')
  const [date,setDate]=useState('')
  const [searchId,setSearchId]=useState('')

  async function issuecert(e){
    e.preventDefault();
    console.log(`id: ${id}, name: ${name}, course: ${course}, grade: ${grade}, date: ${date}`);
    const signer = await provider.getSigner()
    const instance= new Contract(CertModuleCert,abi,signer)
    const txl=await instance.issue(id,name,course,grade,date)
    console.log(txl);
  }

  async function getcert(e){
    e.preventDefault();
    console.log(`search id: ${searchId}`)
    const signer = await provider.getSigner()
    const instance= new Contract(CertModuleCert,abi,signer)
    const result=await instance.Certificates(searchId)
    console.log(result);
    
  }

  return (
    <>
     <button onClick={connectToMetamask}>Connect to metamask</button>
     <h2>Issue Certificate</h2>
     <form onSubmit={issuecert}>
      <div>
        <label htmlFor="id">Id: </label>
        <input type="text" name="id" id="id" value={id}
              onChange={(e) => setId(e.target.value)} 
              required /><br />

        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} required /><br />

        <label htmlFor="courseName">Course name: </label>
        <input type="text" name="courseName" id="courseName" value={course} onChange={(e)=>setCourse(e.target.value)} required /><br />

        <label htmlFor="grade">Grade: </label>
        <input type="text" name="grade" id="grade" value={grade} onChange={(e)=>setGrade(e.target.value)} required /><br />

        <label htmlFor="Date">Date: </label>
        <input type="text" name="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)} required /><br /><br />
        <button>Issue</button>
      </div>
     </form>
     <h2>Get Certificate Data</h2>
     <form onSubmit={getcert}>
      <label htmlFor="searchId">Search Id: </label>
      <input type="text" name="searchId" id="searchId" value={searchId} onChange={(e)=>setSearchId(e.target.value)} required /><br /><br />
      <button>Retrive</button>
     </form>
    </>
  )
}

export default App
