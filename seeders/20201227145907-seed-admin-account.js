'use strict';
const fs = require ('fs')
const bcryptjs = require ('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = JSON.parse(fs.readFileSync('./database/admin.json', 'utf-8'))

    data.forEach( dataAdmin => {
      dataAdmin.createdAt = new Date()
      dataAdmin.updatedAt = new Date()
      const salt = bcryptjs.genSaltSync(10)
      const hash = bcryptjs.hashSync(dataAdmin.password, salt)
      dataAdmin.password = hash
    })

    await queryInterface.bulkInsert('Users', data)

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
