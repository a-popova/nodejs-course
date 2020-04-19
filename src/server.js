const { PORT } = require('./common/config');
const { app, connectToDB } = require('./app');

connectToDB(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
