
import { useState } from 'react'
import {
  NavLink,
  Outlet,
  Link,
  useNavigate,
} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import Logo from './Logo'

const ITEMS = [
  ['/dashboard', 'Home'],
  ['/discover', 'Discover'],
  ['/profile', 'My Profile'],
  ['/opportunities', 'Explore Opportunities'],
  ['/saved', 'Saved'],
  ['/chat', 'Chat Support'],
]

export default function Layout({ ctx }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const search = (e) => {
    e.preventDefault()
    navigate('/opportunities?q=' + encodeURIComponent(q))
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // App.jsx will redirect to /login when Firebase
      // confirms that there is no authenticated user.
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Unable to log out. Please try again.')
    }
  }

  return (
    <div className="app">
      <aside className={'side' + (open ? ' open' : '')}>
        <Link to="/" aria-label="WonderBox home">
          <Logo />
        </Link>

        <nav aria-label="Main">
          {ITEMS.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                'nav' + (isActive ? ' on' : '')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link to="/" className="nav out">
          Back to website
        </Link>

        <button
          type="button"
          className="nav out"
          onClick={handleLogout}
        >
          Log out
        </button>
      </aside>

      {open && (
        <div
          className="scrim"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="main">
        <header className="top">
          <button
            className="menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>

          <form onSubmit={search} className="search" role="search">
            <input
              aria-label="Search opportunities"
              placeholder="Search opportunities, interests…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>

          <div className="avatar" aria-label="Your profile">
            W
          </div>
        </header>

        <Outlet context={ctx} />
      </div>
    </div>
  )
}
