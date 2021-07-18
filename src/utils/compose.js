
const compose = (...funcs) => (arg) => {
  return funcs.reduceRight((previousValue, currentValue) => currentValue(previousValue), arg);
}

export default compose;