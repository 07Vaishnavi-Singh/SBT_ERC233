const { expect } = require("chai");
const { ethers } = require("hardhat");

// import "@openzeppelin/contracts/utils/Strings.sol";


describe("Vesting", function() {

    it("Should deploy the contract and set the number of times transfer should occur after every 10 minutes ", async function() {
        const [owner] = await ethers.getSigners();
        console.log("signers object:" , owner);
        
              const instance = await ethers.getContractFactory("Vesting");
              const deployedInstance = await instance.deploy(0,"0x3af37FB1959EC82007d2DDAb6058c394275EB513","0x6030B4F6164aF2257226BC70a97f9B9C664AaEf7" ,"0x7Fb73DE78f9Ff507FC3Af6a4694E51348c574B75", "0xBE8f8Ea392d113B20F490164B43F8Fcb2cac92f9");
              await deployedInstance.deployed();
              expect(await deployedInstance.nMaxFounder()).to.equal(ethers.utils.parseEther(" 120000000 * (10**18) / 600" ));
              expect(await deployedInstance.nMaxAdvisor()).to.equal(ethers.utils.parseEther("16000000 * (10**18)" ) );
              expect(await deployedInstance.nMaxDeveloper()).to.equal(ethers.utils.parseEther( "24000000 * (10**18)"));

            //   expect(await deployedInstance.nMaxFounder()).to.equal(BigNumber.from("120000000 * (10**18) / 600 "));

            });

            it("Should deploy the contract and check the check() function", async function() {
                const [owner] = await ethers.getSigners();
                console.log("signers object:" , owner);
             
                const instance = await ethers.getContractFactory("Vesting");
                const deployedInstance = await instance.deploy(0,"0x3af37FB1959EC82007d2DDAb6058c394275EB513","0x6030B4F6164aF2257226BC70a97f9B9C664AaEf7" ,"0x7Fb73DE78f9Ff507FC3Af6a4694E51348c574B75", "0xBE8f8Ea392d113B20F490164B43F8Fcb2cac92f9");
                await deployedInstance.deployed();
               
                await deployedInstance.check();

               if( deployedInstance.locked() == false ){
                console.log("At 10 minutes times");
               }

                // expect(await deployedInstance.name()).to.equal("SABATA");
                // expect(await deployedInstance.symbol()).to.equal("SBT");
            
            });



});