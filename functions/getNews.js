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
    const apiKey = "your_apikey";
    const category = event.queryStringParameters?.category;
    const newsStories = await fetchTopNewsStories(apiKey, 'in', category);
    const headers = category ? {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Netlify-CDN-Cache-Control": "public, max-age=31536000, must-revalidate",
      "Cache-Tag": `${category},news,proxy-api-response`,
      "Netlify-Cache-Tag": `${category},news,proxy-api-response`
    } : {
      "Content-Type": "application/json",
      "Netlify-CDN-Cache-Control": "public, max-age=0, stale-while-revalidate=86400"
    };

    return {
      statusCode: 200,
      body: JSON.stringify(newsStories),
      headers: headers
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
};
