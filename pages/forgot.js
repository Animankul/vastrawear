import { useRouter } from "next/router";
import { useEffect } from "react";

const Forgot = () => {

const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem('token'))
      router.push('/')
  
   
  }, [])
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="favicon.png" alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Forgot Password</h2>
      <p className="mt-2 text-center text-sm text-grey-600">
        Or 
  
        <a href="/login" className=" px-1 font-medium text-pink-600 hover:text-pink-500">
           Login 
        </a>
      </p>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div className="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-pink-600 sm:text-sm/6"/>
          </div>
        </div>
  
      
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Continue</button>
        </div>
      </form>
  
    
    </div>
  </div>
  )
}

export default Forgot
