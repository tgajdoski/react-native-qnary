const DEBUG = true; // Enable logging
const LOG_PREFIX = "[QNARY]";

const log = (...args: any[]) => {
  if (DEBUG) {
    // tslint:disable-next-line:no-console
    // console.log.apply(console, args);

    // 1. Convert args to a normal array
    const argsn = Array.prototype.slice.call(args);

    // 2. Prepend log prefix log string
    argsn.unshift(LOG_PREFIX + " ");

    // 3. Pass along arguments to console.log
    // tslint:disable-next-line:no-console
    console.log.apply(console, argsn);
  }
};

const info = (...args: any[]) => {
  // tslint:disable-next-line:no-console
  // console.log.apply(console, args);

  // 1. Convert args to a normal array
  const argsn = Array.prototype.slice.call(args);

  // 2. Prepend log prefix log string
  argsn.unshift(LOG_PREFIX + ".[INFO]" + " ");

  // 3. Pass along arguments to console.log
  // tslint:disable-next-line:no-console
  console.info.apply(console, argsn);
};

const error = (...args: any[]) => {
  // tslint:disable-next-line:no-console
  // console.log.apply(console, args);

  // 1. Convert args to a normal array
  const argsn = Array.prototype.slice.call(args);

  // 2. Prepend log prefix log string
  argsn.unshift(LOG_PREFIX + ".[ERROR]" + " ");

  // 3. Pass along arguments to console.log
  // tslint:disable-next-line:no-console
  console.log.apply(console, argsn);
};

const logger = { log, info, error };

export default logger;
