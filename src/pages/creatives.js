import React from 'react'
import Layout from '../components/layouts/page'
import { graphql } from 'gatsby'
import Card from '../components/card'

export default ({ data }) => {
  const stories = data.allMarkdownRemark.edges;

  return (
    <Layout name="creatives" title="Creatives" intro="People behind the camera, at the workshop, and whoever, <span>creating for and about the MK2</span>.">
      <section className="cards-list">
        <div className="cards container grid-3">
          {
            stories.map(({ node: post }) => (
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
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (
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
  }
`