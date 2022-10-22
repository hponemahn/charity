import React, { Component } from "react";
import Layout from "../components/layout";
import { Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import { Link } from "../routes";

class CharityIndex extends Component {
  static async getInitialProps() {
    const charity = await factory.methods.getDeployedCharities().call();

    return { charity };
  }

  renderCharity() {
    const charity = this.props.charity.map((address) => {
      return {
        key: address,
        header: address,
        meta: (
          <Link route={`/donations/${address}`}>
            <a>View Charity</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={charity} itemsPerRow="2" />;
  }

  render() {
    return <Layout>{this.renderCharity()}</Layout>;
  }
}

export default CharityIndex;
