'use client'
import { useState, useEffect } from 'react'

// Module-level cache so re-renders and sibling components share results
const _cache = {}

/**
 * Fetch CMS content for a given section.
 * Falls back to `defaultData` instantly, then overlays DB value when it arrives.
 *
 * @param {string} section  - e.g. 'home_hero', 'site_settings'
 * @param {*}      defaultData - hardcoded fallback used until DB responds
 * @returns the current content value (defaultData or DB-overridden)
 */
export function useCmsContent(section, defaultData) {
  const [data, setData] = useState(() => _cache[section] ?? defaultData)

  useEffect(() => {
    if (_cache[section] !== undefined) {
      setData(_cache[section])
      return
    }
    fetch(`/api/cms/${section}`)
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json?.data != null) {
          _cache[section] = json.data
          setData(json.data)
        }
      })
      .catch(() => {/* silently use defaults */})
  }, [section])

  return data
}

/** Bust the module-level cache for a section after an admin save */
export function bustCmsCache(section) {
  delete _cache[section]
}
