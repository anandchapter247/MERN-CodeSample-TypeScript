import React, { Component } from 'react';
import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
import {
  IDefaultHeaderProps,
  IDefaultHeaderState,
  IRootState,
  IProfileInfo,
} from '../../../interfaces';
import { Nav, Dropdown } from 'react-bootstrap';
import { AppRoutes } from '../../../config';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserIcon from '../../../assets/avatars/user-default.svg';
import logo from './../../../assets/img/logo.png';
import { LogOutRequest } from '../../../actions';
import { Dispatch } from 'redux';

class DefaultHeader extends Component<
  IDefaultHeaderProps,
  IDefaultHeaderState
> {
  render() {
    let profileInfo: IProfileInfo = {
      firstName: '',
      lastName: '',
      email: '',
    };
    if (this.props.profileInfoReducer) {
      profileInfo = this.props.profileInfoReducer.profileInfo;
    }
    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <div className='brand-logo'>
          <img src={logo} width={120} alt='' />
        </div>
        <AppSidebarToggler className='d-md-down-none' display='lg' />
        <Nav className='ml-auto' navbar>
          <AppHeaderDropdown direction='down'>
            <Dropdown>
              <Dropdown.Toggle id='dropdown-basic'>
                <img
                  src={UserIcon}
                  className='img-avatar menu'
                  alt='superadmin@hogwork.com'
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='#/action-1'>
                  <strong>
                    {profileInfo && Object.entries(profileInfo).length
                      ? [profileInfo.firstName, profileInfo.lastName].join(' ')
                      : ''}
                  </strong>
                  <br />
                  <strong>{profileInfo ? profileInfo.email : ''}</strong>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to={AppRoutes.MY_PROFILE}>
                    <i className='fa fa-user' /> Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.props.onLogout()}>
                  <i className='fa fa-lock' /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  profileInfoReducer: state.profileInfoReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => {
      dispatch(LogOutRequest());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultHeader);
