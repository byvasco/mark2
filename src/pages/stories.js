import React from 'react'
import Layout from '../components/layouts/page'
import { graphql } from 'gatsby'
import Card from '../components/card'

export default ({ data }) => {
  const stories = data.mark2cms.posts.edges;
  
  return (
    <Layout name="stories" title="Stories" intro="There’s a story with every ride. These are the ones <span>from our community</span>.">
      <section className="cards-list">
        <div className="cards container grid-3">
          {
            stories.map(({ node: post }) => (
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
      posts(where: {categoryName: "stories"}) {
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