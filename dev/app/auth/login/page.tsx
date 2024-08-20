// import { LoginForm } from "@/components/forms/LoginForm";
// import { NextPage } from "next";
// import Image from "next/image";

// const LoginPage: NextPage = () => {
//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
//                 <LoginForm />
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
    return <LoginForm />;
};

export default LoginPage;
