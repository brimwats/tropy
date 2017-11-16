'use strict'

const React = require('react')
const { PureComponent } = React
const { injectIntl, intlShape } = require('react-intl')
const { Input } = require('../input')
const { blank } = require('../../common/util')
const { equals } = require('../../collate')
const { arrayOf, bool, func, number, shape, string } = require('prop-types')


class TagAdder extends PureComponent {
  get placeholder() {
    const { count, intl } = this.props
    return intl.formatMessage({ id: 'panel.tags.add' }, { count })
  }

  focus() {
    this.input.focus()
  }

  handleBlur = (event) => {
    this.props.onBlur(event)
    return true // cancel on blur
  }

  handleChange = (name) => {
    if (blank(name)) return this.props.onCancel()
    const tag = this.props.tags.find(t => equals(name, t.name))

    if (tag) {
      this.props.onAdd(tag)
    } else {
      this.props.onCreate({ name })
    }

    this.input.reset()
  }

  setInput = (input) => {
    this.input = input
  }

  render() {
    return (
      <div className="add-tag-container">
        <Input
          ref={this.setInput}
          className="form-control"
          completions={this.props.tags}
          isDisabled={this.props.isDisabled}
          placeholder={this.placeholder}
          tabIndex={-1}
          value=""
          onBlur={this.handleBlur}
          onFocus={this.props.onFocus}
          onCancel={this.props.onCancel}
          onCommit={this.handleChange}/>
      </div>
    )
  }

  static propTypes = {
    count: number.isRequired,
    intl: intlShape.isRequired,
    isDisabled: bool,
    tags: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })),
    onAdd: func.isRequired,
    onBlur: func.isRequired,
    onCancel: func.isRequired,
    onFocus: func.isRequired,
    onCreate: func.isRequired
  }
}

module.exports = {
  TagAdder: injectIntl(TagAdder, { withRef: true })
}
