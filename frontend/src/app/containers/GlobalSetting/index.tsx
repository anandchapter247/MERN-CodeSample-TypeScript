import React, { Component } from 'react';
import { IAddGlobalSetting } from '../../../interfaces';
import GlobalSettingForm from './globalsetting';
import { globalSettingValidator } from '../../../validator/GlobalSetting';

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
      noOfDays: '',
      adminEmail: '',
      siteId: '',
      travelInfluenser: '',
      incrediblePlaces: '',
      extraordinaryDestination: '',
      beachDestination: '',
      urbanDestination: '',
      trendingArticle: '',
      trendingVideo: '',
      trendingPodcast: '',
      trendingShops: '',
      showYourFlow: '',
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
        noOfDays: '',
        adminEmail: '',
      },
    };
  }
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
    const {
      facebookURL,
      twitterURL,
      instaURL,
      youtubeURL,
      pinterestURL,
      linkedinURL,
      shopifyURL,
      supportEmail,
      address,
      website,
      phone,
      noOfDays,
      adminEmail,
      email,
    } = this.state;
    const data = {
      facebookURL,
      twitterURL,
      instaURL,
      youtubeURL,
      pinterestURL,
      linkedinURL,
      shopifyURL,
      supportEmail: supportEmail ? supportEmail.trim().toLowerCase() : '',
      address,
      website,
      phone,
      noOfDays,
      adminEmail: adminEmail ? adminEmail.trim().toLowerCase() : '',
      email: email ? email.trim().toLowerCase() : '',
    };
    console.log('data', data);
    const { isValid, errors } = globalSettingValidator(data);
    console.log('errors', errors);
    if (isValid) {
      console.log('Alll valid');
      // this.props.addFaq(data);
    } else {
      this.setState({
        errors,
      });
      return;
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
