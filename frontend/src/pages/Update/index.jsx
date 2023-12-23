
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Notification,
    FileInput,
  } from "@mantine/core";
import { Link } from "react-router-dom";
import { DateInput, DatePickerInput } from '@mantine/dates';
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {post, upload} from "../../application/middlewares/index"
import { loginSuccess } from "../../application/actions/auth";
import { SetCookie } from "../../utils/cookie";
import { useState } from "react";

function Register(){
    const navigate = useNavigate()
    const schema = Yup.object().shape({
        email:Yup.string().email().required(),
        password:Yup.string().min(6).max(25).required(),
        birth_date:Yup.date().required()
    })
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control
    } = useForm({
        resolver:yupResolver(schema)
    });
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const {user, token} = useSelector(state => state?.auth)

    const onSubmit = (data)=>{
        const formData = new FormData();
        formData.append("picture", file)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("birth_date", data.birth_date)
        setLoading(true)
        dispatch(upload({
            url:'api/user/update-user',
            data:formData,
            token,
            action: (response) =>{
                if(response.success){
                    console.log(response.data)
                    dispatch(loginSuccess(response.data));
                    SetCookie("refresh_token", response.data.refresh_token)
                    navigate("/users")
                }else{

                }
            }
        }))
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-blue-50 w-full h-screen pt-14"
            >
            <Container
                size={420}
                py={40}
                className="bg-white shadow-xl p-10 rounded-3xl relative overflow-hidden"
            >
                <Title
                className="text-center text-transparent text-indigo-600 first-letter:uppercase"
                >
                    Register
                </Title>
                <Text
                    c="dimmed"
                    size="sm"
                    ta="center"
                    className="mt-1 mb-10"
                >
                    App, honey!
                </Text>
                <Controller
                control={control}
                name="email"
                defaultValue={user.email}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                    <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        label="Email"
                        placeholder="you@something.dev"
                        error={errors?.email?.message}
                    />
                    );
                }}
                />
                <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <PasswordInput
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="false"
                    label="Password"
                    placeholder="Password"
                    mt="md"
                    error={errors?.password?.message}
                    />
                )}
                />
              
                <FileInput 
                    onChange={(e)=>{console.log(e);setFile(e)}}
                    accept="image/png,image/jpeg" 
                    label="Upload image" 
                    placeholder="Upload image" 
                    mt='md'
                />
                <Controller
                name="birth_date"
                control={control}
                defaultValue={new Date(user.birth_date)}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePickerInput
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Date input"
                    placeholder="Date input"
                    mt="md"
                    error={errors?.birth_date?.message}
                    />
                )}
                />

                <Button
                type="submit"
                fullWidth
                mt="xl"
                className="mt-8 mb-4 bg-indigo-600"
                color="indigo.4"
                  loading={loading}
                >
                    Update
                </Button>
            </Container>
        </form>
    )
}

export default Register