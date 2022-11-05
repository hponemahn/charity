import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Charity from "../ethereum/charity";

class RequestRow extends Component {

  onApprove = async (index) => {
    // console.log("approve", this.props.address);
    const accounts = await web3.eth.getAccounts();
    const charity = Charity(this.props.address);
    await charity.methods.approveRequest(index).send({from: accounts[0]});
  }

  // onFinalize = async (index) => {
  //   const accounts = await web3.eth.getAccounts();
  //   const charity = Charity(this.props.address);
  //   try {
  //     await charity.methods.finalizeRequest(index).send({from: accounts[0]});
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  onFinalize = async (index) => {
    const charity = Charity(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await charity.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
  };

  render() {
    const { Body, Row, Cell } = Table;
    //     mapping(address => bool) approvals;

    return (
      <Body>
        {this.props.requests.map((request, index) => {
          
          const { description, amount, recipient, approvalCount, complete } = request;
          const readyToFinalize = request.approvalCount > this.props.approversCount / 2;

          return (
            <Row key={index} disabled={complete} positive={readyToFinalize && !complete}>
              <Cell>{index}</Cell>
              <Cell>{description}</Cell>
              <Cell>{amount}</Cell>
              <Cell>{recipient}</Cell>
              <Cell>{approvalCount}</Cell>
              <Cell>{complete ? null : <Button primary onClick={() => this.onApprove(index)}>Approve</Button>}</Cell>
              <Cell>{complete ? null : <Button color="teal" onClick={() => this.onFinalize(index)}>Finalize</Button>}</Cell>
            </Row>
          );
        })}
      </Body>
    );
  }
}

export default RequestRow;
