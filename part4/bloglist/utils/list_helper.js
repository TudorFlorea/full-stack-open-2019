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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
