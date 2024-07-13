const path = require('path');

module.exports = {
	paths: function (paths, env) {
		paths.appBuild = path.resolve(__dirname, "../../public/");
		return paths;
	},
	webpack: function (config, env) {
		config.ignoreWarnings = [
			{
				module: /@mediapipe\/tasks-vision\/vision_bundle\.mjs/,
				message: /Failed to parse source map/,
			},
		];
		return config;
	},
};