import { useState } from 'react'
import { getAmazonUrl, getKindleUrl } from '../utils/amazonLink'

interface Props {
  name: string
  query: string
  color: string
  className?: string
}

const SmartBuyButton = ({ name, query, color, className = 'buy-btn' }: Props) => {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null)

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (resolvedUrl) return
    e.preventDefault()
    const url = name === 'Kindle'
      ? await getKindleUrl(query)
      : await getAmazonUrl(query)
    setResolvedUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <a
      href={resolvedUrl ?? '#'}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{ borderColor: color, color }}
    >
      {name}
    </a>
  )
}

export default SmartBuyButton
