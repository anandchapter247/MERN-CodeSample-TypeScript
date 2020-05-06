import React, { Component } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { IRootState } from '../../../interfaces';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { getTemplateRequest } from '../../../actions';
import { AppRoutes, DateTimeFormat } from '../../../config';
import TooltipComponent from '../../components/ToolTipComponent';
import { TooltipText } from '../../common/TooltipText';
import moment from 'moment';

class EmailTemplates extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // For Pagination
      totalRecords: 0,
      currentPage: 1,
      pageNeighbours: 1,
    };
  }

  componentDidMount = () => {
    // this.handleQueryParams();
    console.log('above did mount');
    this.props.getTemplates();
  };

  componentDidUpdate = (prevProps: RouteComponentProps) => {
    const { location } = prevProps;
    if (location.search !== this.props.location.search) {
      //   this.handleQueryParams();
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Card.Header>
            <h4>
              <i className='fa fa-university' />
              {/* <img src={organization} width="20px"/> */}
              &nbsp;<span className='align-middle'>Templates</span>
            </h4>
            <TooltipComponent
              dataPlacement={'top'}
              message={`Add New Organization`}
              children={
                <Button
                  variant={'link'}
                  className={'pull-right theme-btn add-btn'}
                  id={'add-new-pm-tooltip'}
                  onClick={() => {
                    this.props.history.push(AppRoutes.ADD_TEMPLATE);
                  }}
                >
                  <i className={'fa fa-plus'} />
                  &nbsp; Add New Template
                </Button>
              }
            />
          </Card.Header>
          <Card.Body className='pt-4'>
            <Table hover responsive>
              <thead className='thead-color'>
                <tr>
                  <th>#</th>
                  <th>Template Name</th>
                  <th>Subject</th>
                  <th>Created Date</th>
                  <th className='action-width'>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.templateReducer &&
                this.props.templateReducer.isLoading ? (
                  <tr>
                    <td className={'table-loader'} colSpan={12}></td>
                  </tr>
                ) : (
                  <>
                    {this.props.templateReducer &&
                    this.props.templateReducer.templateData &&
                    this.props.templateReducer.templateData.length ? (
                      this.props.templateReducer.templateData.map(
                        (template: any, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{template.templateName}</td>
                              <td>{template.subject}</td>
                              <td>{template.createdAt ? moment(template.createdAt).format(DateTimeFormat):'-'}</td>
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
                                          if (template && template._id) {
                                            this.props.history.push(
                                              AppRoutes.EDIT_TEMPLATE.replace(
                                                ':id',
                                                template._id,
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
                        },
                      )
                    ) : (
                      <tr>
                        <td colSpan={10} className='text-center'>
                          <div className='no-data-section'>
                            <h4 className='mb-1'>
                              Currently there are No Oraganization Added.{' '}
                            </h4>
                            <p>Please click above button to add new. </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
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
  templateReducer: state.TemplateReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getTemplates: () => {
      dispatch(getTemplateRequest());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmailTemplates);
