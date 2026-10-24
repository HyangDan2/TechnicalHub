export default {
  layout: "layouts/profile.njk",
  eleventyComputed: {
    permalink: (data) => data.status === "published"
      ? "technologies/" + data.slug + "/index.html"
      : false
  }
};
