import { useState } from 'react';
import './TradeCard.css';

export default function TradeCard({ 
  question, 
  sharePrice = 6.50, 
  categoryIcon = "⚡",
  endTime = "01:30",
  onPlaceTrade 
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [shareCount, setShareCount] = useState(1);
  const [showOrderSlip, setShowOrderSlip] = useState(false);

  const yesPrice = sharePrice;
  const noPrice = Math.max(0.5, 10 - sharePrice);
  
  const currentActivePrice = selectedOption === "Yes" ? yesPrice : noPrice;
  const totalInvestment = shareCount * currentActivePrice;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShareCount(1);
    setShowOrderSlip(true);
  };

  const handleQuantityChange = (amount) => {
    setShareCount(prev => Math.max(1, prev + amount));
  };

  const handleCancel = () => {
    setShowOrderSlip(false);
    setSelectedOption(null);
  };

  const handleConfirmOrder = () => {
    if (!selectedOption) return;
    if (onPlaceTrade) {
      onPlaceTrade({
        question,
        position: selectedOption,
        shares: shareCount,
        pricePerShare: currentActivePrice,
        totalAmount: totalInvestment
      });
    }
    setShowOrderSlip(false);
    setSelectedOption(null);
  };

  return (
    <div className="probo-trade-card">
      
      {/* HEADER META ROW */}
      <div className="card-top-meta">
        <div className="meta-badge-tag">
          <span className="badge-icon">{categoryIcon}</span> 
          <span className="badge-text">Opinion</span>
        </div>
        <div className="meta-timer-tag">⏰ Ends in {endTime}</div>
      </div>

      {/* QUESTION */}
      <h3 className="card-question-text">{question}</h3>

      {/* YES / NO ACTION BUTTONS */}
      <div className="binary-action-row">
        <button className="probo-btn-yes" onClick={() => handleOptionSelect("Yes")}>
          <span className="btn-label">Put YES</span>
          <span className="btn-price-tag">₹{yesPrice.toFixed(1)}</span>
        </button>
        <button className="probo-btn-no" onClick={() => handleOptionSelect("No")}>
          <span className="btn-label">Put NO</span>
          <span className="btn-price-tag">₹{noPrice.toFixed(1)}</span>
        </button>
      </div>

      {/* VOLUME INDICATOR */}
      <div className="card-bottom-volume-bar">
        <span className="volume-icon">📊</span> over ₹4.2L matched on this event
      </div>

      {/* OVERLAY ORDER SLIP POPUP */}
      {showOrderSlip && (
        <div className="inline-order-slip-overlay">
          
          <div className="slip-header-row">
            <h4 className="slip-title">Set Your Position Order</h4>
            <button className="slip-dismiss-x" onClick={handleCancel}>×</button>
          </div>

          <div className="slip-stance-badge-row">
            <div className="stance-indicator">
              <span className="indicator-lbl">Position stance</span>
              <span className={`indicator-val val-${selectedOption.toLowerCase()}`}>{selectedOption}</span>
            </div>
            <div className="stance-indicator text-right">
              <span className="indicator-lbl">Price/Share</span>
              <span className="indicator-val text-white">₹{currentActivePrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="slip-calculator-matrix">
            <div className="qty-counter-block">
              <span className="calc-mini-lbl">Number of Shares</span>
              <div className="counter-btn-wrap">
                <button className="counter-action-trigger" onClick={() => handleQuantityChange(-1)}>−</button>
                <span className="counter-numerical-val">{shareCount}</span>
                <button className="counter-action-trigger" onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="total-payout-block text-right">
              <span className="calc-mini-lbl">Total Investment</span>
              <span className="payout-numerical-val">₹{totalInvestment.toFixed(2)}</span>
            </div>
          </div>

          <div className="slip-action-footers">
            <button className="slip-btn-abort" onClick={handleCancel}>Cancel</button>
            <button className="slip-btn-execute" onClick={handleConfirmOrder}>
              Confirm & Pay ₹{totalInvestment.toFixed(2)}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}