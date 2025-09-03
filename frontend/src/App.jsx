// project/frontend/src/App.jsx
import { useEffect, useState } from 'react'

/**
 * 이 컴포넌트는 아주 단순한 로그인 데모 화면입니다.
 * 전제 API:
 *  - POST /api/auth/login      { email, password } -> 200 OK 시 세션 쿠키 발급
 *  - POST /api/auth/logout                           -> 204 No Content
 *  - GET  /api/auth/me                               -> 200 {id,email,nickname?} / 401 미로그인
 *
 * 중요: fetch에 credentials: 'include'를 넣어야 세션 쿠키가 왕복됩니다.
 */
export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)     // 로그인된 사용자 정보
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 앱 첫 로드시 내 로그인 상태 확인
  useEffect(() => {
    checkMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkMe() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      })
      if (res.status === 401) {
        setUser(null)
      } else if (!res.ok) {
        const msg = await safeText(res)
        throw new Error(msg || `Me failed (${res.status})`)
      } else {
        const me = await res.json()
        setUser(me)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function onLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // 세션 쿠키 주고받기 필수
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const msg = await safeText(res)
        throw new Error(msg || `Login failed (${res.status})`)
      }
      // 로그인 성공했으니 /me 다시 조회
      await checkMe()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function onLogout() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (!(res.ok || res.status === 204)) {
        const msg = await safeText(res)
        throw new Error(msg || `Logout failed (${res.status})`)
      }
      setUser(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ margin: 0, fontSize: 20 }}>로그인 데모</h1>
          <span style={{ fontSize: 12, color: user ? '#0a7' : '#666' }}>
            {user ? '로그인됨' : '미로그인'}
          </span>
        </div>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {user ? (
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={styles.box}>
              <div><b>ID</b>: {user.id}</div>
              <div><b>Email</b>: {user.email}</div>
              {user.nickname && <div><b>Nickname</b>: {user.nickname}</div>}
            </div>
            <button onClick={onLogout} disabled={loading} style={styles.btnOutline}>
              로그아웃
            </button>
          </div>
        ) : (
          <form onSubmit={onLogin} style={{ display: 'grid', gap: 10 }}>
            <label style={styles.label}>
              <span style={styles.labelText}>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              <span style={styles.labelText}>Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
              />
            </label>
            <button type="submit" disabled={loading} style={styles.btnPrimary}>
              {loading ? '처리중...' : '로그인'}
            </button>
          </form>
        )}

        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #eee' }}>
          <button onClick={checkMe} disabled={loading} style={styles.btnOutlineSmall}>
            상태 새로고침(/me)
          </button>
          <span style={{ fontSize: 12, color: '#777', marginLeft: 8 }}>세션 쿠키 기반</span>
        </div>
      </div>
    </div>
  )
}

async function safeText(res) {
  try {
    return await res.text()
  } catch {
    return ''
  }
}

const styles = {
  wrap: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: '#f6f7f9',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    padding: 16,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  error: {
    background: '#fde8e8',
    border: '1px solid #f6bcbc',
    color: '#b20000',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    marginBottom: 8,
  },
  box: {
    background: '#f7f8fa',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
  },
  label: { display: 'grid', gap: 6 },
  labelText: { fontSize: 13 },
  input: {
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: '10px 12px',
    outline: 'none',
  },
  btnPrimary: {
    border: 'none',
    borderRadius: 10,
    padding: '10px 12px',
    background: '#111',
    color: '#fff',
    cursor: 'pointer',
  },
  btnOutline: {
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: '10px 12px',
    background: '#fff',
    cursor: 'pointer',
  },
  btnOutlineSmall: {
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: '6px 10px',
    background: '#fff',
    cursor: 'pointer',
    fontSize: 12,
  },
}
