const formateDate = (records) => {

  for(let record in records){
    const date = new Date(records[record].date)
    const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    records[record].date = formatedDate
  }
  
  return records

}

module.exports = formateDate