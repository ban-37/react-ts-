import request from "@/utils/request";


export interface ICategoryParams {
  objectId?: string;
  cateName: string;
  fatherId: string;
  status: boolean;
}
// 新增目录
export const categoryPost = (cateObj: ICategoryParams) => {
  return request.post("classes/ReactCategory", cateObj);
};

export interface TableCateoryType extends ICategoryParams {
  children: ICategoryParams[]
}
// 查询类目
interface CateConditionType {
  fatherId?: string;
}
export const categoryGet = (where: CateConditionType = { fatherId: "0-0" }) => {
  return request.get("classes/ReactCategory", {
    params: {
      where,
    },
  });
};

// 更新类目
export const categoryPut = (objectId: string, status: boolean) => {
  return request.put(`classes/ReactCategory/${objectId}`, { status });
};

// 课程录入
export interface ICourseType {
  name: string;
  info: string;
  poster: string;
  isvip: boolean;
  category: [string, string];
  catelv1: string;
  catelv2: string;
  desc: string;
}
export const coursePost = (courseObj: ICourseType) => {
  return request.post("classes/ReactAricle", courseObj);
};
// 加载课程
export interface CourseConditionType {
  current?: number;
  pageSize?: number;
  created_at?: string;
  isvip?: string | boolean;
  name?: string;
  info?: string | { $regex: string; $options: "i" };
}
type CourseKeyType = keyof CourseConditionType;
export const courseGet = (params: CourseConditionType) => {
  delete params.current;
  delete params.pageSize;
  delete params.created_at;
  for (const key in params) {
    if (params[key as CourseKeyType] === "") {
      delete params[key as CourseKeyType]
    }
  }
  switch (params.isvip) {
    //所有课程
    case "2":
      delete params.isvip;
      break;
    default:
      params.isvip = Boolean(Number(params.isvip)); // 0-false  1-true

  }
  if (params.info) {
    params.info = { $regex: `${params.info}`, $options: "i" };
  }
  const search = JSON.stringify(params)
  return request.get(`classes/ReactAricle?where=${search}`)
}