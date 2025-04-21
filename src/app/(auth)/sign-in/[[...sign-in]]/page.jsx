'use client'
import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const {user} = useUser();
    const router = useRouter();
    useEffect(()=>{
  
      if(!user){
        router.replace('/dashboard');
      }
    }, [user])

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-gradient-to-r from-blue-50 to-indigo-100">
      {/* Left section with branding or illustration */}
      <div className="hidden md:flex flex-col items-center justify-center p-10">
        <Image
          src="/images/interview.png"
          alt="Illustration"
          width={500}
          height={400}
        />
        <h2 className="text-3xl font-bold text-indigo-700 mt-8 text-center">
          Welcome to MockAI
        </h2>
        <p className="text-gray-600 text-center mt-4 max-w-md">
          Your AI-powered interview coach to help you land your dream job 🚀
        </p>
      </div>

      {/* Right section with Clerk's SignUp */}
      <div className="flex items-center justify-center p-6">
      <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
              },
              variables: {
                colorPrimary: '#4F46E5',
              },
            }}
          />
      </div>
    </div>
  );
}
