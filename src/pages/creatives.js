import React from 'react'
import Layout from '../components/layouts/page'
import { graphql } from 'gatsby'
import Card from '../components/card'

export default ({ data }) => {
  const creatives = data.mark2cms.posts.edges;

  return (
    <Layout name="creatives" title="Creatives" intro="People behind the camera, at the workshop, and whoever, <span>creating for and about the MK2</span>.">
      <section className="cards-list">
        <div className="cards container grid-3">
          {
            creatives.map(({ node: post }) => (
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
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    mark2cms {
      posts(where: {categoryName: "creatives"}) {
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
  }
`