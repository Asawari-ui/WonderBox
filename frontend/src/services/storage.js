
import { useState, useEffect } from 'react'

function readStored(key, initial) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : initial
  } catch {
    return initial
  }
}

// Saves data separately for each storage key.
export function useStored(key, initial) {
  const [stored, setStored] = useState(() => ({
    key,
    value: readStored(key, initial),
  }))

  // When the account changes, load that account's data.
  if (stored.key !== key) {
    setStored({
      key,
      value: readStored(key, initial),
    })
  }

  const value = stored.value

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // The app can still work for this session.
    }
  }, [key, value])

  const setValue = (nextValue) => {
    setStored((current) => {
      // Ignore updates belonging to a previous account.
      if (current.key !== key) return current

      return {
        key,
        value:
          typeof nextValue === 'function'
            ? nextValue(current.value)
            : nextValue,
      }
    })
  }

  return [value, setValue]
}
