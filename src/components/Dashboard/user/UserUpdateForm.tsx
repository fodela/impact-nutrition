"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export interface UserUpdateFormProps {
    name: string
    phone: string
    profession:string
    professional_pin: string
    email: string
}

export const UserUpdateForm = ({name, phone, profession, professional_pin, email}: UserUpdateFormProps) => {
    const [phoneError, setPhoneError] = useState<string | null>(null);
    let [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    let [formValues, setFormValues] = useState({
        name: name,
        phone: phone,
        profession: profession,
        professional_pin: professional_pin,
        email: email
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (phoneError) return
        try {
            const res = await axios.put("/api/users/update", formValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setLoading(false);
            if (res.status !== 200) {
                const result = res.data;
                toast.error(`Something went wrong! ${res.data}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            toast.success("Updating you details is successful", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
           
        } catch (error: any) {
            setLoading(false);
            toast.error("Update failed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;



        setFormValues((prevFormValues) => {
            const updatedFormValues = { ...prevFormValues, [name]: value };

            return updatedFormValues;
        });
    };


    return (
        <div className="w-full shadow-md">
            <h1 className="text-3xl text-center font-bold mb-6">Update your details</h1>
            <form
                className="shadow-md m-4 p-6"
                onSubmit={onSubmit}
            >
                <div className="max-w-xl mx-auto">
                    <label className="font-bold" htmlFor="name">Name</label>
                    <input
                        className="appearance-none my-4 border rounded w-full py-2 px-3 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                        disabled
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        style={{ padding: "1rem" }}
                    />
                   
                    <label className="font-bold" htmlFor="phone">Phone</label>
                    <input
                        className={`appearance-none my-4 border rounded w-full py-2 px-3 dark:text-white leading-tight focus:outline-none focus:shadow-outline ${phoneError && "border-red-600"}`}
                        required
                        disabled
                        type="phone"
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        style={{ padding: "1rem" }}
                    />
                    {phoneError && <div className="text-red-400 px-3">{phoneError}</div>}

                    <label className="font-bold" htmlFor="profession">Profession</label>
                    <input
                        className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        name="profession"
                        value={formValues.profession}
                        onChange={handleChange}
                        style={{ padding: "1rem" }}
                    />

                    <label className="font-bold" htmlFor="professional_pin">Professional Pin</label>
                    <input
                        className="appearance-none my-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                        type="text"
                        name="professional_pin"
                        value={formValues.professional_pin}
                        onChange={handleChange}
                        style={{ padding: "1rem" }}
                    />
                    <label className="font-bold" htmlFor="email">Email</label>
                    <input
                        className={`appearance-none my-4 border rounded w-full py-2 px-3 dark:text-white leading-tight focus:outline-none focus:shadow-outline`}
                        required
                        disabled
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        style={{ padding: "1rem" }}
                    />
                    <div className="flex my-6 justify-between">
                        <button
                            className="bg-colorPrimary hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Update"}
                        </button>
                    </div>
                </div>
            </form>

        </div>

    );
};
