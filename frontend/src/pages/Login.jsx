import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export function LoginPage() {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const {refreshUser} = useAuth()
  const {
    register,
    handleSubmit,
  } = useForm()
  const submit = async (data)=>{
    setLoading(true)
    const res = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
      credentials: "include" // if you want cookie set
      });
      if(res.ok){
        await refreshUser()
        setAlert(false)
        navigate('/')
      } else{
        setAlert(true)
      }
      setLoading(false)
      
  }
  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 mt-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Login
      </h2>
      <form className="my-8" onSubmit={handleSubmit(submit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="Enter your email" type="email" {...register("email")} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" {...register("password")} />
        </LabelInputContainer>
        {alert && <p className="text-red-500 text-sm my-2">Invalid Credentials. Please Try Again.</p>}

        {!loading ? <button
          className="group/btn cursor-pointer relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Submit &rarr;
          <BottomGradient />
        </button>:<button
        disabled
          className="group/btn flex justify-center items-center gap-2 relative block h-10 w-full rounded-md bg-gradient-to-br from-gray-500 to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          <IconLoader2 className="w-4 h-4 animate-spin"/> Submitting
          <BottomGradient />
        </button>}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
