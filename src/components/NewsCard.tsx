import type { Article } from '../data/articles'

interface NewsCardProps {
  article: Article
}

function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
    >
      <div className="news-card__badge">{article.category}</div>
      <h3 className="news-card__title">{article.title}</h3>
      <p className="news-card__description">{article.description}</p>
      <span className="news-card__source">{article.source}</span>
    </a>
  )
}

export default NewsCard
