import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" onClick={(e) => alert("Feature coming soon")}>
      <div id="toAlign">
        <div id="footerPart">
          <div className="footerSection">
            <h3>About</h3>
            <div>About YoloMap</div>
            <div>Careers</div>
            <div>Press</div>
            <div>Investor Relations</div>
            <div>Trust & Safety</div>
            <div>Content Guidelines</div>
            <div>Accessibility Statement</div>
            <div>Terms of Service</div>
            <div>Privacy Policy</div>
            <div>Ad Choices</div>
            <div>Your Privacy Choices</div>
          </div>
          <div className="footerSection">
            <h3>Discover</h3>
            <div>YoloMap Project Cost Guides</div>
            <div>Collections</div>
            <div>Talk</div>
            <div>Events</div>
            <div>YoloMap Blog</div>
            <div>Support</div>
            <div>YoloMap Mobile</div>
            <div>Developers</div>
            <div>RSS</div>
          </div>
          <div className="footerSection">
            <h3>YoloMap for Business</h3>
            <div>YoloMap for Business</div>
            <div>Business Owner Login</div>
            <div>Claim your Business Page</div>
            <div>Advertise on YoloMap</div>
            <div>YoloMap for Restaurant Owners</div>
            <div>Table Management</div>
            <div>Business Success Stories</div>
            <div>Business Support</div>
            <div>YoloMap Blog for Business</div>
          </div>
          <div className="footerSection">
            <h3>Language</h3>
            <div>English</div>
            <h3>Country</h3>
            <div>United States</div>
          </div>
        </div>
        <div className="copyrightLine">
          Copyright © 2023 YoloMap Inc. YoloMap, YoloMap logo and related marks
          are registered trademarks of YoloMap.{" "}
        </div>
      </div>
    </footer>
  );
}
