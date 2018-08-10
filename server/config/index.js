const path = require('path');
let config = {
    port: process.env.PORT || 8080,
    mongodb: {
        url: 'mongodb://root:root@127.0.0.1:27017/koa-blog'
    },
    jwt: {
        secret: 'test' //默认
    },
    mongodbSOptions: { //mongodb用户和密码
        authSource: "admin",
        useMongoClient: true
    },
    upload: {
        ACCESS_KEY: 'v6NxwNQtqVpK0Z********v0Fo8qlFcVxnlYbO6',
        SECRET_KEY: 'b5p89rqZeO8KJEj********2fHtKEToE5PdSmQLRq'
    },
   geetest: {
        ID: "108814b3c95d63caf2dc8d988bc76d12",
        KEY: "48b9103efcceee1f1e6679ceabd6e08c"
    },
    InvitationCode: "00000",
    wechat: {
        host: 'https://api.weixin.qq.com',
        appId: 'wx05c5964f92033acc',
        secret: '0cf16dbd475ac26d03a3e1a6d0db04e6'
    }
}
// 可在private.js定义自己私有的配置
// if (fs.existsSync(__dirname + '/private.js')) {
//     config = Object.assign(config, require('./private.js'));
// }
module.exports = config;