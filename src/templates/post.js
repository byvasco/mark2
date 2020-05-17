import React from 'react'
import Layout from '../components/layouts/default';
import { Link, graphql } from 'gatsby';
import Card from '../components/card';

const PostTemplate = ({ data }) => {
  console.log(data)  

  const post = data.post.postBy;
  const cover = post.featuredImage.sourceUrl;
  const title = post.title;
  const category = post.categories.edges[0].node;

  const nextStory = data.next.postBy;
  const previousStory = data.previous.postBy;

  return (
    <Layout className="post" name="post" title={title} image={cover}>
      <div className="container">
        <header className="post-header">
          <figure className="post-cover">
            <img src={cover} alt={title}/>
          </figure>

          <div className="details">
            <Link to={`/${category.slug}/`} className="post-category caption-2">{category.name}</Link>

            <h1 className="post-title title-1">{title}</h1>
          </div>
        </header>
      </div>

      <div className="container-smaller">
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
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
              cover = {previousStory.featuredImage.sourceUrl}
              title = {previousStory.title}
              category = {previousStory.categories.edges[0].node.name}
              slug = {previousStory.uri}
            />

            <Card
              type = "small"
              cover = {nextStory.featuredImage.sourceUrl}
              title = {nextStory.title}
              category = {nextStory.categories.edges[0].node.name}
              slug = {nextStory.uri}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $slugPrev: String!, $slugNext: String!) {
    post: mark2cms {
      postBy(slug: $slug) {
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
        content
        id
      }
    }

    next: mark2cms {
      postBy(slug: $slugNext) {
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

    previous: mark2cms {
      postBy(slug: $slugPrev) {
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
`

export default PostTemplate;