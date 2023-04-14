import MainLayout from '@/layout'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'

// eslint-disable-next-line
import { Navigate } from 'react-router-dom'



type Props = {}

const AuthRequire = (props: Props) => {
    const user= useSelector((state:RootState)=>state.user)
  return (
    <div>
        {/* {user.isLogin?<MainLayout />:<Navigate to="/login"></Navigate>} */}
        {user.isLogin?<MainLayout />:<MainLayout />}
    </div>
  )
}

export default AuthRequire