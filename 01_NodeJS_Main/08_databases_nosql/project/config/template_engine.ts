import { engine } from 'express-handlebars';

import { app } from './application.js';
import { Constants } from './constants.js';

const { __dirname } = Constants;

// Adding Template Engine PUG
const pugTemplateEngine = () => {
  app.set('view engine', 'pug');
  app.set('views', `${__dirname}/dist/app/views/pug`);
};

const handleBarTemplateEngine = () => {
  // Defined HBS as an extension for handlebar files
  // app.engine()
  // OR with set path of default layout
  app.engine(
    'handlebars',
    engine({
      layoutsDir: `${__dirname}/dist/app/views/handlebars/layouts`,
      defaultLayout: 'main-layout',
      // extname: 'ebs',
    })
  );
  app.set('view engine', 'handlebars');
  app.set('views', `${__dirname}/dist/app/views/handlebars`);
};

const ejsTemplateEngine = () => {
  app.set('view engine', 'ejs');
  app.set('views', `${__dirname}/dist/app/views/ejs`);
};

const setTemplateEngine = () => {
  // pugTemplateEngine();
  // handleBarTemplateEngine();
  ejsTemplateEngine();
};

export { setTemplateEngine };
