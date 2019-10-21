const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
};

module.exports = {
  dummy,
  totalLikes
};
