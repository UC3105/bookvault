interface Props { score: number; max?: number }

const RatingCircle = ({ score, max = 10 }: Props) => {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const progress = (score / max) * circumference

  return (
    <div className="rating-circle">
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle cx="29" cy="29" r={radius} fill="none" stroke="#3a3a3a" strokeWidth="4" />
        <circle cx="29" cy="29" r={radius} fill="none" stroke="#d4a017" strokeWidth="4"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round" transform="rotate(-90 29 29)" />
      </svg>
      <span className="rating-value">{score.toFixed(1)}</span>
    </div>
  )
}

export default RatingCircle
