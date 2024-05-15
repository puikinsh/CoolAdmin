const path = require('path');

module.exports = {
    entry: {main: './js/main.js', 
    amplifyConfig: './js/amplifyConfig.js', 
    authentication: './js/authentication.js', 
    authorizations: './js/authorizations.js',
    categoryConfig: './js/categoriesConfig/categoriesConfig.js',
    category: './js/category.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    mode: 'development', // Puedes configurar el modo a 'production' si estás listo para producción
    // Aquí puedes agregar otras configuraciones según sea necesario
   
      
};
