import { useState, useEffect } from 'react'
import type { Book } from '../types/book'
import RatingCircle from './RatingCircle'
import StarRating from './StarRating'
import SmartBuyButton from './SmartBuyButton'
import BookPreviewModal from './BookPreviewModal'
import { getAudibleTrialUrl } from '../utils/amazonLink'
import './BookCard.css'

interface Props {
  book: Book
  isReadlisted: boolean
  onReadlistToggle: (title: string) => void
}

const BookCard = ({ book, isReadlisted, onReadlistToggle }: Props) => {
  const [audibleUrl, setAudibleUrl] = useState('https://www.audible.com/ep/freetrial')
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    getAudibleTrialUrl().then(setAudibleUrl)
  }, [])

  return (
    <>
    <div className="card">
      <div className="card-left">
        <div className="cover-wrap">
          <img src={book.cover} alt={`${book.title} cover`} className="cover-img" />
        </div>
        <div className="card-actions">
          <button
            className={`btn-primary${isReadlisted ? ' readlisted' : ''}`}
            onClick={() => onReadlistToggle(book.title)}
          >
            {isReadlisted ? '✓ IN READLIST' : '+ ADD TO READLIST'}
          </button>
          {book.buyLinks[0]?.query ? (
            <SmartBuyButton
              name="BUY BOOK"
              query={book.buyLinks[0].query}
              color="#d4a017"
              className="btn-outline"
            />
          ) : (
            <a
              className="btn-outline"
              href={book.buyLinks[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              BUY BOOK
            </a>
          )}
        </div>
        <div className="stills-row">
          <div className="still s1" />
          <div className="still s2" />
          <div className="still s3" />
        </div>
      </div>

      <div className="card-right">
        <h2 className="card-title">
          {book.title} <span className="card-year">({book.year})</span>
        </h2>
        <p className="card-author">by {book.author}</p>
        <p className="card-synopsis">{book.synopsis}</p>

        <div className="ratings-block">
          <RatingCircle score={book.overallScore} />
          <div className="rating-list">
            <div className="rating-row">
              <span className="rl">Critics</span>
              <span className="rv">{book.criticsRating}</span>
            </div>
            <div className="rating-row">
              <span className="rl">Readers</span>
              <span className="rv">{book.readersRating}</span>
            </div>
          </div>
          <div className="meta-list">
            <div className="meta-row">
              <span className="ml">Genre</span>
              <span className="mv">{book.genre}</span>
            </div>
            <div className="meta-row">
              <span className="ml">Pages</span>
              <span className="mv">{book.pages}</span>
            </div>
            <div className="meta-row">
              <span className="ml">Publisher</span>
              <span className="mv">{book.publisher}</span>
            </div>
          </div>
        </div>

        <StarRating bookTitle={book.title} />

        <div className="author-section">
          <div className="author-item">
            <div className="author-avatar">{book.authorBio.initials}</div>
            <span className="author-name">{book.authorBio.name}</span>
            <span className="author-label">Author</span>
          </div>
        </div>

        <div className="buy-section">
          <span className="buy-label">Buy / Read on</span>
          <div className="buy-btns">
            <button
              onClick={() => setShowPreview(true)}
              className="buy-btn"
              style={{ borderColor: '#4285f4', color: '#4285f4', background: 'none', cursor: 'pointer' }}
            >
              📖 Free Preview
            </button>
            <a
              href={audibleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-btn"
              style={{ borderColor: '#ff9900', color: '#ff9900' }}
            >
              🎧 Try Audible Free
            </a>
            {book.buyLinks.map(({ name, url, color, query }) =>
              query ? (
                <SmartBuyButton key={name} name={name} query={query} color={color} />
              ) : (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-btn"
                  style={{ borderColor: color, color }}
                >
                  {name}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>

    {showPreview && (
      <BookPreviewModal
        title={book.title}
        author={book.author}
        onClose={() => setShowPreview(false)}
      />
    )}
    </>
  )
}

export default BookCard
