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