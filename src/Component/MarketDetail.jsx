import { useLocation, useNavigate } from 'react-router-dom';
import TradeCard from './TradeCard'; 
import './MarketDetail.css';

export default function MarketDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Extract category details passed from Home screen
  const { 
    category = "Sports", 
    icon = "⚽", 
    accentColor = "var(--purple-primary)",
    forcedQuestion = null 
  } = location.state || {};

  // 2. Dynamic multi-card market lists matching the active category path
  // This simulates Probo's layout with multiple cards under the same main event
  let marketCardsArray = [];

  if (category === "Sports") {
    marketCardsArray = [
      { id: "S-1", question: forcedQuestion || "Kya RCB is baar IPL jeetegi?", sharePrice: 6.50, endTime: "01:30" },
      { id: "S-2", question: "RCB to score 50+ runs in the powerplay?", sharePrice: 4.20, endTime: "00:45" },
      { id: "S-3", question: "Will Virat Kohli score a century tonight?", sharePrice: 7.80, endTime: "02:15" }
    ];
  } else if (category === "Politics") {
    marketCardsArray = [
      { id: "P-1", question: forcedQuestion || "Will India achieve 8%+ GDP growth this fiscal year?", sharePrice: 5.20, endTime: "12 Days" },
      { id: "P-2", question: "Will new renewable energy subsidies be declared this week?", sharePrice: 3.50, endTime: "3 Days" }
    ];
  } else if (category === "Movies") {
    marketCardsArray = [
      { id: "M-1", question: forcedQuestion || "Will Pushpa 2 cross 1000 Cr in worldwide collections?", sharePrice: 8.10, endTime: "5 Days" },
      { id: "M-2", question: "Will the trailer get 50M+ views in 24 hours?", sharePrice: 6.00, endTime: "04:10" }
    ];
  } else if (category === "Tech") {
    marketCardsArray = [
      { id: "T-1", question: forcedQuestion || "AI Future me Jobs Khatam kar dega?", sharePrice: 7.00, endTime: "Dec 2026" },
      { id: "T-2", question: "Will the next iPhone completely remove physical side buttons?", sharePrice: 4.50, endTime: "4 Months" }
    ];
  } else {
    // Fallback default for remaining components (Fun Battles, Gaming, etc.)
    marketCardsArray = [
      { id: "F-1", question: forcedQuestion || "Thar vs Scorpio Kon Best?", sharePrice: 5.00, endTime: "01:10" }
    ];
  }

  // Central tracking calculation for the core header stats block
  const overallStats = {
    totalVolume: category === "Sports" ? "₹12,45,800" : category === "Politics" ? "₹45,20,000" : "₹8,50,000",
    yesPoolPercent: 64,
    noPoolPercent: 36
  };

  const handleTradeExecution = (tradePayload) => {
    console.log("Confirmed List Order placed:", tradePayload);
    alert(`Trade Placed successfully!\nMarket: ${tradePayload.question}\nPosition: ${tradePayload.position}\nShares: ${tradePayload.shares}\nTotal: ₹${tradePayload.totalAmount.toFixed(2)}`);
  };

  return (
    <div className="detail-page-container">
      
      {/* FIXED CONTEXT CATEGORY HEADER BAR */}
      <header className="dynamic-category-header" style={{ '--category-accent': accentColor }}>
        <div className="category-header-wrap">
          <button className="category-back-btn" onClick={() => navigate(-1)}>
            ← <span className="back-btn-text">Back</span>
          </button>
          
          <div className="current-category-title">
            <span className="category-header-icon">{icon}</span>
            <h2>{category}</h2>
          </div>
        </div>
      </header>
      <main className="market-detail-layout">

        {/* BOTTOM COMPONENT: PROBO-STYLE VERTICAL LIST VIEW OF TRADING CARDS */}
        <section className="market-cards-list-section">
          <h3 className="list-section-heading">Select a sub-market option to trade</h3>
          
          <div className="vertical-cards-list">
            {marketCardsArray.map((card) => (
              <div key={card.id} className="list-item-card-wrapper">
                <TradeCard 
                  question={card.question}
                  sharePrice={card.sharePrice}
                  options={["Yes", "No"]}
                  categoryIcon={icon}
                  endTime={card.endTime}
                  onPlaceTrade={handleTradeExecution}
                />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}