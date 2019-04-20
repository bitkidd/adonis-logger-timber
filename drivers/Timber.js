'use strict'

const _ = require('lodash')
const Winston = require('winston')
const { Timber } = require("@timberio/node");
const { TimberTransport } = require("@timberio/winston");

/**
 * Winston console transport driver for @ref('Logger')
 * All the logs will be sent to Timber.io.
 *
 * @class WinstonTimber
 * @constructor
 */
class WinstonTimber {

  /**
   * Set config. This method is called by Logger
   * manager by set config based upon the
   * transport in use.
   *
   * @method setConfig
   *
   * @param  {Object}  config
   */
  setConfig(config) {
    this.config = Object.assign({}, {
      name: 'adonis-app',
      level: 'info'
    }, config)

    /**
     * Creating new instance timber logger
     */
    const timber = new Timber(this.config.key, this.config.source);

    /**
     * Creating new instance of winston with file transport
     */
    this.logger = Winston.createLogger({
      transports: [new TimberTransport(timber)]
    })

    /**
     * Updating winston levels with syslog standard levels.
     */
    this.logger.setLevels(this.levels)

  }

  /**
   * A list of available log levels.
   *
   * @attribute levels
   *
   * @return {Object}
   */
  get levels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    }
  }

  /**
   * Returns the current level for the driver
   *
   * @attribute level
   *
   * @return {String}
   */
  get level() {
    return this.logger.transports[this.config.name].level
  }

  /**
   * Update driver log level at runtime
   *
   * @param  {String} level
   *
   * @return {void}
   */
  set level(level) {
    this.logger.transports[this.config.name].level = level
  }

  /**
   * Log message for a given level
   *
   * @method log
   *
   * @param  {Number}    level
   * @param  {String}    msg
   * @param  {...Spread} meta
   *
   * @return {void}
   */
  log(level, msg, ...meta) {
    const levelName = _.findKey(this.levels, (num) => {
      return num === level
    })
    this.logger.log(levelName, msg, ...meta)
  }
}

module.exports = WinstonTimber
