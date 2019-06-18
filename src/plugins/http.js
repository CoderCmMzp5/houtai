import axios from 'axios'
const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    // 4. 添加实例方法
    axios.defaults.baseURL='http://localhost:8888/api/private/v1/' //基准地址
    Vue.prototype.$http = axios
}

export default MyHttpServer //导出