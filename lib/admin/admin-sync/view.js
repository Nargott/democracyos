/**
 * Module dependencies.
 */

import List from 'democracyos-list.js'
import template from './template.jade'
import View from '../../view/view.js'
import urlBuilder from 'lib/url-builder'

/**
 * Creates a list view of tags
 */

export default class SyncView extends View {
  constructor (options = {}) {
    options.urlBuilder = urlBuilder
    super(template, options)
    this.options = options
  }

  switchOn () {
    this.list = new List('tags-wrapper', { valueNames: ['tag-title'] })
  }
}
