// import { CONSOLE_LOG } from '../constants';
const CONSOLE_LOG = true

const keys = ['log', 'info', 'error', 'warn']
const logger: any = {}

for (const key of keys) {
  logger[key] = function (...args: any[]) {
    return CONSOLE_LOG ? (console as any)[key].apply(this, args) : null
  }
}

export default logger
