const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
 
const compiledFactory = require("../ethereum/build/CharityFactory.json");
const compiledCharity = require("../ethereum/build/Charity.json");
 
let accounts;
let factory;
let charityAddress;
let charity;
 
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1400000" });
 
  await factory.methods.createCharity("100").send({
    from: accounts[0],
    gas: "1000000",
  });
 
  [charityAddress] = await factory.methods.getDeployedCharities().call();
  charity = await new web3.eth.Contract(compiledCharity.abi, charityAddress);
});
 
describe("Charity", () => {
  it("deploys a factory and a charity", () => {
    assert.ok(factory.options.address);
    assert.ok(charity.options.address);
  });
 
  it("marks caller as the charity donation manager", async () => {
    const manager = await charity.methods.donationManager().call();
    assert.equal(accounts[0], manager);
  });
 
  it("allows people to contribute money and marks them as approvers", async () => {
    await charity.methods.donate().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await charity.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });
 
  it("requires a minimum donation", async () => {
    try {
      await charity.methods.donate().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
 
  it("allows a donation manager to make a payment request", async () => {
    await charity.methods
      .createRequest("Pay homeless people", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    const request = await charity.methods.requests(0).call();
 
    assert.equal("Pay homeless people", request.description);
  });
 
  it("processes requests", async () => {
    await charity.methods.donate().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
 
    await charity.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });
 
    await charity.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });
 
    await charity.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });
 
    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});