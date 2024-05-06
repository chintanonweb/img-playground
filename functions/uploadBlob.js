const { getStore } = require("@netlify/blobs");

exports.handler = async (req, context) => {
  const store = getStore({
    name: "img-playground",
    siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
    token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
  });
  console.log("file: ", req);
  console.log("filename: ", req.body.fileName);
  const data = JSON.parse(req.body);

  const key = data.fileName;
  // await store.setJSON("test", { index: 1, name: name });
  await store.setJSON(key, {
    fileName: data.fileName,
    img: data.file,
  });
  return {
    statusCode: 200,
    body: JSON.stringify("Nail blob set in JSON for Construction store"),
  };
};
