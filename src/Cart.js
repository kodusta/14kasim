import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default class Cart extends Component {
  render() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Sepet - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <span
                onClick={() => this.props.removeToCart(cartItem.product)}
                className="badge badge-danger"
                style={{ marginRight: "10px", backgroundColor: "red" }}
              >
                X
              </span>
              {cartItem.product.productName}
              <span
                className="badge badge-warning"
                style={{ backgroundColor: "green" }}
              >
                {cartItem.quantity}
              </span>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>Sepeti Boşalt</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}
