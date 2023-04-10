import { Breadcrumb } from 'antd'
import React from 'react'



function AppBreadcrumb() {
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}
      items={[
        {
          title: 'Home',
        },
        
      ]}
      >
    </Breadcrumb>
    </div >
  )
}

export default AppBreadcrumb