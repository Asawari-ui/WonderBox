import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { OpportunityCard } from '../components/OpportunityCard'
import { CATS } from '../data/content'

const QUICK = [
  ['/opportunities', '💡', 'Explore Opportunities'], ['/discover', '📝', 'Take Interest Quiz'],
  ['/profile', '⭐', 'View Your Profile'], ['/saved', '🔖', 'Saved Opportunities'],
]

export default function Dashboard() {
  const { result, saved, opened, list, toggleSave, user } = useOutletContext()

const name =
  user?.displayName?.trim() ||
  user?.email?.split('@')[0] ||
  'Explorer'
  const navigate = useNavigate()
  const steps = [
    ['Take the interest quiz', !!result],
    ['Open an opportunity', opened],
    ['Save an opportunity', Object.keys(saved).length > 0],
    ['Apply to one', Object.values(saved).some((s) => s === 'Applied' || s === 'Completed')],
  ]
  const done = steps.filter((s) => s[1]).length
  const recs = [...list].sort((a, b) => (b.match || 0) - (a.match || 0)).slice(0, 3)

  return (
    <main className="page">
      <h1>Welcome, {name}! 👋</h1>
<p className="sub">
  Your WonderBox journey continues. Ready to discover something amazing today?
</p>

      <section className="card journey" aria-label="Discovery progress">
        <div>
          <h2>Your Journey</h2>
          <p>{done === steps.length ? 'You have completed every step. Keep exploring!' : `Next: ${steps.find((s) => !s[1])[0]}.`}</p>
          <div className="bar"><i style={{ width: (done / steps.length) * 100 + '%' }} /></div>
          <small>{done}/{steps.length} completed</small>
        </div>
        <ul className="steps">
          {steps.map(([t, ok]) => <li key={t} className={ok ? 'ok' : ''}>{ok ? '✓' : '○'} {t}</li>)}
        </ul>
      </section>

      <div className="grid4">
        {QUICK.map(([to, i, t]) => (
          <Link key={to} to={to} className="card quick"><span className="fi">{i}</span>{t}</Link>
        ))}
      </div>

      <h2>Your interest areas</h2>
      <div className="grid3">
        {Object.entries(CATS).map(([k, c]) => (
          <Link to={result ? '/profile' : '/discover'} key={k} className="card cat">
            <span className="fi" style={{ background: c.color + '33' }}>{c.icon}</span>
            <div><b>{c.name}</b><small>{result ? `${result.scores[k]}% match` : 'Take the quiz to find out'}</small></div>
          </Link>
        ))}
      </div>

      <div className="rowsp"><h2>Recommended for you</h2><Link to="/opportunities">See all →</Link></div>
      {!result && <p className="note">These are sample picks. Take the quiz to get personalized matches.</p>}
      <div className="stack">
        {recs.map((o) => (
          <OpportunityCard key={o.id} o={o} status={saved[o.id]} onSave={toggleSave}
            onOpen={() => navigate('/opportunities?q=' + encodeURIComponent(o.title))} />
        ))}
      </div>
    </main>
  )
}
