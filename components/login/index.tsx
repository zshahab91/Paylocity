import { IUser } from "@/interfaces/auth";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { setAuthState } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";


const Login = () => {
    const dispatch = useAppDispatch();
    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
    }).required();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IUser) => dispatch(setAuthState(data));

    return (
        <div className="flex gap border border-1 border-black p-20 place-items-center">
            <form className="w-full max-w-sm " onSubmit={handleSubmit(onSubmit)}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-user-name">
                            User Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => <input {...field}
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.username?.message ? "border-red-500 focus:border-red-500" : ""}`}
                                id="inline-user-name" type="text" />
                            }
                        />
                        <p className="text-red-500 text-xs italic">{errors.username?.message}</p>

                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Password
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <input {...field}
                                className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 ${errors.password?.message ? "border-red-500 focus:border-red-500" : ""}`}
                                id="inline-password"
                                type="password"
                                placeholder="******" />

                            }
                        />
                        <p className="text-red-500 text-xs italic">{errors.password?.message}</p>

                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <label className="md:w-2/3 block text-gray-500 font-bold hover:text-blue-200">
                        <a href="" className="text-sm">
                            Forget Password
                        </a>
                    </label>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
        </div>

    )
};
export default Login;
