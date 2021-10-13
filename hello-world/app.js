let response;

exports.lambdaHandler = async () => {
  try {
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'hello lambda feature3',
      }),
    };
  } catch (err) {
    return err;
  }

  return response;
};
