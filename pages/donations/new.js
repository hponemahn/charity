import React, { Component } from "react";
import Layout from "../../components/layout";
import { Header, Form, Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import {Router} from "../../routes";

class NewDonation extends Component {
  state = {
    inputValue: "",
    loading: false,
    errorMessage: "",
  };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCharity(this.state.inputValue).send({
        from: accounts[0],
      });

      Router.pushRoute('/');
    } catch (error) {
      this.setState({ errorMessage: error.message });  
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          image="https://health.gov.tt/sites/default/files/styles/large/public/inline-images/Blood%20Bank%20logo%202022-03.png?itok=0H-a6QNb"
          content="New Donation"
        />
        <br />
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Donation</label>
            <input
              placeholder="Minimum Donation"
              onChange={(event) =>
                this.setState({ inputValue: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />

          <Button type="submit" primary loading={this.state.loading}>
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewDonation;
