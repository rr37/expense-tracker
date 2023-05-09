const turnUrlToFontAwesomeClass = async(records) => {
  await records.forEach(record => {
    const url = record.iconLink
    if(url){
      const iconShape = url.split('/').slice(4)[0].split('?')[0]
      const iconStyle = url.split('/').slice(4)[0].split('?')[1].split('=')[1]
      const fontAwesomeClass = `fa-${iconShape} fa-${iconStyle}`
      record.fontAwesomeClass = fontAwesomeClass
    } else {
      console.log('error occur')
    }
  });

  return records
}

module.exports = turnUrlToFontAwesomeClass