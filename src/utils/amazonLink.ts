const DE_TAG = 'cinebook2109-21'
const IN_TAG = 'bookvault21-21'
const US_TAG = 'bookvault21-20'

// Map country code → { domain, tag }
const AMAZON_CONFIG: Record<string, { domain: string; tag?: string }> = {
  DE: { domain: 'amazon.de', tag: DE_TAG },
  AT: { domain: 'amazon.de', tag: DE_TAG }, // Austria also uses amazon.de
  CH: { domain: 'amazon.de', tag: DE_TAG }, // Switzerland also uses amazon.de
  IN: { domain: 'amazon.in', tag: IN_TAG },
  GB: { domain: 'amazon.co.uk' },
  FR: { domain: 'amazon.fr' },
  IT: { domain: 'amazon.it' },
  ES: { domain: 'amazon.es' },
  CA: { domain: 'amazon.ca' },
  AU: { domain: 'amazon.com.au' },
  JP: { domain: 'amazon.co.jp' },
  BR: { domain: 'amazon.com.br' },
  MX: { domain: 'amazon.com.mx' },
  NL: { domain: 'amazon.nl' },
  SE: { domain: 'amazon.se' },
  PL: { domain: 'amazon.pl' },
  TR: { domain: 'amazon.com.tr' },
  AE: { domain: 'amazon.ae' },
  SA: { domain: 'amazon.sa' },
  SG: { domain: 'amazon.sg' },
}

let cachedCountry: string | null = null

const detectCountry = async (): Promise<string> => {
  if (cachedCountry) return cachedCountry
  try {
    const res = await fetch('https://ipapi.co/country/', { signal: AbortSignal.timeout(3000) })
    const country = (await res.text()).trim()
    cachedCountry = country
    return country
  } catch {
    return 'US'
  }
}

const buildUrl = (domain: string, path: string, tag?: string) => {
  const url = `https://www.${domain}${path}`
  return tag ? `${url}&tag=${tag}` : url
}

export const getAmazonUrl = async (query: string): Promise<string> => {
  const country = await detectCountry()
  const { domain, tag } = AMAZON_CONFIG[country] ?? { domain: 'amazon.com', tag: US_TAG }
  return buildUrl(domain, `/s?k=${encodeURIComponent(query)}`, tag)
}

export const getKindleUrl = async (query: string): Promise<string> => {
  const country = await detectCountry()
  const { domain, tag } = AMAZON_CONFIG[country] ?? { domain: 'amazon.com', tag: US_TAG }
  return buildUrl(domain, `/s?k=${encodeURIComponent(query)}+kindle`, tag)
}

export const getAudibleTrialUrl = async (): Promise<string> => {
  const country = await detectCountry()
  if (country === 'DE' || country === 'AT' || country === 'CH') {
    return `https://www.audible.de/ep/freetrial?tag=${DE_TAG}`
  }
  if (country === 'IN') {
    return `https://www.audible.in/ep/freetrial?tag=${IN_TAG}`
  }
  if (country === 'GB') {
    return 'https://www.audible.co.uk/ep/freetrial'
  }
  return `https://www.audible.com/ep/freetrial?tag=${US_TAG}`
}

export const getGoogleBooksUrl = (title: string, author: string): string =>
  `https://books.google.com/books?q=${encodeURIComponent(title + ' ' + author)}&btnG=Search+Books`
