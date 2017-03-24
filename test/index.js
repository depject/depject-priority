const test = require('tape')

const eachModule = require('depject/each')
const depjectPriority = require('../')

test('depject-priority', function (t) {
  t.ok(depjectPriority, 'module is require-able')
  t.end()
})

test('default priority is same order as before', function (t) {
  const create = () => {}
  const modules = [
    { gives: 'a', create },
    { gives: 'b', create },
    { gives: 'c', create }
  ]

  const expectedPrioritized = {
    500: [
      { gives: 'a', create, path: ['0'] },
      { gives: 'b', create, path: ['1'] },
      { gives: 'c', create, path: ['2'] }
    ]
  }
  const actualPrioritized = depjectPriority(modules)
  t.deepEqual(actualPrioritized, expectedPrioritized)

  const expectedOrder = ['a', 'b', 'c']
  var i = 0
  eachModule(actualPrioritized, module => {
    t.equal(module.gives, expectedOrder[i++])
  })

  t.end()
})

test('new priority', function (t) {
  const create = () => {}
  const modules = [
    { gives: 'a', create },
    { priority: 500, gives: 'b', create },
    { priority: 0, gives: 'c', create },
    { priority: '0', gives: 'd', create },
    { priority: 1000, gives: 'e', create }
  ]

  const expectedPrioritized = {
    0: [
      { priority: 0, gives: 'c', create, path: ['2'] },
      { priority: '0', gives: 'd', create, path: ['3'] }
    ],
    500: [
      { gives: 'a', create, path: ['0'] },
      { priority: 500, gives: 'b', create, path: ['1'] }
    ],
    1000: [
      { priority: 1000, gives: 'e', create, path: ['4'] }
    ]
  }
  const actualPrioritized = depjectPriority(modules)
  t.deepEqual(actualPrioritized, expectedPrioritized)

  const expectedOrder = ['c', 'd', 'a', 'b', 'e']
  var i = 0
  eachModule(actualPrioritized, module => {
    t.equal(module.gives, expectedOrder[i++])
  })

  t.end()
})

