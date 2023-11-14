import React from "react";
import { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import Header from "./Header";
import { Col, Container, Row } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
  };
  chanceCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  componentDidMount() {
    this.getProducts();
  }

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart:  newCart });
  };

  removeToCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  render() {
    return (
      <Container>
        <Header cart={this.state.cart} removeToCart={this.removeToCart} />
        <Row>
          <Col xs="3">
            <Categories
              chanceCategory={this.chanceCategory}
              currentCategory={this.state.currentCategory}
            />
          </Col>
          <Col xs="9">
            <Products
              addToCart={this.addToCart}
              products={this.state.products}
              currentCategory={this.state.currentCategory}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
