# 第三章 Axios 二次封装与代理跨域

## 1 Axios 二次封装与代理跨域

### 1.1 Axios 

```
pnpm i axios
```

`Axios` 是一个基于 `Promise` 的 HTTP 客户端，用于浏览器和 Node.js 环境中发起 HTTP 请求。它通常用于与后端 API 进行交互，获取数据、提交数据等。由于其简单易用、功能强大，Axios 成为了前端开发中非常流行的网络请求工具。

主要特点：

1. **基于 Promise**：Axios 使用 `Promise` 来处理异步操作，可以使用 `.then()` 和 `.catch()` 来处理成功和失败的回调，或使用 `async/await` 来更优雅地处理异步代码。
2. **支持请求和响应拦截器**：
   - **请求拦截器**：在请求发送之前可以修改请求的配置，比如添加 `Authorization` 头部等。
   - **响应拦截器**：可以在响应到达时进行处理，例如统一处理错误代码、格式化响应数据等。
3. **自动转换响应数据**：Axios 默认会自动将返回的 JSON 数据转换为 JavaScript 对象。
4. **支持多种请求方式**：Axios 支持 `GET`、`POST`、`PUT`、`DELETE` 等常见的 HTTP 请求方式。
5. **支持取消请求**：可以在请求发送后根据需求取消请求，适用于一些不再需要的请求，避免浪费带宽和资源。
6. **跨浏览器支持**：Axios 在所有主流浏览器中都可以正常工作。

**1. 发送 GET 请求**

```
import axios from 'axios';

axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);  // 响应数据
  })
  .catch(error => {
    console.error(error);  // 错误处理
  });
```

**2. 发送 POST 请求**

```
import axios from 'axios';

const postData = { name: 'John Doe', age: 30 };

axios.post('https://api.example.com/data', postData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

3. **使用 `async/await`**

```
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
```

4. **配置请求拦截器**

```
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer token';  // 添加 Authorization 头部
  return config;
}, error => {
  return Promise.reject(error);
});
```

5. **配置响应拦截器**

```
axios.interceptors.response.use(response => {
  // 统一处理响应数据
  return response;
}, error => {
  // 错误处理
  console.error('Error in response:', error);
  return Promise.reject(error);
});
```

**Axios** 是一个非常强大的工具，简化了与后端 API 的交互过程。它封装了原生的 `XMLHttpRequest` 和 `fetch`，提供了更直观和易用的 API。

它的功能非常全面，支持请求拦截、响应拦截、取消请求、自动转换数据格式等，适用于前端应用与后端 API 交互时的各种需求。



### 1.2 Axios 二次封装

新建 src/utils/request.ts

```typescript
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

```

之后在 vite.config.ts 中进行配置：

```
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // src 配置别名
  resolve:{
    alias:{
      "@":path.resolve(__dirname, 'src')
    }
  },

  server: {
    proxy: {
      '/api':{
        target: "http/sys.taguigu.cn",
        changeOrigin: true,
      }
    }
  }
})
```



## 2 展示请求数据并分页展示

**当前接口不可用，学一下获取数据的模式即可，具体的获取后数据就不往 vue 组件里面放了**

**一般对于项目请求，需要统一管理。** 新建 src/api 用于存放接口请求，通常，每一个模块都会将请求放在一个文件夹：

```
src
	- api
		- home
		- hospital
		- detail
		- xxx
```

### 2.1 封装请求

**src/api/home/index.ts 中统一管理首页模块的接口如下：**

```typescript
// 统一管理首页模块接口
import request from "../../utils/request";  // 引入封装好的 request 工具，用于发起 HTTP 请求

// 通过枚举管理首页模块的接口地址
enum API {
    // 获取已有医院的 URL
    HOSPITAL_URL = '/hosp/hospital'  // 定义一个枚举，包含获取医院信息的接口地址
}

