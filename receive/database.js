const AWS = require('aws-sdk')
const uuid = require('uuid')

const config = require('../config.json')
const encryption = require('../lib/encryption')

module.exports.put = function (data, callback) {
  let docClient = new AWS.DynamoDB.DocumentClient()
  let payload = {
    id: uuid.v4(),
    data: encryption.encrypt(JSON.stringify(data))
  }
  return docClient.put({TableName: config.TABLE_NAME, Item: payload}, (error) => callback(error))
}
