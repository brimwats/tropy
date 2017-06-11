'use strict'

const React = require('react')
const { PureComponent } = React
const { PrefPane } = require('../prefs/pane')
const { AccordionGroup } = require('../accordion')
const { VocabAccordion } = require('./accordion')
const { array, bool, func, string } = require('prop-types')


class VocabPane extends PureComponent {
  render() {
    return (
      <PrefPane
        name={this.props.name}
        isActive={this.props.isActive}>
        <AccordionGroup className="form-horizontal">
          {this.props.vocab.map(vocab =>
            <VocabAccordion
              key={vocab.id}
              vocab={vocab}
              onDelete={this.props.onDelete}/>)}
        </AccordionGroup>
      </PrefPane>
    )
  }

  static propTypes = {
    isActive: bool,
    name: string.isRequired,
    vocab: array.isRequired,
    onDelete: func.isRequired,
    onImport: func.isRequired
  }

  static defaultProps = {
    name: 'vocab'
  }
}

module.exports = {
  VocabPane
}
