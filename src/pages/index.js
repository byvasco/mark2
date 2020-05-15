import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layouts/default'
import Card from '../components/card'

const Home = ({ data }) => {
  const latestStory = data.latestStory.edges[0].node;
  const recentStories = data.recentStories.edges;
  const recentCreatives = data.recentCreatives.edges;
  const imagePromoIg = data.imagePromoIg.childImageSharp.fluid;

  return (
    <Layout name="home">
      <section className="hero">
        <div className="container flex-center">
          <h1 className="section-title subtitle-1">Uniting passionates for the <span>Mark2 Golf and Jetta</span>.</h1>
        </div>
      </section>

      <section className="stories section-content">
        <div className="container flex-col-center">
          <h2 className="section-title title-5">Recent Stories</h2>

          <div className="cards">
            <Link to={latestStory.fields.slug} className="featured">
              <figure className="post-cover">
                <img src={latestStory.frontmatter.cover} alt={latestStory.frontmatter.title} />
              </figure>
              
              <div className="details">
                <p className="post-category caption-2">{latestStory.frontmatter.category}</p>
                <h3 className="post-title title-2">{latestStory.frontmatter.title}</h3>
                <p className="post-excerpt body">{latestStory.excerpt}</p>
                <p className="action button-1 underline">Read Story</p>
              </div>
            </Link>

            <div className="recent">
              <div className="cards grid-3">
              {
                recentStories.map(({ node: post }) => (
                  <Card
                    type = "small"
                    cover = {post.frontmatter.cover}
                    title = {post.frontmatter.title}
                    category = {post.frontmatter.category}
                    slug = {post.fields.slug}
                  />
                ))
              }
              </div>
            </div>
          </div>

          <Link to="/stories/" className="button-1 underline">View More</Link>
        </div>
      </section>

      <section className="promo-ig">
        <div className="container flex-col-center">
          <p className="section-title subtitle-2"><span>Tune in with us on Instagram</span> and join our community!</p>
          <a href="https://www.instagram.com/mk2swag/" className="button-1 underline">@Mk2Swag</a>
          
          <div className="image-container">
            <Img fluid={imagePromoIg}/>
          </div>
        </div>
      </section>

      <section className="creatives section-content">
        <div className="container flex-col-center">
          <h2 className="section-title title-5">Creatives</h2>

          <div className="cards grid-2">
            {
              recentCreatives.map(({ node: post }) => (
                <Card
                  type = "half"
                  cover = {post.frontmatter.cover}
                  title = {post.frontmatter.title}
                  category = {post.frontmatter.category}
                  slug = {post.fields.slug}
                />
              ))
            }
          </div>

          <Link to="/creatives/" className="button-1 underline">View More</Link>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    latestStory: allMarkdownRemark (limit: 1, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            cover
            category
          }

          excerpt

          fields {
            slug
          }
        }
      }
    }

    recentStories: allMarkdownRemark (
      skip: 1,
      limit: 3,
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: {
          regex: "/(stories)/"
        }
      }
      ) {
      edges {
        node {
          frontmatter {
            title
            cover
            category
          }

          fields {
            slug
          }
        }
      }
    }

    recentCreatives: allMarkdownRemark (
      limit: 2,
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {
        fileAbsolutePath: {
          regex: "/(creatives)/"
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover
            category
          }

          fields {
            slug
          }
        }
      }
    }

    imagePromoIg: file(relativePath: { eq: "page-home/promo-ig.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 880) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default Home;