const { connect } = require("mongoose");

const execRequest = (req, res, status, action) => {
    try {
      action();
    } catch (err) {
      console.log(err);
      res.status(status).json(err);
    }
  };

const execPromise = (action) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(await action());
    } catch (err) {
      console.error(err);
      reject(new Error(err));
    }
  });

const start = (uri, app, port) =>
  connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() =>
      app.listen(port, () =>
        console.log(`Server is running on the port ${port}.`)
      )
    )
    .catch((err) => console.error("Unable to connect with the database:", err));



module.exports = {
    execRequest,
    start,
    execPromise,
}