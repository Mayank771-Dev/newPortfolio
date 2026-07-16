import { useEffect, useRef, useState } from 'react'
import mayankCutout from './assets/mayank-cutout-transparent.png'
import TerminalIdentity from './TerminalIdentity'
import aboutPhoto from './assets/snap.jpeg'
import interfaceStudy from './assets/work-interface-study.png'
import dashboardStudy from './assets/work-dashboard-study.png'

const navItems = ['Works', 'About', 'Contact']

const HEADER_LOCK_EARLY_OFFSET = 40

const resumeUrl =
  'https://drive.google.com/file/d/1hvvDhArFioGzD1q-reanz4nmJm_UDAGR/view?usp=sharing'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Mayank771-Dev',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mayank-mittal-4ba08528b/',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mayankmittal261/',
  },
]

const selectedWorks = [
  {
    title: 'Interface Study',
    discipline: 'Design + Development',
    year: '2025',
    image: interfaceStudy,
    alt: 'Layered grayscale browser interface mockups',
  },
  {
    title: 'Dashboard Study',
    discipline: 'Product Design + Frontend',
    year: '2025',
    image: dashboardStudy,
    alt: 'Grayscale analytics dashboard displayed on a laptop',
  },
]

function RollText({ children }) {
  return (
    <span className="nav-roll">
      <span className="nav-roll-track">
        <span className="nav-roll-text">{children}</span>
        <span className="nav-roll-text" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  )
}

function App() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)
  const [headerLockTop, setHeaderLockTop] = useState(null)
  const [portraitLabel, setPortraitLabel] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  })

  const headerRef = useRef(null)
  const aboutImageRef = useRef(null)
  const aboutSectionRef = useRef(null)
  const contactSectionRef = useRef(null)

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

  useEffect(() => {
    let frameId = 0

    const updateHeaderLock = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0

        const header = headerRef.current
        const aboutImage = aboutImageRef.current
        const aboutSection = aboutSectionRef.current

        if (!header || !aboutSection) {
          setHeaderLockTop(null)
          return
        }

        const stopTarget = aboutImage || aboutSection
        const stopTargetBottom = window.scrollY + stopTarget.getBoundingClientRect().bottom
        const nextLockTop = Math.max(
          0,
          Math.round(stopTargetBottom - header.offsetHeight - HEADER_LOCK_EARLY_OFFSET),
        )
        const shouldLockHeader = window.scrollY >= nextLockTop

        setHeaderLockTop((currentLockTop) => {
          const resolvedLockTop = shouldLockHeader ? nextLockTop : null
          return currentLockTop === resolvedLockTop ? currentLockTop : resolvedLockTop
        })
      })
    }

    updateHeaderLock()
    window.addEventListener('scroll', updateHeaderLock, { passive: true })
    window.addEventListener('resize', updateHeaderLock)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }

      window.removeEventListener('scroll', updateHeaderLock)
      window.removeEventListener('resize', updateHeaderLock)
    }
  }, [])

  const isHeaderLocked = headerLockTop !== null

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

      <div className="page-content">
        <header
          ref={headerRef}
          className={`site-header${isHeaderLocked ? ' is-scroll-locked' : ''}`}
          style={isHeaderLocked ? { '--header-lock-top': `${headerLockTop}px` } : undefined}
        >
          <a className="brand-mark" href="#home" aria-label="Mayank Mittal home">
            mayank<span aria-hidden="true">*</span>mtl
          </a>

          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                <RollText>({item})</RollText>
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
            tabIndex={0}
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

        <section className="works-section" id="works" aria-labelledby="works-title">
          <div className="works-heading-stage">
            <span className="works-outline" aria-hidden="true">
              Selected
            </span>
            <div className="works-heading">
              <p>2022-2025</p>
              <h2 id="works-title">Works</h2>
            </div>
          </div>

          <div className="works-grid">
            {selectedWorks.map((project, index) => (
              <article className="work-card" key={project.title}>
                <figure className="work-visual">
                  <img src={project.image} alt={project.alt} />
                </figure>
                <div className="work-card-details">
                  <div>
                    <p className="work-index">/{String(index + 1).padStart(2, '0')}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="work-meta">
                    {project.discipline}
                    <span>{project.year}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={aboutSectionRef}
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <span className="about-outline" aria-hidden="true">
            About
          </span>

          <div className="about-image-slot" ref={aboutImageRef}>
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
            <RollText>(Beyond the Code)</RollText>
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
      </div>

      <section
        ref={contactSectionRef}
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="contact-copy">
          <p className="contact-kicker">/ Contact me</p>
          <h2 id="contact-title">Let's talk</h2>

          <div className="contact-details" aria-label="Contact details">
            <div className="contact-detail-group">
              <p className="contact-label">/ General enquiries</p>
              <a href="mailto:mittalmayank1977@gmail.com">mittalmayank1977@gmail.com</a>
            </div>

            <div className="contact-detail-group">
              <p className="contact-label">/ Location</p>
              <p>
                Chandigarh, India
                <br />
                Available for freelance projects,
                <br />
                collaborations, and curious ideas.
              </p>
            </div>

            <div className="contact-socials" aria-label="Social links">
              <p className="contact-label">/ Socials</p>
              <div className="contact-social-links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-resume-actions">
            <a href={resumeUrl} target="_blank" rel="noreferrer">
              <RollText>The Story So Far</RollText>
            </a>
          </div>
        </div>

        <figure className="contact-image-card" aria-label="Portfolio memory card">
          <img src={aboutPhoto} alt="Mayank working on laptop" />
          <figcaption>
            <span>Memories</span>
            <span>Chandigarh, IN</span>
          </figcaption>
        </figure>

        <footer className="contact-footer">
          <p className="footer-credit">
            Thanks for stopping by. Made with love 🤍 by Mayank Mittal
          </p>
        </footer>
      </section>
    </main>
  )
}

export default App
