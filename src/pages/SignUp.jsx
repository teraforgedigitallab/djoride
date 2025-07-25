import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { fullNameValidation, companyNameValidation, phoneValidation, emailValidation, passwordValidation, confirmPasswordValidation, termsValidation } from '../utils/formValidation';
import { Eye, EyeClosed } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: 'onBlur',
    });

    const password = watch('password');

    // State for show/hide password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const { password, confirmPassword, ...userData } = data;
            console.log('New Business Account Created:', userData);
            toast.success('Account created successfully! Please log in.');
        } catch (error) {
            toast.error('Sign up failed. Please try again later.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 py-25">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-secondary">Create your Business Account</h1>
                    <p className="mt-2 text-sm text-primary">
                        Streamline airport travel for your employees and clients.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            id="fullName"
                            label="Authorized Person Name"
                            type="text"
                            error={errors.fullName}
                            {...register('fullName', fullNameValidation)}
                            autoComplete="name"
                        />
                        <InputField
                            id="companyName"
                            label="Company / Agency Name"
                            type="text"
                            error={errors.companyName}
                            {...register('companyName', companyNameValidation)}
                            autoComplete="organization"
                        />
                    </div>

                    <InputField
                        id="email"
                        label="Business Email Address"
                        type="email"
                        error={errors.email}
                        {...register('email', emailValidation)}
                        autoComplete="email"
                    />

                    <InputField
                        id="phone"
                        label="Contact Phone Number"
                        type="tel"
                        error={errors.phone}
                        {...register('phone', phoneValidation)}
                        autoComplete="tel"
                    />

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        Password Field with Show/Hide
                        <div className="relative">
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
                        </div>
                        Confirm Password Field with Show/Hide
                        <div className="relative">
                            <InputField
                                id="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                error={errors.confirmPassword}
                                {...register('confirmPassword', confirmPasswordValidation(password))}
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-9 text-text"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div> */}

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                {...register('terms', termsValidation)}
                                className="h-4 w-4 text-primary focus:ring-primary border-primary rounded accent-primary"
                                aria-describedby="terms-error"
                                autoComplete="off"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-text">
                                I accept the{' '}
                                <a href="#" className="font-medium text-primary hover:underline">
                                    Terms and Conditions
                                </a>
                            </label>
                            {errors.terms && (
                                <p id="terms-error" className="mt-1 text-xs text-red-500">
                                    {errors.terms.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button type="submit" size='md' disabled={isSubmitting} className="w-full">
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="text-sm text-center text-text">
                    Already have an account?{' '}
                    <Link to='/login' className="font-medium text-primary hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;