const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SBTERC223", function() {
    it("Should deploy the contract and set the name and symbol", async function() {
      const instance = await ethers.getContractFactory("SBTERC223");
      const deployedInstance = await instance.deploy("SABATA", "SBT");
      await deployedInstance.deployed();
      expect(await deployedInstance.name()).to.equal("SABATA");
      expect(await deployedInstance.symbol()).to.equal("SBT");
    });
  
    it("Should assign the total supply to the owner", async function() {
      const instance = await ethers.getContractFactory("SBTERC223");
      const deployedInstance = await instance.deploy("SABATA", "SBT");
      await deployedInstance.deployed();
  
      const owner = await deployedInstance.owner();
      const totalSupply = await deployedInstance.totalSupply();
      const ownerBalance = await deployedInstance.balanceOf(owner);
  
      expect(totalSupply).to.equal(ownerBalance);
    });
  
    it("Should transfer tokens between accounts", async function() {
        const instance = await ethers.getContractFactory("SBTERC223");
        const deployedInstance = await instance.deploy("SABATA", "SBT");
        await deployedInstance.deployed();
  
      const [sender, receiver] = await ethers.getSigners();
      const amount = ethers.utils.parseEther("1");
  
      await deployedInstance.transfer(receiver.address, amount);
  
      const senderBalance = await deployedInstance.balanceOf(sender.address);
      const receiverBalance = await deployedInstance.balanceOf(receiver.address);
  
      expect(senderBalance).to.equal(ethers.utils.parseEther("999"));
      expect(receiverBalance).to.equal(amount);
    });
  });
