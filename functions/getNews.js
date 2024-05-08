async function fetchTopNewsStories(apiKey, country = "in", category = "") {
  try {
    const baseUrl = "https://newsapi.org/v2/top-headlines";
    const params = {
      apiKey,
      country,
      category,
    };

    const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news stories: ${response.status}`);
    }
    const newsData = await response.json();

    return newsData.articles; // Return only the fetched articles array
  } catch (error) {
    console.error("Error fetching news stories:", error);
    throw new Error("Internal server error");
  }
}

exports.handler = async (event, context) => {
  try {
    const apiKey = "b75c1550c91c4a078978505f9eacaa61 ";
    const newsStories = await fetchTopNewsStories(apiKey);
    return {
      statusCode: 200,
      body: JSON.stringify(newsStories),
      headers: {
        "content-type": "application/json",
        "netlify-cdn-cache-control":
          "public, max-age=0, stale-while-revalidate=86400",
      },
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};
