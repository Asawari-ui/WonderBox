import { useEffect } from 'react'
import { CATS, whyFor } from '../data/content'

function Bookmark({ on }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 3h12v18l-6-4-6 4z" />
    </svg>
  )
}

export function OpportunityCard({ o, status, onSave, onOpen, extra }) {
  const c = CATS[o.cats[0]]
  return (
    <article className="card opp">
      <div className="thumb" style={{ background: c.color + '33' }} aria-hidden="true">{c.icon}</div>
      <div className="oi">
        <h3><button className="lnk" onClick={() => onOpen(o)}>{o.title}</button></h3>
        <div className="chips">
          <span className="tag">{o.type}</span>
          {o.cats.map((k) => <span key={k} className="tag alt">{CATS[k].short}</span>)}
          <span className="tag demo">Sample</span>
        </div>
        <p>{o.desc}</p>
        <div className="meta">
          <span>{o.free ? 'Free' : 'Paid'}</span>
          <span>{o.online ? 'Online' : 'In person'}</span>
          <span>Classes {o.min}–{o.max}</span>
          <span>Deadline: {o.deadline}</span>
        </div>
        {extra}
      </div>
      <div className="right">
        {o.match != null && <div className="ring" style={{ '--v': o.match }} title="Match with your interests"><span>{o.match}%</span></div>}
        <button className={'bm' + (status ? ' on' : '')} aria-pressed={!!status}
          aria-label={status ? 'Remove from saved' : 'Save opportunity'} onClick={() => onSave(o.id)}>
          <Bookmark on={!!status} />
        </button>
      </div>
    </article>
  )
}

export function OpportunityModal({ o, status, result, onSave, onApply, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={o.title} onClick={(e) => e.stopPropagation()}>
        <button className="btn ghost back" onClick={onClose}>← Back</button>
        <h2>{o.title}</h2>
        <div className="chips">
          <span className="tag">{o.type}</span>
          {o.cats.map((k) => <span key={k} className="tag alt">{CATS[k].short}</span>)}
          <span className="tag demo">Sample / demo data</span>
        </div>
        <p>{o.desc}</p>
        <div className="info">
          <div><small>Who can apply</small><b>{o.eligibility}</b></div>
          <div><small>Mode</small><b>{o.online ? 'Online' : 'In person'}</b></div>
          <div><small>Cost</small><b>{o.free ? 'Free' : 'Paid'}</b></div>
          <div><small>Duration</small><b>{o.duration}</b></div>
          <div><small>Deadline</small><b>{o.deadline}</b></div>
        </div>
        <div className="why"><b>Why this matches you{o.match != null ? ` (${o.match}%)` : ''}</b><p>{whyFor(o, result)}</p></div>
        <div className="row">
          <button className="btn" onClick={() => onApply(o.id)} disabled={status === 'Applied' || status === 'Completed'}>
            {status === 'Applied' || status === 'Completed' ? 'Marked as applied' : 'Apply now'}
          </button>
          <button className="btn ghost" onClick={() => onSave(o.id)}>{status ? 'Remove from saved' : 'Save'}</button>
        </div>
        <small className="note">Demo only: “Apply now” marks it as Applied in your tracker. Nothing is sent anywhere.</small>
      </div>
    </div>
  )
}
