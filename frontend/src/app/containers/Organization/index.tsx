import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { IRootState, IProxyLoginActionData } from "../../../interfaces";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getOrganizationRequest, proxyLoginRequest } from "../../../actions";
import {
  IOrganizationState,
  IOrganizationProps,
  IOrganizationData
} from "../../../interfaces/Organization";
import { ConfirmBox } from "../../../helper";
import TooltipComponent from "../../components/ToolTipComponent";
import { TooltipText } from "../../common";
import { Form } from "react-bootstrap";

class Organization extends Component<IOrganizationProps, IOrganizationState> {
  constructor(props: IOrganizationProps) {
    super(props);
    this.state = {
      // For Pagination
      totalRecords: 0,
      currentPage: 1,
      pageLimit: 10,
      pageNeighbours: 1
    };
  }
  componentDidMount = () => {
    console.log("did mount calling");
    this.props.getOrganization();
  };
  handleStatus = async (id: string, isActive: boolean) => {
    const { value } = await ConfirmBox({
      title: "Are you sure?",
      text: isActive
        ? "Do you want to activate this organization?"
        : "Do you want to deactivate this organization?"
    });
    if (!value) {
      return;
    } else {
      // Api call
    }
  };
  render() {
    const { currentPage, pageLimit } = this.state;
    let count = (currentPage - 1) * pageLimit + 1;
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Group className="col-sm-12">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name={"isHide"} value={"true"} />
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
              <th>Wildcard Domain</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.organizationReducer &&
            this.props.organizationReducer.organizationData &&
            this.props.organizationReducer.organizationData.length ? (
              this.props.organizationReducer.organizationData.map(
                (organization: IOrganizationData, index: number) => {
                  return (
                    <tr key={organization._id}>
                      <td>
                        <Form.Group className="col-sm-12">
                          <div className="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                name={"isHide"}
                                value={"true"}
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
                      <td>{organization.firstName}</td>
                      <td>{organization.lastName}</td>
                      <td>{organization.email}</td>
                      <td>{organization.wildCardDomain}</td>
                      <td>
                        <Button
                          type="button"
                          color={organization.isActive ? "primary" : "danger"}
                          className="btn btn-sm"
                          onClick={() =>
                            this.handleStatus(
                              organization && organization._id
                                ? organization._id
                                : "",
                              !organization.isActive
                            )
                          }
                        >
                          {organization.isActive ? "Active" : "Deactive"}
                        </Button>
                      </td>
                      <td>
                        <button type="button" className="btn btn-sm">
                          <i className="fa fa-eye" />
                        </button>
                        <TooltipComponent
                          dataPlacement={"top"}
                          message={TooltipText.proxyLogin}
                          children={
                            <button
                              type="button"
                              className="btn login-icon "
                              onClick={() => {
                                if (organization && organization._id) {
                                  this.props.proxyLogin({
                                    id: organization._id
                                  });
                                }
                              }}
                            >
                              <i className="icon-lock-open" />
                            </button>
                          }
                        />
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
  organizationReducer: state.OrganizationReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getOrganization: () => {
      dispatch(getOrganizationRequest());
    },
    proxyLogin: (data: IProxyLoginActionData) => {
      dispatch(proxyLoginRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Organization);
