import { useState } from 'react';
import './Rewards.css';

export default function Rewards() {
  const [activeFilter, setActiveFilter] = useState('All');

  const tradesData = [
    {
      id: 1,
      match: "India vs Pakistan",
      isVersus: true,
      teams: [{ label: "IN", flag: "🇮🇳" }, { label: "PK", flag: "🇵🇰" }],
      flagIcon: "🇮🇳",
      prediction: "India to win",
      invested: 500,
      returns: 950, 
      status: "Won",
      timestamp: "Ended: May 19, 2026",
      type: "Match"
    },
    {
      id: 2,
      match: "Kya RCB is baar IPL jeetegi?",
      isVersus: false,
      flagIcon: "🏏",
      prediction: "Yes",
      invested: 200,
      returns: 0,
      status: "Live",
      timestamp: "Live Now • Ends in 01:30",
      type: "Opinion"
    },
    {
      id: 3,
      match: "Next Over Me Wicket Aayega?",
      isVersus: false,
      flagIcon: "⚡",
      prediction: "No",
      invested: 150,
      returns: 0,
      status: "Lost",
      timestamp: "Ended: Over 14.2",
      type: "Match"
    },
    {
      id: 4,
      match: "Thar vs Scorpio Kon Best?",
      isVersus: false,
      flagIcon: "🚘",
      prediction: "Thar",
      invested: 300,
      returns: 580,
      status: "Won",
      timestamp: "Ended: May 18, 2026",
      type: "Opinion"
    },
    {
      id: 5,
      match: "Pushpa 2 1000 Cr Club me jayegi?",
      isVersus: false,
      flagIcon: "🎬",
      prediction: "Yes",
      invested: 1000,
      returns: 0,
      status: "Live",
      timestamp: "Live Now • Ends in 02:15",
      type: "Opinion"
    }
  ];

  const filters = ['All', 'Live', 'Won', 'Lost'];

  const filteredTrades = activeFilter === 'All' 
    ? tradesData 
    : tradesData.filter(item => item.status === activeFilter);

  // Standard window trace controller to clear layout paths
  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log("Redirecting home...");
    }
  };

  return (
    <div className="rewards-container">
      
      {/* HEADER SECTION */}
      <header className="rewards-header">
        <div className="rewards-header-wrap">
          <div className="rewards-logo">
           <button className="back-navigation-btn" onClick={handleBackNavigation}>
            <span className="back-arrow-vector">←</span> Back
          </button>
          </div>
          <div className="rewards-user-wallet">
            <div className="rewards-wallet-badge">₹2,450.00</div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="rewards-layout">
        
        {/* ROW 1: BALANCE OVERVIEW & HEADER */}
        <section className="rewards-hero-section">
          <div className="rewards-headline-block">
            <p className="rewards-tagline">Portfolio & History</p>
            <h1 className="rewards-title">Track Your Trades & <span className="rewards-title-highlight">Earnings</span></h1>
            <p className="rewards-description">Monitor your active investments on live matches or review your historical won and lost predictions.</p>
          </div>

          {/* Dynamic Wallet Balance Card */}
          <div className="rewards-balance-panel glass-panel">
            <p className="balance-label">Total Withdrawable Balance</p>
            <div className="balance-value">₹2,450.00</div>
            <div className="balance-investment-row">
              <div>
                <span className="invest-sublabel">In Play (Live)</span>
                <span className="invest-subvalue text-amber">₹1,200.00</span>
              </div>
              <div className="invest-divider-line"></div>
              <div>
                <span className="invest-sublabel">Total Won Cash</span>
                <span className="invest-subvalue text-emerald">₹1,530.00</span>
              </div>
            </div>
          </div>
        </section>

        {/* ROW 2: FILTERS & CARD GRID ARRAYS */}
        <section className="rewards-catalog-section">
          <div className="catalog-header">
            <h2 className="catalog-section-title">Prediction History</h2>
            
            <div className="catalog-filters scrollbar-hide">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-tab ${activeFilter === filter ? 'filter-tab-active' : 'filter-tab-inactive'}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === 'All' ? 'All Bets' : `${filter} Matches`}
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Trade History Cards Grid */}
          <div className="rewards-grid">
            {filteredTrades.map((trade) => (
              <div key={trade.id} className="reward-card bg-brand-card">
                <div className="reward-card-top">
                  <div className="reward-brand-identity">
                    
                    {trade.isVersus ? (
                      <div className="versus-flag-block">
                        <div className="mini-flag-row font-mono">
                          <span className="team-badge-txt">{trade.teams[0].label}</span>
                          <span className="vs-center-divider">vs</span>
                          <span className="team-badge-txt">{trade.teams[1].label}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="brand-avatar">{trade.flagIcon}</span>
                    )}

                    <div className="brand-title-meta">
                      <h3 className="brand-name">{trade.match}</h3>
                      <span className="brand-type-badge">{trade.timestamp}</span>
                    </div>
                  </div>
                  
                  <span className={`status-pill pill-${trade.status.toLowerCase()}`}>
                    {trade.status}
                  </span>
                </div>

                <div className="reward-card-divider"></div>

                <div className="reward-card-bottom">
                  <div className="trade-position-details">
                    <span className="position-label">Your Staked Position:</span>
                    <span className="position-value">{trade.prediction}</span>
                  </div>

                  <div className="reward-cost-metrics">
                    <div className="metric-column">
                      <span className="cost-label">Money Put In</span>
                      <span className="cost-rupees">₹{trade.invested}</span>
                    </div>
                    
                    <div className="metric-column text-right">
                      <span className="cost-label">
                        {trade.status === 'Live' ? 'Estimated Payout' : 'Final Returns'}
                      </span>
                      <span className={`cost-rupees ${
                        trade.status === 'Won' ? 'text-emerald' : 
                        trade.status === 'Lost' ? 'text-gray' : 'text-amber'
                      }`}>
                        {trade.status === 'Lost' ? '₹0' : `₹${trade.status === 'Live' ? Math.floor(trade.invested * 1.8) : trade.returns}`}
                      </span>
                    </div>
                  </div>
                  
                  {trade.status === "Live" && (
                    <button className="claim-action-btn live-pulse-border">
                      View Live Arena
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}