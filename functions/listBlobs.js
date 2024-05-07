const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    // const store = getStore("img-playground");
    const store = getStore({
      name: "img-playground",
      siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
      token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
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
