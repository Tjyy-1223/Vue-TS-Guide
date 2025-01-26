// src/api/home/type.ts

// 定义一个接口 ResponseData，用于统一 API 返回的数据结构
export interface ResponseData {
    code: number;      // 返回的状态码，用于表示请求是否成功，通常 200 表示成功，非 200 表示失败
    message: string;   // 返回的信息，通常为成功或错误的描述信息
    ok: boolean;       // 请求是否成功，true 表示成功，false 表示失败
}

// 定义一个接口 Hospital，表示医院的基本信息结构
export interface Hospital {
    id: string;                // 医院的唯一标识符
    createTime: string;        // 医院的创建时间，通常为 ISO 8601 格式的时间字符串
    updateTime: string;        // 医院的最后更新时间，通常为 ISO 8601 格式的时间字符串
    param: {
        hostypeString: string; // 医院的类型（例如：公立、私立）
        fullAddress: string;   // 医院的完整地址
    };
    hostname: string;          // 医院的名称
}

// 定义一个类型别名 Content，它是一个包含多个医院对象的数组，表示医院的列表
export type Content = Hospital[];  // Content 就是 Hospital 类型的数组，可以包含多个医院对象
