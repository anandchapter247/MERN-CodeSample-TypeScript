import React, { Component } from "react";
import { IHomeComponentProps, IHomeComponentState } from "../../../interfaces";
import { Row, Col } from "react-bootstrap";
import "./index.scss";

class HomeComponent extends Component<
  IHomeComponentProps,
  IHomeComponentState
> {
  constructor(props: IHomeComponentProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row className={"test"}>
        <Col sm={"6"}>test</Col>
        <Col sm={"6"}>test2 </Col>
      </Row>
    );
  }
}

export default HomeComponent;
