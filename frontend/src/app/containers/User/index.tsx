import React, { Component } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import {
  IRootState,
  IUserProps,
  IUserState,
  IUserModel,
  IUserData,
} from '../../../interfaces';
import { ConfirmBox } from '../../../helper';
import TooltipComponent from '../../components/ToolTipComponent';
import { TooltipText } from '../../common';
import { Form } from 'react-bootstrap';
import {
  getUserRequest,
  userStatusRequest,
  deleteUserRequest,
} from '../../../actions';
import { AppRoutes } from '../../../config';
import { toast } from 'react-toastify';

class User extends Component<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {
      // For Pagination
      totalRecords: 0,
      currentPage: 1,
      pageLimit: 10,
      pageNeighbours: 1,
      selectedUser: [],
    };
  }
  componentDidMount = () => {
    console.log('did mount calling');
    this.props.getUsers();
  };
  handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { checked } = target;
    console.log('checkedd', checked);

    const { userReducer } = this.props;
    const selectedUser: any = [];
    if (
      userReducer &&
      userReducer.userData &&
      userReducer.userData.length &&
      checked
    ) {
      const { userData } = userReducer;
      userData.forEach((user: any) => {
        selectedUser.push(user._id);
      });
    }
    this.setState({
      selectedUser,
    });
  };

  handleSingleCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const { target } = event;
    const { checked } = target;
    let selectedUser = [...this.state.selectedUser];
    if (checked) {
      selectedUser = [...selectedUser, id];
    } else {
      let index = selectedUser.indexOf(id);
      if (index > -1) {
        selectedUser = selectedUser.filter((user: string) => user !== id);
      }
    }
    this.setState({
      selectedUser,
    });
  };

  handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { selectedUser } = this.state;
    const {
      target: { value },
    } = e;
    if (!selectedUser.length) {
      toast.info('Please select at least one Procurement Manager.');
      return;
    }
    if (value === 'active') {
      this.handleStatus(true);
    } else if (value === 'deactive') {
      this.handleStatus(false);
    } else if (value === 'delete') {
      this.onDelete();
    }
  };

  handleStatus = async (isActive: boolean, id?: string) => {
    const { selectedUser } = this.state;
    const ids = id ? [id] : selectedUser;
    const { value } = await ConfirmBox({
      title: 'Are you sure?',
      text: isActive
        ? 'Do you want to activate this user?'
        : 'Do you want to deactivate this user?',
    });
    if (!value) {
      return;
    } else {
      this.props.updateUserStatus({ ids, isActive });
    }
  };

  onDelete = async (id?: string) => {
    const { selectedUser } = this.state;
    const ids = id ? [id] : selectedUser;
    const { value } = await ConfirmBox({
      title: 'Are you sure?',
      text: 'Do you want to Delete this Lesson',
    });
    if (!value) {
      return;
    } else {
      const { location } = this.props;
      const { search } = location;
      const query = qs.parse(search);
      this.props.deleteUser({ ...query, ids });
    }
  };
  render() {
    const { currentPage, pageLimit, selectedUser } = this.state;
    const { userReducer } = this.props;
    let count = (currentPage - 1) * pageLimit + 1;
    console.log(selectedUser, 'seererer');

    return (
      <div>
        <Card>
          <Card.Header>
            <h4>
              <i className='icon-notebook' />
              Users
            </h4>
            <TooltipComponent
              dataPlacement={'top'}
              message={`Add New Lesson`}
              children={
                <Button
                  variant={'link'}
                  className={'pull-right theme-btn add-btn'}
                  id={'add-new-pm-tooltip'}
                  onClick={() => {
                    this.props.history.push(AppRoutes.ADD_USER);
                  }}
                >
                  <i className={'fa fa-plus'} />
                  &nbsp; Add New User
                </Button>
              }
            />
          </Card.Header>
          <Card.Body className='pt-4'>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>
                    <Form.Group className='col-sm-12'>
                      <div className='checkbox'>
                        <label htmlFor={'userall'}>
                          <input
                            type='checkbox'
                            name={'selectUser'}
                            id={'userall'}
                            checked={
                              userReducer &&
                              userReducer.userData &&
                              selectedUser.length ===
                                userReducer.userData.length
                            }
                            onChange={this.handleAllCheck}
                          />
                          <span className='checkbox-material'>
                            <span className='check' />
                          </span>
                          #
                        </label>
                        <select
                          className='commonstatus'
                          // // value={ids}
                          onChange={this.handleActionChange}
                        >
                          <option>Select Status</option>
                          <option value={'active'}>Active</option>
                          <option value={'deactive'}>Deactive</option>
                          <option value={'delete'}>Delete</option>
                        </select>
                      </div>
                    </Form.Group>
                  </th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>email</th>
                  <th className='text-center'>Status</th>
                  <th className='action-width'>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.userReducer &&
                this.props.userReducer.userData &&
                this.props.userReducer.userData.length ? (
                  this.props.userReducer.userData.map(
                    (user: IUserData, index: number) => {
                      return (
                        <tr key={user._id}>
                          <td>
                            <Form.Group className='col-sm-12'>
                              <div className='checkbox'>
                                <label>
                                  <input
                                    type='checkbox'
                                    name={'user'}
                                    checked={
                                      selectedUser.indexOf(user._id) > -1
                                        ? true
                                        : false
                                    }
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                      this.handleSingleCheck(
                                        e,
                                        user._id ? user._id : '',
                                      )
                                    }
                                    id={`user${index}`}
                                  />
                                  <span className='checkbox-material'>
                                    <span className='check' />
                                  </span>
                                  {count++}
                                </label>
                              </div>
                            </Form.Group>
                          </td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td className='text-center'>
                            <Button
                              type='button'
                              color={user.isActive ? 'primary' : 'danger'}
                              className='btn btn-sm'
                              onClick={() =>
                                this.handleStatus(
                                  !user.isActive,
                                  user && user._id ? user._id : '',
                                )
                              }
                            >
                              {user.isActive ? 'Active' : 'Deactive'}
                            </Button>
                          </td>
                          <td className='overflow-hidden'>
                            <div className='action-buttons'>
                              <TooltipComponent
                                dataPlacement={'top'}
                                message={TooltipText.view}
                                children={
                                  <button
                                    type='button'
                                    className='btn view-icon '
                                    onClick={() => {
                                      if (user && user._id) {
                                        this.props.history.push(
                                          AppRoutes.EDIT_USER.replace(
                                            ':id',
                                            user._id,
                                          ),
                                        );
                                      }
                                    }}
                                  >
                                    <i className='icon-eye' />
                                  </button>
                                }
                              />
                              <TooltipComponent
                                dataPlacement={'top'}
                                message={TooltipText.edit}
                                children={
                                  <button
                                    type='button'
                                    className='btn edit-icon '
                                    onClick={() => {
                                      if (user && user._id) {
                                        this.props.history.push(
                                          AppRoutes.EDIT_USER.replace(
                                            ':id',
                                            user._id,
                                          ),
                                        );
                                      }
                                    }}
                                  >
                                    <i className='icon-note ' />
                                  </button>
                                }
                              />
                              <TooltipComponent
                                dataPlacement={'top'}
                                message={TooltipText.proxyLogin}
                                children={
                                  <button
                                    type='button'
                                    className='btn login-icon '
                                    onClick={() => {
                                      if (user && user._id) {
                                        this.props.history.push(
                                          AppRoutes.EDIT_USER.replace(
                                            ':id',
                                            user._id,
                                          ),
                                        );
                                      }
                                    }}
                                  >
                                    <i className='icon-lock-open' />
                                  </button>
                                }
                              />
                              <TooltipComponent
                                dataPlacement={'top'}
                                message={TooltipText.delete}
                                children={
                                  <button
                                    type='button'
                                    className='btn delete-icon '
                                    onClick={() =>
                                      this.onDelete(
                                        user && user._id ? user._id : '',
                                      )
                                    }
                                  >
                                    <i className='icon-trash' />
                                  </button>
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    },
                  )
                ) : (
                  <tr>
                    <td colSpan={10} className='text-center'>
                      No Event found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUserRequest());
    },
    updateUserStatus: (data: any) => {
      dispatch(userStatusRequest(data));
    },
    deleteUser: (data: any) => {
      dispatch(deleteUserRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
