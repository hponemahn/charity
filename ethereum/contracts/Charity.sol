// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CharityFactory {
    address payable[] public deployedCharity;

    function createCharity (uint _minimumDonation) public {
        address newCharity = address(new Charity(_minimumDonation, msg.sender));
        deployedCharity.push(payable(newCharity));
    }

    function getDeployedCharities () public view returns (address payable[] memory) {
        return deployedCharity;
    }
}

contract Charity {

    struct Request {
        string description;
        uint amount;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount;
    }

    address public donationManager;    
    uint public minimumDonation;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;

    modifier restricted () {
        require(msg.sender == donationManager);
        _;
    }

    constructor (uint _minimumDonation, address _donationManager) {
        minimumDonation = _minimumDonation;
        donationManager = _donationManager;
    }

    function donate () public payable {
        require(msg.value >= minimumDonation);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest (string memory _description, uint _amount,
     address _recipient) public restricted {
        
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.amount = _amount;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest (uint index) public {
        
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    } 

    function finalizeRequest (uint index) public restricted {
    
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.amount);
        request.complete = true;
    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumDonation,
          address(this).balance,
          requests.length,
          approversCount,
          donationManager
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}