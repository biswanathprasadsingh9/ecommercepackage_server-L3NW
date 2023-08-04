// https://gist.github.com/hackinf0/4f97a6a7e820cb612e0ff5c39139d08f




const mongoose = require('mongoose')

const MONGO_URI =
    'mongodb+srv://smartemailextractor:XpKJ4Vd6hFa020vf@emailextractor.kxsx0q9.mongodb.net/emailextractor?retryWrites=true&w=majority'
// const MOBILE_URI =
//     'mongodb+srv://owlhacking:mypassword@cluster0.lpqs0es.mongodb.net/Cluster0?retryWrites=true&w=majority'

const connectDBs = () => {
    try {
        const emailextractorDb = mongoose.createConnection(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        // const userDB = mongoose.createConnection(MOBILE_URI, {
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true
        // })
        // return { qrCodeDb, userDB }

        return { emailextractorDb }

    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}

module.exports = { connectDBs }








// full backup
// const mongoose = require('mongoose')
//
// const MONGO_URI =
//     'mongodb+srv://owlhacking:mypassword@cluster0.ls5sgez.mongodb.net/qrCodeData?retryWrites=true&w=majority'
// const MOBILE_URI =
//     'mongodb+srv://owlhacking:mypassword@cluster0.lpqs0es.mongodb.net/Cluster0?retryWrites=true&w=majority'
//
// const connectDBs = () => {
//     try {
//         const qrCodeDb = mongoose.createConnection(MONGO_URI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
//         const userDB = mongoose.createConnection(MOBILE_URI, {
//             useUnifiedTopology: true,
//             useNewUrlParser: true
//         })
//         return { qrCodeDb, userDB }
//     } catch (error) {
//         console.error(`Error:${error.message}`)
//         process.exit(1)
//     }
// }
//
// module.exports = { connectDBs }
