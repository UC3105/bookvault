import { useState } from 'react'
import './StarRating.css'

interface Props { bookTitle: string }

const StarRating = ({ bookTitle }: Props) => {
  const key = `rating_${bookTitle}`
  const [rating, setRating] = useState<number>(() => Number(localStorage.getItem(key)) || 0)
  const [hover, setHover] = useState(0)

  const handleClick = (val: number) => {
    setRating(val)
    localStorage.setItem(key, String(val))
  }

  return (
    <div className="star-rating">
      <span className="star-label">Your rating:</span>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(i => (
          <button key={i}
            className={`star${(hover || rating) >= i ? ' filled' : ''}`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(i)}
          >★</button>
        ))}
      </div>
      {rating > 0 && <span className="star-saved">Saved!</span>}
    </div>
  )
}

export default StarRating
