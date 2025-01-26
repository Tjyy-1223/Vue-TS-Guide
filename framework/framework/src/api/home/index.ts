// 统一管理首页模块接口
import request from "../../utils/request";  // 引入封装好的 request 工具，用于发起 HTTP 请求

// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有医院的 URL
    HOSPITAL_URL = '/hosp/hospital'  // 定义一个枚举，包含获取医院信息的接口地址
}

// 定义一个请求函数 reqHospital，用于获取医院数据
// 该函数接受两个参数：page（页码）和 limit（每页显示的数据条数）
export const reqHospital = (page: number, limit: number, hostype='', districtCode='') => 
    request.get<any>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`);  // 使用封装好的 request 工具发起 GET 请求，并传递页码和每页限制，返回一个泛型为 `any` 的结果