// 定义一个请求函数 reqHospital，用于获取医院数据
// 该函数接受两个参数：page（页码）和 limit（每页显示的数据条数）
export const reqHospital = (page: number, limit: number) => 
    request.get<any>(API.HOSPITAL_URL + `${page}/${limit}`);  // 使用封装好的 request 工具发起 GET 请求，并传递页码和每页限制，返回一个泛型为 `any` 的结果

```

**引入 `request` 工具**：

- 通过 `import request from "../../utils/request";` 语句引入一个封装好的请求工具，这个工具用于发送 HTTP 请求。`request` 可以是基于 `axios` 等库封装的一个自定义工具。

**定义 `API` 枚举**：

- 使用 `enum` 枚举定义了接口的 URL 地址。通过枚举可以确保 URL 地址的统一性，避免硬编码。`API.HOSPITAL_URL` 即为 `/hosp/hospital`。

**请求函数 `reqHospital`**：

- `reqHospital` 函数用于发送 HTTP 请求，获取医院数据。它接受两个参数：`page` 表示请求的页码，`limit` 表示每页返回的数据条数。
- `request.get<any>(API.HOSPITAL_URL + `${page}/${limit}`)` 会根据给定的 `page` 和 `limit` 拼接成完整的 URL，并发送 GET 请求。
- 返回的泛型 `any` 表示请求的返回数据可以是任何类型，你可以根据实际需要在后续处理中做更具体的类型定义。



### 2.2 设定 type 类型

**src/api/home/type.ts**

```typescript
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

```

1. **`ResponseData` 接口**：
   - 用于定义 API 返回的基础数据格式。这个接口确保所有返回的数据都有 `code`（状态码）、`message`（消息）和 `ok`（请求是否成功）字段。
   - `code`：通常是一个数字，代表状态码，常见的成功状态码是 200，其他状态码表示不同的错误类型。
   - `message`：是返回的提示信息，描述请求的结果，成功或失败的原因。
   - `ok`：是一个布尔值，表示请求是否成功。`true` 表示成功，`false` 表示失败。
2. **`Hospital` 接口**：
   - 用于定义医院的信息结构，包括医院的标识符、创建时间、更新时间、类型、地址等详细信息。
   - `id`：医院的唯一标识符，通常是一个字符串，用于区分不同的医院。
   - `createTime` 和 `updateTime`：分别表示医院记录的创建时间和最后一次更新时间，通常是时间字符串，符合 ISO 格式。
   - `param`：是一个嵌套的对象，包含医院的类型和地址。`hostypeString` 表示医院类型（如公立或私立），`fullAddress` 表示医院的完整地址。
   - `hostname`：医院的名称。
3. **`Content` 类型别名**：
   - `Content` 是一个包含多个 `Hospital` 对象的数组，表示一组医院的信息。通过这个别名，可以更方便地表示医院列表。

### 

### 2.3 组件中调用函数

framework/src/pages/home/index.vue

```typescript
// 引入组合式 API
import { onMounted, ref } from "vue";  // 引入 Vue 3 的组合式 API，`onMounted` 是生命周期钩子，`ref` 用来创建响应式数据

// 在组件加载完毕的时候触发一次请求
onMounted(() => {
    getHospitalInfo();  // 组件加载完毕后自动调用 `getHospitalInfo` 函数，获取医院信息
})

// 分页器发生变化时触发一次请求
const currentChange = () => {
    getHospitalInfo();  // 当分页器的当前页码变化时，调用 `getHospitalInfo` 函数重新请求数据
}

// 分页器下拉菜单发生变化时触发
const sizeChange = () => {
    // 将当前页设置为 1，当用户改变每页显示的数量时，我们将页码重置为 1，确保数据从第一页开始加载
    pageNo.value = 1;
    getHospitalInfo();  // 重新请求医院信息，确保每页数据正确加载
}

let pageNo = ref<number>(1);  // 当前页，使用 `ref` 创建响应式数据，初始页码为 1
let pageSize = ref<number>(13);  // 每页显示的医院数量，初始为 13

