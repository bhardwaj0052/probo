import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./Recharge.css";
import { useNavigate } from "react-router-dom";

const Recharge = () => {
  const navigate = useNavigate();

  const quickAmounts = [
    100, 200, 300, 500, 1000, 1200, 1500,
    2000, 2500, 3000, 4000, 5000,
  ];

  const explanations = [
    "Please do not modify the deposit amount. Unauthorized modification of the deposit amount will result in the deposit not being credited.",
    "Each deposit requires payment to be initiated through this page, please do not save the payment details offline.",
    "Deposits are typically received within 5 minutes. If your balance does not update, please contact online customer service for processing.",
    "Due to too many deposit users, please try multiple times to obtain the deposit link or try again after a period of time.",
  ];

  // state for input amount
  const [amount, setAmount] = useState("");

  const handleQuickAmount = (amt) => {
    setAmount(amt); 
  };

  const handleRecharge = () => {
    if (!amount) {
      alert("Please select or enter an amount.");
      return;
    }
    navigate("/pay", { state: amount });
  };

  return (
    <div className="recharge-container">
      {/* PREMIUM HEADER NAVBAR */}
      <div className="header2">
        <button className="back-btnR" onClick={() => navigate(-1)}>
          <ArrowLeft color="#ffffff" />
        </button>
        <h1 className="header-title">Recharge Wallet</h1>
        <div className="spacer"></div>
      </div>

      <div className="main-content-recharge">
        {/* Recharge Box (Glassmorphism Styled) */}
        <div className="recharge-box glass-panel">
          
          {/* 1. Recharge Amount Input Block */}
          <div className="input-block-group">
            <label className="label1">Enter Recharge Amount (INR)</label>
            <div className="recharge-input-wrapper">
              <span className="recharge-currency-symbol">₹</span>
              <input
                type="number"
                placeholder="0.00"
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Quick Amounts Grid Selection Panel */}
          <div className="quick-amounts-section">
            <span className="section-mini-label">Popular Additions</span>
            <div className="quick-amounts">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`quick-btn ${amount == amt ? "selected" : ""}`}
                  onClick={() => handleQuickAmount(amt)}
                >
                  + ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Recharge Action Trigger Button */}
          <button className="recharge-btn" onClick={handleRecharge}>
            Proceed to Payment Gateway
          </button>

          {/* 4. Help & Guidelines Documentation List */}
          <div className="explain-box">
            <h3 className="explain-title">Deposit Guidelines & Support</h3>
            <ol className="explain-rules-list">
              {explanations.map((text, i) => (
                <li key={i}>{text}</li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Recharge;