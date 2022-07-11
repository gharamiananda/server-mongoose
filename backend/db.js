const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}`).
        then(() => {
            console.log('db conneted')
        })
}

module.exports = main;