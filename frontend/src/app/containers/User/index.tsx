import React, { Component } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as qs from 'query-string';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  IRootState,
  IUserProps,
  IUserState,
  IUserModel,
  IUserData,
  IredirectPath,
} from '../../../interfaces';
import { ConfirmBox, logger } from '../../../helper';
import TooltipComponent from '../../components/ToolTipComponent';
import { TooltipText } from '../../common';
import {
  getUserRequest,
  userStatusRequest,
  deleteUserRequest,
  redirectTo,
} from '../../../actions';
import { AppRoutes } from '../../../config';
import { NoSearchFound } from '../../components/SearchFilter/NoSearchFound';
import Loader from '../../components/Loader/Loader';
import no_data from '../../../assets/img/no-data.svg';
import SearchFilter from '../../components/SearchFilter';
import PaginationComponent from '../../components/Pagination';

const sortFilter: any = {
  1: 'name',
  2: 'name-desc',
  3: 'oldest',
  4: 'newest',
};

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
      // Search filters states
      searchValue: '',
      isActive: '',
      sortBy: '',
      isFilterApplied: false,
    };
  }
  handleQueryParams = () => {
    const query = qs.parse(this.props.location.search);
    let searchValue: string = '';
    let isActive: any = '';
    let sortBy: any = { label: '', value: '' };
    let sortByValue: any = Object.keys(sortFilter).find(
      (key: any) => sortFilter[key] === query.sortBy,
    );
    logger(sortByValue);
    logger(typeof sortByValue);
    if (sortByValue === '1') {
      sortBy.label = 'Sort by A-Z';
    }
    if (sortByValue === '2') {
      sortBy.label = 'Sort by Z-A';
    }
    if (sortByValue === '3') {
      sortBy.label = 'Sort by Oldest';
    }
    if (sortByValue === '4') {
      sortBy.label = 'Sort by Newest';
    }

    if (query) {
      searchValue = query.search ? (query.search as string) : '';
      isActive = query.status
        ? query.status === 'active'
          ? { label: 'Active', value: 'true' }
          : { label: 'Deactive', value: 'false' }
        : '';
      isActive = query.status
        ? query.status === 'active'
          ? { label: 'Active', value: 'true' }
          : { label: 'Deactive', value: 'false' }
        : '';
      sortBy = sortByValue
        ? {
            ...sortBy,
            value:
              Object.keys(sortFilter).find(
                (key: any) => sortFilter[key] === query.sortBy,
              ) || '',
          }
        : '';
    }
    logger(isActive);
    logger('****testing*********');

    this.setState(
      {
        searchValue,
        isActive,
        sortBy,
        isFilterApplied: searchValue || isActive || sortBy,
        currentPage: query.page ? parseInt(query.page as string) : 1,
      },
      () => this.getData(),
    );
  };
  componentDidMount = () => {
    this.handleQueryParams();
  };
  componentDidUpdate = (prevProps: IUserProps) => {
    const { location } = prevProps;
    if (location.search !== this.props.location.search) {
      this.handleQueryParams();
    }
  };

  getData = () => {
    const {
      pageLimit,
      currentPage,
      searchValue,
      isActive,
      sortBy,
    } = this.state;
    let skip = pageLimit * (currentPage - 1);
    if (
      this.props &&
      this.props.userReducer &&
      skip &&
      skip === this.props.userReducer.totalRecords
    ) {
      skip = skip - pageLimit;
      this.setState({
        currentPage: currentPage - 1,
      });
    }
    const data = {
      skip,
      limit: pageLimit,
      searchValue,
      isActive: isActive ? isActive.value : '',
      sortBy: sortBy && sortBy.value !== '' ? sortBy.value : '',
    };
    this.props.getUsers(data);
  };
  handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { checked } = target;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleStatusChange = (selectedOption: any, name: string) => {
    console.log(name, 'in handlestatus change');

    this.setState({
      ...this.state,
      [name]: selectedOption,
    });
  };
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('in handleSubmit');

    e.preventDefault();
    this.handleSearch();
  };
  handleSearch = () => {
    const { location } = this.props;
    const { pathname } = location;
    let params: { [key: string]: any } = {};
    params.page = 1;
    const { searchValue, isActive, sortBy } = this.state;
    if (searchValue) {
      params.search = searchValue;
    }
    if (isActive && isActive.value !== '') {
      params.status = isActive.value === 'true' ? 'active' : 'deactive';
    }
    if (sortBy && sortBy.value !== '') {
      params.sortBy = sortBy.value !== '' ? sortFilter[sortBy.value] : '';
    }
    if (this.props.redirectTo) {
      this.props.redirectTo({
        path: [pathname, qs.stringify(params)].join('?'),
      });
    }
  };
  onPageChanged = (currentPage: number) => {
    const {
      location: { search, pathname },
    } = this.props;
    const query = qs.parse(search);
    if (this.props.redirectTo) {
      this.props.redirectTo({
        path: [pathname, qs.stringify({ ...query, page: currentPage })].join(
          '?',
        ),
      });
    }
  };
  render() {
    const {
      currentPage,
      pageLimit,
      selectedUser,
      searchValue,
      isActive,
      sortBy,
      isFilterApplied,
    } = this.state;
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
            <SearchFilter
              searchValue={searchValue}
              isActive={isActive}
              sortBy={sortBy}
              handleStatusChange={this.handleStatusChange}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              placeholdetText={'Search by name'}
              tooltipMessage={'Search by name'}
              {...this.props}
            />
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
                              userReducer.userData.length
                                ? selectedUser.length ===
                                  userReducer.userData.length
                                : false
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
                {this.props.userReducer && this.props.userReducer.isLoading ? (
                  <tr>
                    <td className={'table-loader'} colSpan={12}>
                      <Loader />
                    </td>
                  </tr>
                ) : this.props.userReducer &&
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
                    <td colSpan={12} className={'text-center'}>
                      {isFilterApplied ? (
                        <NoSearchFound />
                      ) : (
                        <div className='no-data-section'>
                          <img src={no_data} className='mb-2' alt='' />
                          <h4 className='mb-1'>
                            Currently there are no question added.{' '}
                          </h4>
                          <p>Please click above button to add new. </p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {userReducer &&
            userReducer.totalRecords &&
            userReducer.totalRecords > pageLimit ? (
              <PaginationComponent
                totalRecords={userReducer.totalRecords}
                onPageChanged={this.onPageChanged}
                pageLimit={pageLimit}
                currentPage={currentPage}
              />
            ) : null}
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
    getUsers: (data: any) => {
      dispatch(getUserRequest(data));
    },
    updateUserStatus: (data: any) => {
      dispatch(userStatusRequest(data));
    },
    deleteUser: (data: any) => {
      dispatch(deleteUserRequest(data));
    },
    redirectTo: (data: IredirectPath) => {
      dispatch(redirectTo(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
