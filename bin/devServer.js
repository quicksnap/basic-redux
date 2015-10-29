const Express = require('express');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

const port = 3001;
const serverOptions = {
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.use(Express.static('static'));

app.listen(port, function onAppListening(err) {
  /* eslint-disable no-console */
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
    console.info('==> 💻  Open \x1b[33mhttp://localhost:%s\x1b[0m in a browser to view the app.', port);
  }
  /* eslint-enable no-console */
});
