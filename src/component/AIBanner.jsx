import React from "react";
import "./aibanner.css";
import { Sparkles } from "lucide-react";

export default function AIBanner() {
  return (
    <section className="ai-banner-wrapper">
      <div className="ai-banner">
        {/* LEFT */}
        <div className="ai-left">
          <div className="ai-icon">
            <Sparkles size={26} />
          </div>

          <div className="ai-text">
            <h3>Not sure which course to pick?</h3>
            <p>Let our AI guide you to the perfect learning path</p>
          </div>
        </div>

        {/* BUTTON */}
        <button className="ai-btn">
          <Sparkles size={18} />
          Chat with AI
        </button>
      </div>
    </section>
  );
}
