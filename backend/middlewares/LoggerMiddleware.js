import colors from 'colors';

function LoggerMiddleware(req, res, next) {
  const { method, url, query, body } = req;
  const start = Date.now();
  let data1 = '';

  console.log(
    colors.red('============================================================')
  );
  // Log request with color formatting
  console.log(
    `${colors.gray(
      `[${new Date().toISOString()}]`
    )} Request - Method: ${colors.bold.green(
      method
    )}, URL: ${colors.bold.yellow(url)}, Query: ${colors.yellow(
      JSON.stringify(query)
    )}, Body: ${colors.yellow(JSON.stringify(body))}`
  );

  // Log response with color formatting
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `${colors.gray(
        `[${new Date().toISOString()}]`
      )} Response - Status: ${colors.bold.green(
        res.statusCode.toString()
      )}, Duration: ${colors.bold.magenta(duration + 'ms')}`
    );
  });

  next();
}

export default LoggerMiddleware;
