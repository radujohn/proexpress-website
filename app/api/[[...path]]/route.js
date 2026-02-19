import { NextResponse } from 'next/server'
import clientPromise, { getDbName } from '@/lib/mongodb'
import { v4 as uuidv4 } from 'uuid'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
if (!ADMIN_PASSWORD) {
  console.warn('[ProExpress] WARNING: ADMIN_PASSWORD environment variable is not set. Admin login will be disabled.')
}

function verifyAuth(request) {
  const auth = request.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  return token === ADMIN_PASSWORD
}

async function getDb() {
  const client = await clientPromise
  return client.db(getDbName())
}

export async function GET(request, { params }) {
  const pathArr = params.path || []
  const endpoint = pathArr.join('/')

  if (endpoint === 'health') {
    return NextResponse.json({ status: 'ok', service: 'ProExpress API', timestamp: new Date().toISOString() })
  }

  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = await getDb()
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const limit = parseInt(url.searchParams.get('limit') || '50')
  const skip = (page - 1) * limit

  if (endpoint === 'admin/leads') {
    const quotes = await db.collection('quotes')
      .find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const total = await db.collection('quotes').countDocuments()
    return NextResponse.json({ data: quotes, total, page, limit })
  }

  if (endpoint === 'admin/contacts') {
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const total = await db.collection('contacts').countDocuments()
    return NextResponse.json({ data: contacts, total, page, limit })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function POST(request, { params }) {
  const pathArr = params.path || []
  const endpoint = pathArr.join('/')

  if (endpoint === 'admin/login') {
    try {
      const { password } = await request.json()
      if (password === ADMIN_PASSWORD) {
        return NextResponse.json({ success: true, token: ADMIN_PASSWORD })
      }
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    } catch {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }
  }

  if (endpoint === 'quote') {
    try {
      const body = await request.json()
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        full_name: body.full_name || '',
        company_name: body.company_name || '',
        email: body.email || '',
        phone: body.phone || '',
        pickup_location: body.pickup_location || '',
        delivery_location: body.delivery_location || '',
        service_type: body.service_type || '',
        freight_description: body.freight_description || '',
        weight: body.weight || '',
        pickup_date: body.pickup_date || '',
        delivery_deadline: body.delivery_deadline || '',
        additional_notes: body.additional_notes || '',
        status: 'new',
        created_at: new Date().toISOString(),
      }
      await db.collection('quotes').insertOne(doc)
      return NextResponse.json({ success: true, id: doc.id })
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  if (endpoint === 'contact') {
    try {
      const body = await request.json()
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: body.name || '',
        email: body.email || '',
        phone: body.phone || '',
        message: body.message || '',
        status: 'new',
        created_at: new Date().toISOString(),
      }
      await db.collection('contacts').insertOne(doc)
      return NextResponse.json({ success: true, id: doc.id })
    } catch (err) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function PATCH(request, { params }) {
  const pathArr = params.path || []
  const endpoint = pathArr.join('/')

  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = await getDb()

  if (endpoint.startsWith('admin/leads/')) {
    const id = endpoint.replace('admin/leads/', '')
    const body = await request.json()
    await db.collection('quotes').updateOne({ id }, { $set: { status: body.status } })
    return NextResponse.json({ success: true })
  }

  if (endpoint.startsWith('admin/contacts/')) {
    const id = endpoint.replace('admin/contacts/', '')
    const body = await request.json()
    await db.collection('contacts').updateOne({ id }, { $set: { status: body.status } })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function DELETE(request, { params }) {
  const pathArr = params.path || []
  const endpoint = pathArr.join('/')

  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = await getDb()

  if (endpoint.startsWith('admin/leads/')) {
    const id = endpoint.replace('admin/leads/', '')
    await db.collection('quotes').deleteOne({ id })
    return NextResponse.json({ success: true })
  }

  if (endpoint.startsWith('admin/contacts/')) {
    const id = endpoint.replace('admin/contacts/', '')
    await db.collection('contacts').deleteOne({ id })
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
