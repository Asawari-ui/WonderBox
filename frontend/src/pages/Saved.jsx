import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { OpportunityCard, OpportunityModal } from '../components/OpportunityCard'

const TABS = ['All', 'Saved', 'Applied', 'Completed']

export default function Saved() {
  const { list, saved, toggleSave, setStatus, result } = useOutletContext()
  const [tab, setTab] = useState('All')
  const [selId, setSelId] = useState(null)
  const mine = list.filter((o) => saved[o.id])
  const count = (t) => (t === 'All' ? mine.length : mine.filter((o) => saved[o.id] === t).length)
  const shown = mine.filter((o) => tab === 'All' || saved[o.id] === tab)
  const selected = list.find((o) => o.id === selId)

  return (
    <main className="page">
      <h1>My Saved Opportunities</h1>
      <p className="sub">Keep track of opportunities you’re interested in.</p>
      <div className="chips filters">
        {TABS.map((t) => (
          <button key={t} className={'fchip' + (tab === t ? ' on' : '')} aria-pressed={tab === t} onClick={() => setTab(t)}>{t} ({count(t)})</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="card empty">
          <h2>{mine.length === 0 ? 'Nothing saved yet' : `No ${tab.toLowerCase()} opportunities`}</h2>
          <p>Tap the bookmark on any opportunity to keep it here.</p>
          <Link to="/opportunities" className="btn">Explore Opportunities</Link>
        </div>
      ) : (
        <div className="stack">
          {shown.map((o) => (
            <OpportunityCard key={o.id} o={o} status={saved[o.id]} onSave={toggleSave} onOpen={(x) => setSelId(x.id)}
              extra={
                <label className="clsel">Status
                  <select value={saved[o.id]} onChange={(e) => setStatus(o.id, e.target.value)}>
                    <option>Saved</option><option>Applied</option><option>Completed</option>
                  </select>
                </label>
              } />
          ))}
        </div>
      )}
      {selected && (
        <OpportunityModal o={selected} status={saved[selected.id]} result={result}
          onSave={toggleSave} onApply={(id) => setStatus(id, 'Applied')} onClose={() => setSelId(null)} />
      )}
    </main>
  )
}
