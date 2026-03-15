import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./NewsArticle.css";

interface NewsItemDetail {
  title: string;
  description: string;
  date: string;
  category: string;
  link: string;
}

export default function NewsArticle() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsItemDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/rss/feed.xml");
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        const match = Array.from(items).find(
          (item) => item.querySelector("guid")?.textContent === id
        );

        if (match) {
          const pubDate = match.querySelector("pubDate")?.textContent || "";
          const dateObj = new Date(pubDate);
          const formattedDate = isNaN(dateObj.getTime())
            ? "Recent"
            : dateObj.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              });

          setArticle({
            title: match.querySelector("title")?.textContent || "No Title",
            description:
              match.querySelector("description")?.textContent || "",
            date: formattedDate,
            category:
              match.querySelector("category")?.textContent || "News",
            link: match.querySelector("link")?.textContent || "#",
          });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <section className="news-article-section">
        <div className="news-article-container">
          <p className="news-article-loading">Loading article...</p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="news-article-section">
        <div className="news-article-container">
          <h2 className="news-article-title">Article Not Found</h2>
          <p className="news-article-body">
            The news article you're looking for doesn't exist.
          </p>
          <Link to="/" className="news-article-back">
            ← Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="news-article-section">
      <div className="news-article-container">
        <Link to="/" className="news-article-back">
          ← Back to Home
        </Link>
        <div className="news-article-meta">
          <span className="news-article-tag">{article.category}</span>
          <span className="news-article-date">{article.date}</span>
        </div>
        <h2 className="news-article-title">{article.title}</h2>
        <p className="news-article-body">{article.description}</p>
      </div>
    </section>
  );
}
