import React from 'react'
import Layout from './default'

const LayoutPage = ({ name, title, intro, children }) => {
  return (
    <Layout name={name} title={title}>
      <header className="page-header">
        <div className="container flex-col-center">
          <h1 className="title title-1">{title}</h1>
          <h2 className="intro subtitle-2" dangerouslySetInnerHTML={{__html: intro}}></h2>
        </div>
      </header>

      {children}
    </Layout>
  )
}

export default LayoutPage