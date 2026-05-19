import { useState } from 'react';
import './Wallet.css';

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('All');

  const transactions = [
    { id: 'TXN-9821', type: 'Credit', desc: 'Won Position: India vs Pak Live Match Poll', date: 'May 19, 2026', amount: 450, status: 'Success' },
    { id: 'TXN-9754', type: 'Debit', desc: 'Placed Bet: "Pushpa 2 Club Entry Opinion"', date: 'May 18, 2026', amount: 200, status: 'Success' },
    { id: 'TXN-9610', type: 'Credit', desc: 'Partner Referral Bonus Credit', date: 'May 16, 2026', amount: 500, status: 'Success' },
    { id: 'TXN-9502', type: 'Debit', desc: 'Instant Bank Account Withdrawal Settlement', date: 'May 14, 2026', amount: 1000, status: 'Success' },
    { id: 'TXN-9411', type: 'Credit', desc: 'UPI Cash Deposit Wallet Top-Up', date: 'May 13, 2026', amount: 150, status: 'Success' },
  ];

  const filteredTxns = activeTab === 'All' 
    ? transactions 
    : transactions.filter(txn => txn.type === activeTab);

  // Simple handler to route back or trace window arrays
  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      console.log("Redirecting home...");
    }
  };

  return (
    <div className="wallet-page-container">
      
      {/* HEADER STICKY PANEL */}
      <header className="wallet-page-header">
        <div className="wallet-header-wrap">
          <div className="wallet-page-logo">
            <button className="back-navigation-btn" onClick={handleBackNavigation}>
            <span className="back-arrow-vector">←</span> Back
          </button>
          </div>
          <div className="wallet-user-stats">
            <div className="global-wallet-badge">₹2,450.00</div>
          </div>
        </div>
      </header>

      {/* MAIN BODY WRAP */}
      <main className="wallet-page-layout">

        {/* ROW 1: BALANCE SUMMARY AND QUICK ACTIONS */}
        <section className="wallet-summary-grid">
          
          {/* Detailed Rupee Assets Balance Card */}
          <div className="balance-breakdown-card glass-panel">
            <div className="card-top-row">
              <span className="balance-headline">Total Balance Assets</span>
              <span className="verified-shield">🛡️ Secure Account</span>
            </div>
            
            <div className="primary-coin-metric">₹2,450.00</div>
            
            <div className="balance-sub-metrics">
              <div className="metric-box">
                <span className="metric-label">Winnings (Withdrawable)</span>
                <span className="metric-val text-emerald">₹1,800.00</span>
              </div>
              <div className="metric-box">
                <span className="metric-label">Deposit Wallet Cash</span>
                <span className="metric-val text-purple">₹650.00</span>
              </div>
            </div>
          </div>

          {/* Quick Cash Flow Management Form */}
          <div className="wallet-quick-actions bg-brand-card">
            <h3 className="actions-header-title">Funds Management</h3>
            <p className="actions-header-subtitle">Instantly add money or settle funds to your linked bank account.</p>
            
            <div className="action-button-group">
              <button className="action-btn btn-deposit">
                <span>➕</span> Deposit Money
              </button>
              <button className="action-btn btn-withdraw">
                <span>💸</span> Instant Withdrawal
              </button>
            </div>
            <p className="action-compliance-notice">⚡ Powered by instant IMPS & UPI payout architectures.</p>
          </div>

        </section>

        {/* ROW 2: TRANSACTION LEDGER TABLE */}
        <section className="wallet-ledger-section">
          <div className="ledger-header">
            <h2 className="ledger-title">Account Passbook</h2>
            
            {/* Filter Pill Tabs */}
            <div className="ledger-filters">
              {['All', 'Credit', 'Debit'].map((tab) => (
                <button
                  key={tab}
                  className={`ledger-tab ${activeTab === tab ? 'tab-active' : 'tab-inactive'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'All' ? 'All History' : `${tab}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Data Table Core Viewport */}
          <div className="table-responsive-wrapper scrollbar-hide">
            <table className="ledger-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Statement Description</th>
                  <th>Execution Date</th>
                  <th>Type</th>
                  <th className="text-right">Amount (INR)</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((txn) => (
                  <tr key={txn.id}>
                    <td className="txn-id">{txn.id}</td>
                    <td className="txn-desc">{txn.desc}</td>
                    <td className="txn-date">{txn.date}</td>
                    <td>
                      <span className={`txn-type-pill ${txn.type.toLowerCase()}`}>
                        {txn.type === 'Credit' ? 'Received' : 'Paid'}
                      </span>
                    </td>
                    <td className={`txn-amount text-right ${txn.type === 'Credit' ? 'amt-credit' : 'amt-debit'}`}>
                      {txn.type === 'Credit' ? '+' : '-'} ₹{txn.amount}.00
                    </td>
                    <td className="text-center">
                      <span className="status-success-dot">● {txn.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
}