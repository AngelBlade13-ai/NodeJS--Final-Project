const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  return process.env.TMDB_API_KEY || "";
}

async function getTrending() {
  const apiKey = getApiKey();
  if (!apiKey) return { results: [], error: "TMDB_API_KEY is not set." };

  try {
    const url = `${TMDB_BASE_URL}/trending/movie/week?api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return { results: data.results || [], error: null };
  } catch (err) {
    return { results: [], error: "Could not load trending movies." };
  }
}

async function getHome(req, res) {
  const { results, error } = await getTrending();
  res.render("home", { title: "Movie Search", trending: results, error });
}

module.exports = {
  getHome,
};
