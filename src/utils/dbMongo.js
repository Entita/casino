import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URL

if (!MONGODB_URI)
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )

let cached = { conn: null, promise: null }

export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export const findMongo = async (collection, filter = {}) => {
  return await collection
    .findOne(filter)
    .then((data) => data)
    .catch(() => null)
}

export const findAllMongo = async (collection, filter = {}, limit = 100) => {
  return await collection
    .find(filter)
    .limit(limit)
    .then((data) => data)
    .catch(() => null)
}

export const findXMongo = async (collection, limit, filter = {}) => {
  return await collection
    .find(filter)
    .sort({ date: -1, createdAt: -1 })
    .limit(limit)
    .then((data) => data)
    .catch(() => null)
}

export const updateMongo = async (collection, filter = {}, update = {}) => {
  return await collection
    .updateOne(filter, update)
    .then((data) => data.modifiedCount > 0)
    .catch(() => null)
}
