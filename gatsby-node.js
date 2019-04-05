const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templateComponentForNode(node),
        context: {
          slug: node.fields.slug
        }
      });
    });
  });
};

const templateComponentForNode = node => {
  if (node.fields.slug.startsWith("/apis/")) {
    return path.resolve(`./src/templates/api.js`);
  } else if (node.fields.slug.startsWith("/projects/")) {
    return path.resolve(`./src/templates/project.js`);
  } else {
    return path.resolve(`./src/templates/page.js`);
  }
};
