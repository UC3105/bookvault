import './SearchBar.css'

interface Props { value: string; onChange: (v: string) => void }

const SearchBar = ({ value, onChange }: Props) => (
  <div className="search-wrap">
    <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
    <input className="search-input" type="text" placeholder="Search books, authors..."
      value={value} onChange={e => onChange(e.target.value)} />
    {value && <button className="search-clear" onClick={() => onChange('')}>✕</button>}
  </div>
)

export default SearchBar
