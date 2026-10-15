
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import Logo from '../components/Logo'

export default function AuthPage() {
  const [mode, setMode] = useState('register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'register') {
        const credential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        )

        if (name.trim()) {
          await updateProfile(credential.user, {
            displayName: name.trim(),
          })
        }

        await setDoc(doc(db, 'students', credential.user.uid), {
          uid: credential.user.uid,
          name: name.trim(),
          email: email.trim(),
          createdAt: serverTimestamp(),
          interests: [],
          quizResult: null,
          savedOpportunities: [],
        })
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }

      navigate('/dashboard', { replace: true })
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'This email already has an account. Try logging in.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Choose a password with at least 6 characters.',
        'auth/invalid-credential': 'Email or password is incorrect.',
        'auth/network-request-failed': 'Network error. Check your internet.',
        'permission-denied': 'Database access was denied. Check Firestore rules.',
      }

      setError(messages[err.code] || err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page center" style={{ maxWidth: 520, paddingTop: '3rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/"><Logo /></Link>
      </div>

      <section className="card" style={{ textAlign: 'left', padding: '2rem' }}>
        <p className="kicker">DISCOVER • EXPLORE • GROW</p>
        <h1>{mode === 'register' ? 'Create your WonderBox account' : 'Welcome back!'}</h1>
        <p className="sub">
          {mode === 'register'
            ? 'Start discovering opportunities made for you.'
            : 'Sign in to continue your journey.'}
        </p>

        <div className="row" style={{ margin: '1.2rem 0' }}>
          <button
            type="button"
            className={`btn ${mode === 'register' ? '' : 'ghost'}`}
            onClick={() => { setMode('register'); setError('') }}
          >
            Sign up
          </button>
          <button
            type="button"
            className={`btn ${mode === 'login' ? '' : 'ghost'}`}
            onClick={() => { setMode('login'); setError('') }}
          >
            Log in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label style={{ display: 'block', marginBottom: '1rem' }}>
              Your name
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                maxLength={80}
                required
                style={{ display: 'block', width: '100%', padding: '.7rem', border: '1px solid var(--line)', borderRadius: 12, marginTop: '.35rem' }}
                placeholder="Enter your name"
              />
            </label>
          )}

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Email address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
              style={{ display: 'block', width: '100%', padding: '.7rem', border: '1px solid var(--line)', borderRadius: 12, marginTop: '.35rem' }}
              placeholder="you@example.com"
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              minLength={6}
              required
              style={{ display: 'block', width: '100%', padding: '.7rem', border: '1px solid var(--line)', borderRadius: 12, marginTop: '.35rem' }}
              placeholder="At least 6 characters"
            />
          </label>

          {error && (
            <p role="alert" style={{ color: '#B42318', background: '#FFF0ED', borderRadius: 10, padding: '.7rem' }}>
              {error}
            </p>
          )}

          <button className="btn big" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading
              ? 'Please wait...'
              : mode === 'register'
                ? 'Create account'
                : 'Log in'}
          </button>
        </form>

        <p className="note" style={{ marginTop: '1rem' }}>
          Your password is handled securely by Firebase Authentication.
        </p>
      </section>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/">← Back to WonderBox</Link>
      </p>
    </main>
  )
}
