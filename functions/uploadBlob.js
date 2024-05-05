const { getStore } = require("@netlify/blobs");
exports.handler = async (req, context) => {
  const store = getStore({
        name: "img-playground",
        siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
        token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
      });
      store.set('img-playground','test')

  return {
        statusCode: 200,
        body: "Blob uploaded successfully!",
      };

  // try {
  //   console.log('context',context);
  //   console.log('event',event);
  //   console.log('formData',formData);
  //   const store = getStore({
  //     name: "img-playground",
  //     siteID: "1aed05a5-5e7c-4a21-aca3-0b5a6f9c6f38",
  //     token: "nfp_p6d7HZGn4ps9CsK1eoH1ErSFDRw5vHRUc969 ",
  //   });

  //   console.log(await store.get("img-playground"));
  //   // const store = getStore("your-blob-store-name"); // Replace with your store name
  //   // const file = await event.files.file;
  //   // const metadata = JSON.parse(event.body.metadata);
  //   // console.log(file);
  //   // console.log(event);



  //   const blob = await store.put(file.name, file.arrayBuffer(), {
  //     contentType: file.type,
  //     metadata,
  //   });

  //   return {
  //     statusCode: 200,
  //     body: "Blob uploaded successfully!",
  //   };
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     statusCode: 500,
  //     body: "Error uploading blob",
  //   };
  // }
};
