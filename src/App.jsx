import mayankCutout from './assets/mayank-cutout-transparent.png'

const navItems = ['Works', 'About', 'Contact']

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
            I <em>design</em>, I code, I overthink
            <br />
            the hover effects-usually with
            <br />
            slow songs playing and a hazelnut
            <br />
            coffee getting <em>dangerously cold</em>.
          </p>
        </div>

        <div className="location-block">
          <span className="plus" aria-hidden="true">
            +
          </span>
          <p>

  Based in <em>Chandigarh</em>, turning rough ideas

  <br />

  into polished digital experiences.

  <br />

  Currently exploring where design,

  <br />

  code, and <em>curiosity collide</em>.

</p>
        </div>

        <img className="hero-portrait" src={mayankCutout} alt="Mayank Mittal" />
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
