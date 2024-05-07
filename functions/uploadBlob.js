const { getStore } = require("@netlify/blobs");

exports.handler = async (req, context) => {
  const store = getStore({
    name: "img-playground",
    siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
    token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
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
