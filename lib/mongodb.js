import { MongoClient } from 'mongodb'

// Accept MONGODB_URI (Vercel/Atlas standard) or MONGO_URL (legacy local)
const uri = process.env.MONGODB_URI || process.env.MONGO_URL
if (!uri) throw new Error('No MongoDB connection string found. Set MONGODB_URI (or MONGO_URL) in your environment.')

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export default clientPromise

export function getDbName() {
  const name = process.env.DB_NAME
  if (!name || name === 'your_database_name') return 'proexpress'
  return name
}
