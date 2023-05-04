function getFeetAndInches(decimeters) {
  const inches = decimeters / 0.254
  const feet = Math.floor(inches / 12)
  const remainingInches = Math.floor(inches % 12)
  const feetFoot = feet === 1 ? 'foot' : 'feet'
  const inchInches = remainingInches === 1 ? 'inch' : 'inches'
  return `${feet} ${feetFoot} ${remainingInches} ${inchInches}` 
}

function getPounds(hectograms) {
  const grams = hectograms * 100 
  const pounds = Math.round(grams / 453.592)
  return `${pounds} ${pounds === 1 ? 'pound' : 'pounds'}`
}

module.exports = {
  getFeetAndInches,
  getPounds
}
