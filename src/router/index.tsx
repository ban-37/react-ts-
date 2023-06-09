import { AreaChartOutlined } from "@ant-design/icons";
import  {IMenuType} from"./type"
import Category from '../views/Course/Category'
import ArticleList from '../views/Course/ArticleList'
import DashBoard from '../views/DashBoard'
import ArticlePublic from "@/views/Course/ArticleEdit";
import ArticleEdit from "@/views/Course/ArticleEdit";
import UserSet from "@/views/userSet";

export const mainRoutes:IMenuType[] = [
  {
    key: "/dashboard",
    label: "数据统计",
    title: "数据统计",
    icon: <AreaChartOutlined />,
    element: <DashBoard />,
  },
  {
    key: "/course",
    label: "课程管理",
    title: "课程管理",
    children: [
      {
        key: "/course/category",
        label: "课程分类",
        title: "课程分类",
        element: <Category />,
      },
      {
        key: "/course/article/list",
        label: "课程列表",
        title: "课程列表",
        element: <ArticleList />,
      },{
        key: "/course/artpub",
        label: "课程发布",
        title: "课程发布",
        hidden:true,
        element: <ArticlePublic />,
      },{
        key: "/course/artpubdit",
        label: "课程修改",
        title: "课程修改",
        // hidden:true,
        element: <ArticleEdit />,
      },
    ],
  },
  {
    key: "/useSetting",
    label: "个人中心",
    title: "个人中心",
    icon: <AreaChartOutlined />,
    element: <UserSet/>,
  }
];