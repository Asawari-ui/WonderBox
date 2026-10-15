import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Logo from '../components/Logo'

const CHIPS = [
  ['Scholarships', '🎓', { top: '6%', left: '4%' }],
  ['Competitions', '🏆', { top: '2%', right: '6%' }],
  ['Free Programs', '🎁', { top: '46%', right: '0%' }],
  ['Career Paths', '🧭', { bottom: '4%', right: '14%' }],
]
const FEATURES = [
  ['💡', 'Interest discovery', 'A short quiz helps you notice what you enjoy and where your strengths might lie.'],
  ['🎯', 'Personalized matching', 'See sample opportunities ranked by how well they fit your interests, with reasons.'],
  ['🌱', 'Achievement tracking', 'Save opportunities, mark them Applied or Completed, and watch your journey grow.'],
]

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="lnav">
        <Link to="/"><Logo /></Link>
        <nav aria-label="Website">
          <a href="#top" className="cur">Home</a>
          <a href="#about">About</a>
          <Link to="/opportunities">Opportunities</Link>
          <a href="#ngos">For NGOs</a>
        </nav>
        <div className="row">
          <Link to="/login?mode=login" className="btn ghost">
  Login
</Link>

<Link to="/login?mode=register" className="btn">
  Get Started
</Link>
        </div>
      </header>

      <section className="hero" id="top">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="kicker">Discover • Explore • Grow</p>
          <h1>Real Opportunities <span>for Brighter</span> <em>Futures</em></h1>
          <p className="lead">WonderBox helps students discover their interests and find scholarships, competitions, free programs and career paths that fit them.</p>
          <div className="row">
            <Link to="/dashboard" className="btn big">Get Started</Link>
            <Link to="/opportunities" className="btn ghost big">Explore Opportunities</Link>
          </div>
          <small className="note">Prototype: all opportunities shown are illustrative samples.</small>
        </motion.div>
        <div className="art" aria-hidden="true">
          <svg viewBox="0 0 320 300" className="box">
            <g stroke="#FFD45B" strokeWidth="5" strokeLinecap="round">
              <path d="M160 70V20M110 85 80 45M210 85l30-40M80 110 30 95M240 110l50-15" />
            </g>
            <path d="M160 120 270 170v90l-110 40L50 260v-90z" fill="#482A91" />
            <path d="M160 120 270 170l-110 50L50 170z" fill="#FFD45B" />
            <path d="M160 220v80L50 260v-90z" fill="#5D3BB0" />
            <path d="M160 238l8 16 18 3-13 12 3 18-16-9-16 9 3-18-13-12 18-3z" fill="#FFF7E8" transform="translate(0 4) scale(1)" />
            <circle cx="250" cy="60" r="8" fill="#86A56B" /><circle cx="60" cy="60" r="6" fill="#E8DDFB" />
          </svg>
          {CHIPS.map(([t, i, pos], k) => (
            <span key={t} className="chip3d" style={{ ...pos, animationDelay: k * 0.6 + 's' }}>{i} {t}</span>
          ))}
        </div>
      </section>

      <section className="features" aria-label="Features">
        {FEATURES.map(([i, t, d]) => (
          <div key={t} className="card feat"><span className="fi">{i}</span><h3>{t}</h3><p>{d}</p></div>
        ))}
      </section>

      <section className="split" id="about">
        <h2>About WonderBox</h2>
        <p>Many students never hear about the programs and scholarships that could change their path. WonderBox gathers them in one place and connects each student with options that suit their interests, class and goals.</p>
      </section>
      <section className="split alt" id="ngos">
        <h2>For NGOs</h2>
        <p>Partner organisations will be able to share verified opportunities with the students they support. This prototype focuses on the student experience.</p>
        <Link to="/dashboard" className="btn">Try the student view</Link>
      </section>
      <footer className="foot">WonderBox · Discover • Explore • Grow · College Community Engagement Project prototype</footer>
    </div>
  )
}
