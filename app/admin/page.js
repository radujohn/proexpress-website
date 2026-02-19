'use client'
import { useState, useEffect, useCallback } from 'react'
import { Truck, LogOut, Search, Trash2, Phone, Mail, MapPin, Package, RefreshCw, Users, FileText, ChevronDown, Eye, EyeOff, Shield } from 'lucide-react'

const STORAGE_KEY = 'px_admin_token'

export default function AdminPage() {
  const [token, setToken] = useState(null)
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [activeTab, setActiveTab] = useState('leads')
  const [leads, setLeads] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setToken(saved)
  }, [])

  const fetchData = useCallback(async (tok) => {
    if (!tok) return
    setLoading(true)
    try {
      const [leadsRes, contactsRes] = await Promise.all([
        fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${tok}` } }),
        fetch('/api/admin/contacts', { headers: { Authorization: `Bearer ${tok}` } }),
      ])
      if (leadsRes.status === 401) { handleLogout(); return }
      const [leadsData, contactsData] = await Promise.all([leadsRes.json(), contactsRes.json()])
      setLeads(leadsData.data || [])
      setContacts(contactsData.data || [])
    } catch (err) {
      console.error('Fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (token) fetchData(token)
  }, [token, fetchData])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem(STORAGE_KEY, data.token)
        setToken(data.token)
      } else {
        setLoginError('Incorrect password. Please try again.')
      }
    } catch {
      setLoginError('Connection error. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setLeads([])
    setContacts([])
  }

  const updateStatus = async (type, id, status) => {
    const endpoint = type === 'lead' ? `/api/admin/leads/${id}` : `/api/admin/contacts/${id}`
    await fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    if (type === 'lead') {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    } else {
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
    }
  }

  const deleteRecord = async (type, id) => {
    if (!confirm('Delete this record? This cannot be undone.')) return
    const endpoint = type === 'lead' ? `/api/admin/leads/${id}` : `/api/admin/contacts/${id}`
    await fetch(endpoint, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    if (type === 'lead') setLeads(prev => prev.filter(l => l.id !== id))
    else setContacts(prev => prev.filter(c => c.id !== id))
  }

  const filteredLeads = leads.filter(l => {
    const matchSearch = !searchTerm ||
      (l.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.company_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || l.status === filterStatus
    return matchSearch && matchStatus
  })

  const filteredContacts = contacts.filter(c => {
    const matchSearch = !searchTerm ||
      (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === 'all' || c.status === filterStatus
    return matchSearch && matchStatus
  })

  const formatDate = (d) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }
    catch { return d }
  }

  const StatusBadge = ({ status, type, id }) => (
    <select
      value={status || 'new'}
      onChange={e => updateStatus(type, id, e.target.value)}
      className={`text-xs font-bold px-2.5 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
        status === 'contacted' ? 'bg-green-100 text-green-700 focus:ring-green-400' : 'bg-yellow-100 text-yellow-700 focus:ring-yellow-400'
      }`}
    >
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="closed">Closed</option>
    </select>
  )

  // LOGIN SCREEN
  if (!token) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-electric/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-electric" />
            </div>
            <h1 className="font-heading font-900 text-3xl text-white mb-1">Admin Panel</h1>
            <p className="text-white/50 text-sm">ProExpress Lead Management</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 rounded-2xl p-7">
            {loginError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-300 text-sm rounded-xl">{loginError}</div>
            )}
            <label className="block text-white/70 text-sm font-semibold mb-2">Admin Password</label>
            <div className="relative mb-5">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-electric hover:bg-electric-dark text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-white/30 text-xs mt-4">Default password: proexpress2025</p>
        </div>
      </div>
    )
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-navy shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-electric rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-800 text-white">ProExpress <span className="text-electric text-sm font-600">Admin</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => fetchData(token)} className="p-2 text-white/60 hover:text-white transition-colors" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 text-white/60 hover:text-white text-sm transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: 'Total Leads', value: leads.length, color: 'bg-electric/10 text-electric' },
            { icon: FileText, label: 'New Leads', value: leads.filter(l => l.status === 'new').length, color: 'bg-yellow-50 text-yellow-600' },
            { icon: Users, label: 'Contacts', value: contacts.length, color: 'bg-purple-50 text-purple-600' },
            { icon: FileText, label: 'New Contacts', value: contacts.filter(c => c.status === 'new').length, color: 'bg-orange-50 text-orange-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-800 text-2xl text-navy">{s.value}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('leads')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'leads' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="w-4 h-4" /> Quote Leads
                <span className="ml-1 px-1.5 py-0.5 bg-electric text-white text-xs rounded-full">{leads.filter(l=>l.status==='new').length}</span>
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === 'contacts' ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="w-4 h-4" /> Contact Forms
                <span className="ml-1 px-1.5 py-0.5 bg-electric text-white text-xs rounded-full">{contacts.filter(c=>c.status==='new').length}</span>
              </button>
            </div>

            {/* Search + Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 focus:border-electric w-44"
                />
              </div>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electric/30 text-gray-600 bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />Loading data...
            </div>
          ) : activeTab === 'leads' ? (
            /* LEADS TABLE */
            filteredLeads.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No quote leads found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {['Contact', 'Company', 'Route', 'Service', 'Freight', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-navy">{lead.full_name || '—'}</div>
                          <a href={`mailto:${lead.email}`} className="text-electric text-xs hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" />{lead.email}
                          </a>
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />{lead.phone}
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-4 text-gray-600 text-xs">{lead.company_name || '—'}</td>
                        <td className="px-4 py-4">
                          <div className="text-xs">
                            <div className="flex items-center gap-1 text-gray-500">
                              <MapPin className="w-3 h-3 text-electric" />
                              <span className="font-medium text-gray-700">{lead.pickup_location || '—'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-500 mt-1">
                              <MapPin className="w-3 h-3 text-green-500" />
                              <span className="font-medium text-gray-700">{lead.delivery_location || '—'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-electric/10 text-electric text-xs font-semibold rounded-full whitespace-nowrap">
                            {lead.service_type === 'sprinter' ? 'Sprinter Van' : lead.service_type === 'straight_truck' ? 'Straight Truck' : lead.service_type || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-xs text-gray-600 max-w-[120px] truncate">{lead.freight_description || '—'}</div>
                          {lead.weight && <div className="text-xs text-gray-400">{lead.weight}</div>}
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={lead.status} type="lead" id={lead.id} />
                        </td>
                        <td className="px-4 py-4">
                          <button onClick={() => deleteRecord('lead', lead.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            /* CONTACTS TABLE */
            filteredContacts.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No contact submissions found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {['Contact', 'Phone', 'Message', 'Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredContacts.map(contact => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-navy">{contact.name || '—'}</div>
                          <a href={`mailto:${contact.email}`} className="text-electric text-xs hover:underline flex items-center gap-1">
                            <Mail className="w-3 h-3" />{contact.email}
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          {contact.phone ? (
                            <a href={`tel:${contact.phone}`} className="text-gray-600 text-xs flex items-center gap-1 hover:text-electric">
                              <Phone className="w-3 h-3" />{contact.phone}
                            </a>
                          ) : '—'}
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-xs text-gray-600 max-w-[220px] line-clamp-3">{contact.message || '—'}</p>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-400 whitespace-nowrap">{formatDate(contact.created_at)}</td>
                        <td className="px-4 py-4">
                          <StatusBadge status={contact.status} type="contact" id={contact.id} />
                        </td>
                        <td className="px-4 py-4">
                          <button onClick={() => deleteRecord('contact', contact.id)} className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
