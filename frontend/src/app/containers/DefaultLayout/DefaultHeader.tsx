import React, { Component } from 'react';
import { IDefaultHeaderProps, IDefaultHeaderState } from '../../../interfaces';
import { AppSidebarToggler } from '@coreui/react';

class DefaultHeader extends Component<
  IDefaultHeaderProps,
  IDefaultHeaderState
> {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <div className='brand-logo'>Dr. Polly</div>
        <AppSidebarToggler className='d-md-down-none' display='lg' />
        {/* <Nav className='ml-auto' navbar>
          <AppHeaderDropdown direction='down'>
            <DropdownToggle nav>
              <img
                src={UserIcon}
                className='img-avatar'
                alt='superadmin@hogwork.com'
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag='div' className='text-center'>
                <strong>ayushi.chapter247@gmail.com</strong>
                <br />
                <strong>aayushi jain</strong>
              </DropdownItem>
              <DropdownItem>
                <i className='fa fa-user' /> Profile
              </DropdownItem>
              <DropdownItem>
                <i className='fa fa-lock' /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav> */}
      </React.Fragment>
    );
  }
}

export default DefaultHeader;
