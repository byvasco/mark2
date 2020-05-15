const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// Stories
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: 'stories' });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      stories: allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: {
            regex: "/(stories)/"
          }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      creatives: allMarkdownRemark (
        sort: { fields: [frontmatter___date], order: DESC },
        filter: {
          fileAbsolutePath: {
            regex: "/(creatives)/"
          }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const stories = result.data.stories.edges;
  const creatives = result.data.creatives.edges;
  
  stories.forEach(({ node }, index) => {    
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug: node.fields.slug,
        slugNext: index === stories.length - 1 ? stories[0].node.fields.slug : stories[index + 1].node.fields.slug,
        slugPrev: index === 0 ? stories[stories.length - 1].node.fields.slug : stories[index - 1].node.fields.slug,
      }
    });
  });

  creatives.forEach(({ node }, index) => {    
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug: node.fields.slug,
        slugNext: index === creatives.length - 1 ? creatives[0].node.fields.slug : creatives[index + 1].node.fields.slug,
        slugPrev: index === 0 ? creatives[creatives.length - 1].node.fields.slug : creatives[index - 1].node.fields.slug,
      }
    });
  });
}


// Creatives
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: 'creatives' });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;

//   const result = await graphql(`
//     query {
//       allMarkdownRemark (
//         sort: { fields: [frontmatter___date], order: DESC },
//         filter: {
//           fileAbsolutePath: {
//             regex: "/(creatives)/"
//           }
//         }
//       ) {
//         edges {
//           node {
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `);

//   const posts = result.data.allMarkdownRemark.edges;
 
//   posts.forEach(({ node }, index) => {    
//     createPage({
//       path: node.fields.slug,
//       component: path.resolve('./src/templates/post.js'),
//       context: {
//         slug: node.fields.slug,
//         slugNext: index === posts.length - 1 ? posts[0].node.fields.slug : posts[index + 1].node.fields.slug,
//         slugPrev: index === 0 ? posts[posts.length - 1].node.fields.slug : posts[index - 1].node.fields.slug,
//       }
//     })
//   });
// }