import React, { Component } from "react";
import Layout from "../../components/layout";
import { Grid, Card, Button, Label, Form } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import charity from "../../ethereum/charity";
import DonateForm from "../../components/donateForm";

class DonationShow extends Component {
  

  static async getInitialProps({ query }) {
    const summary = await charity(query.address).methods.getSummary().call();
    return {
      address: query.address,
      balance: summary[1],
      minimumDonation: summary[0],
      requests: summary[2],
      approvers: summary[3],
    };
  }

  renderSummary() {
    const { balance, minimumDonation, requests, approvers } = this.props;

    const items = [
      {
        header: balance,
        description: "Donation Balance",
      },
      {
        header: minimumDonation,
        description: "Minimum Donation",
      },
      {
        header: requests,
        description: "Pending Requests",
      },
      {
        header: approvers,
        description: "Approvers",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row>
            <Grid.Column width={12}>
              {this.renderSummary()}
              <Button
                content="View Requests"
                primary
                style={{ marginTop: "20px" }}
              />
            </Grid.Column>

            <Grid.Column width={4}>
              <Label image>
                <img src="https://cdn-icons-png.flaticon.com/512/2913/2913091.png" />
                Donate to this charity
              </Label>
              <br />
              <br />
              <DonateForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default DonationShow;
