import React, { Component } from 'react';
import { Button, Card, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IAddUserState, IAddUserProps, IRootState, IUserData } from '../../../interfaces';
import { AppRoutes } from '../../../config';
import { addUserRequest, userInfoRequest, updateUserRequest } from '../../../actions';
import { userValidator } from '../../../validator';

class AddUser extends Component<IAddUserProps, IAddUserState> {
  constructor(props: IAddUserProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errors: {
        firstName: '',
        lastName: '',
        email: '',
      },
      isEditable: false,
      id: '',
    };
  }

  componentDidMount = () => {
    const data = this.props.match.params as any;
    if (data.id) {
      this.props.viewUser(data);
      this.setState({
        isEditable: true,
      });
    }
  };
  componentDidUpdate = (prevProps: IAddUserProps) => {
    const { userReducer } = prevProps;
    if (
      userReducer.isLoading !== this.props.userReducer.isLoading &&
      this.props.userReducer.userInfo
    ) {
      const { userInfo } = this.props.userReducer;
      const {
        firstName,
        lastName,
        email,
        _id,
      } = userInfo;

      this.setState({
        firstName,
        lastName,
        email,
        id:_id ? _id : '',
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
        [name]: '',
      },
    });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { location } = this.props;
    const { state } = location;
    const {
      firstName,
      lastName,
      email,
      isEditable,
      id,
    } = this.state;

    const data = {
      firstName,
      lastName,
      email: email ? email.trim().toLowerCase() : '',
      _id:id,
    };

    // To validate form fields
    const { isValid, errors } = userValidator({
      ...data,
    });
    if (isValid) {
      if (isEditable) {
        this.props.updateUser({ ...data, currentPage: state && state.currentPage ? state.currentPage : 1, });
      } else {
        this.props.addUser(data);
      }
    } else {
      this.setState({
        errors,
      });
      return;
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      errors,
      isEditable,
    } = this.state;

    return (
      <div className='cr-page px-3 min-height650 my-profile-section'>
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <Card.Header>
                <h4>
                  <i className='icon-note' />
                  &nbsp;{!isEditable ? 'Add' : 'Update'} User
                </h4>
              </Card.Header>
              <Card.Body>
                <div className='row'>
                  <div className='col-md-12  my-4'>
                    <Form onSubmit={this.handleSubmit} className='row'>
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          First Name<span className={'mandatory'}>*</span>
                          &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'firstName'}
                            value={firstName}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.firstName}
                        </div>
                      </Form.Group>

                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Last Name<span className={'mandatory '}>*</span>
                          &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'lastName'}
                            value={lastName}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.lastName}
                        </div>
                      </Form.Group>

                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Email Address<span className={'mandatory'}>*</span>
                          &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'email'}
                            value={email}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.email}
                        </div>
                      </Form.Group>
                      <Col xs='12' className='text-right'>
                        <Button
                          variant='link'
                          className='btn btn-cancel'
                          onClick={() => {
                            this.props.history.push(AppRoutes.USER);
                          }}
                        >
                          {' '}
                          Cancel
                        </Button>
                        &nbsp;
                        <Button
                          variant='link'
                          type={'submit'}
                          className=' btn-submit'
                        >
                          {!isEditable ? 'Save' : 'Update'}
                        </Button>
                      </Col>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addUser: (data: any) => {
      dispatch(addUserRequest(data));
    },
    viewUser: (data: IUserData) => {
      dispatch(userInfoRequest(data));
    },
    updateUser: (data: any) => {
      dispatch(updateUserRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