// 获取医院已有的数据
import type { Content } from "../../api/home/type";  // 引入医院数据类型，`Content` 表示医院数组
let total = ref<number>(0);  // 总医院数，初始化为 0
let hospitalArr = ref<Content>([]);  // 用来存储医院数据的数组，初始为空数组

// 引入 `reqHospital` 请求函数
import { reqHospital } from '../../api/home';  // 根据实际路径引入请求函数 `reqHospital`

// 定义 `getHospitalInfo` 函数，用于请求医院数据
const getHospitalInfo = async () => {
    // 通过 `reqHospital` 发起请求，传递当前页 `pageNo.value` 和每页显示的医院数量 `pageSize.value`
    let result: any = await reqHospital(pageNo.value, pageSize.value); 

    // 判断请求是否成功（假设返回的 status code 为 200 表示成功）
    if (result.code == 200) {
        // 如果请求成功，将返回的数据（医院列表）赋值给 `hospitalArr`，并将总医院数量赋值给 `total`
        hospitalArr.value = result.data.content;  // 从响应中获取医院数据列表
        total.value = result.data.totalElements;  // 从响应中获取医院总数
    }
}

```

**组件加载时发起请求：**

- `onMounted(() => { getHospitalInfo(); })`: 使用 Vue 3 的生命周期钩子 `onMounted`，组件加载完毕后会自动调用 `getHospitalInfo()` 函数，进行一次数据请求，确保组件一加载就能获取数据。

**分页器变化时重新请求数据：**

- `currentChange`: 当分页器的页码发生变化时，调用 `getHospitalInfo()` 函数重新发起请求，获取新的医院数据。
- `sizeChange`: 当分页器每页条数变化时，将页码重置为 `1`，并重新发起请求，确保从第一页开始加载数据。

**`pageNo` 和 `pageSize` 响应式数据：**

- `pageNo`: 当前页码，默认从第 1 页开始。
- `pageSize`: 每页显示的条数，默认值为 13。

**`hospitalArr` 和 `total` 响应式数据：**

- `hospitalArr`: 存储医院信息的数组，初始化为空数组。这个数组用于存储从接口获取到的医院数据，并在模板中进行渲染。
- `total`: 存储医院的总数量，用于分页组件显示总数。

**`reqHospital` 请求函数：**

- `reqHospital(pageNo.value, pageSize.value)`: 调用之前在 API 模块中定义的请求函数 `reqHospital`，并传递当前页码和每页条数作为参数，获取对应的数据。`reqHospital` 是一个异步函数，所以用 `await` 等待它返回结果。

**数据处理：**

- 请求成功后，返回的数据结构假设为：
  - `result.data.content`: 包含医院列表的数组，这个数据被赋值给 `hospitalArr`，并渲染到界面上。
  - `result.data.totalElements`: 返回的数据总数，赋值给 `total`，用于分页组件显示医院的总数。



### 2.4 组件中使用返回结果

framework/src/pages/home/card/index.vue

```
<script setup lang="ts">
// 接受父组件属性
defineProps(['hospitalInfo']);

</script>
```

`defineProps` 是 `<script setup>` 语法糖的一部分，它简化了在组合式 API 中定义组件属性的过程。在普通的 Vue 组件中，你通常会使用 `props` 选项来定义父组件传递给子组件的属性，但在 `<script setup>` 中，`defineProps` 提供了更简洁的语法。



### 2.5 效果：点击谁谁高亮

子组件 framework/src/pages/home/level/index.vue：

```
<li v-for="(level, index) in [1, 2, 3, 4]" :class="{active:activeFlag==level}"  :key="index" @click="changeLevel(level)">
    三级甲等
</li>
```

```
<script setup lang="ts">
import { ref } from "vue";

// 控制点击谁谁高亮
let activeFlag = ref<string>('');

