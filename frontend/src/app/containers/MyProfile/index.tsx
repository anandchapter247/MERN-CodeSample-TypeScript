import React, { Component } from "react";
import { Button, Card, Row, Col, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import {
  IRootState,
  IProfileState,
  IProfileProps,
  IProfileInfo
} from "../../../interfaces";
import { profileupdateRequest } from "../../../actions";
import { Dispatch } from "redux";
import { profileValidator } from "../../../validator/Profile";
import ChangePassword from "../ChangePassword";

class MyProfile extends Component<IProfileProps, IProfileState> {
  constructor(props: IProfileProps) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      errors: {
        email: "",
        firstName: "",
        lastName: ""
      }
    };
  }
  componentDidMount = () => {
    const { profileInfoReducer } = this.props;
    if (profileInfoReducer) {
      const { profileInfo } = profileInfoReducer;
      console.log("///////////////////////");
      const { email, firstName, lastName } = profileInfo;
      this.setState({
        email,
        firstName,
        lastName
      });
    }
  };
  componentDidUpdate = (prevProps: IProfileProps) => {
    const { profileInfoReducer } = this.props;
    if (
      profileInfoReducer &&
      profileInfoReducer.profileInfo &&
      prevProps &&
      prevProps.profileInfoReducer &&
      prevProps.profileInfoReducer.profileInfo !==
        profileInfoReducer.profileInfo
    ) {
      const { email, firstName, lastName } = profileInfoReducer.profileInfo;
      console.log("///////////////////////");
      this.setState({
        email,
        firstName,
        lastName
      });
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, firstName, lastName } = this.state;
    const data = {
      email,
      firstName,
      lastName
    };
    // To validate form fields
    const { isValid, errors } = profileValidator(data);
    if (isValid) {
      this.props.updateProfile(data);
    } else {
      this.setState({
        errors
      });
      return;
    }
  };
  render() {
    console.log(this.props.profileInfoReducer);
    console.log("this.props.profileInfoReducer*****************");
    const { firstName, lastName, email, errors } = this.state;
    console.log(firstName, "*********");
    return (
      <div className="cr-page px-3 min-height650 my-profile-section">
        <Row>
          <Col xs="6" sm="6" lg="6">
            <Card>
              <Card.Header>
                <h4>
                  <i className="fa fa-edit" />
                  &nbsp;My Profile
                </h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>
                      First Name<span className={"mandatory"}>*</span>&nbsp;
                    </Form.Label>
                    <InputGroup>
                      <input
                        type={"text"}
                        name={"firstName"}
                        value={firstName}
                        className={"form-control"}
                        placeholder={"Enter First Name"}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <div className={"text-danger"}>
                      {errors && errors.firstName}
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Last Name<span className={"mandatory"}>*</span>&nbsp;
                    </Form.Label>
                    <InputGroup>
                      <input
                        type={"text"}
                        name={"lastName"}
                        value={lastName}
                        className={"form-control"}
                        placeholder={"Enter Last Name"}
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                    <div className={"text-danger"}>
                      {errors && errors.lastName}
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Email<span className={"mandatory"}>*</span>&nbsp;
                    </Form.Label>
                    <InputGroup>
                      <input
                        type={"text"}
                        name={"email"}
                        value={email}
                        className={"form-control"}
                        placeholder={"Enter Email"}
                        onChange={this.handleChange}
                        disabled={true}
                      />
                    </InputGroup>
                    <div className={"text-danger"}>
                      {errors && errors.email}
                    </div>
                  </Form.Group>
                  <Row>
                    <Col xs="6">
                      <Button type={"submit"} className="px-4 btn-submit">
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6" sm="6" lg="6">
            <Card>
              <Card.Header>
                <h4>
                  <i className="fa fa-edit" />
                  &nbsp;Change Password
                </h4>
              </Card.Header>
              <Card.Body>
                <ChangePassword {...this.props} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  profileInfoReducer: state.profileInfoReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateProfile: (data: IProfileInfo) => {
      dispatch(profileupdateRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
