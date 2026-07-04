import { useEffect, useState } from 'react'
import './BookPreviewModal.css'

interface Props {
  title: string
  author: string
  onClose: () => void
}

interface BookInfo {
  id: string
  thumbnail: string
  description: string
  pageCount: number
  publishedDate: string
  publisher: string
  previewLink: string
  averageRating?: number
  ratingsCount?: number
  categories?: string[]
  previewable: boolean
}

const BookPreviewModal = ({ title, author, onClose }: Props) => {
  const [info, setInfo] = useState<BookInfo | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [showReader, setShowReader] = useState(false)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title + ' ' + author)}&maxResults=3`
        )
        const data = await res.json()
        const item = data.items?.[0]
        if (!item) { setStatus('error'); return }

        const v = item.volumeInfo
        const access = item.accessInfo

        setInfo({
          id: item.id,
          thumbnail: v.imageLinks?.thumbnail?.replace('http:', 'https:') ||
                     v.imageLinks?.smallThumbnail?.replace('http:', 'https:') || '',
          description: v.description || 'No description available.',
          pageCount: v.pageCount || 0,
          publishedDate: v.publishedDate || '',
          publisher: v.publisher || '',
          previewLink: v.previewLink || '',
          averageRating: v.averageRating,
          ratingsCount: v.ratingsCount,
          categories: v.categories,
          previewable: access?.viewability === 'PARTIAL' || access?.viewability === 'ALL_PAGES',
        })
        setStatus('ready')
      } catch {
        setStatus('error')
      }
    }
    fetch_()
  }, [title, author])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { showReader ? setShowReader(false) : onClose() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, showReader])

  const stars = (rating: number) => '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))

  return (
    <div className="preview-overlay" onClick={() => showReader ? setShowReader(false) : onClose()}>
      <div className="preview-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="preview-header">
          <span className="preview-header-title">📖 Book Preview</span>
          <button className="preview-close" onClick={onClose}>✕</button>
        </div>

        {/* Loading */}
        {status === 'loading' && (
          <div className="preview-loading">
            <div className="preview-spinner" />
            <p>Fetching book details…</p>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div className="preview-error">
            <div className="preview-error-icon">📚</div>
            <h3>Book not found</h3>
            <p>Could not load details for <strong>{title}</strong></p>
            <a href={`https://www.google.com/search?q=${encodeURIComponent(title + ' ' + author + ' book')}`}
              target="_blank" rel="noopener noreferrer" className="preview-action-btn">
              Search on Google →
            </a>
          </div>
        )}

        {/* Book info card */}
        {status === 'ready' && info && !showReader && (
          <div className="preview-content">
            <div className="preview-left">
              {info.thumbnail ? (
                <img src={info.thumbnail} alt={title} className="preview-cover" />
              ) : (
                <div className="preview-cover-placeholder">
                  <span>{title.charAt(0)}</span>
                </div>
              )}
              <div className="preview-meta-pills">
                {info.pageCount > 0 && <span className="preview-pill">{info.pageCount} pages</span>}
                {info.publishedDate && <span className="preview-pill">{info.publishedDate.slice(0,4)}</span>}
                {info.categories?.[0] && <span className="preview-pill">{info.categories[0]}</span>}
              </div>
              {info.averageRating && (
                <div className="preview-rating">
                  <span className="preview-stars">{stars(info.averageRating)}</span>
                  <span className="preview-rating-num">{info.averageRating}/5</span>
                  {info.ratingsCount && <span className="preview-rating-count">({info.ratingsCount.toLocaleString()})</span>}
                </div>
              )}
            </div>

            <div className="preview-right">
              <h2 className="preview-book-title">{title}</h2>
              <p className="preview-book-author">by {author}</p>
              {info.publisher && <p className="preview-publisher">Published by {info.publisher}</p>}

              <div className="preview-description">
                {info.description.length > 600
                  ? info.description.slice(0, 600) + '…'
                  : info.description}
              </div>

              <div className="preview-actions">
                {info.previewable ? (
                  <button className="preview-action-btn preview-read-btn" onClick={() => setShowReader(true)}>
                    📄 Read Preview Pages
                  </button>
                ) : (
                  <span className="preview-no-preview">Publisher has not enabled page preview</span>
                )}
                <a
                  href={info.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-action-btn preview-google-btn"
                >
                  Open on Google Books ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Embedded reader */}
        {status === 'ready' && info && showReader && (
          <div className="preview-reader-wrap">
            <div className="preview-reader-bar">
              <button className="preview-back-btn" onClick={() => setShowReader(false)}>← Back</button>
              <span>{title}</span>
            </div>
            <iframe
              src={`https://books.google.com/books?id=${info.id}&lpg=PP1&pg=PP1&output=embed`}
              className="preview-iframe"
              title={`Preview of ${title}`}
              allowFullScreen
            />
          </div>
        )}

      </div>
    </div>
  )
}

export default BookPreviewModal
