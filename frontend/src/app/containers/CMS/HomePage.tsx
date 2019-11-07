import React, { Component } from "react";
import { Button, Card, Col, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { viewHomePageRequest, updateHomePageRequest } from "../../../actions";
import {
  IRootState,
  IAddHomePageProps,
  IAddHomePageState,
  IHomePageData
} from "../../../interfaces";
import { ImageURL } from "../../../config/AppConfig";
import { AcceptedImageFormat } from "../../../config";
import { HomePageValidator } from "../../../validator";
import defaultImage from "../../../assets/img/default_image.jpg";

class AddHomePage extends Component<IAddHomePageProps, IAddHomePageState> {
  constructor(props: IAddHomePageProps) {
    super(props);
    this.state = {
      mainSection: {
        image: "",
        imageUrl: "",
        title: "",
        content: "",
        buttonText: ""
      },
      howItWorks: {
        title: "",
        section: [
          {
            heading: "",
            image: "",
            title: "",
            content: ""
          }
        ],
        buttonText: ""
      },
      ourStory: {
        heading: "",
        title: "",
        content: "",
        videoLink: ""
      },
      why: {
        heading: "",
        section: [
          {
            title: "",
            image: "",
            imageUrl: "",
            content: [{ text: "" }]
          }
        ]
      },
      errors: {
        mainSectionTitle: "",
        mainSectionContent: "",
        mainSectionButtonText: "",
        mainSectionImageUrl: "",
        ourStoryTitle: "",
        ourStoryContent: "",
        ourStoryVideoLink: ""
      },
      searchValue: "",
      isEditable: false,
      id: ""
    };
  }
  componentDidMount = () => {
    this.props.viewHomePage();
  };

  componentDidUpdate = (prevProps: IAddHomePageProps) => {
    const { homePageReducer } = this.props;
    if (
      homePageReducer &&
      homePageReducer.homePageInfo &&
      prevProps &&
      prevProps.homePageReducer &&
      prevProps.homePageReducer.homePageInfo !== homePageReducer.homePageInfo
    ) {
      const {
        mainSection,
        howItWorks,
        ourStory,
        why
      } = homePageReducer.homePageInfo;
      const { image } = mainSection;
      const contentBlock =
        mainSection && mainSection.content
          ? htmlToDraft(mainSection.content)
          : "";
      const ourContentBlock =
        ourStory && ourStory.content ? htmlToDraft(ourStory.content) : "";
      const howContent =
        howItWorks &&
        howItWorks.section.map((element: any) => {
          const resp = htmlToDraft(element.content);
          const howContentState = ContentState.createFromBlockArray(
            resp.contentBlocks
          );
          const howContentData = EditorState.createWithContent(howContentState);
          return { ...element, content: howContentData };
        });

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const mainSectioncontent = EditorState.createWithContent(contentState);
        this.setState({
          mainSection: {
            ...mainSection,
            imageUrl: image,
            content: mainSectioncontent
          }
        });
      }
      if (howContent) {
        this.setState({
          howItWorks: {
            ...howItWorks,
            section: howContent
          }
        });
      }

      if (ourContentBlock) {
        const ourContentState = ContentState.createFromBlockArray(
          ourContentBlock.contentBlocks
        );
        const ourContent = EditorState.createWithContent(ourContentState);
        this.setState({
          ourStory: { ...ourStory, content: ourContent }
        });
      }
      const whySection: any = [];
      why &&
        why.section.forEach((element: any) => {
          console.log(element.image);
          whySection.push({
            ...element,
            imageUrl: element.image
          });
        });
      this.setState({
        why: {
          ...why,
          section: whySection
        }
      });
    }
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { mainSection } = this.state;
    const { name, value } = event.target;
    if (name === "title") {
      mainSection.title = value;
    } else {
      mainSection.buttonText = value;
    }
    this.setState({
      mainSection
    });
  };

  howItWorkHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    name: "heading" | "title" | "content"
  ) => {
    const { howItWorks } = this.state;
    const { value } = event.target;
    howItWorks.buttonText = value;
    howItWorks.section[index][name] = value;
    this.setState({
      howItWorks
    });
  };

  owrStoryHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { ourStory } = this.state;
    const { name, value } = event.target;
    if (name === "title") {
      ourStory.title = value;
    } else {
      ourStory.content = value;
      ourStory.videoLink = value;
    }
    this.setState({
      ourStory
    });
  };

  whyHandleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    name: "title"
  ) => {
    const { why } = this.state;
    const { value } = event.target;
    why.section[index][name] = value;
    this.setState({
      why
    });
  };

  whyHandleContentChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    ind: number,
    name: "text"
  ) => {
    const { why } = this.state;
    const { value } = event.target;
    why.section[index].content[ind][name] = value;
    this.setState({
      why
    });
  };

  onEditorStateChange: any = (content: any): void => {
    this.setState({
      mainSection: {
        ...this.state.mainSection,
        content
      }
    });
  };

  onHowEditorStateChange = (content: any, index: number): void => {
    const { howItWorks } = this.state;
    howItWorks.section[index].content = content;
    this.setState({
      howItWorks: howItWorks
    });
  };

  onOurEditorStateChange = (content: any): void => {
    this.setState({
      ourStory: {
        ...this.state.ourStory,
        content
      }
    });
  };

  /**
   * Upload Main Section Image
   */
  uploadImage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLImageElement | any>
  ) => {
    if (AcceptedImageFormat.indexOf(e.target.files[0].type) === -1) {
      console.log("IN IF");

      this.setState({
        errors: {
          ...this.state.errors,
          mainSectionImageUrl:
            "Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed"
        }
      });
      return;
    }
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("file", file);
    reader.onloadend = () => {
      this.setState({
        mainSection: {
          ...this.state.mainSection,
          image: file,
          imageUrl: reader.result
        }
      });
    };
    reader.readAsDataURL(file);
  };

  /**
   * Upload Why Section Image
   */
  uploadWhyImage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLImageElement | any>,
    index: number
  ) => {
    const { why } = this.state;
    const { section } = why;
    console.log("e.target.files[0]", e.target.files[0]);

    if (AcceptedImageFormat.indexOf(e.target.files[0].type) === -1) {
      console.log("IN IF");

      this.setState({
        /*   errors: {
            ...this.state.errors,
            mainSectionImage:
              'Uploaded file is not a valid image. Only JPG, PNG and GIF files are allowed',
          }, */
      });
      return;
    }
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("file", file);
    reader.onloadend = () => {
      section[index].image = file;
      section[index].imageUrl = reader.result;
      this.setState({
        why: {
          ...this.state.why,
          section
        }
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { mainSection, howItWorks, ourStory, why, id } = this.state;
    console.log("mainSection.image", mainSection.image);

    const data = {
      mainSectionContent:
        mainSection && mainSection.content
          ? draftToHtml(convertToRaw(mainSection.content.getCurrentContent()))
          : "",
      mainSectionImage: mainSection.image,
      mainSectionImageUrl: mainSection.imageUrl,
      mainSectionButtonText: mainSection.buttonText,
      mainSectionTitle: mainSection.title,
      howItWorksButtonText: howItWorks.buttonText,
      howItWorksSection: howItWorks.section.map((element: any) => {
        return {
          ...element,
          content: draftToHtml(
            convertToRaw(element.content.getCurrentContent())
          )
        };
      }),
      ourStoryContent:
        ourStory && ourStory.content
          ? draftToHtml(convertToRaw(ourStory.content.getCurrentContent()))
          : "",
      ourStoryTitle: ourStory.title,
      ourStoryVideoLink: ourStory.videoLink,
      whySection: why.section.map(sect => {
        const sec = Object.assign({}, sect);
        //  delete sec.image
        delete sec.imageUrl;
        return sec;
      }),
      whySectionImage: why.section.map(sec => {
        console.log("sec", sec);
        return sec.image;
      }),
      id
    };
    console.log("++++++++++++++++++++++++++++", data.whySectionImage);
    let { isValid, errors } = HomePageValidator(data);
    console.log("errors", errors);

    if (isValid) {
      this.props.updateHomePage(data as any);
    } else {
      this.setState({
        errors
      });
      return;
    }
  };

  render() {
    const {
      mainSection,
      howItWorks,
      ourStory,
      why,
      errors,
      isEditable
    } = this.state;
    return (
      <div className="cr-page px-3 min-height650 my-profile-section">
        <Card className="home-card">
          <Card.Header>
            <h4>
              <i className="icon-note" />
              &nbsp;{!isEditable ? "Add" : "Edit"} Home Page
            </h4>
          </Card.Header>
          <Card.Body>
            <div>
              <div className="col-md-12 ">
                <Form onSubmit={this.handleSubmit} className="row">
                  <div className="col-md-12 ">
                    <Card.Body className="row section-div">
                      <h4 className="col-sm-12 heading-title">Main Banner:</h4>
                      <div className="col-sm-6">
                        <Form.Group>
                          <Form.Label className="floating-label ">
                            Title
                          </Form.Label>
                          <InputGroup>
                            <input
                              type={"text"}
                              name={"title"}
                              value={mainSection && mainSection.title}
                              className={"form-control floating-input"}
                              placeholder={" "}
                              onChange={this.handleChange}
                            />
                            {errors.mainSectionTitle ? (
                              <div className={"text-danger error-text"}>
                                {errors.mainSectionTitle}
                              </div>
                            ) : null}
                          </InputGroup>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="floating-label">
                            Button Text
                          </Form.Label>
                          <InputGroup>
                            <input
                              type={"text"}
                              name={"buttonText"}
                              value={
                                mainSection && mainSection.buttonText
                                  ? mainSection.buttonText
                                  : ""
                              }
                              className={"form-control floating-input"}
                              placeholder={" "}
                              onChange={this.handleChange}
                            />

                            {errors.mainSectionButtonText ? (
                              <div className={"text-danger error-text"}>
                                {errors.mainSectionButtonText}
                              </div>
                            ) : null}
                          </InputGroup>
                        </Form.Group>

                        <div className="fileinput-preview">
                          <img
                            src={
                              mainSection && mainSection.imageUrl
                                ? mainSection.imageUrl.startsWith("data")
                                  ? mainSection.imageUrl
                                  : ImageURL + mainSection.imageUrl
                                : defaultImage
                            }
                            alt={""}
                          />
                          <div className="file-upload">
                            <label
                              htmlFor="gallery-photo-add"
                              className="file-upload-label"
                            >
                              Choose Image
                            </label>
                            <input
                              className="file-upload-input"
                              type="file"
                              accept="image/*"
                              onChange={this.uploadImage}
                              id="gallery-photo-add"
                            />
                          </div>
                        </div>
                        {errors.mainSectionImageUrl ? (
                          <div className={"text-danger file-error-text"}>
                            {errors.mainSectionImageUrl}
                          </div>
                        ) : null}
                      </div>

                      <div className="col-sm-6">
                        <div style={{ marginTop: "-10px" }}>
                          <Form.Label className="simple-label mb-3">
                            Description
                          </Form.Label>
                          <Editor
                            editorState={
                              mainSection && mainSection.content
                                ? mainSection.content
                                : ""
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
                        </div>
                      </div>
                      {errors.mainSectionContent ? (
                        <div className={"text-danger error-text"}>
                          {errors.mainSectionContent}
                        </div>
                      ) : null}
                      {/* <div className='ml-auto'>
                        <Button
                          type={'submit'}
                          variant='link'
                          className=' btn-submit'
                        >
                          Update
                        </Button>
                      </div> */}
                    </Card.Body>
                  </div>
                  <div className="col-md-12 ">
                    <Card.Body className="row section-div">
                      <h4 className="col-md-12 heading-title">How It Works:</h4>
                      {howItWorks &&
                        howItWorks.section &&
                        howItWorks.section.map((section: any, index) => {
                          return (
                            <>
                              <div className="col-sm-6">
                                <Form.Group>
                                  <Form.Label>Heading</Form.Label>
                                  <InputGroup>
                                    <input
                                      type={"text"}
                                      name={"heading"}
                                      value={section.heading}
                                      className={"form-control floating-input"}
                                      placeholder={" "}
                                      onChange={(e: any) =>
                                        this.howItWorkHandleChange(
                                          e,
                                          index,
                                          "heading"
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>
                              </div>
                              <div className="col-sm-6">
                                <Form.Group>
                                  <Form.Label>Title</Form.Label>
                                  <InputGroup>
                                    <input
                                      type={"text"}
                                      name={"title"}
                                      value={section.title}
                                      className={"form-control floating-input"}
                                      placeholder={" "}
                                      onChange={(e: any) =>
                                        this.howItWorkHandleChange(
                                          e,
                                          index,
                                          "title"
                                        )
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>
                              </div>
                              <div className="col-md-12">
                                <Form.Label className="simple-label mb-3">
                                  Description
                                </Form.Label>
                                <Editor
                                  editorState={
                                    howItWorks &&
                                    howItWorks.section[index].content
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
                                  onEditorStateChange={content =>
                                    this.onHowEditorStateChange(content, index)
                                  }
                                />
                              </div>
                            </>
                          );
                        })}
                      {/* <div className='ml-auto'>
                        <Button
                          type={'submit'}
                          variant='link'
                          className=' btn-submit'
                        >
                          Update
                        </Button>
                      </div> */}
                    </Card.Body>
                  </div>

                  <div className="col-md-12 ">
                    <Card.Body className="row section-div">
                      <h4 className="col-md-12 heading-title">Our Story:</h4>

                      <div className="col-sm-6">
                        <Form.Group>
                          <Form.Label className="floating-label ">
                            Title
                          </Form.Label>
                          <InputGroup>
                            <input
                              type={"text"}
                              name={"title"}
                              value={ourStory && ourStory.title}
                              className={"form-control floating-input"}
                              placeholder={" "}
                              onChange={this.owrStoryHandleChange}
                            />

                            {errors.ourStoryTitle ? (
                              <div className={"text-danger error-text"}>
                                {errors.ourStoryTitle}
                              </div>
                            ) : null}
                          </InputGroup>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label className="floating-label ">
                            Video URL
                          </Form.Label>
                          <InputGroup>
                            <input
                              type={"text"}
                              name={"videoLink"}
                              value={ourStory && ourStory.videoLink}
                              className={"form-control floating-input"}
                              placeholder={" "}
                              onChange={this.owrStoryHandleChange}
                            />

                            {errors.ourStoryVideoLink ? (
                              <div className={"text-danger error-text"}>
                                {errors.ourStoryVideoLink}
                              </div>
                            ) : null}
                          </InputGroup>
                        </Form.Group>
                      </div>
                      <div className="col-sm-6">
                        <Form.Label className="simple-label mb-3">
                          Description
                        </Form.Label>
                        <Editor
                          editorState={ourStory && ourStory.content}
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
                          onEditorStateChange={this.onOurEditorStateChange}
                        />
                      </div>
                      {/* <div className='ml-auto'>
                        <Button
                          type={'submit'}
                          variant='link'
                          className=' btn-submit'
                        >
                          Update
                        </Button>
                      </div> */}
                    </Card.Body>
                  </div>

                  <div className="col-md-12 ">
                    <Card.Body className="row section-div">
                      <h4 className="col-md-12  heading-title">
                        Why Dr Polly?
                      </h4>
                      {why &&
                        why.section &&
                        why.section.map((section: any, index: number) => {
                          return (
                            <>
                              {/* <h5 className='col-md-12 mb-4 mt-n3'>Section {index + 1}:</h5> */}

                              <div className="col-sm-6">
                                <Form.Group>
                                  <Form.Label className="floating-label ">
                                    Title
                                  </Form.Label>
                                  <InputGroup>
                                    <input
                                      type={"text"}
                                      name={"title"}
                                      value={section.title}
                                      className={"form-control floating-input"}
                                      placeholder={" "}
                                      onChange={(e: any) =>
                                        this.whyHandleChange(e, index, "title")
                                      }
                                    />
                                  </InputGroup>
                                </Form.Group>

                                <div className="fileinput-preview">
                                  <img
                                    src={
                                      section.imageUrl
                                        ? section.imageUrl.startsWith("data")
                                          ? section.imageUrl
                                          : ImageURL + section.imageUrl
                                        : defaultImage
                                    }
                                    alt={""}
                                  />
                                  <div className="file-upload">
                                    <label
                                      htmlFor={`gallery-photo-add-why-${index}`}
                                      className="file-upload-label"
                                    >
                                      Choose Image
                                    </label>
                                    <input
                                      className="file-upload-input"
                                      type="file"
                                      accept="image/*"
                                      onChange={e =>
                                        this.uploadWhyImage(e, index)
                                      }
                                      id={`gallery-photo-add-why-${index}`}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-sm-6">
                                {section &&
                                  section.content.map(
                                    (content: any, ind: number) => {
                                      return (
                                        <>
                                          <Form.Group>
                                            <Form.Label className="floating-label ">
                                              Subheading {ind + 1}
                                            </Form.Label>
                                            <InputGroup>
                                              <input
                                                type={"text"}
                                                name={"text"}
                                                value={content.text}
                                                className={
                                                  "form-control floating-input"
                                                }
                                                placeholder={" "}
                                                onChange={(e: any) =>
                                                  this.whyHandleContentChange(
                                                    e,
                                                    index,
                                                    ind,
                                                    "text"
                                                  )
                                                }
                                              />
                                            </InputGroup>
                                          </Form.Group>
                                        </>
                                      );
                                    }
                                  )}
                              </div>
                            </>
                          );
                        })}
                      {/*  <div className='ml-auto'>
                        <Button
                          type={'submit'}
                          variant='link'
                          className=' btn-submit'
                        >
                          Update
                        </Button>
                      </div> */}
                    </Card.Body>
                  </div>

                  <div className="clearfix" />
                  <Col xs="12">
                    <div className="d-flex align-items-center">
                      <div className="ml-auto">
                        <Button
                          type={"submit"}
                          variant="link"
                          className=" btn-submit"
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStateToProps: any = (state: IRootState) => ({
  homePageReducer: state.homePageReducer
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    viewHomePage: () => {
      dispatch(viewHomePageRequest());
    },
    updateHomePage: (data: IHomePageData) => {
      dispatch(updateHomePageRequest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHomePage);
