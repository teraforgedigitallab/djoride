import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { emailValidation, passwordValidation } from '../utils/formValidation';
import { LogIn, Eye, EyeClosed } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // State for show/hide password
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (data.email === "error@example.com") {
                        reject(new Error("Invalid credentials"));
                    } else {
                        resolve();
                    }
                }, 1500);
            });

            console.log('Form Data:', data);
            toast.success('Welcome back! You are now logged in.');
        } catch (error) {
            toast.error(error.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-secondary">
                    Welcome Back!
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <InputField
                        id="email"
                        label="Email Address"
                        type="email"
                        error={errors.email}
                        {...register('email', emailValidation)}
                        autoComplete="email"
                    />
                    {/* Password field with show/hide */}
                    {/* <div className="relative">
                        <InputField
                            id="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            error={errors.password}
                            {...register('password', passwordValidation)}
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-9 text-text"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                        </button>
                    </div> */}

                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                type="checkbox"
                                {...register('rememberMe')}
                                className="h-4 w-4 text-primary focus:ring-primary-dark border-gray-300 rounded accent-primary"
                                autoComplete='off'
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 select-none">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <Button type="submit" size='md' disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Logging In...' : 'Login'}
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
                        >
                            <LogIn size={18} className="transform" />
                        </motion.div>
                    </Button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;