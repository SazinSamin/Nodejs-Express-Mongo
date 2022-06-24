// App object - Module scafolding.
const notFoundHanlder = {};

// samplehandler function
notFoundHanlder.handler = (requestProperties, callback) => {
    callback(404, {
        message: 'Requested URL not found !',
    })
};

// export module
module.exports = notFoundHanlder;