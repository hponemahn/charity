import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // "We are in the browser and metamask is running."
    window.ethereum.request({method: "request_ethAccounts"});
    web3 = new Web3(window.ethereum);
} else {
    // "We are on the server *OR* the user is not running metamask"
    const provider = new Web3.providers.HttpProvider(
        "https://goerli.infura.io/v3/4c567889d70246f7ab5f6dcfeb590044"
    );
    web3 = new Web3(provider);
}

export default web3;