import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="float-right mt-[10px] pr-[10px]">
                <a href="/"><input type="button" value="Home" className="h-[35px] w-[65px]  border border-black" /></a>
                <a href="/issueCertificate"><input type="button" value="Issue Certificate" className="h-[35px] w-[125px] border border-black p-1" /></a>
            </nav>
        </>
    )
}

export default Navbar