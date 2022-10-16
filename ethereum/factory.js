import web3 from "./web3";
import CharityFactory from "./build/CharityFactory.json";

const instance = new web3.eth.Contract(
  CharityFactory.abi,
  "0x5E6783871ab2cE3600C1Dc8053115eE36D052091"
);

export default instance;