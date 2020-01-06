// //requiring necessary modules for admin page
// const AdminBro = require('admin-bro')
// const AdminBroExpress = require('admin-bro-expressjs')
// const AdminBroSequelize = require('admin-bro-sequelizejs')

// //requiring models for admin content
// const User = require('../models/user');
// const Event = require('../models/events');

// AdminBro.registerAdapter(AdminBroSequelize)

// //defining admin page
// const adminBro = new AdminBro({
//     //admin resources
//     resources: [
//         {
//         resource: User,
//         options: {
//             parent: {
//                 name: 'Admin Content',
//                 icon: 'fas fa-cogs'
//             }
//         },
//     },
//     {
//         resource: Event,
//         options: {
//             parent: {
//                 name: 'Admin Content',
//                 icon: 'fas fa-cogs'
//             }
//         },
//     },
// ],
  
//   //modifying branding and logo
//   rootPath: '/admin',
//   branding: {
//       logo: 'data:image/png;base64,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',
//       companyName: 'EventSity'
//   }
// })

// //setting up email and password fields
// const ADMIN = {
//     email: process.env.ADMIN_EMAIL || 'admin@admin.com',
//     password: process.env.ADMIN_PASSWORD || 'adpass',
// }

// //checking for authentication to admin page
// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//     cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
//     cookiePassword: process.env.ADMIN_COOKIE_PASS || 'somesupersecretsecret',
//     authenticate: async (email, password) => {
//         if (email === ADMIN.email && password === ADMIN.password) {
//             return ADMIN
//         }
//         return null
//     }
// })

// module.exports = router