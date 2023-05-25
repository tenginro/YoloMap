import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer" onClick={(e) => alert("Feature coming soon")}>
      <div id="toAlign">
        <div id="footerPart">
          <div className="footerSection">
            <h3>About Me</h3>
            <div>GitHub</div>
            <div>LinkedIn</div>
            <div>Portfolio</div>
          </div>
          <div className="footerSection">
            <h3>Technologies Used</h3>
            <div>Python</div>
            <div>Javascript</div>
            <div>React</div>
            <div>Redux</div>
          </div>
          <div className="footerSection">
            <h3>Additional Tech Used</h3>
            <div>AWS S3</div>
            <div>Google Maps API</div>
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
          are registered trademarks of YoloMap.
        </div>
      </div>
    </footer>
  );
}
