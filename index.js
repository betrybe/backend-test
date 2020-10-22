const app = require('./app');

app.factory()
  .then((appInstance) => {
    const PORT = process.env.PORT || 3000;
    appInstance.listen(PORT, () => console.log('ouvindo porta', PORT));
  })
  .catch((err) => {
    console.error(err);
    process.exit(8);
  });
