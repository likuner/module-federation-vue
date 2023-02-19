// converts width and height to values with units
export function getValWithUnit(val) {
  if (!val) return '0'
  const valStr = val.toString()
  if (['px', '%'].some((k) => valStr.endsWith(k))) return valStr
  return `${valStr}px`
}

// throttle function that unit by milliseconds
export function throttle(fn, delay = 300, leading = true) {
  const context = this
  let timer = null
  let executed = false
  return (...args) => {
    if (!executed && leading) {
      fn.apply(context, args)
      executed = true
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}

// delay function unit by milliseconds
export function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay)
  })
}
