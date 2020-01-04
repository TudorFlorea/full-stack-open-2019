const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  let maxLikes = 0;
  let favoriteBlogIndex = 0;

  if (!blogs.length) return null;

  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxLikes) {
      maxLikes = blogs[i].likes;
      favoriteBlogIndex = i;
    }
  }

  return {
    title: blogs[favoriteBlogIndex].title,
    author: blogs[favoriteBlogIndex].author,
    likes: blogs[favoriteBlogIndex].likes
  };
};

const mostBlogs = blogs => {
  const authors = {};
  let mostBlogsValue = 0;
  let authorWithMostBlogs = null;

  if (!blogs.length) return null;

  blogs.forEach(blog => {
    if (authors.hasOwnProperty(blog.author)) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });

  for (author of Object.keys(authors)) {
    if (authors[author] > mostBlogsValue) {
      authorWithMostBlogs = author;
      mostBlogsValue = authors[author];
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: mostBlogsValue
  };
};

const mostLikes = blogs => {
  const authors = {};
  let mostLikesValue = 0;
  let authorWithMostLikes = null;

  if (!blogs.length) return null;

  blogs.forEach(blog => {
    if (authors.hasOwnProperty(blog.author)) {
      authors[blog.author] += blog.likes;
    } else {
      authors[blog.author] = blog.likes;
    }
  });

  for (author of Object.keys(authors)) {
    if (authors[author] > mostLikesValue) {
      authorWithMostLikes = author;
      mostLikesValue = authors[author];
    }
  }

  return {
    author: authorWithMostLikes,
    likes: mostLikesValue
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
