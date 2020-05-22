import React, { Component } from 'react';
import parse from 'html-react-parser';
import Layout from '../components/layouts/default';
import { Link, graphql } from 'gatsby';
import Card from '../components/card';
import ImageModal from '../components/image-modal';

class PostTemplate extends Component {
  constructor(props) {
    super(props);
    
    this.handleOpenImage = this.handleOpenImage.bind(this);
    this.handleCloseImage = this.handleCloseImage.bind(this);
    
    this.post = {
      title: props.data.post.postBy.title,
      cover: props.data.post.postBy.featuredImage.sourceUrl,
      intro: props.data.post.postBy.postHeader.intro,
      content: props.data.post.postBy.content,
      category: props.data.post.postBy.categories.edges[0].node,
    }

    this.nextStory = {
      title: props.data.next.postBy.title,
      category: props.data.next.postBy.categories.edges[0].node,
      cover: props.data.next.postBy.featuredImage.sourceUrl,
      slug: props.data.next.postBy.uri,
    }

    this.previousStory = {
      title: props.data.previous.postBy.title,
      category: props.data.previous.postBy.categories.edges[0].node,
      cover: props.data.previous.postBy.featuredImage.sourceUrl,
      slug: props.data.previous.postBy.uri,
    }

    this.state = {
      imageModalOpen: false,
      imageModalSrc: '',
      imageModalSrcSet: '',
    }
  }

  handleOpenImage(src, srcSet) {
    this.setState({
      imageModalOpen: !this.state.imageModalOpen,
      imageModalSrc: src,
      imageModalSrcSet: srcSet,
    })
  }

  handleCloseImage() {
    this.setState({
      imageModalOpen: !this.state.imageModalOpen,
      imageModalSrc: '',
      imageModalSrcSet: '',
    })
  }

  render() {
    const handleOpenImage = this.handleOpenImage;
    
    return (
      <Layout className="post" name="post" title={this.post.title} image={this.post.cover}>
        <div className="container">
          <header className="post-header">
            <figure className="post-cover">
              <img src={this.post.cover} alt={this.post.title}/>
            </figure>

            <div className="details">
              <Link to={`/${this.post.category.slug}/`} className="post-category caption-2">{this.post.category.name}</Link>

              <h1 className="post-title title-1">{this.post.title}</h1>
            </div>
          </header>
        </div>

        <div className="container-smaller">
          {
            this.state.imageModalOpen &&
            <ImageModal
              src={this.state.imageModalSrc}
              srcSet={this.state.imageModalSrcSet}
              handler={this.handleCloseImage}
            />
          }
          <div className="post-content">
            <p className="subtitle-2">{this.post.intro}</p>
            
            {parse(this.post.content, {
              replace: function(node) {
                if (node.name === 'img') {
                  return React.createElement('img', {
                    src: node.attribs.src,
                    srcSet: node.attribs.srcset,
                    onClick: () => { handleOpenImage(node.attribs.src, node.attribs.srcset) }
                  })
                }
              }
            })}
          </div>
        </div>

        <div className="container-smaller">
          <div className="post-footer grid-2">
            <p className="caption-1">Liked it? Share it!</p>

            <ul className="actions">
              <li>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`} onclick="window.open(this.href, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" className="action facebook button-2">Facebook</a>
              </li>

              <li>
                <a href={`https://twitter.com/intent/tweet?text=Chuff, Photographer%20on%20MK2SWAG&amp;url=${typeof window !== 'undefined' ? window.location.href : ''}`} onclick="window.open(this.href, 'pop-up', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;" className="action twitter button-2">Twitter</a>
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
                cover = {this.previousStory.cover}
                title = {this.previousStory.title}
                category = {this.previousStory.category.name}
                slug = {this.previousStory.slug}
              />

              <Card
                type = "small"
                cover = {this.nextStory.cover}
                title = {this.nextStory.title}
                category = {this.nextStory.category.name}
                slug = {this.nextStory.slug}
              />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
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
        postHeader {
          intro
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