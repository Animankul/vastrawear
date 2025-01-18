import { useRouter } from "next/router"
import { useEffect } from "react"
const Myaccount = () => {
    const router = useRouter()
useEffect(() => {

    if(!localStorage.getItem('token')){
        router.push('/')
    }

  
}, [])




  return (
    <div>
      <div className="container mx-auto my-9">
        <h1 className="text-xl text-center font-bold">
          Update your account
        </h1>
      </div>
    </div>
  )
}

export default Myaccount
