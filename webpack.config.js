'use strict';

const NODE_ENV = process.env.NODE_ENV || 'develop';
const path = require('path');
const webpack = require('webpack');


module.exports = {
    context: __dirname +"/src",
    entry:{
        index:'./index.js',
        screen:'./screen/screen.controller.js'
    },
    output: {
        path: __dirname+"/public",//абсолютный путь к директории
        filename: '[name].js',
        publicPath:'/s/js/public/',
        library:"[name]"
    },
    devtool: NODE_ENV == 'develop' ? 'source-map' : false ,  //используется для дебага чтоб показывал как бы все исходники
    /**/watch:NODE_ENV == 'develop',  //автоматическая пересборка
    watchOptions:{
        aggregateTimeout:100 //ожидание после изменения
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV) //чтоб добавилось именно значение
        }), //передает переменные в код из консоли то есть NODE_ENV=release webpack так передастся переменная NODE_ENV и собираться все будет под девелоп (пиши через conEmu)
        new webpack.ProvidePlugin({ //подключаем jquery
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            $ : "jquery",
            Backbone : "backbone",
            _ : "underscore"
        }),
        //new webpack.NoEmitOnErrorsPlugin(),
        //new webpack.optimize.OccurrenceOrderPlugin()
        /*,
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })*/
    ],
    externals: {"amcharts": "var AmCharts"},
    resolve:{ //настройка расположения модулей если не найдет по пути entry полезет сюда
        modules:['node_modules'],
        extensions:['.js', '.jsx','.less','.css','.eot','.woff','.ttf'],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, //формат
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },
            {
                test: /\.less$/,
                use: [{loader: "style-loader"},
                    {loader: "css-loader",
                        options: { minimize: true }
                    },
                    {loader: "less-loader",
                    options: {
                        paths: [
                            path.resolve(__dirname, "node_modules")
                        ]
                    }
                }]
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader"} //остальные файлы
        ]
    }
};
if(NODE_ENV == 'prod'){
    module.exports.plugins.push(    ///Минификация
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                sequences     : true,
                booleans      : true,
                loops         : true,
                unused      : true,
                warnings    : false,
                //drop_console: true,
                unsafe      : true
            }
        })
    )
}

/*
const NODE_ENV = process.env.NODE_ENV || 'develop';
const webpack = require('webpack');
const path = require('path');


const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname +"/src",
    entry:{  // разделение на несколько файлов чтоб не грузить сразу весь js
        main:"./main/main.controller",
        index:"./index",
       // style:"./style/main.less"
    },
    output:{
        path: __dirname+"/public",//абсолютный путь к директории
        filename:"[name].js", //шаблон названия для итоговых файлов
        library:"[name]", //после сборки модуль home будет помещен в переменную home
    },
     watch:NODE_ENV == 'develop',  //автоматическая пересборка
     watchOptions:{
     aggregateTimeout:100 //ожидание после изменения
     },
    devtool: NODE_ENV == 'develop' ? 'source-map' : false ,  //используется для дебага чтоб показывал как бы все исходники
    plugins:[
        new webpack.DefinePlugin({
            NODE_ENV:JSON.stringify(NODE_ENV) //чтоб добавилось именно значение
        }) //передает переменные в код из консоли то есть NODE_ENV=release webpack так передастся переменная NODE_ENV и собираться все будет под девелоп (пиши через conEmu)
        ,
        new webpack.ProvidePlugin({ //подключаем jquery
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.ProvidePlugin({
            $ : "jquery",
            Backbone : "backbone",
            _ : "underscore"
        }),
        new webpack.ProvidePlugin({
            $ : "jquery",
            DevExpress : "devextreme"
        })
    ],
    resolve:{ //настройка расположения модулей если не найдет по пути entry полезет сюда
        modules:['node_modules'],
        extensions:['.js', '.jsx','.less','.css','.eot','.woff','.ttf'],
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, //формат
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            } ,
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader", options: {
                        paths: [
                            path.resolve(__dirname, "node_modules")
                        ]
                    }
                }]
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$|\.wav$|\.mp3$/, loader: "file-loader" } //остальные файлы
        ]
    }
};


    module.exports.plugins.push(    ///Минификация
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_console:true, // убить консоль логи
                unsafe:true
            }
        })
    )
   if(NODE_ENV == 'prod'){} */