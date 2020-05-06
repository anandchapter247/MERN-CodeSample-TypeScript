import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { IRootState, IUserProps, IUserState, IUserModel, IUserData } from "../../../interfaces";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ConfirmBox } from "../../../helper";
import TooltipComponent from "../../components/ToolTipComponent";
import { TooltipText } from "../../common";
import { Form } from "react-bootstrap";
import { getUserRequest, userStatusRequest } from "../../../actions";
import { AppRoutes } from "../../../config";

class User extends Component<IUserProps, IUserState> {
  constructor(props: IUserProps) {
    super(props);
    this.state = {
      // For Pagination
      totalRecords: 0,
      currentPage: 1,
      pageLimit: 10,
      pageNeighbours: 1,
      selectedUser:[]
    };
  }
  componentDidMount = () => {
    console.log("did mount calling");
    this.props.getUsers();
  };
  handleAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { checked } = target;
    console.log('checkedd',checked);
    
    const { userReducer } = this.props;
    const selectedUser:any = [];
    if (userReducer && userReducer.userData && userReducer.userData.length && checked) {
      const { userData } = userReducer
      userData.forEach((user:any) => {
        selectedUser.push(user._id);
      });
    }
    this.setState({
      selectedUser
    })   
  }

  handleSingleCheck = (event: React.ChangeEvent<HTMLInputElement>, id:string) => {
    const { target } = event;
    const { checked } = target;
    let selectedUser = [...this.state.selectedUser];
    if (checked) {
      selectedUser = [...selectedUser, id];
    } else {
      let index = selectedUser.indexOf(id);
      if (index > -1) {
        selectedUser = selectedUser.filter((user:string) => user !== id);
      }
    }
    this.setState({
      selectedUser,
    });
  }

  handleStatus = async (id: string, isActive: boolean) => {
    const { value } = await ConfirmBox({
      title: 'Are you sure?',
      text: isActive
        ? 'Do you want to activate this user?'
        : 'Do you want to deactivate this user?',
    });
    if (!value) {
      return;
    } else {
      this.props.updateUserStatus({ id, isActive });
    }
  };

  render() {
    const { currentPage, pageLimit, selectedUser } = this.state;
    const { userReducer } = this.props;
    let count = (currentPage - 1) * pageLimit + 1;
    console.log(selectedUser,'seererer');
    
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Group className="col-sm-12">
                  <div className="checkbox">
                    <label htmlFor={'userall'}>
                      <input type="checkbox" name={"selectUser"} id={'userall'} checked={userReducer &&
            userReducer.userData && selectedUser.length === userReducer.userData.length } onChange={this.handleAllCheck} />
                      <span className="checkbox-material">
                        <span className="check" />
                      </span>
                      #
                    </label>
                  </div>
                </Form.Group>
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>Status</th>
              <th>Action</th>
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
                        <Form.Group className="col-sm-12">
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                name={"user"}
                                checked={selectedUser.indexOf(user._id) > -1 ? true : false}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => this.handleSingleCheck(e,user._id ? user._id : '')}
                                id={`user${index}`}
                              />
                              <span className="checkbox-material">
                                <span className="check" />
                              </span>
                              {count++}
                            </label>
                          </div>
                        </Form.Group>
                      </td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          type="button"
                          color={user.isActive ? "primary" : "danger"}
                          className="btn btn-sm"
                          onClick={() =>
                            this.handleStatus(
                              user && user._id
                                ? user._id
                                : "",
                              !user.isActive
                            )
                          }
                        >
                          {user.isActive ? "Active" : "Deactive"}
                        </Button>
                      </td>
                      <td className='overflow-hidden'>
                                <div className='action-buttons'>
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
                                </div>
                              </td>
                      </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td colSpan={10} className="text-center">
                  No Event found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  userReducer: state.userReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    
    getUsers: () => {
      dispatch(getUserRequest());
    },
    updateUserStatus: (data:any) => {
      dispatch(userStatusRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
