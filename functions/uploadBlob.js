const { getStore } = require("@netlify/blobs");

exports.handler = async (req, context) => {
  const store = getStore({
    name: "img-playground",
    siteID: "your_siteId",
    token: "your_tokenId",
  });
  const data = JSON.parse(req.body);
  const key = data.fileName;
  const metaData = data.metaData;

  await store.setJSON(
    key,
    {
      fileName: data.fileName,
      fileData: data.file,
    },
    {
      metadata: metaData,
    }
  );

  // await store.setJSON("test", { index: 1, name: name });
  return {
    statusCode: 200,
    body: JSON.stringify("Uploaded Successfully"),
  };
};
