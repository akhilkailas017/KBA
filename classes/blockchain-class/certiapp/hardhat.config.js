require("@nomicfoundation/hardhat-toolbox")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"infurasep",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    infurasep:{
      url:"https://sepolia.infura.io/v3/6ae61becef894d6a9838481ed44c82ba",
      accounts:["ae34982803739693145d6af5ba10d247ec058270637e258b2201c20a061d11b0"]
    }
  },
  solidity: "0.8.20",
};
