import articles from '../data/articles'
import NewsCard from './NewsCard'
import '../styles/hub.css'
import '../styles/newsfeed.css'

interface NewsFeedProps {
  onBackToHome?: () => void
}

function NewsFeed({ onBackToHome }: NewsFeedProps) {
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

      <div className="hub-muted news-feed__count">
        {articles.length} resources
      </div>

      <div className="news-feed__track">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default NewsFeed
