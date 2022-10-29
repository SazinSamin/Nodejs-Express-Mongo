// https://stackoverflow.com/a/27914419/10928027

// close database connection
database.closeConnection = () => {
        mongoose.connection.close((err) => {
                err ? console.log('Connection cant close ') : console.log("Connection closed");
        });
}
