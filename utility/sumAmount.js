
const sumAmount = (records) => {
  let total = 0
  for (let record in records) {
    total += records[record].amount
  }

  return total

}

module.exports = sumAmount