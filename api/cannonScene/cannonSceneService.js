const _ = require('lodash')
const CannonScene = require('./cannonScene')

CannonScene.methods(['get', 'post', 'put', 'delete'])
CannonScene.updateOptions({new: true, runValidators: true})

CannonScene.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if(bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors) {
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

CannonScene.route('count', function(req, res, next) {
  CannonScene.count(function(error, value) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = CannonScene
