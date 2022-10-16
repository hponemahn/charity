import web3 from "./web3";
import Charity from "./build/Charity.json";

const instance = (address) => new web3.eth.Contract(Charity.abi, address);

export default instance;
