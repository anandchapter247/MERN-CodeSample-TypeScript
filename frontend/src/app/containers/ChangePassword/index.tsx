import React, { Component } from 'react';
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IRootState,
  IChangePasswordState,
  IChangePasswordProps,
  IChangePassword,
} from '../../../interfaces';
import { changePasswordRequest } from '../../../actions';
import { passwordValidator } from '../../../validator';

class ChangePassword extends Component<
  IChangePasswordProps,
  IChangePasswordState
> {
  constructor(props: IChangePasswordProps) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errors: { oldPassword: '', newPassword: '', confirmPassword: '' },
    };
  }
  componentDidUpdate = (prevProps: IChangePasswordProps) => {
    console.log(prevProps, '*************');
    console.log(this.props, '//////////////////');
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
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
    const { oldPassword, newPassword, confirmPassword } = this.state;
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    // To validate form fields
    const { isValid, errors } = passwordValidator(data);
    if (isValid) {
      await this.props.changePassword(data);
    } else {
      this.setState({
        errors,
      });
      return;
    }
  };
  render() {
    const { oldPassword, newPassword, confirmPassword, errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <InputGroup>
            <input
              type={'password'}
              name={'oldPassword'}
              value={oldPassword}
              className={'form-control floating-input'}
              placeholder={' '}
              onChange={this.handleChange}
            />
            <Form.Label
              className={`floating-label ${oldPassword ? 'top-label' : ''}`}
            >
              Old Password<span className={'mandatory'}>*</span>&nbsp;
            </Form.Label>
            <div className={'text-danger error-text'}>
              {errors && errors.oldPassword}
            </div>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <input
              type={'password'}
              name={'newPassword'}
              value={newPassword}
              className={'form-control floating-input'}
              placeholder={' '}
              onChange={this.handleChange}
            />
            <Form.Label
              className={`floating-label ${newPassword ? 'top-label' : ''}`}
            >
              New Password<span className={'mandatory'}>*</span>&nbsp;
            </Form.Label>
            <div className={'error-text text-danger'}>
              {errors && errors.newPassword}
            </div>
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <input
              type={'password'}
              name={'confirmPassword'}
              value={confirmPassword}
              className={'form-control floating-input'}
              placeholder={' '}
              onChange={this.handleChange}
            />
            <Form.Label
              className={`floating-label ${confirmPassword ? 'top-label' : ''}`}
            >
              Confirm Password<span className={'mandatory'}>*</span>&nbsp;
            </Form.Label>
            <div className={'text-danger error-text'}>
              {errors && errors.confirmPassword}
            </div>
          </InputGroup>
        </Form.Group>
        <Row>
          <Col xs='6'>
            <Button type={'submit'} className='px-4 btn-submit'>
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
  changePasswordReducer: state.changePasswordReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changePassword: (data: IChangePassword) => {
      dispatch(changePasswordRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
