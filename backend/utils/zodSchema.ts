import {z} from "zod"

export const SignupSchema = z.object({
    username:z.string().min(4,"username must be 4 character atleast"),
    firstname:z.string().min(2,"first name should be atleast2 character"),
    lastname:z.string().min(2,"last name should be 2 character long"),
    email:z.string().email("Invalid email"),
     password:z.string().min(8,"password must be atleast 8 character ")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
})


export const SigninSchema = z.object({
    username:z.string().min(4,"username must be 4 character atleast"),
    password:z.string().min(8,"password must be atleast 8 character ")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[a-z]/, "Must contain lowercase")
    .regex(/[0-9]/, "Must contain number")
    
})


export const TransferSchema = z.object({
    toUserId:z.string().min(1,"Receiver Id is required"),
    amount:z.number().positive("amount must be greater than 0"),
})