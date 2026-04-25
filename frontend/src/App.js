import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [requests, setRequests] = useState(100);
  const [concurrency, setConcurrency] = useState(10);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!url) return alert("Enter API URL");

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post("http://localhost:8080/test", {
        url,
        requests,
        concurrency
      });

      setResult(res.data);
    } catch (err) {
      alert("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>FluxForge</h1>
        <p style={styles.subtitle}>
          API Load Testing & Observability Engine
        </p>
      </div>

      {/* MAIN */}
      <div style={styles.container}>

        {/* INPUT */}
        <div style={styles.card}>
          <label style={styles.label}>API Endpoint</label>

          <input
            style={styles.input}
            placeholder="https://api.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            style={loading ? styles.buttonDisabled : styles.button}
            onClick={runTest}
            disabled={loading}
          >
            {loading ? "Running..." : "Run Test"}
          </button>
        </div>

        {/* CONTROLS */}
        <div style={styles.cardRow}>

          <div style={styles.cardSmall}>
            <p style={styles.label}>
              Requests: <span style={styles.accent}>{requests}</span>
            </p>
            <input
              type="range"
              min="1"
              max="500"
              value={requests}
              onChange={(e) => setRequests(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.cardSmall}>
            <p style={styles.label}>
              Concurrency: <span style={styles.accent}>{concurrency}</span>
            </p>
            <input
              type="range"
              min="1"
              max="50"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

        </div>

        {/* RESULTS */}
        {result && (
          <div style={styles.results}>

            <div style={styles.grid}>

              <div style={styles.metric}>
                <p style={styles.value}>{result.total}</p>
                <p style={styles.text}>Total</p>
              </div>

              <div style={styles.metric}>
                <p style={{ ...styles.value, color: "#22c55e" }}>
                  {result.success}
                </p>
                <p style={styles.text}>Success</p>
              </div>

              <div style={styles.metric}>
                <p style={{ ...styles.value, color: "#ef4444" }}>
                  {result.fail}
                </p>
                <p style={styles.text}>Failed</p>
              </div>

              <div style={styles.metric}>
                <p style={{ ...styles.value, color: "#38bdf8" }}>
                  {Math.round(result.avgResponseTime)} ms
                </p>
                <p style={styles.text}>Latency</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

/* ===== STYLES (BLACK + GREY PREMIUM) ===== */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#e5e5e5",
    fontFamily: "system-ui, Arial",
    padding: "40px"
  },

  header: {
    textAlign: "center",
    marginBottom: "40px"
  },

  title: {
    fontSize: "46px",
    margin: 0,
    color: "#ffffff",
    letterSpacing: "1px"
  },

  subtitle: {
    marginTop: "8px",
    color: "#888"
  },

  container: {
    maxWidth: "900px",
    margin: "auto"
  },

  card: {
    background: "#111111",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #222",
    marginBottom: "20px"
  },

  cardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "20px"
  },

  cardSmall: {
    background: "#111111",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #222"
  },

  label: {
    fontSize: "13px",
    color: "#aaa",
    marginBottom: "10px"
  },

  accent: {
    color: "#ffffff"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #2a2a2a",
    background: "#0b0b0b",
    color: "white",
    outline: "none",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#1a1a1a",
    color: "white",
    cursor: "pointer",
    transition: "0.2s"
  },

  buttonDisabled: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "#111",
    color: "#555",
    cursor: "not-allowed"
  },

  slider: {
    width: "100%"
  },

  results: {
    marginTop: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px"
  },

  metric: {
    background: "#111",
    border: "1px solid #222",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center"
  },

  value: {
    fontSize: "26px",
    margin: 0,
    color: "#ffffff"
  },

  text: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#888"
  }
};

export default App;