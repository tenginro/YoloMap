import "./Footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div id="toAlign">
        <div id="footerPart">
          <div className="footerSection">
            <h3>About Me</h3>
            <div style={{ cursor: "pointer" }}>
              <a
                href="https://github.com/tenginro"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-github fa-2x"></i> GitHub
              </a>
            </div>
            <div style={{ cursor: "pointer" }}>
              <a
                href="https://www.linkedin.com/in/luotengzhong/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-linkedin fa-2x"></i> LinkedIn
              </a>
            </div>
            <div style={{ cursor: "pointer" }}>
              <a
                href="http://tenginro.me/"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-regular fa-user fa-2x"></i> Portfolio
              </a>
            </div>
          </div>
          <div className="footerSection">
            <h3>Technologies Used</h3>
            <div>Python</div>
            <div>Javascript</div>
            <div>React</div>
            <div>Redux</div>
            <div>Flask</div>
            <div>PostgreSQL</div>
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
