import { useState } from 'react'
import { bookMovies } from '../data/bookMovies'
import './BooksToMovies.css'

const ScoreBar = ({ label, score, color }: { label: string; score: number; color: string }) => (
  <div className="score-bar-row">
    <span className="score-bar-label">{label}</span>
    <div className="score-bar-track">
      <div className="score-bar-fill" style={{ width: `${(score / 10) * 100}%`, background: color }} />
    </div>
    <span className="score-bar-num" style={{ color }}>{score.toFixed(1)}</span>
  </div>
)

const BooksToMovies = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="btm-page">
      <div className="btm-header">
        <h1 className="btm-title">📖 → 🎬 Books Made Into Movies</h1>
        <p className="btm-subtitle">10 essential books that became iconic films — and why you should read them first</p>
      </div>

      <div className="btm-list">
        {bookMovies.map((item, i) => (
          <div key={item.title} className={`btm-card${activeIdx === i ? ' expanded' : ''}`}>
            {/* Rank badge */}
            <div className="btm-rank">#{i + 1}</div>

            {/* Book cover */}
            <div className="btm-covers">
              <div className="btm-cover-wrap">
                <img src={item.bookCover} alt={`${item.title} book`} className="btm-cover" />
                <span className="btm-cover-label">BOOK</span>
              </div>
              <div className="btm-arrow">→</div>
              <div className="btm-cover-wrap">
                <img src={item.moviePoster} alt={`${item.title} film`} className="btm-cover" />
                <span className="btm-cover-label">FILM</span>
              </div>
            </div>

            {/* Info */}
            <div className="btm-info">
              <div className="btm-info-top">
                <div>
                  <h2 className="btm-item-title">{item.title}</h2>
                  <p className="btm-meta">
                    Book by <span className="btm-highlight">{item.author}</span> ({item.year})
                    &nbsp;·&nbsp; Film by <span className="btm-highlight">{item.director}</span> ({item.movieYear})
                    &nbsp;·&nbsp; <span className="btm-genre">{item.genre}</span>
                  </p>
                </div>
                <button className="btm-expand-btn" onClick={() => setActiveIdx(activeIdx === i ? null : i)}>
                  {activeIdx === i ? '▲ Less' : '▼ More'}
                </button>
              </div>

              <p className="btm-synopsis">{item.synopsis}</p>

              <div className="btm-scores">
                <ScoreBar label="Book" score={item.bookScore} color="#d4a017" />
                <ScoreBar label="Film" score={item.movieScore} color="#2ecc71" />
              </div>

              {activeIdx === i && (
                <div className="btm-expanded">
                  <div className="btm-why">
                    <span className="btm-why-label">Why read before watching?</span>
                    <p className="btm-why-text">{item.whyWatch}</p>
                  </div>
                  <div className="btm-actions">
                    <a href={item.buyUrl} target="_blank" rel="noopener noreferrer" className="btm-btn-buy">
                      Buy the Book →
                    </a>
                    <a href={item.trailerUrl} target="_blank" rel="noopener noreferrer" className="btm-btn-trailer">
                      ▶ Watch Trailer
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BooksToMovies
