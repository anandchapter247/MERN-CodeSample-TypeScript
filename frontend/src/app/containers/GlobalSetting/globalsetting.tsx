import React, { Component } from 'react';
import { Card, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { IAddFAQState } from '../../../interfaces';

class GlobalSettingForm extends Component<any, IAddFAQState> {
  render() {
    const { handleChange, handleSubmit, state, errors } = this.props;
    return (
      <div className='cr-page px-3 min-height650 my-profile-section'>
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <Card.Header>
                <h4>
                  <i className='fa fa-cogs' aria-hidden='true' />
                  &nbsp;Global Settings
                </h4>
              </Card.Header>
              <Card.Body>
                <div className='row'>
                  <div className='col-md-12  my-4'>
                    <h3>
                      <i className='fa fa-comments-o' aria-hidden='true'></i>
                      &nbsp;Social Media
                    </h3>
                    <Form className='row' onSubmit={handleSubmit}>
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Facebook URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'facebookURL'}
                            value={state.facebookURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.facebookURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Twitter URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'twitterURL'}
                            value={state.twitterURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.twitterURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Instagram URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'instaURL'}
                            value={state.instaURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.instaURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Youtube URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'youtubeURL'}
                            value={state.youtubeURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.youtubeURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Pinterest URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'pinterestURL'}
                            value={state.pinterestURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.pinterestURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Linkedin URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'linkedinURL'}
                            value={state.linkedinURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.linkedinURL}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Shopify URL &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'shopifyURL'}
                            value={state.shopifyURL}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.shopifyURL}
                        </div>
                      </Form.Group>
                      <h3 className='col-sm-12'>
                        <i
                          className='fa fa-address-card-o'
                          aria-hidden='true'
                        ></i>
                        &nbsp; Address
                      </h3>
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Email &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'email'}
                            value={state.email}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.email}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Support Email &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'supportEmail'}
                            value={state.supportEmail}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.supportEmail}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Address &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'address'}
                            value={state.address}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.address}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Website &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'website'}
                            value={state.website}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.website}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Phone &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'phone'}
                            value={state.phone}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.phone}
                        </div>
                      </Form.Group>
                      <Col xs='12' className='text-right'>
                        <Button variant='link' className='btn btn-cancel'>
                          {' '}
                          Cancel
                        </Button>
                        &nbsp;
                        <Button
                          variant='link'
                          type={'submit'}
                          className=' btn-submit'
                        >
                          {true ? 'Save' : 'Update'}
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

// const mapStateToProps: any = (state: IRootState) => ({
//   homePageReducer: state.homePageReducer
// });

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     addFaq: (data:any) => {
//       dispatch(addFAQRequest(data));
//     },
//   };
// };

export default GlobalSettingForm;
