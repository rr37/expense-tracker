const Record = require('../Record.js')
const Category = require('../Category.js')
const User = require('../User.js')
const recordList = require('../seedsData/record.json').results
const userList = require('../seedsData/user.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', async () => {
  console.log('running recordSeeder script...')
  const categoryData = await Category.find({})
  console.log('category data found.')
  // console.log(categoryData)
  try {
    for (const seed_user of userList) {
      // 建立用戶前，以 email 先查找該用戶是否已存在
      const existingUser = await User.findOne({ email: seed_user.email });
      if (existingUser) {
        console.log(`User with email ${seed_user.email} already exists`);
        continue;
      }
      const passwordHash = await bcrypt.hash(seed_user.password, 10);
      const user = await User.create({
        name: seed_user.name,
        email: seed_user.email,
        password: passwordHash,
      });
      const userId = user._id;
      const filterRecord = recordList.filter(record => seed_user.owned_record_id.includes(record.id))
      const recordPromises = filterRecord
        .map(async (record) => {
          console.log(record)
          const category = await categoryData.find(data => {
            return record.category === data.name
          })
          record.categoryId = category._id
          await Record.create({ ...record, userId })
        })
      await Promise.all(recordPromises);

    }
    console.log('recordSeeder done!');
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.exit();
  } catch (err) {
    console.error(err);
  }
})

  // recordList.forEach((record) => {
  //   const category = categoryData.find(data => {
  //     return record.category === data.name
  //   })
  //   record.categoryId = category._id
  //   // console.log(record)
  // })
  // Record.create(recordList)
  //   .then(() => {
  //     console.log('recordSeeder done!')
  //     db.close()
  //   })
  //   .catch(err => console.log(err))