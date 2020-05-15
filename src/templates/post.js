import React from 'react'
import Layout from '../components/layouts/default';
import { Link, graphql } from 'gatsby';
import Card from '../components/card';

const PostTemplate = ({ data }) => {
  const post = data.post;
  const cover = post.frontmatter.cover;
  const title = post.frontmatter.title;
  const category = post.frontmatter.category;

  const nextStory = data.next;
  const prevStory = data.prev;

  return (
    <Layout className="post" name="post" title={title}>
      <div className="container">
        <header className="post-header">
          <figure className="post-cover">
            <img src={cover} alt={title}/>
          </figure>

          <div className="details">
            <Link to={`/${category.toLowerCase()}/`} className="post-category caption-2">{category}</Link>

            <h1 className="post-title title-1">{title}</h1>
          </div>
        </header>
      </div>

      <div className="container-smaller">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <div className="container-smaller">
        <div className="post-footer grid-2">
          <p className="caption-1">Liked it? Share it!</p>

          <ul className="actions">
            <li>
              <a href="#" className="action facebook button-2">Facebook</a>
            </li>

            <li>
              <a href="#" className="action twitter button-2">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-small">
        <div className="more flex-col-center">
          <h6 className="section-title title-6">You might like these too!</h6>

          <div className="cards grid-2">
            <Card
              type = "small"
              cover = {prevStory.frontmatter.cover}
              title = {prevStory.frontmatter.title}
              category = {prevStory.frontmatter.category}
              slug = {prevStory.frontmatter.custom_slug ? prevStory.frontmatter.custom_slug : prevStory.fields.slug}
            />

            <Card
              type = "small"
              cover = {nextStory.frontmatter.cover}
              title = {nextStory.frontmatter.title}
              category = {nextStory.frontmatter.category}
              slug = {nextStory.frontmatter.custom_slug ? nextStory.frontmatter.custom_slug : nextStory.fields.slug}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $slugNext: String!, $slugPrev: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        cover
        title
        category
      }
    }

    next: markdownRemark(fields: { slug: { eq: $slugNext } }) {
      frontmatter {
        title
        cover
        category
        custom_slug
      }

      fields {
        slug
      }
    }

    prev: markdownRemark(fields: { slug: { eq: $slugPrev } }) {
      frontmatter {
        title
        cover
        category
        custom_slug
      }

      fields {
        slug
      }
    }
  }
`

export default PostTemplate;