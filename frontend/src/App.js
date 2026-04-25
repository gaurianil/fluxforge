import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [requests, setRequests] = useState(50);
  const [concurrency, setConcurrency] = useState(5);
  const [result, setResult] = useState(null);

  const runTest = async () => {
    const res = await axios.post("http://localhost:5000/test", {
      url,
      requests,
      concurrency
    });

    setResult(res.data);
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>FluxForge</h1>

      <input placeholder="API URL" onChange={(e) => setUrl(e.target.value)} />
      <br />

      <input type="range" min="1" max="200" value={requests}
        onChange={(e) => setRequests(e.target.value)} />
      <p>Requests: {requests}</p>

      <input type="range" min="1" max="20" value={concurrency}
        onChange={(e) => setConcurrency(e.target.value)} />
      <p>Concurrency: {concurrency}</p>

      <button onClick={runTest}>Run Test</button>

      {result && (
        <div>
          <h3>Results</h3>
          <p>Total: {result.total}</p>
          <p>Success: {result.success}</p>
          <p>Fail: {result.fail}</p>
          <p>Avg Time: {result.avgResponseTime} ms</p>
        </div>
      )}
    </div>
  );
}

export default App;