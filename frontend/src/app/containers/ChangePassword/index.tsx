import React, { Component } from "react";
import { Button, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  IRootState,
  IChangePasswordState,
  IChangePasswordProps,
  IChangePassword
} from "../../../interfaces";
import { changePasswordRequest } from "../../../actions";
import { passwordValidator } from "../../../validator";

class ChangePassword extends Component<
  IChangePasswordProps,
  IChangePasswordState
> {
  constructor(props: IChangePasswordProps) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: { oldPassword: "", newPassword: "", confirmPassword: "" }
    };
  }
  componentDidUpdate = (prevProps: IChangePasswordProps) => {
    console.log(prevProps, "*************");
    console.log(this.props, "//////////////////");
    if (
      prevProps &&
      prevProps.changePasswordReducer &&
      this.props &&
      this.props.changePasswordReducer &&
      !this.props.changePasswordReducer.isLoading &&
      prevProps.changePasswordReducer.isLoading !==
        this.props.changePasswordReducer.isLoading
    ) {
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: ""
      }
    });
  };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const data = {
      oldPassword,
      newPassword,
      confirmPassword
    };
    // To validate form fields
    const { isValid, errors } = passwordValidator(data);
    if (isValid) {
      await this.props.changePassword(data);
    } else {
      this.setState({
        errors
      });
      return;
    }
  };
  render() {
    const { oldPassword, newPassword, confirmPassword, errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>
            Old Password<span className={"mandatory"}>*</span>&nbsp;
          </Form.Label>
          <InputGroup>
            <input
              type={"password"}
              name={"oldPassword"}
              value={oldPassword}
              className={"form-control"}
              placeholder={"Enter Old Password"}
              onChange={this.handleChange}
            />
          </InputGroup>
          <div className={"text-danger"}>{errors && errors.oldPassword}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            New Password<span className={"mandatory"}>*</span>&nbsp;
          </Form.Label>
          <InputGroup>
            <input
              type={"password"}
              name={"newPassword"}
              value={newPassword}
              className={"form-control"}
              placeholder={"Enter New Password"}
              onChange={this.handleChange}
            />
          </InputGroup>
          <div className={"text-danger"}>{errors && errors.newPassword}</div>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Confirm Password<span className={"mandatory"}>*</span>&nbsp;
          </Form.Label>
          <InputGroup>
            <input
              type={"password"}
              name={"confirmPassword"}
              value={confirmPassword}
              className={"form-control"}
              placeholder={"Enter Confirm Password"}
              onChange={this.handleChange}
            />
          </InputGroup>
          <div className={"text-danger"}>
            {errors && errors.confirmPassword}
          </div>
        </Form.Group>
        <Row>
          <Col xs="6">
            <Button type={"submit"} className="px-4 btn-submit">
              Update Password
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  profileInfoReducer: state.profileInfoReducer,
  changePasswordReducer: state.changePasswordReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changePassword: (data: IChangePassword) => {
      dispatch(changePasswordRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
