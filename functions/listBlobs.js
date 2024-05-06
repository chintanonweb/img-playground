const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    // const store = getStore("img-playground");
    const store = getStore({
      name: "img-playground",
      siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
      token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
    });
    const entry1 = await store.get("test");
    const blobs = await store.list();
    console.log("blobs: ", blobs);
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
