const logger = require('./logger')

logger.info('text info', { meta: 1 })
logger.warn('text warn')
logger.error('text error')
// logger.debug('text debug');
logger.error(new Error('something went wrong'))
