import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import subscriptionService from "../../services/subscription.service";
import "./NewsFeed.css";

interface NewsItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  date: string;
  link: string;
}

export default function NewsFeed() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("/rss/feed.xml");
        const xmlText = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        const parsedItems: NewsItem[] = Array.from(items).map((item, index) => {
          const title = item.querySelector("title")?.textContent || "No Title";
          const link = item.querySelector("link")?.textContent || "#";
          const description = item.querySelector("description")?.textContent || "";
          const category = item.querySelector("category")?.textContent || "News";

          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const dateObj = new Date(pubDate);
          const formattedDate = isNaN(dateObj.getTime())
            ? "Recent"
            : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

          return {
            id: item.querySelector("guid")?.textContent || `news-${index}`,
            tag: category,
            title,
            description,
            date: formattedDate,
            link
          };
        });

        setNewsItems(parsedItems);
      } catch (error) {
        console.error("Error fetching or parsing RSS feed:", error);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchRSS();
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscriptionService.addSubscriber(email);
      setStatus("success");
      setMessage("Subscribed successfully! You'll be notified of new updates.");
      setEmail("");
    } catch (err) {
      console.error("Subscription error:", err);
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="news-feed-section">
      <div className="news-feed-container">
        <h2 className="news-feed-title">LATEST NEWS</h2>

        <div className="subscribe-container">
          <div className="subscribe-content">
            <h3>Get Notified</h3>
            <p>Subscribe to receive an email when new updates drop!</p>
          </div>
          <form className="subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="subscribe-input"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="subscribe-btn"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <div className={`subscribe-message ${status}`}>
              {message}
            </div>
          )}
        </div>

        <div className="news-feed-list">
          {loadingNews ? (
            <p className="loading-feed">Loading the latest news...</p>
          ) : newsItems.length > 0 ? (
            newsItems.map((item) => (
              <Link to={`/news/${item.id}`} key={item.id} className="news-card-link">
                <article className="news-card">
                  <div className="news-card-body">
                    <div className="news-card-header">
                      <span className="news-tag">{item.tag}</span>
                      <span className="news-date">{item.date}</span>
                    </div>
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-desc">{item.description}</p>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <p className="loading-feed">Unable to load news feed at this time.</p>
          )}
        </div>
      </div>
    </section>
  );
}

