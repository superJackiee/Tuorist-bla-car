import { useState, useEffect, Fragment } from 'react'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'

const HorizontalLayout = props => {
  const { children } = props
  const [isMounted, setIsMounted] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)

  const cleanup = () => {
    setIsMounted(false)
    setNavbarScrolled(false)
  }

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 65 && navbarScrolled === false) {
        setNavbarScrolled(true)
      }
      if (window.pageYOffset < 65) {
        setNavbarScrolled(false)
      }
    })
    return () => cleanup()
  }, [])


  if (!isMounted) {
    return null
  }

  return (
    <Fragment>
      <NavbarComponent />
      <main className="site-space">
        {children}
      </main>
      <FooterComponent />
    </Fragment>
  )
}
export default HorizontalLayout