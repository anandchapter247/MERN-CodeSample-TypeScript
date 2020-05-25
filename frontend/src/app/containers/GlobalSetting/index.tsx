import React, { Component } from 'react';
import { IAddGlobalSetting } from '../../../interfaces';
import GlobalSettingForm from './globalsetting';
import { globalSettingValidator } from '../../../validator/GlobalSetting';
import { ApiHelper } from '../../../helper';
import { ApiRoutes } from '../../../config';
import { toast } from 'react-toastify';

class GlobalSetting extends Component<any, IAddGlobalSetting> {
  constructor(props: any) {
    super(props);
    this.state = {
      facebookURL: '',
      twitterURL: '',
      instaURL: '',
      youtubeURL: '',
      pinterestURL: '',
      linkedinURL: '',
      shopifyURL: '',
      email: '',
      supportEmail: '',
      address: '',
      website: '',
      phone: '',
      // noOfDays: '',
      // adminEmail: '',
      // siteId: '',
      // travelInfluenser: '',
      // incrediblePlaces: '',
      // extraordinaryDestination: '',
      // beachDestination: '',
      // urbanDestination: '',
      // trendingArticle: '',
      // trendingVideo: '',
      // trendingPodcast: '',
      // trendingShops: '',
      // showYourFlow: '',
      errors: {
        facebookURL: '',
        twitterURL: '',
        instaURL: '',
        youtubeURL: '',
        pinterestURL: '',
        linkedinURL: '',
        shopifyURL: '',
        email: '',
        supportEmail: '',
        address: '',
        website: '',
        phone: '',
        // noOfDays: '',
        // adminEmail: '',
      },
    };
  }
  //on chane
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
  // when user submit form
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      facebookURL: this.state.facebookURL,
      twitterURL: this.state.twitterURL,
      instaURL: this.state.instaURL,
      youtubeURL: this.state.youtubeURL,
      pinterestURL: this.state.pinterestURL,
      linkedinURL: this.state.linkedinURL,
      shopifyURL: this.state.shopifyURL,
      supportEmail: this.state.supportEmail
        ? this.state.supportEmail.trim().toLowerCase()
        : '',
      address: this.state.address,
      website: this.state.website,
      // phone: this.state.phone,
      // noOfDays: this.state.noOfDays,
      // adminEmail: this.state.adminEmail
      //   ? this.state.adminEmail.trim().toLowerCase()
      //   : '',
      email: this.state.email ? this.state.email.trim().toLowerCase() : '',
    };
    const { isValid, errors } = globalSettingValidator(data);
    console.log('errors', errors);
    // const settingsData = {
    //   ...data,
    //   siteId: this.state.siteId,
    //   travelInfluenser: this.state.travelInfluenser,
    //   incrediblePlaces: this.state.incrediblePlaces,
    //   extraordinaryDestination: this.state.extraordinaryDestination,
    //   beachDestination: this.state.beachDestination,
    //   urbanDestination: this.state.urbanDestination,
    //   trendingArticle: this.state.trendingArticle,
    //   trendingVideo: this.state.trendingVideo,
    //   trendingPodcast: this.state.trendingPodcast,
    //   trendingShops: this.state.trendingShops,
    //   showYourFlow: this.state.showYourFlow,
    // };
    if (isValid) {
      console.log('Alll valid');
      this.addSettings(data);
      // this.props.addFaq(data);
    } else {
      this.setState({
        errors,
      });
      return;
    }
  };
  // when settings are added
  addSettings = async (settingsData: any) => {
    console.log('inside add settings', settingsData);
    const response = await new ApiHelper().FetchFromServer(
      ApiRoutes.ADD_SETTINGS.service,
      ApiRoutes.ADD_SETTINGS.url,
      ApiRoutes.ADD_SETTINGS.method,
      ApiRoutes.ADD_SETTINGS.authenticate,
      undefined,
      settingsData
    );
    if (response && response.messages) {
      console.log('response', response);
      toast.success(
        response.messages && response.messages[0] ? response.messages[0] : null
      );
    }
  };
  render() {
    return (
      <GlobalSettingForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
        errors={this.state.errors}
      />
    );
  }
}

export default GlobalSetting;
