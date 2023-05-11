const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SBTERC223", function() {

    it("Should deploy the contract and set the name and symbol", async function() {
const [owner] = await ethers.getSigners();
console.log("signers object:" , owner);

      const instance = await ethers.getContractFactory("SBTERC223");
      const deployedInstance = await instance.deploy();
      await deployedInstance.deployed();
      expect(await deployedInstance.name()).to.equal("SABATA");
      expect(await deployedInstance.symbol()).to.equal("SBT");
    });
  
    it("Should assign the total supply to the owner", async function() {

      const [owner02] = await ethers.getSigners();
console.log("signers object:" , owner02);

      const instance = await ethers.getContractFactory("SBTERC223");
      const deployedInstance = await instance.deploy();
      await deployedInstance.deployed();
  
      const owner = await deployedInstance.owner();
      const totalSupply = await deployedInstance.totalSupply();
      const ownerBalance = await deployedInstance.balanceOf(owner);
  
      expect(totalSupply).to.equal(ownerBalance);
    });
  
    it("Should transfer tokens between accounts", async function() {

      // const [owner] = await ethers.getSigners();
      // console.log("signers object:" , owner);

        const instance = await ethers.getContractFactory("SBTERC223");
        const deployedInstance = await instance.deploy();
        await deployedInstance.deployed();
  
      const owner = await deployedInstance.owner();
      const [sender, receiver] = await ethers.getSigners();
      // console.log("Sender :" , owner);
      console.log("Receiver :" , receiver);

      const previousBalanceSen = await deployedInstance.balanceOf(owner.address);
      const previousBalanceRec = await deployedInstance.balanceOf(receiver.address);
      // const amount = 1;

      await deployedInstance.transfer(receiver.address, "1");
  
      const senderBalance = await deployedInstance.balanceOf(owner.address);
      const receiverBalance = await deployedInstance.balanceOf(receiver.address);
  
      expect(senderBalance.toNumber()).to.equal(ethers.utils.parseEther(previousBalanceRec-1));
      expect(receiverBalance.toNumber()).to.equal(previousBalanceRec+1);

    });
  });
