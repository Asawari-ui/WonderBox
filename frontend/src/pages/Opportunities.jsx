import { useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { OpportunityCard, OpportunityModal } from '../components/OpportunityCard'
import { CATS } from '../data/content'

const FILTERS = ['All', 'Scholarships', 'Competitions', 'Programs', 'Free Only', 'Online']
const TYPE = { Scholarships: 'Scholarship', Competitions: 'Competition', Programs: 'Program' }

export default function Opportunities() {
  const { list, saved, toggleSave, setStatus, result, setOpened } = useOutletContext()
  const [params, setParams] = useSearchParams()
  const [filter, setFilter] = useState('All')
  const [cls, setCls] = useState('any')
  const [selId, setSelId] = useState(null)
  const q = params.get('q') || ''

  const shown = list
    .filter((o) => {
      const text = (o.title + o.desc + o.type + o.cats.map((c) => CATS[c].name).join(' ')).toLowerCase()
      if (q && !text.includes(q.toLowerCase())) return false
      if (TYPE[filter] && o.type !== TYPE[filter]) return false
      if (filter === 'Free Only' && !o.free) return false
      if (filter === 'Online' && !o.online) return false
      if (cls !== 'any' && !(o.min <= +cls && +cls <= o.max)) return false
      return true
    })
    .sort((a, b) => (b.match || 0) - (a.match || 0))

  const selected = list.find((o) => o.id === selId)
  const open = (o) => { setSelId(o.id); setOpened(true) }
  const clear = () => { setFilter('All'); setCls('any'); setParams({}) }

  return (
    <main className="page">
      <h1>Explore Opportunities</h1>
      <p className="sub">Find options based on your interests and class. <span className="tag demo">Sample / demo data</span></p>
      <input className="bigsearch" aria-label="Search opportunities" placeholder="Search scholarships, competitions, programs…"
        value={q} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {})} />
      <div className="chips filters" role="group" aria-label="Filters">
        {FILTERS.map((f) => (
          <button key={f} aria-pressed={filter === f} className={'fchip' + (filter === f ? ' on' : '')} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <label className="clsel">Class
          <select value={cls} onChange={(e) => setCls(e.target.value)}>
            <option value="any">Any</option>
            {[6, 7, 8, 9, 10, 11, 12].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </div>
      {shown.length === 0 ? (
        <div className="card empty"><h2>No opportunities found</h2><p>Try a different search or remove a filter.</p>
          <button className="btn" onClick={clear}>Clear filters</button></div>
      ) : (
        <div className="stack">
          {shown.map((o) => <OpportunityCard key={o.id} o={o} status={saved[o.id]} onSave={toggleSave} onOpen={open} />)}
        </div>
      )}
      {selected && (
        <OpportunityModal o={selected} status={saved[selected.id]} result={result}
          onSave={toggleSave} onApply={(id) => setStatus(id, 'Applied')} onClose={() => setSelId(null)} />
      )}
    </main>
  )
}
