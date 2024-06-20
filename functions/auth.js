const crypto = require('crypto'); // Only required dependency
const { v4: uuidv4 } = require('uuid'); // Import uuid

exports.handler = async (event, context) => {
  // Environment variables should be set in Netlify settings, not a .env file
  const privateKey = 'your_privatekey'; // Use a more descriptive name

  if (!privateKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing private key' }),
    };
  }

  const token = event.queryStringParameters?.token || uuidv4(); // Get token from query string
  const expire = event.queryStringParameters?.expire || Math.floor(Date.now() / 1000) + 2400; // Calculate expire time

  const signature = crypto.createHmac('sha1', privateKey).update(`${token}${expire}`).digest('hex');

  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
      expire,
      signature,
    }),
  };
};
