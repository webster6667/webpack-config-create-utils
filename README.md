<p align="center" style="text-align:center">
    <img src="./illustration.svg" alt="illustration" width="100"/>
</p>

# webpack-config-utils

> webpack config utils with default loaders and plugin, which help create webpack.config file

[![npm version](https://badge.fury.io/js/webpack-config-utils.svg)](https://www.npmjs.com/package/webpack-config-utils)

### Install

```
npm i -D webpack-config-utils
```

### Initialization
```
const {
	  	getBuildMode,
		getDefaultPlugins,
		getResolveExtensions,
		getStyleRules,
		getScriptRules,
		getFileRules
	  } = require('webpack-config-utils')()
```

## Methods

###getBuildMode

Return data relative nodeEnv var

* Install cross env
```
npm i -D cross-env
```

* Add to package.json
```json
"scripts": {
    "start": "cross-env NODE_ENV=development webpack server --mode development --open --hot",
    "build": "cross-env NODE_ENV=production webpack --mode production"
}
```

* Use methods and variables

```
const {
		isDev,
		isProd,
		buildModeByNodeEnv,
		getFileNameByMode,
		optimizationSettingsByMode
	} = getBuildMode(})
	
module.exports = {
    //...
    
	mode: buildModeByNodeEnv,
	devtool: isDev ? false : false, //Проверить
	output: {
    		filename: getFileNameByMode('js')
    },
    optimization: optimizationSettingsByMode
    
    //...
}	
```

* buildModeByNodeEnv - use development or production mode, relative nodeEnv
* getFileNameByMode - add Hash to files for production version
* optimizationSettingsByMode - enable Css nano and Terser for production version

###getResolveExtensions(additionalExtensionsArray)

Return array with file extensions, which webpack will parse

`['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less', '.scss', '.sass', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.eot', '.ttf', '.woff2', '.php'`

##### Example
```
const extensions = getResolveExtensions(['.sjs', '.amd'])

module.exports = {
    //...
    
	output: {...},
    resolve: {extensions},
   
    //...
}	

```

###getResolveExtensions(additionalExtensionsArray)

Return array with file extensions, which webpack will parse

`['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less', '.scss', '.sass', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.eot', '.ttf', '.woff2', '.php'`

##### Example
```
const extensions = getResolveExtensions(['.sjs', '.amd'])

module.exports = {
    //...
    
	output: {...},
    resolve: {extensions},
   
    //...
}	

```

###getDefaultPlugins

return default plugins HtmlWebpackPlugin, CleanWebpackPlugin, MiniCssExtractPlugin

##### Example
``` 
const {isProd} = getBuildMode(),
      defaultPlugins = getDefaultPlugins({isProd})

module.exports = {
	//...

	entry: ['@babel/polyfill', './index.tsx'],
	plugins: [
		...defaultPlugins
	]
	
	//...
}
```

###getStyleRules(additionalRulesConfig)
return object with style loaders

```
    {
        ...miniCssExtractLoader
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'group-css-media-queries-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: preprocessorLoader,
        options: {
            sourceMap: true,
            webpackImporter: false
        }
    },
    {
        loader: 'grand-parent-loader'
    },
    {
        loader: 'style-resources-loader',
        options: {
            patterns: filesForImport
        }
    }
```

##### Example
```
const styleRules = getStyleRules(
	{
	    sassFilesForImport: ['./sass/import-mixin.sass'],
	    lessFilesForImport: [],                 
		additionalLoaders: [
			{
				loader: 'sass-parser-loader',
				pushBefore: 'sass-loader'
			}
		],
		additionalLessLoaders = [],
		additionalSassLoaders = []
	}
)


module.exports = {
    //...
    
    module: {
    		rules: [
    			...styleRules,
    		]
    }
    
    //...
}
```

          getScriptRules = require('./utils/rules/script-rules'),
          getFileRules = require('./utils/rules/file-rules')


###getScriptRules(scriptSettingConfig)
return object with js, ts and babel loaders 

```
{
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env', '@babel/preset-typescript', frameworkPresets = '@babel/preset-react', ...additionalBabelPresets],
        plugins: ['@babel/plugin-proposal-class-properties', ...additionalBabelPlugins]
    }
}
```

##### Example
```
const scriptRules = getScriptRules({
    additionalBabelPlugins: [],
    additionalBabelPresets: [],
    additionalLoaders: []
})

module.exports = {
    //...
    
    module: {
    		rules: [
    			...scriptRules,
    		]
    }
    
    //...
}
```


###getFileRules
enable file loader for images, and svg like svg-code

##### Example
```
const fileRules = getFileRules()

module.exports = {
    //...
    
    module: {
    		rules: [
    			...fileRules
    		]
    }
    
    //...
}
```

#####load svg like svg code
```

import imgUrl, {ReactComponent as Img} from './image.svg'

export default function App() {


	return (<div>
        <img src={imgUrl} alt="img"/>
        <Img/> // return svg code
    </div>)
}
```

if use file loader in ts, and ts dont see imgs, add custom.d.ts to your ts file

custom.d.ts
```
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.webp';
```

tsconfig.json
```
"compilerOptions": {
    ...
  },
  "include": [
    "custom.d.ts"
  ]
```

#### Full config example
```JS
const path = require('path'),
	  getFileRelativeConfigFile = (filePath) => path.resolve(__dirname, filePath),
	  {
	  	getBuildMode,
		getDefaultPlugins,
		getResolveExtensions,
		getStyleRules,
		getScriptRules,
		getFileRules
	  } = require('webpack-config-utils')()

const {
		isDev,
		isProd,
		buildModeByNodeEnv,
		getFileNameByMode,
		optimizationSettingsByMode
	} = getBuildMode(),
	defaultPlugins = getDefaultPlugins({isProd}),
	extensions = getResolveExtensions(),
    fileRules = getFileRules(),
	styleRules = getStyleRules(),
	scriptRules = getScriptRules()


module.exports = {
	context: getFileRelativeConfigFile('src'),
	mode: buildModeByNodeEnv,
	devtool: isDev ? false : false, //Проверить
	entry: ['@babel/polyfill', './index.tsx'],
	output: {
		filename: getFileNameByMode('js'),
		path: getFileRelativeConfigFile( 'dist')
	},
	resolve: {extensions},
	optimization: optimizationSettingsByMode,
	devServer: {
		overlay: true
	},
	plugins: [
		...defaultPlugins
	],
	module: {
		rules: [
			...styleRules,
			scriptRules,
            ...fileRules
		]
	}
}
```



## Author

webster6667
