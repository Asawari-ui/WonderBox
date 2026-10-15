
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useStored } from './services/storage'
import { OPPORTUNITIES, matchFor, scoreQuiz } from './data/content'
import Layout from './components/Layout'
import Landing from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import WonderProfile from './pages/WonderProfile'
import Opportunities from './pages/Opportunities'
import Saved from './pages/Saved'
import ChatSupport from './components/ChatSupport'

function ProtectedRoute({ user, ready, children }) {
  if (!ready) {
    return <div className="page center">Loading WonderBox...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setAuthReady(true)
  })

  return unsubscribe
}, [])

  
const storagePrefix = user
  ? `wb_${user.uid}_`
  : 'wb_guest_'

const [answers, setAnswers] = useStored(
  `${storagePrefix}answers`, {}
)

const [result, setResult] = useStored(
  `${storagePrefix}result`, null
)

const [saved, setSaved] = useStored(
  `${storagePrefix}saved`, {}
)

const [opened, setOpened] = useStored(
  `${storagePrefix}opened`, false
)


  const list = OPPORTUNITIES.map((o) => ({
    ...o,
    match: matchFor(o, result),
  }))

  const toggleSave = (id) =>
    setSaved((s) => {
      const next = { ...s }
      if (next[id]) delete next[id]
      else next[id] = 'Saved'
      return next
    })

  const setStatus = (id, status) =>
    setSaved((s) => ({ ...s, [id]: status }))

  const finishQuiz = (finalAnswers) =>
    setResult(scoreQuiz(finalAnswers))

  const retake = () => {
    setAnswers({})
    setResult(null)
  }

  const ctx = {
    answers,
    setAnswers,
    result,
    finishQuiz,
    retake,
    saved,
    toggleSave,
    setStatus,
    opened,
    setOpened,
    list,
    user,
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            authReady
              ? user
                ? <Navigate to="/dashboard" replace />
                : <AuthPage />
              : <div className="page center">Loading WonderBox...</div>
          }
        />

        <Route
          element={
            <ProtectedRoute user={user} ready={authReady}>
              <Layout ctx={ctx} />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile" element={<WonderProfile />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/chat" element={<ChatSupport />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
