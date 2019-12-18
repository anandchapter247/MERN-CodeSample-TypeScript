import React, { Component } from 'react';
import { Form, InputGroup, Row, Col, Button, Card } from 'react-bootstrap';
import EmailEditor from 'react-email-editor';
import Select from 'react-select';
import {
  ITemplateState,
  IRootState,
  ITemplateProps,
} from '../../../interfaces';
import { Dispatch } from 'redux';
import {
  addTemplateRequest,
  viewTemplateRequest,
  updateTemplateRequest,
} from '../../../actions';
import { connect } from 'react-redux';
import { TemplateTypes } from '../../../config';

class AddTemplate extends Component<ITemplateProps, ITemplateState> {
  editor: any;
  isEditorLoaded: boolean;
  constructor(props: ITemplateProps) {
    super(props);
    this.editor = null;
    this.isEditorLoaded = false;
    this.state = {
      name: '',
      subject: '',
      content: '',
      isEditable: false,
      id: '',
      errors: {
        name: '',
        subject: '',
        content: '',
        type: '',
      },
    };
  }
  componentDidMount = () => {
    const { match } = this.props;
    const { params } = match;
    if (params && params.id) {
      const { id } = params;
      this.setState({
        isEditable: true,
      });
      this.props.viewTemplate({ id });
    }
  };
  componentDidUpdate = (prevProps: any) => {
    const { templateReducer } = prevProps;
    if (
      templateReducer.isLoading !== this.props.templateReducer.isLoading &&
      this.props.templateReducer.templateInfo
    ) {
      const { templateInfo } = this.props.templateReducer;
      const { templateName, subject, designContent, _id } = templateInfo;
      const { isEditable } = this.state;
      if (isEditable && designContent) {
        this.setState(
          {
            name: templateName,
            subject,
            content: designContent,
            id: _id,
          },
          () => {
            if (this.editor && this.isEditorLoaded) {
              this.onLoad();
            }
          },
        );
      }
    }
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  handleSelect = (selectedOption: any) => {
    this.setState({
      type: selectedOption,
    });
  };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, type, subject, isEditable, id } = this.state;
    await this.editor.exportHtml(async (data: any) => {
      const { design, html } = data;
      const templateData: any = {
        templateName: name,
        templateType: type ? type.value : '',
        subject,
        htmlContent: html,
        designContent: design,
      };
      this.setState({
        content: design,
      });
      if (isEditable) {
        this.props.updateTemplate({ ...templateData, id });
      } else {
        this.props.addTemplate(templateData);
      }
    });
  };
  onLoad = () => {
    this.isEditorLoaded = true;
    this.loadTemplate();
  };
  loadTemplate = () => {
    const { content } = this.state; /* DESIGN JSON GOES HERE */
    if (!this.isEditorLoaded || !this.editor) return;
    else {
      this.editor.loadDesign(content);
    }
  };
  render() {
    const { name, type, subject, errors, isEditable } = this.state;
    return (
      <Card>
        <Card.Header>
          <h4>
            <i className='icon-note' />
            &nbsp;{!isEditable ? 'Add' : 'Update'} Template
          </h4>
        </Card.Header>
        <Card.Body>
          <div className='row'>
            <div className='col-md-12 my-4 lesson-form'>
              <Form onSubmit={this.handleSubmit} className='row'>
                <Form.Group className={'col-sm-6'}>
                  <InputGroup>
                    <input
                      type={'text'}
                      name={'name'}
                      value={name}
                      className={'form-control floating-input'}
                      placeholder={' '}
                      onChange={this.handleChange}
                    />
                    <Form.Label
                      className={`floating-label ${name ? 'top-label' : ''}`}
                    >
                      Template Name<span className={'mandatory'}>*</span>&nbsp;
                    </Form.Label>
                    {errors && errors.name ? (
                      <div className={'text-danger error-text'}>
                        {errors.name}
                      </div>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <Form.Group
                  controlId='exampleForm.ControlSelect1'
                  className='mb-0 col-md-6 margin-n'
                >
                  <Form.Label className={'blue-label font-weight-bold'}>
                    Template Type
                  </Form.Label>
                  <Select
                    placeholder='Select skill tag'
                    value={type}
                    onChange={this.handleSelect}
                    options={TemplateTypes}
                  />
                  {errors && errors.type ? (
                    <div className={'text-danger error-text'}>
                      {errors.type}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group className={'col-md-12'}>
                  <InputGroup>
                    <input
                      type={'text'}
                      name={'subject'}
                      value={subject}
                      className={'form-control floating-input'}
                      placeholder={' '}
                      onChange={this.handleChange}
                    />
                    <Form.Label
                      className={`floating-label ${subject ? 'top-label' : ''}`}
                    >
                      Template Subject<span className={'mandatory'}>*</span>
                      &nbsp;
                    </Form.Label>
                    {errors && errors.subject ? (
                      <div className={'text-danger error-text'}>
                        {errors.subject}
                      </div>
                    ) : null}
                  </InputGroup>
                </Form.Group>
                <Form.Group className={'col-md-12'}>
                  <Form.Label>
                    Email Template Body<span className={'mandatory'}>*</span>
                    &nbsp;
                  </Form.Label>
                  <EmailEditor
                    ref={editor => (this.editor = editor)}
                    onLoad={this.onLoad}
                  />
                </Form.Group>
                <Row>
                  <Col xs='6'>
                    <Button type={'submit'} className='px-4 btn-submit'>
                      {isEditable ? 'Update' : 'Save'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  templateReducer: state.TemplateReducer,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addTemplate: (data: any) => {
      dispatch(addTemplateRequest(data));
    },
    updateTemplate: (data: any) => {
      dispatch(updateTemplateRequest(data));
    },
    viewTemplate: (data: any) => {
      dispatch(viewTemplateRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate);
