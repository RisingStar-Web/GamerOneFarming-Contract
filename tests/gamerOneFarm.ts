import { ethers } from "hardhat";
import { expect } from "chai";
import { Contract, BigNumber } from "ethers";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("GamerOneFarm", () => {
    
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let res: any;
    let gamerOneFarm: Contract;
    let gamerOneToken: Contract;
    let mockDai: Contract;

    const daiAmount: BigNumber = ethers.utils.parseEther("25000");

    beforeEach(async() => {
        const GamerOneFarm = await ethers.getContractFactory("GamerOneFarm");
        const GamerOneToken = await ethers.getContractFactory("GamerOneToken");
        const MockDai = await ethers.getContractFactory("MockERC20");
        mockDai = await MockDai.deploy("MockDai", "mDAI");
        [owner, alice, bob] = await ethers.getSigners();
        await Promise.all([
            mockDai.mint(owner.address, daiAmount),
            mockDai.mint(alice.address, daiAmount),
            mockDai.mint(bob.address, daiAmount)
        ]);
        gamerOneToken = await GamerOneToken.deploy();
        gamerOneFarm = await GamerOneFarm.deploy(mockDai.address, gamerOneToken.address);
    })

    describe("Init", async() => {
        it("should initialize", async() => {
            expect(gamerOneToken).to.be.ok
            expect(gamerOneFarm).to.be.ok
            expect(mockDai).to.be.ok
        })
    })
  
});

