import { useState, useMemo } from 'react'
import articles from '../data/articles'
import NewsCard from './NewsCard'
import '../styles/hub.css'
import '../styles/newsfeed.css'

interface NewsFeedProps {
  onBackToHome?: () => void
}

function NewsFeed({ onBackToHome }: NewsFeedProps) {
  const categories = useMemo(() => {
    const seen = new Set<string>()
    for (const a of articles) seen.add(a.category)
    return Array.from(seen)
  }, [])

  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? articles.filter((a) => a.category === active)
    : articles

  return (
    <section className="news-feed">
      {onBackToHome && (
        <button
          type="button"
          className="hub-back-btn"
          onClick={onBackToHome}
        >
          ← Back to home
        </button>
      )}

      <header className="news-feed__header">
        <h1 className="hub-title">AI Learning Hub</h1>
        <p className="hub-subtitle">
          Curated articles, tools, and resources to help kids and educators
          explore artificial intelligence.
        </p>
      </header>

      <div className="news-feed__filters">
        <button
          type="button"
          className={`news-feed__bubble ${active === null ? 'news-feed__bubble--active' : ''}`}
          onClick={() => setActive(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`news-feed__bubble ${active === cat ? 'news-feed__bubble--active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* <div className="hub-muted news-feed__count">
        {filtered.length} resource{filtered.length !== 1 ? 's' : ''}
      </div> */}

      <div className="news-feed__track">
        {filtered.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default NewsFeed
