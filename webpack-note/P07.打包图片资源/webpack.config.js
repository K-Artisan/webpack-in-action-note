const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入打包htm插件

module.exports = {
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        //__dirname:nodejs的全局变量，表示当前文件所在目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //Loader的配置
    module: {
        rules: [
            // 处理less文件
            {
                //匹配那些文件，这里使用正则表达式进行匹配
                test: /\.less$/,
                //使用哪里具体的loader，执行顺序是从下往上
                use: [
                    //创建style标签，将js中的样式资源插入，添加到head中生效
                    'style-loader',
                    //将css文件变成commonJs模块加载到js中，里面的内容是样式字符串
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less和less-loader
                    'less-loader'
                ]
            },
            // 处理图片文件
            {
                test: /\.(jpg|png|gif)$/,
                //多个loader，使用use:数组，只有一个loader，使用loader:
                loader: 'url-loader', //需要下载url-loader, file-loader
                options: {
                    //当图片小于8kb，就会被base64处理，
                    //优点-减少请求次数，
                    //确定-图片体积变大，影响页面加载时间
                    limit: 8 * 1024
                }
            },
            {
                test: /\.html$/,
                //处理HTML中的img图片，负责引入img,从而被url-loader处理
                loader: 'html-loader'
            }
        ]
    },
    // plugins的配置
    plugins: [
        //html-webpack-plugin:
        //默认 创建一个空的html,并且自动已入打包输出的所有资源
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        })
    ],
    //模式
    mode: "development"
    //mode:"production"

}