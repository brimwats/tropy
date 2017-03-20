'use strict'

const React = require('react')
const { PureComponent, PropTypes } = React
const { bool, number, object, shape, string } = PropTypes
const { Editor } = require('../editor')
const cx = require('classnames')
const { TABS } = require('../../constants')


class NotePad extends PureComponent {
  get isDisabled() {
    return !this.props.isItemOpen || this.props.isDisabled
  }

  render() {
    const { keymap, tabIndex } = this.props

    return (
      <section className={cx({ note: true, pad: true })}>
        <Editor
          keymap={keymap}
          isDisabled={this.isDisabled}
          tabIndex={tabIndex}/>
      </section>
    )
  }

  static propTypes = {
    isDisabled: bool,
    isItemOpen: bool,
    keymap: object.isRequired,
    note: shape({
      id: number.isRequired,
      doc: object,
      text: string.isRequired
    }),
    tabIndex: number.isRequired
  }

  static defaultProps = {
    tabIndex: TABS.NotePad
  }
}

module.exports = {
  NotePad
}
