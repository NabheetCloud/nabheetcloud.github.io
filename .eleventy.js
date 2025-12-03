const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/styles/prism-theme.css');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget('src/assets/styles/**/*.css');
  
  // T023: Add syntax highlighting plugin (Prism.js)
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // T024: Add RSS/sitemap plugin
  eleventyConfig.addPlugin(pluginRss);
  
  // T021: Configure collections
  eleventyConfig.addCollection('posts', (collection) => {
    return collection.getFilteredByGlob('src/posts/*.md')
      .filter(post => !post.data.draft) // Exclude drafts in production
      .sort((a, b) => b.date - a.date); // Sort by date descending
  });
  
  // T046: Create tag collections for pagination
  eleventyConfig.addCollection('tagList', (collection) => {
    const tagSet = new Set();
    collection.getFilteredByGlob('src/posts/*.md').forEach(post => {
      if (post.data.tags) {
        post.data.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet].sort();
  });
  
  // T022: Add filters
  
  // Reading time filter (word count / 200 words per minute)
  eleventyConfig.addFilter('readingTime', (content) => {
    if (!content) return 1; // Default to 1 min if no content
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200);
  });
  
  // Date format filter (human-readable date)
  eleventyConfig.addFilter('dateFormat', (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Excerpt filter (first 150 characters)
  eleventyConfig.addFilter('excerpt', (content) => {
    if (!content) return ''; // Return empty string if no content
    const excerpt = content.replace(/(<([^>]+)>)/gi, ''); // Strip HTML tags
    return excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : '');
  });
  
  // Limit filter (limit array to n items)
  eleventyConfig.addFilter('limit', (array, limit) => {
    return array.slice(0, limit);
  });
  
  // Find filter (find item in array by property)
  eleventyConfig.addFilter('find', (array, property, value) => {
    if (!array || !Array.isArray(array)) return null;
    return array.find(item => item[property] === value);
  });
  
  // Related posts filter (will be implemented in User Story 1 - T030)
  eleventyConfig.addFilter('relatedPosts', (collection, currentPost, limit = 3) => {
    // Guard against undefined or invalid inputs
    if (!currentPost || !currentPost.data) {
      return collection.slice(0, limit);
    }
    
    // Find posts with overlapping tags
    const currentTags = currentPost.data.tags || [];
    
    if (currentTags.length === 0) {
      // No tags, return recent posts
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
        // Sort by match count desc, then date desc
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        return b.post.date - a.post.date;
      })
      .slice(0, limit)
      .map(item => item.post);
    
    // If not enough related posts, fill with recent posts
    if (related.length < limit) {
      const recentPosts = collection
        .filter(post => post.url !== currentPost.url && !related.includes(post))
        .slice(0, limit - related.length);
      return [...related, ...recentPosts];
    }
    
    return related;
  });
  
  // T079: Minify HTML output in production1
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
  
  return {
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

