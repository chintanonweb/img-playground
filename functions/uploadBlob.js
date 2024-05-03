const { getStore } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    const store = getStore("your-blob-store-name"); // Replace with your store name
    const file = await event.files.file;
    const metadata = JSON.parse(event.body.metadata);

    const blob = await store.put(file.name, file.arrayBuffer(), {
      contentType: file.type,
      metadata,
    });

    return {
      statusCode: 200,
      body: "Blob uploaded successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Error uploading blob",
    };
  }
};
