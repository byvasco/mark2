import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layouts/page'

export default ({ data }) => {
  const imageVasco = data.file.childImageSharp.fluid;

  return (
    <Layout name="about" title="About" intro="A brand and a community with the goal of uniting passionates for the Mark2 Golfs and Jettas.">

      <section className="content">
        <div className="container-narrow grid-2">
          <div className="image-container">
            <Img fluid={imageVasco}/>
          </div>

          <div className="text">
            <p className="body-long">I'm Vasco, a designer from Portugal and also the dude that started Mk2Swag.</p>
            <p className="body-long"> My first car, a 1990 Golf, was bought in July 2015 in pretty rough shape, something you can usually expect from a 400€ purchase. For my surprise the car was relatively good, mechanically speaking, and is still alive in the day of writing this. After I bought it I immediately started to search and save a lot of images of other MK2’s to get inspiration for my own car, and almost 2 years later I decided to open Mk2Swag’s Instagram account as a way to share those images and to connect with the community.</p>
            <p className="body-long">Today, after the purchase of my second Golf, the passion for these old metal boxes is even bigger.</p>
          </div>
        </div>
      </section>

      <section className="contact">
        <div className="container flex-col-center">
          <h3 className="section-title title-4">Reach out!</h3>
          <p>Questions, feedback or just want to say hi? <br/>Send an email to <a className="link" href="mailto:mk2swg@gmail.com">mk2swg@gmail.com</a>.</p>
        </div>
      </section>

    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "page-about/vasco.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 880) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`