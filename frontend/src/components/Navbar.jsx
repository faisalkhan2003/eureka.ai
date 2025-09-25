import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const navigate = useNavigate()
  const {user, loading, logout} = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  if(loading) return <>Loading...</>
  return (
    <nav
      className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div
          className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 onClick={()=>navigate('/')} className="text-base font-bold md:text-2xl">Eureka.ai</h1>
      </div>
      {!user?<div className="flex items-center gap-2">

      <button
        onClick={()=>navigate('/login')}
        className="w-24 cursor-pointer transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
      <button
      onClick={()=>navigate('/signup')}
        className="w-24 cursor-pointer transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Signup
      </button>
        </div>:<div className="flex items-center gap-2">

      <button
        onClick={handleLogout}
        className="w-24 cursor-pointer transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Logout
      </button>
        </div>}
    </nav>
  );
};

export default Navbar