import { useEffect, useRef, useState } from 'react'

const RULES = [
  [/quiz|interest|discover/i, 'Open “Discover” in the sidebar to take the 6-question interest quiz. You can go back and change answers before finishing.'],
  [/profile|strength|career/i, 'Your Wonder Profile appears under “My Profile” after you finish the quiz. It shows ranked interests, strengths and career areas to explore.'],
  [/save|saved|bookmark/i, 'Tap the bookmark icon on any opportunity to save it. Find everything under “Saved”, where you can mark it Applied or Completed.'],
  [/apply|application/i, 'Open an opportunity and press “Apply now”. In this demo it only marks the item as Applied in your Saved list.'],
  [/find|opportunit|scholarship|competition|program|search|filter/i, 'Go to “Explore Opportunities” to search and use the filter chips: Scholarships, Competitions, Programs, Free Only and Online. You can also filter by class.'],
  [/match|percent|%/i, 'Match % compares an opportunity’s topics with your quiz scores. Take the quiz first to see it.'],
  [/hello|hi|hey/i, 'Hello! Ask me how to use WonderBox, like “how do I save an opportunity?”'],
]
const SUGGESTED = ['Find opportunities', 'How to apply?', 'How do matches work?', 'How do I save things?']

export default function ChatSupport() {
  const [msgs, setMsgs] = useState([{ from: 'bot', text: 'Hi! I’m WonderGuide, a demo assistant. I can help you find your way around WonderBox.' }])
  const [text, setText] = useState('')
  const end = useRef(null)
  useEffect(() => { end.current?.scrollIntoView({ block: 'end' }) }, [msgs])

  const send = (t) => {
    const msg = t.trim()
    if (!msg) return
    const hit = RULES.find(([re]) => re.test(msg))
    const reply = hit ? hit[1] : 'I’m a simple demo assistant and didn’t understand that. Try asking about the quiz, your profile, finding opportunities, saving or applying.'
    setMsgs((m) => [...m, { from: 'me', text: msg }, { from: 'bot', text: reply }])
    setText('')
  }

  return (
    <main className="page chat">
      <div className="rowsp"><h1>Chat Support</h1><span className="tag demo">Demo assistant · not a real AI</span></div>
      <div className="card chatbox">
        <div className="msgs" aria-live="polite">
          {msgs.map((m, i) => <div key={i} className={'msg ' + m.from}>{m.text}</div>)}
          <div ref={end} />
        </div>
        <div className="chips">{SUGGESTED.map((s) => <button key={s} className="fchip" onClick={() => send(s)}>{s}</button>)}</div>
        <form className="composer" onSubmit={(e) => { e.preventDefault(); send(text) }}>
          <input aria-label="Type your question" placeholder="Type your question…" value={text} onChange={(e) => setText(e.target.value)} />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </main>
  )
}
