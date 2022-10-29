// when we dont't have any error, then send "null" to the callback
// otherwise if that callback is depend on error value, then any value to the callback will interpret as error. 

await newData.save(err => {
                err ? callback(err) : callback(null);
        })



database.save(req.body, (err) => {
                // console.log(err);
                database.closeConnection();
                err ? res.status(400).send(err.message) :
                        res.status(200).send('Date saved in the database');
        });
