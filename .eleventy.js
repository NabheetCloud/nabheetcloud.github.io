const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {

  // ------------------------------
  // Passthrough copy for assets
  // ------------------------------
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/styles');  // ⭐ critical fix
  eleventyConfig.addPassthroughCopy('src/assets/styles/prism-theme.css');
  eleventyConfig.addPassthroughCopy('src/robots.txt');

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget('src/assets/styles/**/*.css');

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // ------------------------------
  // Collections
  // ------------------------------
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/*.md')
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection('tagList', (collection) => {
    const tagSet = new Set();
    collection.getFilteredByGlob('src/posts/*.md').forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet].sort();
  });

  // ------------------------------
  // Filters
  // ------------------------------

  // Reading time
  eleventyConfig.addFilter('readingTime', (content) => {
    if (!content) return 1;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  });

  // Date format
  eleventyConfig.addFilter('dateFormat', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Excerpt filter
  eleventyConfig.addFilter('excerpt', (content) => {
    if (!content) return '';
    const excerpt = content.replace(/(<([^>]+)>)/gi, '');
    return excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : '');
  });

  // Limit array
  eleventyConfig.addFilter('limit', (array, limit) => array.slice(0, limit));

  // Find in array by property
  eleventyConfig.addFilter('find', (array, property, value) => {
    if (!array || !Array.isArray(array)) return null;
    return array.find(item => item[property] === value);
  });

  // Related posts
  eleventyConfig.addFilter('relatedPosts', (collection, currentPost, limit = 3) => {
    if (!currentPost || !currentPost.data) {
      return collection.slice(0, limit);
    }

    const currentTags = currentPost.data.tags || [];

    if (currentTags.length === 0) {
      return collection
        .filter(post => post.url !== currentPost.url)
        .slice(0, limit);
    }

    const related = collection
      .filter(post => post.url !== currentPost.url)
      .map(post => {
        const postTags = (post.data && post.data.tags) ? post.data.tags : [];
        const matchCount = postTags.filter(tag => currentTags.includes(tag)).length;
        return { post, matchCount };
      })
      .filter(item => item.matchCount > 0)
      .sort((a, b) => {
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
        return b.post.date - a.post.date;
      })
      .slice(0, limit)
      .map(item => item.post);

    if (related.length < limit) {
      const recentPosts = collection
        .filter(post => post.url !== currentPost.url && !related.includes(post))
        .slice(0, limit - related.length);
      return [...related, ...recentPosts];
    }

    return related;
  });

  // ------------------------------
  // HTML minification in production
  // ------------------------------
  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (process.env.NODE_ENV === 'production' && outputPath && outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      });
    }
    return content;
  });

  // ------------------------------
  // FINAL: Directory & prefix config
  // ------------------------------
  return {
    pathPrefix: "/",     // ⭐ REQUIRED for GitHub Pages fixing CSS/JS 404
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk'
  };
};
