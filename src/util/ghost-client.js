import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "https://io-energy-blog.ghost.io",
  key: "a73a6790c5c8e9549e455454b5",
  version: "v5.0",
});

export async function getPosts({ filter = "tab:blog", page = 1, limit = 15 }) {
  return await api.posts
    .browse({
      include: ["tags", "authors"],
      page: page,
      limit: limit,
      filter: filter,
    })
    .catch((err) => {
      throw new Error(err);
    });
}

export async function getPost(slug) {
  return await api.posts
    .read({
      slug: slug,
    })
    .catch((err) => {
      throw new Error(err);
    });
}
