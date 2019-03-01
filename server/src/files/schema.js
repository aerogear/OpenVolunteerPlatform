const mkdirp = require('mkdirp')
const shortid = require('shortid')
const express = require('express')
const config = require('../config/config')
const fs = require("fs");
const pathNode = require("path");

const fileTypeDefs = `
 type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
  type Query {
    uploads: [File]
  }
  type Mutation {
    singleUpload(file: Upload!): File!
  }
`

const PREFIX = 'files'
const UPLOAD_DIR = `./${PREFIX}`
// Ensure upload directory exists.

try {
  mkdirp.sync(UPLOAD_DIR)
} catch (e) {
  console.error(e)
  console.error(`could not create directory for file uploads ${UPLOAD_DIR}`)
  console.error(`file uploads will not work`)
  console.error(`if running in OpenShift, you must create a persistent volume`)
  console.error(`and mount it with read-write permissions to ${UPLOAD_DIR}`)
}


const storeFS = ({ stream, filename }) => {
  const id = shortid.generate()
  const name = `${id}${pathNode.extname(filename)}`
  const path = `${UPLOAD_DIR}/${name}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve(name))
  )
}

const fileResolvers = {
  Query: {
    uploads: async (obj, args, context) => {
      return context.db.select().from(PREFIX).then((files) => {
        console.log("Fetching files")
        // Dynamically append app url to all files
        files.forEach((file) => {
          file.url = `${config.appUrl}${file.url}`
        })
        return files;
      })
    }
  },
  Mutation: {
    async singleUpload(parent, { file }, context) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const storedFile = await storeFS({ stream, filename })
      const url = `/${PREFIX}/${storedFile}`
      return await context.db(PREFIX).insert({
        filename: filename, mimetype, encoding, url
      }).returning('*').then((rows) => {
        return rows[0]
      })
    }
  }
}

const applyFileMiddelware = (app) => {
  app.use('/files', express.static('files'))
}


module.exports = {
  applyFileMiddelware,
  fileTypeDefs,
  fileResolvers,
  PREFIX
}