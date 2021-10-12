let response;

exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello lambda prod',
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
