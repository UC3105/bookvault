export interface BookAuthor {
  name: string
  initials: string
}

export interface StreamingLink {
  name: string
  url: string
  color: string
  query?: string  // search query for smart Amazon/Kindle links
}

export interface Book {
  title: string
  author: string
  year: number
  synopsis: string
  genre: string
  genres: string[]
  pages: string
  publisher: string
  overallScore: number
  criticsRating: number
  readersRating: number
  cover: string
  buyLinks: StreamingLink[]
  authorBio: BookAuthor
}
