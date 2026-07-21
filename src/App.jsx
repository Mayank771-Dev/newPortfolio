import { useEffect, useRef, useState } from 'react'
import aboutPhoto from './assets/snap.jpeg'
import interfaceStudy from './assets/work-interface-study.png'
import dashboardStudy from './assets/work-dashboard-study.png'
import ProjectDetail from './ProjectDetail'

const navItems = ['Home', 'Works', 'About', 'Contact']

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
    number: '01',
    slug: 'email-emily',
    title: 'Email Emily',
    description: 'AI email builder for advancement professionals',
    caseStudyDescription:
      'Designing an AI email builder that replaced open-ended conversation with structured guidance',
    duration: 'Q2 2025',
    liveUrl: '',
    discipline: 'Design + Development',
    year: '2025',
    image: interfaceStudy,
    alt: 'Layered grayscale browser interface mockups',
    overviewTitle: 'From an empty prompt to a confident first draft.',
    overview:
      'Email Emily helps advancement professionals move from campaign context to a usable email draft through a focused, guided workflow. The experience keeps the speed of AI while giving people enough structure to understand, review, and shape what is being created.',
    role: 'Product design, interaction design, and frontend',
    toolkit: ['Product strategy', 'Interface design', 'React prototyping'],
    challengeTitle: 'AI felt powerful, but the blank canvas slowed people down.',
    challenge:
      'An open-ended conversation asked users to know what to prompt, what context to include, and when a draft was ready. That flexibility created uncertainty in a workflow where clarity and accuracy matter.',
    approachTitle: 'Turn the conversation into a guided, reviewable flow.',
    approach:
      'The redesigned experience breaks the task into deliberate choices, carries campaign context forward, and keeps the generated draft visible as something users can refine rather than simply accept.',
    highlights: [
      'A guided creation flow that reduces prompt-writing pressure.',
      'Reusable campaign context that keeps every draft grounded.',
      'Clear review and refinement states before an email is ready to use.',
    ],
  },
  {
    number: '02',
    slug: 'navigation-redesign',
    title: 'Navigation Redesign',
    description: 'Designing SaaS navigation with scalable information architecture',
    caseStudyDescription:
      'Reframing SaaS navigation around clearer hierarchy, faster scanning, and room to grow',
    duration: '2025',
    liveUrl: '',
    discipline: 'Product Design + Frontend',
    year: '2025',
    image: dashboardStudy,
    alt: 'Grayscale analytics dashboard displayed on a laptop',
    overviewTitle: 'A navigation system designed for everyday orientation.',
    overview:
      'This redesign explores how a growing SaaS product can remain easy to understand as features, roles, and workflows expand. The system prioritizes recognizable groups, stable destinations, and a quieter interface that supports repeated use.',
    role: 'Information architecture, product design, and frontend',
    toolkit: ['Journey mapping', 'Navigation systems', 'Responsive UI'],
    challengeTitle: 'Growth had made important destinations harder to find.',
    challenge:
      'As more tools entered the product, the navigation carried too many competing signals. Users had to remember where features lived instead of building a reliable mental model of the workspace.',
    approachTitle: 'Build a hierarchy that can scale without feeling heavier.',
    approach:
      'Related tasks were grouped around user intent, labels were simplified, and responsive states were treated as one system. The resulting structure makes current workflows easier to scan while leaving space for future modules.',
    highlights: [
      'Intent-based groups that make destinations easier to predict.',
      'Consistent expanded and compact states across screen sizes.',
      'A restrained visual hierarchy that keeps the workspace in focus.',
    ],
  },
]

const caseStudyHashPrefix = '#case-study/'

function getProjectSlugFromLocation() {
  if (typeof window === 'undefined' || !window.location.hash.startsWith(caseStudyHashPrefix)) {
    return null
  }

  return window.location.hash.slice(caseStudyHashPrefix.length)
}

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

function SiteHeader({
  isMenuOpen,
  menuRef,
  menuButtonRef,
  onToggleMenu,
  onNavigate,
}) {
  return (
    <header className="site-header">
      <div className={`site-menu${isMenuOpen ? ' is-open' : ''}`} ref={menuRef}>
        <button
          className="site-menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-menu"
          onClick={onToggleMenu}
          ref={menuButtonRef}
        >
          <span className="site-menu-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>Menu</span>
          <span className="site-menu-symbol" aria-hidden="true">
            +
          </span>
        </button>

        <div className="site-menu-dropdown" id="primary-menu">
          <nav className="site-menu-nav" aria-label="Primary navigation">
            {navItems.map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => onNavigate(event, item)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function App() {
  const [isAboutExpanded, setIsAboutExpanded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeroNameReady, setIsHeroNameReady] = useState(false)
  const [activeProjectSlug, setActiveProjectSlug] = useState(getProjectSlugFromLocation)
  const [workCursorLabel, setWorkCursorLabel] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  })

  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const contactSectionRef = useRef(null)
  const heroMediaRef = useRef(null)

  const activeProjectIndex = selectedWorks.findIndex(
    (project) => project.slug === activeProjectSlug,
  )
  const activeProject = activeProjectIndex >= 0 ? selectedWorks[activeProjectIndex] : null
  const nextProject = activeProject
    ? selectedWorks[(activeProjectIndex + 1) % selectedWorks.length]
    : null

  const showWorkCursorLabel = (event) => {
    setWorkCursorLabel({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
    })
  }

  const moveWorkCursorLabel = (event) => {
    setWorkCursorLabel((label) => ({
      ...label,
      x: event.clientX,
      y: event.clientY,
    }))
  }

  const hideWorkCursorLabel = () => {
    setWorkCursorLabel((label) => ({
      ...label,
      isVisible: false,
    }))
  }

  const openProject = (event, projectSlug) => {
    event.preventDefault()

    if (!selectedWorks.some((project) => project.slug === projectSlug)) {
      return
    }

    hideWorkCursorLabel()
    setIsMenuOpen(false)
    window.history.pushState({ project: projectSlug }, '', `${caseStudyHashPrefix}${projectSlug}`)
    setActiveProjectSlug(projectSlug)
  }

  const showPortfolioSection = (sectionId) => {
    window.history.pushState(null, '', `#${sectionId}`)
    setIsMenuOpen(false)
    setActiveProjectSlug(null)
  }

  const returnToWorks = (event) => {
    event.preventDefault()
    showPortfolioSection('works')
  }

  const returnToContact = (event) => {
    event.preventDefault()
    showPortfolioSection('contact')
  }

  const handleMenuNavigation = (event, item) => {
    setIsMenuOpen(false)

    if (activeProjectSlug) {
      event.preventDefault()
      showPortfolioSection(item.toLowerCase())
    }
  }

  useEffect(() => {
    let isActive = true

    const revealHeroName = () => {
      if (isActive) {
        setIsHeroNameReady(true)
      }
    }

    if (!document.fonts?.load) {
      revealHeroName()
      return () => {
        isActive = false
      }
    }

    document.fonts.load('400 300px "Kalam"', 'मयंक').then(revealHeroName, revealHeroName)

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const closeOnOutsidePress = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const syncProjectFromLocation = () => {
      setActiveProjectSlug(getProjectSlugFromLocation())
    }

    window.addEventListener('hashchange', syncProjectFromLocation)
    window.addEventListener('popstate', syncProjectFromLocation)

    return () => {
      window.removeEventListener('hashchange', syncProjectFromLocation)
      window.removeEventListener('popstate', syncProjectFromLocation)
    }
  }, [])

  useEffect(() => {
    document.title = activeProject ? `${activeProject.title} | Mayank Mittal` : 'Mayank Mittal'

    if (activeProject) {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      return
    }

    const sectionId = window.location.hash.slice(1)

    if (!navItems.some((item) => item.toLowerCase() === sectionId)) {
      return
    }

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    })
  }, [activeProject])

  useEffect(() => {
    const mediaGallery = heroMediaRef.current

    if (!mediaGallery) {
      return undefined
    }

    const desktopSplit = window.matchMedia('(min-width: 721px)')
    const preventGalleryScroll = (event) => {
      if (desktopSplit.matches) {
        event.preventDefault()
      }
    }

    mediaGallery.addEventListener('wheel', preventGalleryScroll, { passive: false })

    return () => {
      mediaGallery.removeEventListener('wheel', preventGalleryScroll)
    }
  }, [activeProjectSlug])

  const siteHeader = (
    <SiteHeader
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      menuButtonRef={menuButtonRef}
      onToggleMenu={() => setIsMenuOpen((isOpen) => !isOpen)}
      onNavigate={handleMenuNavigation}
    />
  )

  if (activeProject && nextProject) {
    return (
      <main className="case-study-page">
        {siteHeader}
        <ProjectDetail
          project={activeProject}
          nextProject={nextProject}
          onBack={returnToWorks}
          onContact={returnToContact}
          onOpenProject={openProject}
        />
      </main>
    )
  }

  return (
    <main className="landing-page">
      <div className="page-content" id="home">
        <div className="page-grid" aria-hidden="true">
          <span className="page-grid-line" />
          <span className="page-grid-line" />
          <span className="page-grid-line" />
          <span className="page-grid-line" />
        </div>

        {siteHeader}

        <section className="hero-section" aria-labelledby="hero-name">
          <div className="hero-copy-panel">
            <h1
              className={`hero-name${isHeroNameReady ? ' is-ready' : ''}`}
              id="hero-name"
              lang="hi"
              aria-label="मयंक"
            >
              <svg
                className="hero-name-svg"
                viewBox="0 0 960 360"
                opacity={isHeroNameReady ? 1 : 0}
                focusable="false"
                aria-hidden="true"
              >
                <defs>
                  <mask
                    id="hero-name-write-mask"
                    x="0"
                    y="0"
                    width="960"
                    height="360"
                    maskUnits="userSpaceOnUse"
                  >
                    <rect width="960" height="360" fill="black" />
                    <path
                      className="hero-name-mask-stroke hero-name-mask-stroke--main"
                      d="M38 292 C70 148 132 58 244 82 C304 96 258 236 174 294 C262 260 312 92 448 92 C502 98 454 242 360 294 C452 264 508 70 602 82 C654 94 610 232 538 282 C630 242 706 66 886 98 C930 112 872 250 758 294"
                      opacity="0"
                      pathLength="1"
                    />
                    <path
                      className="hero-name-mask-stroke hero-name-mask-stroke--headline"
                      d="M72 88 C302 68 606 69 892 90"
                      opacity="0"
                      pathLength="1"
                    />
                    <rect
                      className="hero-name-mask-finish"
                      width="960"
                      height="360"
                      fill="white"
                      opacity="0"
                    />
                  </mask>
                </defs>

                <text
                  className="hero-name-text hero-name-ink"
                  x="480"
                  y="282"
                  textAnchor="middle"
                  mask="url(#hero-name-write-mask)"
                >
                  मयंक
                </text>
              </svg>
            </h1>

            <div className="hero-meta" aria-label="Portfolio information">
              <p>Chandigarh, IN</p>
              <p>Designing and building digital experiences</p>
              <p>Portfolio' 2026</p>
            </div>
          </div>

          <div className="hero-media-grid" ref={heroMediaRef}>
            <figure className="hero-media-slot hero-media-slot--one" />
            <figure className="hero-media-slot hero-media-slot--two" />
            <figure className="hero-media-slot hero-media-slot--three" />
            <figure className="hero-media-slot hero-media-slot--four" />
            <figure className="hero-media-slot hero-media-slot--five" />
            <figure className="hero-media-slot hero-media-slot--seven" />
            <figure className="hero-media-slot hero-media-slot--eight" />
            <figure className="hero-media-slot hero-media-slot--nine" />
          </div>
        </section>

        <section className="works-section" id="works" aria-labelledby="works-title">
          <div className="works-heading-stage">
            <span className="works-outline" aria-hidden="true">
              Selected
            </span>
            <div className="works-heading">
              <p>2022-2026</p>
              <h2 id="works-title">Works</h2>
            </div>
          </div>

          <div className="works-grid">
            {selectedWorks.map((project) => (
              <article className="work-card" key={project.title}>
                <a
                  className="work-card-link"
                  href={`${caseStudyHashPrefix}${project.slug}`}
                  onClick={(event) => openProject(event, project.slug)}
                  onPointerEnter={showWorkCursorLabel}
                  onPointerLeave={hideWorkCursorLabel}
                  onPointerMove={moveWorkCursorLabel}
                >
                  <figure className="work-visual">
                    <img src={project.image} alt={project.alt} />
                  </figure>
                  <div className="work-card-details">
                    <div className="work-title-copy">
                      <h3>{project.title}</h3>
                      <p className="work-description">{project.description}</p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          <span
            className={`work-cursor-label${workCursorLabel.isVisible ? ' is-visible' : ''}`}
            style={{
              left: `${workCursorLabel.x}px`,
              top: `${workCursorLabel.y}px`,
            }}
            aria-hidden="true"
          >
            (Read)
          </span>
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

        <section
          ref={contactSectionRef}
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
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
                <RollText>Curriculum Vitae</RollText>
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
      </div>
    </main>
  )
}

export default App
