import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import charity from "../ethereum/charity";
import { Router } from "../routes";

class DonateForm extends Component {
  state = {
    donateMoney: "",
    loading: false,
    errorMessage: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await charity(this.props.address).methods.donate().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.donateMoney, "ether"),
      });

      Router.replaceRoute(`/donation/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <Input
            placeholder="Amount in ether"
            onChange={(event) => {
              this.setState({ donateMoney: event.target.value });
            }}
          />
        </Form.Field>
        <Message error>
          <Message.Header>
            Oops!
          </Message.Header>
          <p>{this.state.errorMessage}</p>
        </Message>
        <Button type="submit" primary loading={this.state.loading}>
          Donate
        </Button>
      </Form>
    );
  }
}

export default DonateForm;
