import { useState } from "react";
import subscriptionService from "../../services/subscription.service";
import "./NewsFeed.css";

const NEWS_ITEMS = [
  {
    id: 1,
    tag: "New Feature",
    title: "Play Tetris Is Now Live!",
    description:
      "Head over to the Play Tetris section and challenge the leaderboard. Compete for the highest score and prove you're the ultimate arcade champion!",
    date: "Mar 10, 2025",
  },
  {
    id: 2,
    tag: "Coming Soon",
    title: "Community Chat Is On The Way",
    description:
      "A real-time chat feature is in development to keep the entire Twin Galaxies community connected. Stay tuned for launch details.",
    date: "Mar 8, 2025",
  },
  {
    id: 3,
    tag: "Coming Soon",
    title: "User Authentication In The Works",
    description:
      "Create your own account, track personal records, and manage your profile. Authentication is being built to bring a personalized experience.",
    date: "Mar 5, 2025",
  },
  {
    id: 4,
    tag: "Social Media",
    title: "Twin Galaxies Is Now On Instagram",
    description:
      "Follow us on Instagram for highlights, retro clips, behind-the-scenes content, and community spotlights. Join the arcade nation!",
    date: "Mar 3, 2025",
  },
  {
    id: 5,
    tag: "Social Media",
    title: "Official Discord Server Created",
    description:
      "Join the official Twin Galaxies Discord server to chat with players worldwide, share strategies, and stay up to date on events.",
    date: "Mar 1, 2025",
  },
];

export default function NewsFeed() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

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
        <h2 className="news-feed-title">📡 LATEST NEWS</h2>

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
          {NEWS_ITEMS.map((item) => (
            <article className="news-card" key={item.id}>
              <div className="news-card-body">
                <div className="news-card-header">
                  <span className="news-tag">{item.tag}</span>
                  <span className="news-date">{item.date}</span>
                </div>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
