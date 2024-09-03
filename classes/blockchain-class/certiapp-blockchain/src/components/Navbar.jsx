import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const checkAdmin = async () => {
            if (window.ethereum) {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const signerAddress = await signer.getAddress();
                const adminAddress = '0x10E130F782b961eC76eDbE793E8014f166E33C91';
                if (signerAddress.toLowerCase() === adminAddress.toLowerCase()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } else {
                console.error('Ethereum wallet is not connected.');
            }
        };

        checkAdmin();
    }, []);

    return (
        <nav className="float-right mt-[10px] pr-[10px]">
            <a href="/"><input type="button" value="Home" className="h-[35px] w-[65px] border border-black" /></a>
            {isAdmin && (
                <a href="/issueCertificate">
                    <input type="button" value="Issue Certificate" className="h-[35px] w-[125px] border border-black p-1" />
                </a>
            )}
            
        </nav>
    );
};

export default Navbar;
