import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { motion } from 'motion/react'
import { QUESTIONS } from '../data/content'

export default function Discover() {
  const { answers, setAnswers, result, finishQuiz, retake } = useOutletContext()
  const [step, setStep] = useState(result ? QUESTIONS.length : 0)

  if (step >= QUESTIONS.length && result) {
    return (
      <main className="page center">
        <div className="card done">
          <span className="fi big">🎉</span>
          <h1>Quiz complete!</h1>
          <p>Your answers are saved. See what they say about your interests.</p>
          <div className="row">
            <Link to="/profile" className="btn big">View Wonder Profile</Link>
            <button className="btn ghost big" onClick={() => { retake(); setStep(0) }}>Retake quiz</button>
          </div>
        </div>
      </main>
    )
  }

  const q = QUESTIONS[step]
  const last = step === QUESTIONS.length - 1
  const pick = (i) => setAnswers({ ...answers, [step]: i })
  const next = () => {
    if (last) { finishQuiz(answers); setStep(QUESTIONS.length) } else setStep(step + 1)
  }

  return (
    <main className="page center">
      <p className="sub">Question {step + 1} of {QUESTIONS.length}</p>
      <div className="bar wide" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step + 1}>
        <i style={{ width: ((step + 1) / QUESTIONS.length) * 100 + '%' }} />
      </div>
      <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
        <h1 className="qh">{q.q}</h1>
        <div className="qgrid" role="radiogroup" aria-label={q.q}>
          {q.options.map((o, i) => (
            <button key={o.t} role="radio" aria-checked={answers[step] === i}
              className={'card opt' + (answers[step] === i ? ' sel' : '')} onClick={() => pick(i)}>{o.t}</button>
          ))}
        </div>
      </motion.div>
      <div className="row between">
        <button className="btn ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>← Back</button>
        <button className="btn" onClick={next} disabled={answers[step] === undefined}>{last ? 'See results' : 'Next →'}</button>
      </div>
    </main>
  )
}
