import React, { Component } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import TooltipComponent from '../ToolTipComponent';

class SearchFilter extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      searchValue,
      isActive,
      placeholdetText,
      label,
      sortBy,
      tooltipMessage,
    } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <Row>
          <Col lg={'2'} md={'2'}>
            <Form.Group className='mb-0'>
              <Form.Label className={'blue-label font-weight-bold'}>
                {placeholdetText}&nbsp;
                <TooltipComponent
                  dataPlacement={'top'}
                  message={tooltipMessage}
                  children={
                    <span>
                      <i className='icon-info' />
                    </span>
                  }
                />
              </Form.Label>
              <InputGroup>
                <input
                  type='text'
                  name='searchValue'
                  value={searchValue}
                  onChange={this.props.handleChange}
                  className='form-control floating-input mh-38'
                  aria-describedby='searchUser'
                  placeholder='search'
                />
              </InputGroup>
            </Form.Group>
          </Col>
          {label !== 'student' ? (
            <Col
              lg={label === 'lesson' ? '2' : '2'}
              md={label === 'lesson' ? '2' : '2'}
              className='mb-0'
            >
              <Form.Group controlId='exampleForm.ControlSelect1'>
                <Form.Label className={'blue-label font-weight-bold'}>
                  Select status
                </Form.Label>
                <Select
                  value={isActive}
                  placeholder='Status'
                  isClearable={true}
                  onChange={(event: any) => {
                    if (this.props.handleStatusChange) {
                      this.props.handleStatusChange(event, 'isActive');
                    }
                  }}
                  options={[
                    {
                      label: 'Active',
                      value: 'true',
                    },
                    {
                      label: 'Deactive',
                      value: 'false',
                    },
                  ]}
                />
              </Form.Group>
            </Col>
          ) : null}
          {label === 'question' ? <Col lg={'2'} md={'2'}></Col> : null}
          <Col
            lg={label === 'lesson' ? '2' : '2'}
            md={label === 'lesson' ? '2' : '2'}
          >
            <Form.Group controlId='exampleForm.ControlSelect2' className='mb-0'>
              <Form.Label className={'blue-label font-weight-bold'}>
                Sort by
              </Form.Label>
              <Select
                value={sortBy}
                placeholder='Sort by'
                isClearable={true}
                onChange={(event: any) => {
                  if (this.props.handleStatusChange) {
                    this.props.handleStatusChange(event, 'sortBy');
                  }
                }}
                options={[
                  {
                    label: 'Sort by A-Z',
                    value: '1',
                  },
                  {
                    label: 'Sort by Z-A',
                    value: '2',
                  },
                  {
                    label: 'Sort by Newest',
                    value: '4',
                  },
                  {
                    label: 'Sort by Oldest',
                    value: '3',
                  },
                ]}
              />
            </Form.Group>
          </Col>

          <Col
            lg={label === 'lesson' ? '2' : '2'}
            md={label === 'lesson' ? '2' : '2'}
          >
            <div className='filter-btn-wrap'>
              <div className='form-group mb-3'>
                <Form.Label className='empty-label' />
                <span className='mr-2'>
                  <TooltipComponent
                    dataPlacement={'top'}
                    message={'Click here to search'}
                    children={
                      <button
                        type='submit'
                        className='btn btn-circle btn-search'
                      >
                        <i className='icon-magnifier' />
                      </button>
                    }
                  />
                </span>
                <span className=''>
                  <TooltipComponent
                    dataPlacement={'top'}
                    message={'Click here to reset'}
                    children={
                      <button
                        type='button'
                        className='btn btn-circle btn-refresh'
                        onClick={() => {
                          this.props.history.push(this.props.location.pathname);
                        }}
                      >
                        <i className='icon-refresh' />
                      </button>
                    }
                  />
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchFilter;
