import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import BookCard from './components/BookCard'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import BooksToMovies from './pages/BooksToMovies'
import MustRead from './pages/MustRead'
import { books } from './data/books'
import './App.css'

const allGenres = Array.from(new Set(books.flatMap(b => b.genres))).sort()

const PageBanner = ({ path, emoji, title, subtitle, color }: { path: string; emoji: string; title: string; subtitle: string; color: string }) => {
  const navigate = useNavigate()
  return (
    <div
      className="page-banner"
      style={{ borderColor: color, cursor: 'pointer' }}
      onClick={() => navigate(path)}
    >
      <span className="page-banner-emoji">{emoji}</span>
      <div className="page-banner-text">
        <strong style={{ color }}>{title}</strong>
        <span>{subtitle}</span>
      </div>
      <span className="page-banner-arrow" style={{ color }}>→</span>
    </div>
  )
}

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [readlist, setReadlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('readlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleReadlist = (title: string) => {
    setReadlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('readlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || b.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <div className="content-stack">
      <div className="top-bar">
        <h1 className="site-title">BookVault <span className="site-sub">— Curated Literature</span></h1>
        <div className="readlist-count">♥ {readlist.size} saved</div>
      </div>

      <div className="page-banners">
        <PageBanner path="/must-read" emoji="📚" title="Books to Read Before You Die" subtitle="30 essential books curated by Penguin Random House" color="#d4a017" />
        <PageBanner path="/books-to-movies" emoji="🎬" title="Books Made Into Movies" subtitle="10 books that became iconic films — read them first" color="#c0392b" />
      </div>

      <SearchBar value={search} onChange={setSearch} />
      <GenreFilter genres={allGenres} active={genre} onChange={setGenre} />

      {filtered.length === 0 ? (
        <div className="no-results">No books found for "{search}"</div>
      ) : (
        filtered.map(book => (
          <BookCard
            key={book.title}
            book={book}
            isReadlisted={readlist.has(book.title)}
            onReadlistToggle={toggleReadlist}
          />
        ))
      )}

      <Newsletter />

      <div className="ad-banner">
        <span className="ad-label">Advertisement</span>
        <div className="ad-slot">
          <p className="ad-placeholder">Your Ad Here — <a href="https://adsense.google.com" target="_blank" rel="noopener noreferrer">Get AdSense</a></p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books-to-movies" element={<BooksToMovies />} />
          <Route path="/must-read" element={<MustRead />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
)

export default App
