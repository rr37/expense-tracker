
const sumAmount = (records) => {
  let totalAmount = 0
  for (let record in records) {
    totalAmount += records[record].amount
  }

  return totalAmount

}

module.exports = sumAmount