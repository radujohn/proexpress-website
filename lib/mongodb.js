import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL
if (!uri) throw new Error('MONGO_URL not set')

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
