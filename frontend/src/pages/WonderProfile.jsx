import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { CATS, STRENGTHS, CAREERS, ranked } from '../data/content'

export default function WonderProfile() {
  const { result, retake } = useOutletContext()
  const navigate = useNavigate()

  if (!result) {
    return (
      <main className="page center">
        <div className="card done">
          <span className="fi big">🧭</span>
          <h1>Your Wonder Profile is waiting</h1>
          <p>Take the short interest quiz and your profile will appear here.</p>
          <Link to="/discover" className="btn big">Take the quiz</Link>
        </div>
      </main>
    )
  }
  const top = ranked(result)
  const top3 = top.slice(0, 3).map(([k]) => k)
  const strengths = top3.flatMap((k) => STRENGTHS[k])
  const careers = top3.flatMap((k) => CAREERS[k]).slice(0, 6)

  return (
    <main className="page">
      <div className="rowsp">
        <div><h1>Your Wonder Profile ✨</h1><p className="sub">Here’s what we discovered based on your answers.</p></div>
        <button className="btn ghost" onClick={() => { retake(); navigate('/discover') }}>Retake Quiz</button>
      </div>
      <div className="card">
        <h2>Top interest areas</h2>
        {top.map(([k, v], i) => (
          <div className="brow" key={k}>
            <span>{CATS[k].icon} {CATS[k].name}</span>
            <div className="bar"><i style={{ width: v + '%', background: i === 0 ? '#482A91' : CATS[k].color }} /></div>
            <b>{v}%</b>
          </div>
        ))}
      </div>
      <h2>Your strengths</h2>
      <div className="chips">{strengths.map((s) => <span key={s} className="tag big">{s}</span>)}</div>
      <h2>Career areas to explore</h2>
      <div className="grid3">
        {careers.map((c) => <div key={c} className="card quick">{c}</div>)}
      </div>
      <p className="note">These are exploratory suggestions based on a short quiz, not a measure of your ability or a final career decision.</p>
      <Link to="/opportunities" className="btn big">See matching opportunities</Link>
    </main>
  )
}
