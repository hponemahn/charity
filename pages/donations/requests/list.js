import React, { Component } from "react";
import Layout from "../../../components/layout";
import { Grid, Header, Button, Table, Icon } from "semantic-ui-react";
import { Link } from "../../../routes";
import web3 from "../../../ethereum/web3";
import Charity from "../../../ethereum/charity";
import RequestRow from "../../../components/RequestRow";

class RequestList extends Component {
  static async getInitialProps({ query }) {
    const charity = Charity(query.address);

    const approversCount = await charity.methods.approversCount().call();
    const requestsCount = await charity.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestsCount))
        .fill()
        .map((element, index) => {
          return charity.methods.requests(index).call();
        })
    );

    return {
      address: query.address,
      approversCount: approversCount,
      requestsCount: requestsCount,
      requests: requests,
    };
  }

  renderBody() {
    return (<RequestRow address={this.props.address} requests={this.props.requests} approversCount={this.props.approversCount}></RequestRow>);
  }

  render() {
    // console.log(this.props.requests);
    console.log("requestsCount", this.props.requestsCount);

    return (
      <Layout>
        <br />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={12}>
              <Header as="h3">Requests</Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Link route={`/donations/${this.props.address}/requests/create`}>
                <a>
                  <Button primary floated="right">
                    <Icon name="add" />
                    Create Request
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Table celled fixed singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Recipient</Table.HeaderCell>
                    <Table.HeaderCell>Approval Count</Table.HeaderCell>
                    <Table.HeaderCell>Approve</Table.HeaderCell>
                    <Table.HeaderCell>Finalize</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                {this.renderBody()}
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default RequestList;
