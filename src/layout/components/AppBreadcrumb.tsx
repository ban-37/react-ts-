import { Breadcrumb } from 'antd'
import React from 'react'

type Props = {}

function AppBreadcrumb({ }: Props) {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}
      items={[
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
      >
    </Breadcrumb>
    </div >
  )
}

export default AppBreadcrumb