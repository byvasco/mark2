import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layouts/default'
import Card from '../components/card'

const Home = ({ data }) => {
  const latestStory = data.recentStories.posts.edges[0].node;
  const recentStories = data.recentStories.posts.edges.slice(-3);
  const recentCreatives = data.recentCreatives.posts.edges;

  const imagePromoIg = data.imagePromoIg.childImageSharp.fluid;
  

  return (
    <Layout name="home" title="Home" image={latestStory.featuredImage.sourceUrl}>
      <section className="hero">
        <div className="container flex-center">
          <h1 className="section-title subtitle-1">Uniting passionates for the <span>Mark2 Golf and Jetta</span>.</h1>
        </div>
      </section>

      <section className="stories section-content">
        <div className="container flex-col-center">
          <h2 className="section-title title-5">Recent Stories</h2>

          <div className="cards">
            <Link to={latestStory.uri} className="featured">
              <figure className="post-cover">
                <img src={latestStory.featuredImage.sourceUrl} alt={latestStory.title} />
              </figure>
              
              <div className="details">
                <Link to={`/${latestStory.categories.edges[0].node.slug}/`} className="post-category caption-2">{latestStory.categories.edges[0].node.name}</Link>
                <h3 className="post-title title-2">{latestStory.title}</h3>
                <p className="post-excerpt body" dangerouslySetInnerHTML={{ __html: latestStory.excerpt }}></p>
                <p className="action button-1 underline">Read Story</p>
              </div>
            </Link>

            <div className="recent">
              <div className="cards grid-3">
              {
                recentStories.map(({ node: post }) => (
                  <Card
                    type = "small"
                    cover = {post.featuredImage.sourceUrl}
                    title = {post.title}
                    category = {post.categories.edges[0].node.name}
                    slug = {post.uri}
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
                  cover = {post.featuredImage.sourceUrl}
                  title = {post.title}
                  category = {post.categories.edges[0].node.name}
                  slug = {post.uri}
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
    recentStories: mark2cms {
      posts(first: 4, where: {categoryName: "stories"}) {
        edges {
          node {
            title
            featuredImage {
              sourceUrl
            }
            categories(first: 1) {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            excerpt
            uri
          }
        }
      }
    }

    recentCreatives: mark2cms {
      posts(last: 2, where: {categoryName: "creatives"}) {
        edges {
          node {
            title
            featuredImage {
              sourceUrl
            }
            categories(first: 1) {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            uri
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