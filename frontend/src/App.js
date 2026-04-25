import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [requests, setRequests] = useState(100);
  const [concurrency, setConcurrency] = useState(10);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTest = async () => {
    if (!url) {
      alert("Enter a valid API URL");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await axios.post("http://localhost:5000/test", {
        url,
        requests,
        concurrency
      });

      setResult(res.data);
    } catch (err) {
      alert("Backend error. Check server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.app}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>FluxForge</h1>
        <p style={styles.subtitle}>
          Distributed API Load Testing & Observability Platform
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div style={styles.grid}>

        {/* INPUT PANEL */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Target API</h2>

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
            {loading ? "Running Stress Test..." : "Start Test"}
          </button>
        </div>

        {/* CONTROLS */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Load Configuration</h2>

          <label style={styles.label}>
            Requests: <span style={styles.highlight}>{requests}</span>
          </label>
          <input
            style={styles.slider}
            type="range"
            min="1"
            max="500"
            value={requests}
            onChange={(e) => setRequests(Number(e.target.value))}
          />

          <label style={styles.label}>
            Concurrency: <span style={styles.highlight}>{concurrency}</span>
          </label>
          <input
            style={styles.slider}
            type="range"
            min="1"
            max="50"
            value={concurrency}
            onChange={(e) => setConcurrency(Number(e.target.value))}
          />
        </div>

      </div>

      {/* RESULTS */}
      {result && (
        <div style={styles.resultsSection}>

          <h2 style={styles.sectionTitle}>Performance Metrics</h2>

          <div style={styles.metricsGrid}>

            <div style={styles.metricCard}>
              <p style={styles.metricValue}>{result.total}</p>
              <p style={styles.metricLabel}>Total Requests</p>
            </div>

            <div style={{ ...styles.metricCard, borderColor: "#00ff88" }}>
              <p style={{ ...styles.metricValue, color: "#00ff88" }}>
                {result.success}
              </p>
              <p style={styles.metricLabel}>Successful</p>
            </div>

            <div style={{ ...styles.metricCard, borderColor: "#ff4d4d" }}>
              <p style={{ ...styles.metricValue, color: "#ff4d4d" }}>
                {result.fail}
              </p>
              <p style={styles.metricLabel}>Failed</p>
            </div>

            <div style={{ ...styles.metricCard, borderColor: "#00d4ff" }}>
              <p style={{ ...styles.metricValue, color: "#00d4ff" }}>
                {Math.round(result.avgResponseTime)} ms
              </p>
              <p style={styles.metricLabel}>Avg Response</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* ===== STYLES ===== */
const styles = {
  app: {
    minHeight: "100vh",
    background: "#0b0f14",
    color: "white",
    fontFamily: "Arial",
    padding: "30px"
  },

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  title: {
    fontSize: "42px",
    margin: 0,
    color: "#00d4ff",
    letterSpacing: "1px"
  },

  subtitle: {
    color: "#8892a6",
    marginTop: "8px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px"
  },

  card: {
    background: "#111826",
    padding: "20px",
    borderRadius: "14px",
    border: "1px solid #1f2a3a",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  cardTitle: {
    marginBottom: "15px",
    color: "#cbd5e1",
    fontSize: "16px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #2a3a50",
    background: "#0b1220",
    color: "white",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#00d4ff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s"
  },

  buttonDisabled: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#334155",
    color: "#94a3b8",
    cursor: "not-allowed"
  },

  label: {
    display: "block",
    marginTop: "10px",
    color: "#94a3b8",
    fontSize: "14px"
  },

  highlight: {
    color: "#00d4ff",
    fontWeight: "bold"
  },

  slider: {
    width: "100%",
    marginTop: "8px"
  },

  resultsSection: {
    marginTop: "30px"
  },

  sectionTitle: {
    marginBottom: "15px",
    color: "#cbd5e1"
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px"
  },

  metricCard: {
    background: "#111826",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #1f2a3a",
    textAlign: "center"
  },

  metricValue: {
    fontSize: "24px",
    margin: 0,
    fontWeight: "bold"
  },

  metricLabel: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#94a3b8"
  }
};

export default App;