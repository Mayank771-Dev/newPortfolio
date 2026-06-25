const navItems = ['Works', 'About', 'Contact']

function RetroMac() {
  return (
    <div className="retro-mac" aria-hidden="true">
      <div className="mac-case">
        <div className="mac-top-glow" />
        <div className="mac-face">
          <div className="mac-toolbar">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="mac-workspace">
            <div className="mac-tools">
              {Array.from({ length: 16 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <div className="mac-screen">
              <span>hello</span>
            </div>
          </div>
          <div className="mac-palette">
            {Array.from({ length: 18 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
        <div className="mac-slot" />
        <div className="apple-mark">
          <span className="apple-leaf" />
          <span className="stripe red" />
          <span className="stripe orange" />
          <span className="stripe yellow" />
          <span className="stripe green" />
          <span className="stripe blue" />
          <span className="stripe violet" />
        </div>
      </div>
      <div className="keyboard">
        {Array.from({ length: 44 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="mouse-line" />
    </div>
  )
}

function App() {
  return (
    <main className="landing-page">
      <header className="site-header">
        <a className="brand-mark" href="#home" aria-label="Mayank Mittal home">
          mayank<span>.</span>mtl
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              ({item})
            </a>
          ))}
        </nav>

        <a className="availability" href="mailto:hello@mayank.design">
          <span aria-hidden="true">*</span>
          Open to work
        </a>
      </header>

      <section className="hero-section" id="home" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          <span className="first-name">Mayank</span>
          <span className="last-name">Mittal</span>
        </h1>

        <p className="discipline">SaaS UX · Motion Design</p>
        <div className="hero-dot" aria-hidden="true" />

        <div className="intro-block">
          <span className="plus" aria-hidden="true">
            +
          </span>
          <p>
            Seasoned designer with <em>strengths</em>
            <br />
            in motion and interaction design.
            <br />
            Currently <em>exploring</em> AI + Design
            <br />
            Systems workflows
          </p>
        </div>

        <RetroMac />
      </section>

      <section className="below-fold" id="works" aria-label="Works preview">
        <h2>Selected Works</h2>
      </section>
      <section className="below-fold" id="about" aria-label="About preview">
        <h2>About</h2>
      </section>
      <section className="below-fold" id="contact" aria-label="Contact preview">
        <h2>Contact</h2>
      </section>
    </main>
  )
}

export default App
