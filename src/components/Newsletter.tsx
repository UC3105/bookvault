import { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <div className="newsletter">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <p className="newsletter-title">Never miss a great book</p>
          <p className="newsletter-sub">Weekly curated reviews and reading recommendations. No spam, ever.</p>
        </div>
        {submitted ? (
          <p className="newsletter-thanks">✓ You're on the list!</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)} className="newsletter-input" required />
            <button type="submit" className="newsletter-btn">Subscribe Free</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Newsletter
