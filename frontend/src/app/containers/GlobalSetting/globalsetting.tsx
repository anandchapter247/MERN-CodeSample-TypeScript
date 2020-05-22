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
                  <i className='icon-note' />
                  &nbsp;{true ? 'Add' : 'Update'} User
                </h4>
              </Card.Header>
              <Card.Body>
                <div className='row'>
                  <div className='col-md-12  my-4'>
                    <Form className='row' onSubmit={handleSubmit}>
                      <h3>Social Media</h3>
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <h3>Address</h3>
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <Form.Group className='col-sm-12'>
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
                      <h3>Basic Info</h3>
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Number of days &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'noOfDays'}
                            value={state.noOfDays}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.noOfDays}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Admin email address &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'adminEmail'}
                            value={state.adminEmail}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.adminEmail}
                        </div>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Site Id &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'siteId'}
                            value={state.siteId}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>
                      <h3>Home Page Rows</h3>
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Travel Influencers &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'travelInfluenser'}
                            value={state.travelInfluenser}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Incredible Places &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'incrediblePlaces'}
                            value={state.incrediblePlaces}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Extra ordinary destination &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'extraordinaryDestination'}
                            value={state.extraordinaryDestination}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Beach destination &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'beachDestination'}
                            value={state.beachDestination}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Urban destination &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'urbanDestination'}
                            value={state.urbanDestination}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Trending Articles &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'trendingArticle'}
                            value={state.trendingArticle}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Trending Videos &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'trendingVideo'}
                            value={state.trendingVideo}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Trending Podcasts &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'trendingPodcast'}
                            value={state.trendingPodcast}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Trending Shops &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'trendingShops'}
                            value={state.trendingShops}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </Form.Group>{' '}
                      <Form.Group className='col-sm-12'>
                        <Form.Label className='floating-label'>
                          Show your flow &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'showYourFlow'}
                            value={state.showYourFlow}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={handleChange}
                          />
                        </InputGroup>
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