// 处理点击事件的函数
const changeLevel = (level: string) => {
    console.log(level);  // 打印点击的 level 值
    activeFlag.value = level;  // 设置 activeFlag 的值为当前点击的 level
}
</script>

```

用户点击其中一个 `<li>` 元素时，`changeLevel(level)` 函数会被触发。

函数会将 `activeFlag` 的值设置为当前点击项的 `level`（例如 1、2、3、4）。

然后，绑定了 `active` 类的条件 `:class="{active:activeFlag==level}"` 会生效：

- 如果 `activeFlag` 的值等于当前项的 `level`，则为该项添加 `active` 类，从而实现高亮效果。
- 其他没有被点击的项则不会添加 `active` 类，因此不会高亮显示。



## 3 子组件向父组件传递数据

### 3.1 传递过程

问题：

1. 子组件 level 和 region 点击选中某个等级和区域
2. **父组件 vue.index 可以获取到对应数值**
3. 父组件通过该数值调用 axios get 获取数据

关键是回传设置：

framework/src/api/home/index.ts:

```
// 定义一个请求函数 reqHospital，用于获取医院数据
// 该函数接受两个参数：page（页码）和 limit（每页显示的数据条数）
export const reqHospital = (page: number, limit: number, hostype='', districtCode='') => 
    request.get<any>(API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`);  // 使用封装好的 request 工具发起 GET 请求，并传递页码和每页限制，返回一个泛型为 `any` 的结果
```

子组件 framework/src/pages/home/level/index.vue：

```
<script setup lang="ts">
import { ref } from "vue"

// 控制点击谁谁高亮
let activeFlag = ref<string>('')

const changeLevel = (level: string) => {
    console.log(level);  // 打印所选的等级
    activeFlag.value = level;  // 更新响应式数据 activeFlag 为选中的等级
    $emit('getLevel', level);  // 通过 $emit 触发事件，并将所选的等级值传递给父组件
}

// 使用 defineEmits 定义父组件可以监听的事件
let $emit = defineEmits(['getLevel']);
</script>

```

父组件 framework/src/pages/home/index.vue

```
<Level @getLevel="getLevel"/>

// 存储医院的等级和地区
let hostype = ref<string>('')
let districtCode = ref<string>('')

// 从子组件收集参数
const getLevel = (level: string) => {
    hostype.value = level;  // 将子组件传递的等级值存储到 hostype 中
    getHospitalInfo();  // 调用获取医院数据的方法
}

```

**子组件**：

- 用户点击子组件中的某个等级（比如选择等级 `1`）。
- 子组件更新 `activeFlag` 来控制当前点击项的高亮。
- 子组件通过 `$emit` 向父组件发出 `getLevel` 事件，传递所选的等级（`level`）值。

**父组件**：

- 父组件通过 `@getLevel="getLevel"` 监听子组件发出的 `getLevel` 事件，接收子组件传递的 `level` 值。
- 父组件的 `getLevel` 方法将接收到的 `level` 存储到响应式变量 `hostype` 中。
- 然后，父组件调用 `getHospitalInfo()` 方法，使用 `hostype` 和 `districtCode`（假设有其他来源）来调用后端的 `reqHospital` 请求，获取医院数据。

**请求函数**：

- `reqHospital` 根据传入的 `page`、`limit`、`hostype` 和 `districtCode` 构造请求 URL，向后端发送请求，获取医院数据。



### 3.2 v-if 判断

```
<div class="hospital" v-if="1 > 0">
    <Card v-for="item in 13" :key="item"></Card>
    <!-- <Card v-for="(item, index) in hospitalArr" :key="index" :hospitalInfo="item"></Card> -->
</div>
```

在这段代码中，`v-if="1 > 0"` 是一个 Vue 指令，它用于条件渲染元素。`v-if` 会根据其后面的表达式值来决定是否渲染该元素。如果表达式的值为 `true`，则渲染该元素；如果为 `false`，则不渲染该元素。