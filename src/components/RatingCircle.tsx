interface Props { score: number; max?: number }

const RatingCircle = ({ score, max = 10 }: Props) => {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  const progress = (score / max) * circumference

  return (
    <div className="rating-circle">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#3a3a3a" strokeWidth="5" />
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#d4a017" strokeWidth="5"
          strokeDasharray={`${progress} ${circumference - progress}`}
          strokeLinecap="round" transform="rotate(-90 40 40)" />
      </svg>
      <span className="rating-value">{score.toFixed(1)}</span>
    </div>
  )
}

export default RatingCircle
