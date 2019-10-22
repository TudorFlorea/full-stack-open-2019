const listHelper = require("../utils/list_helper");

test("dummy returns 1", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is 0", () => {
    const emptyListOfBlogs = [];

    const result = listHelper.totalLikes(emptyListOfBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const listWithMultpleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(listWithMultpleBlogs);
    expect(result).toBe(17);
  });
});

describe("favorite blog", () => {
  test("returns null on an empty blog list", () => {
    const emptyListOfBlogs = [];

    const result = listHelper.favoriteBlog(emptyListOfBlogs);
    expect(result).toBe(null);
  });

  test("when a list has one blog it returns the blog details", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.favoriteBlog(listWithOneBlog);

    expect(result).toEqual({
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    });
  });

  test("when a list has multiple blogs it returns the one with the highest number of likes", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Title 1",
        author: "Author 1",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Title 2",
        author: "Author 2",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 20,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Title 3",
        author: "Author 3",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        __v: 0
      }
    ];

    const result = listHelper.favoriteBlog(listWithMultipleBlogs);

    expect(result).toEqual({
      title: listWithMultipleBlogs[1].title,
      author: listWithMultipleBlogs[1].author,
      likes: listWithMultipleBlogs[1].likes
    });
  });
});

describe("most blogs", () => {
  test("returns null on an empty blog list", () => {
    const emptyBlogList = [];

    const result = listHelper.mostBlogs(emptyBlogList);

    expect(result).toBe(null);
  });

  test("returns the author and 1 if there is only one blog in the list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.mostBlogs(listWithOneBlog);

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    });
  });

  test("on a list with multiple blogs it returns the correct author with the number of blogs", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test2",
        url: "url",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test3",
        url: "url",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.mostBlogs(listWithMultipleBlogs);

    expect(result).toEqual({
      author: "Test1",
      blogs: 2
    });
  });

  test("on a list with many top authors it shows one of them", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test2",
        url: "url",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test2",
        url: "url",
        likes: 12,
        __v: 0
      }
    ];

    const result = listHelper.mostBlogs(listWithMultipleBlogs);

    expect(result).toEqual({
      author: "Test1",
      blogs: 2
    });
  });
});

describe("most likes", () => {
  test("returns null on an empty blog list", () => {
    const emptyBlogList = [];

    const result = listHelper.mostBlogs(emptyBlogList);

    expect(result).toBe(null);
  });

  test("returns the author and the number of likes if there is only one blog in the list", () => {
    const listWithOneBlog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.mostLikes(listWithOneBlog);

    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5
    });
  });

  test("on a list with multiple blogs it returns the correct author with the number of likes", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test2",
        url: "url",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test3",
        url: "url",
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.mostLikes(listWithMultipleBlogs);

    expect(result).toEqual({
      author: "Test2",
      likes: 12
    });
  });

  test("on a list with many top authors it shows one of them", () => {
    const listWithMultipleBlogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test1",
        url: "url",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Test2",
        url: "url",
        likes: 12,
        __v: 0
      }
    ];

    const result = listHelper.mostLikes(listWithMultipleBlogs);

    expect(result).toEqual({
      author: "Test1",
      likes: 12
    });
  });
});
