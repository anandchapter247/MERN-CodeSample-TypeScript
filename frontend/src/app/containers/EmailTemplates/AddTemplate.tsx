import React, { Component } from 'react';
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import EmailEditor from 'react-email-editor';
import { ITemplateState, IRootState, ITemplateProps } from '../../../interfaces';
import { Dispatch } from 'redux';
import { addTemplateRequest, viewTemplateRequest, updateTemplateRequest } from '../../../actions';
import { connect } from 'react-redux';

class AddTemplate extends Component<ITemplateProps, ITemplateState> {
  editor: any;
  constructor(props: ITemplateProps) {
    super(props);
    this.editor = null;
    this.state = {
      name: '',
      subject: '',
      content: '',
      isEditable: false,
      id:''
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
      if (isEditable) {
        this.setState({
          name: templateName,
          subject,
          content: designContent,
          id:_id
        },() => this.onLoad());
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
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, subject, isEditable, id } = this.state;
    await this.editor.exportHtml(async (data: any) => {
      const { design, html } = data;
      console.log('exportHtml', html, design);
      const templateData: any = {
        templateName: name,
        subject,
        htmlContent: html,
        designContent: design,
      };
      this.setState({
        content: design,
      });
      console.log(templateData);
      if (isEditable) {
        this.props.updateTemplate({...templateData, id})
      }else{
        this.props.addTemplate(templateData);
      }     
    });
  };
  onLoad = () => {
    const { content } = this.state; /* DESIGN JSON GOES HERE */
    if (!this.editor) return;
    this.editor.loadDesign(content);
  };
  render() {
    const { name, subject, isEditable } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>
            Template Name<span className={'mandatory'}>*</span>&nbsp;
          </Form.Label>
          <InputGroup>
            <input
              type={'text'}
              name={'name'}
              value={name}
              className={'form-control'}
              placeholder={'Enter Email Subject'}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Template Subject<span className={'mandatory'}>*</span>&nbsp;
          </Form.Label>
          <InputGroup>
            <input
              type={'text'}
              name={'subject'}
              value={subject}
              className={'form-control'}
              placeholder={'Enter Email Subject'}
              onChange={this.handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Email Template Body<span className={'mandatory'}>*</span>&nbsp;
          </Form.Label>
          <EmailEditor
            ref={editor => (this.editor = editor)}
            onLoad={this.onLoad}
          />
        </Form.Group>
        <Row>
          <Col xs='6'>
            <Button type={'submit'} className='px-4 btn-submit'>
              {isEditable ? 'Update' :'Save' }
            </Button>
          </Col>
        </Row>
      </Form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTemplate);
