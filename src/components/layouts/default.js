import React from 'react'
import SEO from '../SEO'
import Header from '../main/header'
import Footer from '../main/footer'
import BottomNavigation from '../main/bottom-navigation'
import '../../styles/main.scss'

const LayoutDefault = ({ name, title, image, children }) => {
  return (
    <main className={`main-wrapper page-${name}`}>
      <SEO title={title} image={image} />

      <BottomNavigation />
      
      <Header />
      
      {children}

      <Footer />
    </main>
  )
}

export default LayoutDefault