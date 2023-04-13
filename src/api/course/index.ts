import request from "@/utils/request";


  export  interface ICategoryParams {
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
