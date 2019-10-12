import React, { Component } from 'react';
import { Form, InputGroup, Row, Col, Button } from 'react-bootstrap';
import EmailEditor from 'react-email-editor';
import { ITemplateState, IRootState } from '../../../interfaces';
import { Dispatch } from 'redux';
import { addTemplateRequest, viewTemplateRequest } from '../../../actions';
import { connect } from 'react-redux';

class AddTemplate extends Component<any, ITemplateState> {
  editor: any;
  constructor(props: any) {
    super(props);
    this.editor = null;
    // '" <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head> <!--[if gte mso 9]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><title></title><style type="text/css">body{margin:0;padding:0}table,tr,td{vertical-align:top;border-collapse:collapse}p,ul{margin:0}.ie-container table, .mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit !important;text-decoration:none !important}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}[owa] .email-row .email-col{display:table-cell;float:none !important;vertical-align:top}.ie-container .email-col-100, .ie-container .email-row, [owa] .email-col-100, [owa] .email-row{width:500px !important}.ie-container .email-col-17, [owa] .email-col-17{width:85px !important}.ie-container .email-col-25, [owa] .email-col-25{width:125px !important}.ie-container .email-col-33, [owa] .email-col-33{width:165px !important}.ie-container .email-col-50, [owa] .email-col-50{width:250px !important}.ie-container .email-col-67, [owa] .email-col-67{width:335px !important}@media only screen and (min-width: 520px){.email-row{width:500px !important}.email-row .email-col{vertical-align:top}.email-row .email-col-100{width:500px !important}.email-row .email-col-67{width:335px !important}.email-row .email-col-50{width:250px !important}.email-row .email-col-33{width:165px !important}.email-row .email-col-25{width:125px !important}.email-row .email-col-17{width:85px !important}}@media (max-width: 520px){.hide-mobile{display:none !important}.email-row-container{padding-left:0px !important;padding-right:0px !important}.email-row .email-col{min-width:320px !important;max-width:100% !important;display:block !important}.email-row{width:calc(100% - 40px) !important}.email-col{width:100% !important}.email-col>div{margin:0 auto}.no-stack .email-col{min-width:0 !important;display:table-cell !important}.no-stack .email-col-50{width:50% !important}.no-stack .email-col-33{width:33% !important}.no-stack .email-col-67{width:67% !important}.no-stack .email-col-25{width:25% !important}.no-stack .email-col-17{width:17% !important}}</style><!--[if mso]><style type="text/css">ul li{list-style:disc inside;mso-special-format:bullet}</style><![endif]--></head><body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--><table class="nl-container" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0"><tbody><tr style="vertical-align: top"><td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]--><div class="email-row-container" style="padding: 0px;background-color: transparent"><div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="email-row"><div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]--><div class="email-col email-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;"><div style="width: 100% !important;"> <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]--><table id="u_content_text_1" class="u_content_text" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"><div style="color: #000; line-height: 140%; text-align: left; word-wrap: break-word;"> <span style="font-size: 14px; line-height: 19.6px;">This is a new Text block. Change the text.</span></div></td></tr></tbody></table><!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--></div></div> <!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--></div></div></div><!--[if (mso)|(IE)]></td></tr></table><![endif]--></td></tr></tbody></table> <!--[if (mso)|(IE)]></div><![endif]--></body></html>';
    this.state = {
      name: '',
      subject: '',
      content: {
        counters: { u_column: 1, u_row: 1, u_content_text: 1 },
        body: {
          rows: [
            {
              cells: [1],
              columns: [
                {
                  contents: [
                    {
                      type: 'text',
                      values: {
                        containerPadding: '10px',
                        _meta: {
                          htmlID: 'u_content_text_1',
                          htmlClassNames: 'u_content_text',
                        },
                        selectable: true,
                        draggable: true,
                        deletable: true,
                        color: '#000',
                        textAlign: 'left',
                        lineHeight: '140%',
                        text:
                          '<span style="font-size: 14px; line-height: 19.6px;">This is a new Text block. Change the text.</span>',
                      },
                    },
                  ],
                  values: {
                    backgroundColor: '',
                    padding: '0px',
                    border: {},
                    _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' },
                  },
                },
              ],
              values: {
                columns: false,
                backgroundColor: '',
                columnsBackgroundColor: '',
                backgroundImage: {
                  url: '',
                  fullWidth: true,
                  repeat: false,
                  center: true,
                  cover: false,
                },
                padding: '0px',
                hideMobile: false,
                noStackMobile: false,
                _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' },
                selectable: true,
                draggable: true,
                deletable: true,
              },
            },
          ],
          values: {
            backgroundColor: '#e7e7e7',
            backgroundImage: {
              url: '',
              fullWidth: true,
              repeat: false,
              center: true,
              cover: false,
            },
            contentWidth: '500px',
            fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
            _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' },
          },
        },
      },
      isEditable: false,
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
      const { templateName, subject, designContent } = templateInfo;
      const { isEditable } = this.state;
      if (isEditable) {
        this.setState({
          name: templateName,
          subject,
          content: designContent,
        });
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
    const { name, subject } = this.state;
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
      this.props.addTemplate(templateData);
      // const response = await new ApiHelper().FetchFromServer(
      //   ApiRoutes.ADMIN_LOGIN.service,
      //   ApiRoutes.ADMIN_LOGIN.url,
      //   ApiRoutes.ADMIN_LOGIN.method,
      //   ApiRoutes.ADMIN_LOGIN.authenticate,
      //   undefined,
      //   { email: html, password: design },
      // );
      // console.log(response);
    });
  };
  onLoad = () => {
    const { content } = this.state; /* DESIGN JSON GOES HERE */
    if (!this.editor) return;
    this.editor.loadDesign(content);
  };
  render() {
    const { name, subject } = this.state;
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
            Email Subject<span className={'mandatory'}>*</span>&nbsp;
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
            Email Content<span className={'mandatory'}>*</span>&nbsp;
          </Form.Label>
          <EmailEditor
            ref={editor => (this.editor = editor)}
            onLoad={this.onLoad}
          />
        </Form.Group>
        <Row>
          <Col xs='6'>
            <Button type={'submit'} className='px-4 btn-submit'>
              Save
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
    viewTemplate: (data: any) => {
      dispatch(viewTemplateRequest(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTemplate);
