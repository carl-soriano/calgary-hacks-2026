import { useState } from 'react'
import articles, { categories } from '../data/articles'
import NewsCard from './NewsCard'
import '../styles/newsfeed.css'

function NewsFeed() {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  return (
    <section className="news-feed">
      <header className="news-feed__header">
        <h1 className="news-feed__title">AI Learning Hub</h1>
        <p className="news-feed__subtitle">
          Curated articles, tools, and resources to help kids and educators
          explore artificial intelligence.
        </p>
      </header>

      <nav className="news-feed__filters" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`news-feed__filter-btn${
              activeCategory === cat ? ' news-feed__filter-btn--active' : ''
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="news-feed__count">
        Showing {filtered.length} resource{filtered.length !== 1 && 's'}
      </div>

      <div className="news-feed__grid">
        {filtered.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default NewsFeed
