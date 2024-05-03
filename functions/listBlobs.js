const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    // nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969
    const store = getStore({
      name: "img-playground",
      siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
      token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
    });

    console.log(await store.get("img-playground"));
    // const store = getStore("your-blob-store-name"); // Replace with your store name
    const blobs = await store.list();

    return {
      statusCode: 200,
      body: JSON.stringify(blobs),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Error listing blobs",
    };
  }
};
