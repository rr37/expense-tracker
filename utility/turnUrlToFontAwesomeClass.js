const turnUrlToFontAwesomeClass = (records) => {
  records.forEach(record => {
    const url = record.iconLink
    // console.log(url)
    const iconShape = url.split('/').slice(4)[0].split('?')[0]
    const iconStyle = url.split('/').slice(4)[0].split('?')[1].split('=')[1]
    const fontAwesomeClass = `fa-${iconShape} fa-${iconStyle}`
    record.fontAwesomeClass = fontAwesomeClass
  });

  return records
}

module.exports = turnUrlToFontAwesomeClass