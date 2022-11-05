import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Header, Form, Message } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import charity from "../../../ethereum/charity";
import { Router } from "../../../routes";

class Create extends Component {
  state = {
    desc: "",
    amount: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps({ query }) {
    return { address: query.address };
  }

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    const accounts = await web3.eth.getAccounts();
    const weiAmount = web3.utils.toWei(this.state.amount, "ether");

    try {
      await charity(this.props.address)
        .methods.createRequest(
          this.state.desc,
          weiAmount,
          this.state.recipient
        )
        .send({
            from: accounts[0],
        });

      Router.pushRoute(`/donations/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Header as="h3">Create a request</Header>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.TextArea
            label="Description"
            placeholder="Description"
            onChange={(event) => this.setState({ desc: event.target.value })}
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Amount in ether"
              placeholder="Amount in ether"
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
            <Form.Input
              fluid
              label="Recipient"
              placeholder="Recipient"
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Group>
          <Message error>
            <Message.Header>Oops!</Message.Header>
            <p>{this.state.errorMessage}</p>
          </Message>
          <Form.Button primary loading={this.state.loading}>
            Submit
          </Form.Button>
        </Form>
      </Layout>
    );
  }
}

export default Create;
