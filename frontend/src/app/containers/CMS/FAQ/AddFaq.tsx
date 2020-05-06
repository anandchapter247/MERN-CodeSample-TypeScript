import React, { Component } from "react";
import { Card, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { IAddFAQState, IRootState } from "../../../../interfaces";
import { FaqValidator } from "../../../../validator";
import { Dispatch } from "redux";
import { addFAQRequest } from "../../../../actions";
import { connect } from "react-redux";

class AddFaq extends Component<any, IAddFAQState>{
  constructor(props: any) {
    super(props);
    this.state = {
      question: '',
      answer: '',
      order: 0,
      errors: {
        question: '',
        answer: '',
        order: '',
      },
    };
  }
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: '',
      },
    });
  };
  onEditorStateChange: any = (content: any): void => {
    this.setState({
      answer:content
    });
  };
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      question,
      answer,
      order,
    } = this.state;
    const data = {
      question,
      answer:answer ? draftToHtml(convertToRaw(answer.getCurrentContent())) : '',
      order,
    }
    const { isValid, errors } = FaqValidator(data);
    if (isValid) {
      this.props.addFaq(data);
    }else{
      this.setState({
        errors
      });
      return;
    }
  }
    render(){
      const {question,
      answer,
      order,errors} = this.state;
        return(
            <div className='cr-page px-3 min-height650 my-profile-section'>
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <Card.Header>
                <h4>
                  <i className='icon-note' />
                  &nbsp;{true ? 'Add' : 'Update'} User
                </h4>
              </Card.Header>
              <Card.Body>
                <div className='row'>
                  <div className='col-md-12  my-4'>
                    <Form className='row' onSubmit={this.handleSubmit}>
                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Question<span className={'mandatory'}>*</span>
                          &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'question'}
                            value={question}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.question}
                        </div>
                      </Form.Group>

                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Answer<span className={'mandatory '}>*</span>
                          &nbsp;
                        </Form.Label>
                        <Editor
                            editorState={
                              answer
                            }
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-home-editor"
                            toolbar={{
                              options: [
                                "inline",
                                "blockType",
                                "fontSize",
                                "list",
                                "textAlign",
                                "link"
                              ],
                              inline: {
                                options: ["bold", "italic", "underline"]
                              },
                              textAlign: { inDropdown: false },
                              link: {
                                inDropdown: false,
                                linkCallback: (params: any) => ({
                                  ...params
                                })
                              }
                            }}
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        <div className={'text-danger error-text'}>
                          {errors && errors.answer}
                        </div>
                      </Form.Group>

                      <Form.Group className='col-sm-6'>
                        <Form.Label className='floating-label'>
                          Order<span className={'mandatory'}>*</span>
                          &nbsp;
                        </Form.Label>
                        <InputGroup>
                          <input
                            type={'text'}
                            name={'order'}
                            value={order}
                            className={'form-control floating-input'}
                            placeholder={' '}
                            onChange={this.handleChange}
                          />
                        </InputGroup>
                        <div className={'text-danger error-text'}>
                          {errors && errors.order}
                        </div>
                      </Form.Group>
                      <Col xs='12' className='text-right'>
                        <Button
                          variant='link'
                          className='btn btn-cancel'
                        >
                          {' '}
                          Cancel
                        </Button>
                        &nbsp;
                        <Button
                          variant='link'
                          type={'submit'}
                          className=' btn-submit'
                        >
                          {true ? 'Save' : 'Update'}
                        </Button>
                      </Col>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
        )
    }
}

const mapStateToProps: any = (state: IRootState) => ({
  homePageReducer: state.homePageReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addFaq: (data:any) => {
      dispatch(addFAQRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddFaq);