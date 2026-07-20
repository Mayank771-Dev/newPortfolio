function ProjectDetail({ project, nextProject, onBack, onContact, onOpenProject }) {
  return (
    <>
      <div className="case-study-grid" aria-hidden="true">
        <span className="case-study-grid-line" />
        <span className="case-study-grid-line" />
        <span className="case-study-grid-line" />
        <span className="case-study-grid-line" />
      </div>

      <article className="case-study-shell">
        <header className="case-study-hero">
          <p className="case-study-kicker">/ Case study {project.number}</p>
          <a className="case-study-back" href="#works" onClick={onBack}>
            <span aria-hidden="true">&larr;</span>
            <span>Return to Home</span>
          </a>

          <div className="case-study-title-block">
            <h1>{project.title}</h1>
            <div className="case-study-title-meta">
              <p className="case-study-duration">{project.duration}</p>
              <p className="case-study-description">{project.caseStudyDescription}</p>
            </div>
          </div>
        </header>

        <section className="case-study-showcase" aria-labelledby={`${project.slug}-overview`}>
          <figure className="case-study-visual">
            <img src={project.image} alt={project.alt} />
            <figcaption>
              <span>{project.title}</span>
              <span>{project.year}</span>
            </figcaption>
          </figure>

          <div className="case-study-overview">
            <p className="case-study-label">/ Overview</p>
            <h2 id={`${project.slug}-overview`}>{project.overviewTitle}</h2>
            <p className="case-study-overview-copy">{project.overview}</p>

            <div className="case-study-specs">
              <div>
                <p className="case-study-label">/ Role</p>
                <p>{project.role}</p>
              </div>

              <div>
                <p className="case-study-label">/ Toolkit</p>
                <ul>
                  {project.toolkit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="case-study-process" aria-label="Project process">
          <div className="case-study-process-block">
            <p className="case-study-label">/ Challenge</p>
            <h2>{project.challengeTitle}</h2>
            <p>{project.challenge}</p>
          </div>

          <div className="case-study-process-block">
            <p className="case-study-label">/ Approach</p>
            <h2>{project.approachTitle}</h2>
            <p>{project.approach}</p>
          </div>
        </section>

        <section className="case-study-highlights" aria-labelledby={`${project.slug}-highlights`}>
          <p className="case-study-label">/ Highlights</p>
          <h2 id={`${project.slug}-highlights`}>What shaped the final experience</h2>
          <ol>
            {project.highlights.map((highlight, index) => (
              <li key={highlight}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{highlight}</p>
              </li>
            ))}
          </ol>
        </section>

        <a
          className="case-study-next"
          href={`#case-study/${nextProject.slug}`}
          onClick={(event) => onOpenProject(event, nextProject.slug)}
        >
          <span className="case-study-label">/ Next project</span>
          <strong>{nextProject.title}</strong>
          <span className="case-study-next-arrow" aria-hidden="true">
            &rarr;
          </span>
        </a>

        <footer className="case-study-footer">
          <a href="#contact" onClick={onContact}>
            Have a question about this project? Let&apos;s talk.
          </a>
        </footer>
      </article>
    </>
  )
}

export default ProjectDetail
