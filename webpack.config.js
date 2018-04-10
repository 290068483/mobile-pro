const path = require('path');
module.exports = {
	egg: true,
	framework: 'react',
	// devtool: 'source-map',
	entry: {
		'ssr': 'app/web/page/ssr/ssr.jsx',
		'layout': 'app/web/framework/layout/layout.jsx',
		'404': 'app/web/page/ssr/404.jsx'
	},
	resolve: {
		alias: {
			asset: path.resolve( __dirname, 'app/web/asset' ),
			component: path.resolve( __dirname, 'app/web/component' ),
			framework: path.resolve( __dirname, 'app/web/framework' ),
			store: path.resolve( __dirname, 'app/web/store' )
		}
	},
	dll: [ 'react', 'react-dom' ],
	loaders: {
		less: true
	},
	plugins: {},
	done() {
		console.log( '---webpack compile finish---' );
	}
};
