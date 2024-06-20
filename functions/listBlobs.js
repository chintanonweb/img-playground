const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    // const store = getStore("img-playground");
    const store = getStore({
      name: "img-playground",
      siteID: "your_siteid",
      token: "token_id",
    });
    const blobs = await store.list();
    // Array to store blob data
    const blobData = [];

    // Iterate through each blob
    for (const blob of blobs.blobs) {
      // Get data for the current blob key
      const data = await store.getWithMetadata(blob.key);

      // Push blob key and its associated data to blobData array
      blobData.push({ key: blob.key, data });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(blobData),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Error listing blobs",
    };
  }
};
