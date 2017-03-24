const { keys, assign } = Object
const eachModule = require('depject/each')

const defaultPriority = 500

module.exports = depjectPriority

function depjectPriority (...modules) {
  var modulesByPriority = {}

  modules.forEach(m => {
    eachModule(m, (module, path) => {
      set({ modulesByPriority, module, path })
    })
  })

  // create copy of modules by priority
  // where keys are created in order of priority.
  var prioritized = {}
  const priorityMinToMax = keys(modulesByPriority).sort()
  priorityMinToMax.forEach(priority => {
    prioritized[priority] = modulesByPriority[priority]
  })

  return prioritized
}

function set ({ modulesByPriority, module, path }) {
  const { priority = defaultPriority } = module
  module = assign({ path }, module)
  if (modulesByPriority[priority] === undefined) modulesByPriority[priority] = []
  modulesByPriority[priority].push(module)
}
