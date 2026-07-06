import { useState } from 'react'
import mayankCutout from './assets/mayank-cutout-transparent.png'
import TerminalIdentity from './TerminalIdentity'
import aboutPhoto from './assets/snap.jpeg'
const navItems = ['Works', 'About', 'Contact']

function App() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)
  const [portraitLabel, setPortraitLabel] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  })

  const showPortraitLabel = (event) => {
    setPortraitLabel({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
    })
  }

  const movePortraitLabel = (event) => {
    setPortraitLabel((label) => ({
      ...label,
      x: event.clientX,
      y: event.clientY,
    }))
  }

  const hidePortraitLabel = () => {
    setPortraitLabel((label) => ({
      ...label,
      isVisible: false,
    }))
  }

  return (
    <main className="landing-page">
      <div className="page-grid" aria-hidden="true">
        <span className="page-grid-line" />
        <span className="page-grid-line" />
        <span className="page-grid-line" />
        <span className="page-grid-line" />
        <span className="page-grid-horizontal line-1" />
        <span className="page-grid-horizontal line-2" />
      </div>

      <header className="site-header">
        <a className="brand-mark" href="#home" aria-label="Mayank Mittal home">
          mayank<span aria-hidden="true">*</span>mtl
        </a>

        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              <span className="nav-roll">
                <span className="nav-roll-track">
                  <span className="nav-roll-text">({item})</span>
                  <span className="nav-roll-text" aria-hidden="true">
                    ({item})
                  </span>
                </span>
              </span>
            </a>
          ))}
        </nav>

        <a className="availability" href="mailto:mittalmayank1977@gmail.com">
          <span className="availability-star" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 1v22M1 12h22M4.22 4.22l15.56 15.56M19.78 4.22 4.22 19.78" />
            </svg>
          </span>
          Open to work
        </a>
      </header>

      <section className="hero-section" id="home" aria-labelledby="hero-title">
        <h1 id="hero-title" className="hero-title">
          <span className="first-name">Mayank</span>
          <span className="last-name">Mittal</span>
        </h1>

        <TerminalIdentity />

        <div className="intro-block">
          <span className="plus" aria-hidden="true">
            *
          </span>
          <p>
            <span className="intro-line intro-line--lead">
              I <em>design</em>, I code, I overthink
            </span>
            <span className="intro-line intro-line--middle">
              the hover effects-usually with
            </span>
            <span className="intro-line intro-line--long">
              slow songs playing and a hazelnut
            </span>
            <span className="intro-line">
              coffee getting <em>dangerously cold</em>.
            </span>
          </p>
        </div>

        <div className="location-block">
          <span className="plus" aria-hidden="true">
            *
          </span>
          <p>
            <span className="location-line">
              <span className="location-spaced-word">Based in</span>
              <em>Chandigarh</em>, turning rough
            </span>
            <span className="location-line">
              <span className="location-spaced-word">ideas</span> into polished digital
              experiences.
            </span>
            <span className="location-line">Currently exploring where design, code,</span>
            <span className="location-line">
              and <em>curiosity collide</em>.
            </span>
          </p>
        </div>

        <div
          className="hero-portrait-wrap"
          aria-label="Mayank Mittal portrait"
          onPointerEnter={showPortraitLabel}
          onPointerLeave={hidePortraitLabel}
          onPointerMove={movePortraitLabel}
          tabIndex="0"
        >
          <img className="hero-portrait" src={mayankCutout} alt="Mayank Mittal" />
        </div>

        <span
          className={`portrait-cursor-label${portraitLabel.isVisible ? ' is-visible' : ''}`}
          style={{
            left: `${portraitLabel.x}px`,
            top: `${portraitLabel.y}px`,
          }}
          aria-hidden="true"
        >
          Dont touch okay!!
        </span>
      </section>

      <section className="below-fold" id="works" aria-label="Works preview">
        <h2>Selected Works</h2>
      </section>
      <section className="about-section" id="about" aria-labelledby="about-title">
        <span className="about-outline" aria-hidden="true">
          About
        </span>

        <div className="about-image-slot">
  <img src={aboutPhoto} alt="Mayank working on laptop" />
</div>

        <div className="about-copy">
          <h2 id="about-title">About</h2>
          <p>
  I build websites that people enjoy using—not just looking at.
  <br />
  Blending thoughtful design with clean, scalable code, I create interactive
  experiences that feel fast, intuitive, and memorable. Whether it's a landing
  page, a portfolio, or a full-fledged web application, I love turning ideas
  into polished digital products.
</p>
        </div>

        <button
          className="about-learn-more"
          type="button"
          aria-expanded={isAboutExpanded}
          aria-controls="about-beyond-copy"
          onClick={() => setIsAboutExpanded((isExpanded) => !isExpanded)}
        >
          <span className="nav-roll">
            <span className="nav-roll-track">
              <span className="nav-roll-text">(Beyond the Code)</span>
              <span className="nav-roll-text" aria-hidden="true">
                (Beyond the Code)
              </span>
            </span>
          </span>
        </button>

        <div
          className={`about-beyond-copy${isAboutExpanded ? ' is-open' : ''}`}
          id="about-beyond-copy"
        >
          <p>
            I believe the best digital experiences aren’t created by code alone—they’re
            shaped by curiosity, patience, and countless small iterations. When I’m away
            from my editor, you’ll usually find me exploring beautifully crafted
            websites, collecting inspiration on Pinterest, watching films, or
            discovering music from every genre imaginable. I value quiet moments just as
            much as creative ones—whether that’s playing a game of chess or sitting in a
            peaceful garden with an iced coffee, letting new ideas slowly take shape.
          </p>
        </div>
      </section>
      <section className="below-fold" id="contact" aria-label="Contact preview">
        <h2>Contact</h2>
      </section>
    </main>
  )
}

export default App
