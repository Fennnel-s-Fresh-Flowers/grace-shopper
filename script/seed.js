'use strict'

const db = require('../server/db')
const {User, Flower} = require('../server/db/models')

const flowers = [
  {
    name: "Fennel's Fresh Bouquet",
    description:
      'Our signature bouquet: fresh fennel, white and yellow blooming brassicas and green herbs',
    price: 9900,
    stock: 47,
    imgUrl:
      'https://madteaparty.files.wordpress.com/2015/02/fennel-01.jpg?w=679&h=1024'
  },
  {
    name: 'Lavender Flowers',
    description:
      'Fragrant bouquet of Bulgarian lavender and white dried flowers',
    price: 8950,
    stock: 13,
    imgUrl:
      'https://i.etsystatic.com/5513746/r/il/1d5058/1280646030/il_794xN.1280646030_e53f.jpg'
  },
  {
    name: 'Sunflower Bouquet',
    description:
      'Vintage sunflower bouquet mixed with anemones, wildflowers and ranunculus',
    price: 6800,
    stock: 26,
    imgUrl:
      'https://www.everafterguide.net/s/upload/images/2016/05/9b813a0d2082a54482838e87c2970593.jpg'
  },
  {
    name: 'Green Onion Bouquet',
    description:
      'A classic spring bouquet of green onions intertwined with white tulips',
    price: 7900,
    stock: 15,
    imgUrl:
      'https://i.pinimg.com/originals/ec/b2/5a/ecb25a34c66750de91b281c408bec182.jpg'
  },
  {
    name: 'Pink Peonies Bouquet',
    description: 'A simple, yet elegant bouquet of pink peonies',
    price: 8500,
    stock: 7,
    imgUrl:
      'https://s3-ap-southeast-1.amazonaws.com/theweddingscoop-archive/Peonies101/Peony2.jpg'
  },
  {
    name: 'Roses and Radishes',
    description:
      'Bestseller! A timeless bouquet of roses, radishes and rudbeckia',
    price: 5700,
    stock: 36,
    imgUrl:
      'https://www.russianflora.com/images/products_r/350/russia/Roses-and-Radishes.jpg'
  }
]

const users = [
  {
    firstName: 'Cody',
    lastName: 'Green',
    email: 'cody@gmail.com',
    address: '304 Duboce Ave, San Francisco, CA',
    phone: '415-418-8800',
    admin: true,
    password: 'password1'
  },
  {
    firstName: 'Ayana',
    lastName: 'Pug',
    email: 'pug@gmail.com',
    address: '609 H Street, Washington, DC',
    phone: '202-418-6759',
    password: '12345'
  },
  {
    firstName: 'Yoshi',
    lastName: 'Klein',
    email: 'klein@gmail.com',
    address: '150 Charles Street, New York, NY',
    phone: '212-676-9892',
    password: 'yoshi1'
  }
]

async function seed() {
  await db.sync({force: true})
  await Flower.bulkCreate(flowers)
  await User.bulkCreate(users)

  console.log('db synced!')

  console.log(`seeded ${users.length} users and ${flowers.length} flowers`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
