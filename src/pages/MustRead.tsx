import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { mustReadBooks } from '../data/mustReadBooks'
import StarRating from '../components/StarRating'
import { getAmazonUrl, getKindleUrl, getAudibleTrialUrl, getGoogleBooksUrl } from '../utils/amazonLink'
import './MustRead.css'

const MustReadCard = ({ book }: { book: typeof mustReadBooks[0] }) => {
  const [amazonUrl, setAmazonUrl] = useState('#')
  const [kindleUrl, setKindleUrl] = useState('#')
  const [audibleUrl, setAudibleUrl] = useState('#')
  const googleUrl = getGoogleBooksUrl(book.title, book.author)

  useEffect(() => {
    getAmazonUrl(book.query).then(setAmazonUrl)
    getKindleUrl(book.query).then(setKindleUrl)
    getAudibleTrialUrl().then(setAudibleUrl)
  }, [book.query])

  return (
    <div className="mr-card">
      <div className="mr-rank">#{book.position}</div>

      <div className="mr-cover-wrap">
        <div className="mr-cover-placeholder">
          <span className="mr-cover-initial">{book.title.charAt(0)}</span>
        </div>
      </div>

      <div className="mr-info">
        <div className="mr-top">
          <h2 className="mr-title">{book.title}</h2>
          <p className="mr-author">by {book.author} · {book.year < 0 ? `${Math.abs(book.year)} BC` : book.year}</p>
          <div className="mr-tags">
            {book.genre.split(', ').map(g => (
              <span key={g} className="mr-tag">{g}</span>
            ))}
            <span className="mr-tag mr-tag-pages">{book.pages}</span>
          </div>
        </div>

        <p className="mr-synopsis">{book.synopsis}</p>

        <StarRating bookTitle={book.title} />

        <div className="mr-buy-row">
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="mr-btn mr-btn-preview">
            📖 Free Preview
          </a>
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="mr-btn mr-btn-amazon">
            🛒 Amazon
          </a>
          <a href={kindleUrl} target="_blank" rel="noopener noreferrer" className="mr-btn mr-btn-kindle">
            📱 Kindle
          </a>
          <a href={audibleUrl} target="_blank" rel="noopener noreferrer" className="mr-btn mr-btn-audible">
            🎧 Try Audible Free
          </a>
        </div>
      </div>
    </div>
  )
}

const MustRead = () => {
  const [search, setSearch] = useState('')
  const filtered = mustReadBooks.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.genre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Helmet>
        <title>Books to Read Before You Die — BookVault | 30 Essential Books</title>
        <meta name="description" content="30 essential books curated by BookVault — from Dostoevsky and Tolstoy to Orwell and García Márquez. Reviews, ratings and buy links for the greatest books ever written." />
        <link rel="canonical" href="https://bookvault-lake.vercel.app/must-read" />
      </Helmet>
    <div className="mr-page">
      <div className="mr-header">
        <h1 className="mr-main-title">📚 Books to Read Before You Die</h1>
        <p className="mr-subtitle">
          30 essential books curated by <a href="https://www.penguinrandomhouse.com/the-read-down/books-to-read-before-you-die/" target="_blank" rel="noopener noreferrer">Penguin Random House</a> — classics, memoirs, and unforgettable fiction every reader should experience.
        </p>
        <div className="mr-search-wrap">
          <input
            className="mr-search"
            type="text"
            placeholder="Search by title, author, or genre…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="mr-list">
        {filtered.map(book => (
          <MustReadCard key={book.position} book={book} />
        ))}
        {filtered.length === 0 && (
          <div className="mr-no-results">No books found for "{search}"</div>
        )}
      </div>
    </div>
    </>
  )
}

export default MustRead
