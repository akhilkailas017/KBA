import React from 'react';

const IssueCertificate = () => {
  return (
    <>
      

      <h3 className="text-[25px] font-bold">Certificate Dapp</h3>
      <br />

      <div className="w-[1050px] h-[550px] mt-[10px] mx-auto bg-[#F5F9F8] pl-[80px] pt-[50px]">
        <div className="">
          <h3 className="text-[25px] font-[Arial] mb-[15px]">Issue New Certificate</h3>

          <form action="" method="post">
            <label className="text-[15px]">Select Course *</label>
            <br />
            <select
              name="course"
              className="h-[25px] w-[522px] border border-[#000000]"
              defaultValue="deb"
            >
              <option value="cba">Certified Blockchain Associate</option>
              <option value="deb">Developer Essential for Blockchain</option>
              <option value="bfp">Blockchain Foundation Programe</option>
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