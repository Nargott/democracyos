import React, {Component} from "react";
import t from "t-component";
import "whatwg-fetch";
import urlBuilder from "lib/url-builder";

export default class AdminComments extends Component {
  constructor (props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {

  }
  render () {
    const { forum } = this.props
    return (
      <div className='comments-admin'>
        <div className='well well-sm'>
          <a href={urlBuilder.for('admin.comments.csv', { forum: forum.name })}
            className='btn btn-primary pull-right'>
            { t('admin-comments.dowload-as-csv') }
          </a>
        </div>
        <div className='well well-sm'>
          <a onClick={this.handleClick}
            className='btn btn-primary pull-right'>
              SYNC
          </a>
        </div>
      </div>
    )
  }
}
