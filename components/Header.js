import React, { Component } from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import { Link } from "../routes";

export default class Header extends Component {
  render() {
    return (
      <Menu stackable>
        <Link route="/">
          <Menu.Item>
            <Image
              src="https://i0.wp.com/www.giveandgrow.org/wp-content/uploads/2018/08/cropped-Give-Grow-Charity-Logo-Icon.png?ssl=1"
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
          </Menu.Item>
        </Link>

        <Menu.Item position="right">
          <Link route="/donations/new">
            <a>
              <Icon name="add" />
              Create Charity
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
