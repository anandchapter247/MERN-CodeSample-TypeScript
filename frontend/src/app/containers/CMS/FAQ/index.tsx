import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IFaqState, IRootState } from "../../../../interfaces";
import { AppRoutes } from "../../../../config";
import { ConfirmBox } from "../../../../helper";
import TooltipComponent from "../../../components/ToolTipComponent";
import { TooltipText } from "../../../common";
import { getFAQRequest } from "../../../../actions";

class Faq extends Component<any, IFaqState> {
  constructor(props: any) {
    super(props);
    this.state = {
      // For Pagination
      totalRecords: 0,
      currentPage: 1,
      pageLimit: 10,
      pageNeighbours: 1,
    };
  }
  componentDidMount = () => {
    console.log("did mount calling");
    this.props.getFaqs();
  };

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
    const { currentPage, pageLimit } = this.state;
    const { userReducer } = this.props;
    let count = (currentPage - 1) * pageLimit + 1;
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Answer</th>
              <th>order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.faqReducer &&
            this.props.faqReducer.faqData &&
            this.props.faqReducer.faqData.length ? (
              this.props.faqReducer.faqData.map(
                (faq: any, index: number) => {
                  return (
                    <tr key={faq._id}>
                      <td>
                       {count++}
                      </td>
                      <td>{faq.question}</td>
                      <td>{faq.answer}</td>
                      <td>{faq.order}</td>
                      <td>
                        <Button
                          type="button"
                          color={faq.isActive ? "primary" : "danger"}
                          className="btn btn-sm"
                          onClick={() =>
                            this.handleStatus(
                              faq && faq._id
                                ? faq._id
                                : "",
                              !faq.isActive
                            )
                          }
                        >
                          {faq.isActive ? "Active" : "Deactive"}
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
                                          if (faq && faq._id) {
                                            this.props.history.push(
                                              AppRoutes.EDIT_USER.replace(
                                                ':id',
                                                faq._id,
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
  faqReducer: state.faqReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getFaqs: () => {
      dispatch(getFAQRequest());
    },
    // updateUserStatus: (data:any) => {
    //   dispatch(userStatusRequest(data));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Faq);
