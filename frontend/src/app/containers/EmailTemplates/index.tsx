import React, { Component } from 'react'
import { render } from 'react-dom'
 
import EmailEditor from 'react-email-editor'
 
class EmailTemplates extends Component<any,any> {
    designer:any;
    editor:any
    constructor(props:any){
        super(props);
        this.designer = '';
        this.editor = '';
    }
    exportHtml = () => {
        this.designer.exportHtml((html:any) => {
          console.log('exportHtml', html)
        })
    }
    //   exportHtml = () => {
    //     this.editor.exportHtml(data => {
    //       const { design, html } = data
    //       console.log('exportHtml', html,design)
    //     })
    //   }
    saveDesign = () => {
        this.designer.saveDesign((design:any) => {
          console.log('saveDesign', design)
          alert("Design JSON has been logged in your developer console.")
        })
    }
    render() {
        return (
        <div>
            <div className={'text-right mb-1'}>
                <button className={'btn btn-primary mr-3'} onClick={this.exportHtml}>Export HTML</button>
                <button className={'btn btn-primary mr-3'} onClick={this.saveDesign}>Save Design</button>
            </div>
            <EmailEditor
                ref={designer => this.designer = designer}
            />
            {/* <EmailEditor
                ref={editor => this.editor = editor}
            /> */}
        </div>)
    }
}

export default EmailTemplates