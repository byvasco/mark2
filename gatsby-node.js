const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// Stories
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: 'stories' });

//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      stories: mark2cms {
        posts(where: {categoryName: "stories"}) {
          edges {
            node {
              slug
              uri
              id
            }
          }
        }
      }

      creatives: mark2cms {
        posts(where: {categoryName: "creatives"}) {
          edges {
            node {
              slug
              uri
              id
            }
          }
        }
      }
    }
  `);

  const stories = result.data.stories.posts.edges;
  const creatives = result.data.creatives.posts.edges;
  
  stories.forEach(({ node }, index) => {    
    createPage({
      path: node.uri,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug: node.slug,
        id: node.id,
        slugNext: index === stories.length - 1 ? stories[0].node.slug : stories[index + 1].node.slug,
        slugPrev: index === 0 ? stories[stories.length - 1].node.slug : stories[index - 1].node.slug,
      }
    });
  });

  creatives.forEach(({ node }, index) => {    
    createPage({
      path: node.uri,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug: node.slug,
        id: node.id,
        slugNext: index === creatives.length - 1 ? creatives[0].node.slug : creatives[index + 1].node.slug,
        slugPrev: index === 0 ? creatives[creatives.length - 1].node.slug : creatives[index - 1].node.slug,
      }
    });
  });
}


// Creatives
// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: 'creatives' });

//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }