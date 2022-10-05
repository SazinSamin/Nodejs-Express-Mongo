// general error handling of request
const errorHandler = (err, req, res, next) => {
        if(err) {
                console.log(err);
                res.status(400).send(err.message);
        }
}

export default errorHandler;