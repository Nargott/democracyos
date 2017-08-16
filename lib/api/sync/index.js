/**
 * Module dependencies.
 */

var express = require('express')
var sync = require('./lib/sync')
var config = require('lib/config')
var api = require('lib/db-api')
var jwt = require('lib/jwt')
var l10n = require('lib/l10n')
var log = require('debug')('democracyos:tag')

var setDefaultForum = require('lib/middlewares/forum-middlewares').setDefaultForum
var initPrivileges = require('lib/middlewares/user').initPrivileges
var canCreate = require('lib/middlewares/user').canCreate
var canManage = require('lib/middlewares/user').canManage

/**
 * Exports Application
 */

var app = module.exports = express()

/**
 * Define routes for Sync module
 */

app.get('/sync', function (req, res) {
  log('Request /sync')
  var meta = {
    ip: req.ip,
    ips: req.ips,
    host: req.get('host'),
    origin: req.get('origin'),
    referer: req.get('referer'),
    ua: req.get('user-agent')
  }

  var params = req.body
  params.locale = config.enforceLocale ? config.locale : l10n.requestLocale(req)
  sync.doSync(params, meta, function (err, data) {
    if (err) return res.status(200).json({ error: err.message })
    return res.status(200).json(data)
  })
})

/**
* Populate permissions after setup
*/

function addPrivileges (req, res, next) {
  return jwt.signin(api.user.expose.confidential(req.user), req, res)
}

app.post('/sync/validate', function (req, res, next) {
  sync.emailValidate(req.body, function (err, user) {
    if (err) return res.json(200, { error: err.message })
    req.user = user
    return next()
  })
}, initPrivileges, canCreate, setDefaultForum, canManage, addPrivileges)

app.post('/sync/resend-validation-email', function (req, res) {
  var meta = {
    ip: req.ip,
    ips: req.ips,
    host: req.get('host'),
    origin: req.get('origin'),
    referer: req.get('referer'),
    ua: req.get('user-agent')
  }

  sync.resendValidationEmail(req.body, meta, function (err) {
    if (err) return res.json(200, { error: err.message })
    return res.json(200)
  })
})
