export default function (eleventyConfig) {
  eleventyConfig.ignores.add('docs/**');
  eleventyConfig.ignores.add('README.md');
  eleventyConfig.ignores.add('data/catalog.json');
  eleventyConfig.addPassthroughCopy('index.html');
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addFilter('json', value => JSON.stringify(value).replace(/</g, '\\u003c'));
  eleventyConfig.addCollection('publishedProfiles', collectionApi =>
    collectionApi.getFilteredByGlob('content/profiles/*.md')
      .filter(profile => profile.data.status === 'published')
      .sort((a, b) => a.data.title.localeCompare(b.data.title, 'ko'))
  );

  return {
    dir: {
      input: '.',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
}
