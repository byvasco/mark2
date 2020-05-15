import React from 'react'
import { Helmet } from 'react-helmet'
import Header from '../main/header'
import Footer from '../main/footer'
import BottomNavigation from '../main/bottom-navigation'
import '../../styles/main.scss'

const LayoutDefault = ({ name, title, children }) => {
  return (
    <main className={`main-wrapper page-${name}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${title ? `${title} – ` : ''} MRK2SWG`}</title>
      </Helmet>

      <BottomNavigation />
      
      <Header />
      
      {children}

      <Footer />
    </main>
  )
}

export default LayoutDefault