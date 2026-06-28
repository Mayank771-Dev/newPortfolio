import { useEffect, useState } from 'react'

const identities = [
  'Pixel Mechanic',
  'Code Crafter',
  'Interface Alchemist',
  'Motion & Markup',
  'div.god',
  'Flexbox Therapist',
  'CSS Whisperer',
  'JavaScript Juggler',
  'React Wrangler',
  'Web Wizard',
]

const shuffleIdentities = () => {
  const shuffled = [...identities]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

const createNextOrder = (previousOrder) => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const nextOrder = shuffleIdentities()
    const hasDifferentOrder = nextOrder.some(
      (identity, index) => identity !== previousOrder[index],
    )
    const avoidsImmediateRepeat =
      nextOrder[0] !== previousOrder[previousOrder.length - 1]

    if (hasDifferentOrder && avoidsImmediateRepeat) return nextOrder
  }

  return [...previousOrder.slice(1), previousOrder[0]]
}

function TerminalIdentity() {
  const [identityOrder, setIdentityOrder] = useState(shuffleIdentities)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIdentity = identityOrder[activeIndex]

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) return undefined

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        if (currentIndex < identities.length - 1) return currentIndex + 1

        setIdentityOrder((currentOrder) => createNextOrder(currentOrder))
        return 0
      })
    }, 2600)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <p className="discipline identity-line" aria-live="polite">
      <span className="identity-prompt" aria-hidden="true">&gt;</span>
      <span key={activeIdentity} className="identity-text">
        {activeIdentity}
      </span>
      <span className="identity-cursor" aria-hidden="true" />
    </p>
  )
}

export default TerminalIdentity
