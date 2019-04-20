'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Timber = require('../drivers/Timber')

class TimberProvider extends ServiceProvider {
  register () {

    this.app.extend('Adonis/Src/Logger', 'timber', () => {
      return new Timber()
    })

  }

}

module.exports = TimberProvider
