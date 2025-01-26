// 导入 axios 和 Element Plus 的消息提示组件
import axios from "axios";
import { ElMessage } from "element-plus";

// 创建 axios 实例，配置默认的请求参数
const request = axios.create({
    baseURL: '/api',  // 设置请求的基础 URL
    timeout: 5000      // 设置请求的超时时间为 5 秒
});

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        // 在请求发送之前，可以进行一些配置，比如添加 token 或其他头部
        // 例如：config.headers['Authorization'] = `Bearer ${token}`;
        return config; // 必须返回 config 否则请求会被阻止
    },
    (error) => {
        // 请求错误的统一处理
        ElMessage({
            type: 'error',
            message: '请求错误，请稍后再试！'
        });
        return Promise.reject(error); // 返回一个失败的 promise
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 如果请求成功，直接返回响应数据
        return response;
    },
    (error) => {
        // 响应错误处理
        if (error.response) {
            let status = error.response.status;

            switch (status) {
                case 404:
                    ElMessage({
                        type: 'error',
                        message: '请求路径出现问题！'
                    });
                    break;
                case 500:
                    ElMessage({
                        type: 'error',
                        message: '服务器出现问题，请稍后重试！'
                    });
                    break;
                case 401:
                    ElMessage({
                        type: 'warning',
                        message: '未授权，请登录！'
                    });
                    break;
                case 403:
                    ElMessage({
                        type: 'warning',
                        message: '无权限访问该资源！'
                    });
                    break;
                default:
                    ElMessage({
                        type: 'error',
                        message: `请求失败，状态码：${status}`
                    });
                    break;
            }
        } else {
            // 网络错误或其他错误
            ElMessage({
                type: 'error',
                message: '网络错误，请检查您的网络连接！'
            });
        }

        // 返回一个拒绝的 promise，确保后续处理能够捕获到错误
        return Promise.reject(error);
    }
);

// 导出封装好的 request 实例
export default request;
