import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import abi from "./contract/June.json";
import RequestLetter from "./components/RequestLetter";
import ApproveLetter from "./components/ApproveLetter";
import GetDetails from "./components/GetDetails";
import './App.css';  // Import the CSS file

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xEFEb0dd4F1F37135Ea838faf34d9cF6704be7945";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <Router>
      <div>
        <header className="App-header">
          <div className="container">
            <h1 className="App-title">Management of Education Certificates</h1>
            <nav>
              <ul className="nav-links">
                <li>
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                  <Link to="/request" className="nav-link">Request Certificate</Link>
                </li>
                <li>
                  <Link to="/approve" className="nav-link">Approve Certificate</Link>
                </li>
                <li>
                  <Link to="/details" className="nav-link">Get Certificate </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="card">
                    <div className="card-content">
                      <h2 className="card-title">Welcome!</h2>
                      <p className="card-description">Empower our institution's future with secure and accessible certificate management.</p>
                    </div>
                  </div>
                </div>
              }
            />
            <Route
              path="/request"
              element={
                <div className="card">
                  <div className="card-content">
                    <h2 className="card-title">Request Certificate</h2>
                    <RequestLetter state={state} />
                  </div>
                </div>
              }
            />
            <Route
              path="/approve"
              element={
                <div className="card">
                  <div className="card-content">
                    <h2 className="card-title">Approve Certificate</h2>
                    <ApproveLetter state={state} />
                  </div>
                </div>
              }
            />
            <Route
              path="/details"
              element={
                <div className="card">
                  <div className="card-content">
                    <h2 className="card-title">Get Certificate</h2>
                    <GetDetails state={state} />
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
