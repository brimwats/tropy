'use strict'

const {
  createSelector: memo
} = require('reselect')

const list = ({ lists }, { list }) => lists[list]

const getChildren = () =>
  memo(
    ({ lists }) => lists,
    (_, { parent }) => parent,

    (lists, parent) =>
      lists[parent] ?
        lists[parent].children.map(id => lists[id]) : []
  )


module.exports = {
  list,
  getChildren
}
