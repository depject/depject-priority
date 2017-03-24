# depject-priority

order depject modules using a priority value

```shell
npm install --save depject-priority
```

## example

```js
const test = require('tape')
const eachModule = require('depject/each')

const depjectPriority = require('depject-priority')

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
```

## usage

### `prioritize = require('depject-priority')`

### `prioritized = depjectPriority(...modules)`

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
