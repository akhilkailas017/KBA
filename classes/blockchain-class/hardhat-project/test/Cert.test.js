const { loadFixture }=require("@nomicfoundation/hardhat-toolbox/network-helpers");

const { expect }=require('chai');
const {ethers}=require('hardhat')

describe('Pass test',function(){
    async function deployCertFixture(){
        const [admin,other]= await ethers.getSigners();
        const Cert =await ethers.getContractFactory('Cert');
        const cert=await Cert.deploy();
        return {admin,other,cert}
    }

    it('Should set right admin value',async function(){
        const { cert, admin }=await loadFixture(deployCertFixture);
        expect(cert.deploymentTransaction().from).to.equal(admin.address)
    })

    it('testing issue',async function(){
        const {cert}=await loadFixture(deployCertFixture);
        await expect(cert.issue(101,'akhil','EDP','A','25th Jan 2024'))
        .to.emit(cert,'Issued')
        .withArgs('EDP',101,'A')
    })

    it('read value',async function(){
        const {cert}=await loadFixture(deployCertFixture);
        await cert.issue(101,'akhil','EDP','A','25th Jan 2024')
        const certificates=await cert.Certificates(101)
        console.log("Data:",certificates);
        expect(certificates[0]).to.equal('akhil')
        expect(certificates[1]).to.equal('EDP')
        expect(certificates[2]).to.equal('A')
        expect(certificates[3]).to.equal('25th Jan 2024')
    })

});

describe('Fail test',function(){
    async function deployCertFixture(){
        const [admin,other]= await ethers.getSigners();
        const Cert =await ethers.getContractFactory('Cert');
        const cert=await Cert.deploy();
        return {admin,other,cert}
    }

    it('Test issue from another account',async function(){
        const { cert,other}=await loadFixture(deployCertFixture)
        await expect(cert.connect(other).issue(101,'akhil','EDP','A','25th Jan 2024'))
        .to.be.revertedWith('Access Denied')
    })

});