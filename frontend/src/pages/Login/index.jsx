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
  } from "@mantine/core";
  import { Link } from "react-router-dom";
//   import * as Yup from "yup";
  import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { post } from "../../application/middlewares";
//   import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../application/actions/auth";
import { SetCookie } from "../../utils/cookie";

function Login(){
    const schema = Yup.object().shape({
        username:Yup.string().min(3).max(15).required(),
        password:Yup.string().min(3).max(15).required()
    })
    const navigate = useNavigate()
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control,
      } = useForm({
        resolver:yupResolver(schema)
      });
      const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
      
    const onSubmit = (data) =>{
        console.log(data)
        dispatch(post({
            url:`api/user/login`,
            data,
            action: (response) =>{
                console.log(response, "hello")
                if(response.success){
                    dispatch(loginSuccess(response.data));
                    SetCookie("refresh_token", response.data.refresh_token)
                    navigate("/users")
                }else{
                    setError("username",{ type: 'manual', message: "username or password invalid" } )
                    setError("password", { type: 'manual', message: "username or password invalid" })
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
                    Login
                </Title>
                <Text
                c="dimmed"
                size="sm"
                ta="center"
                className="mt-1 mb-10"
                >
                    Login
                </Text>

                <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                    <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        label="username"
                        placeholder="username"
                        error={errors?.username?.message}
                    />
                    );
                }}
                />
                <Controller
                name="password"
                control={control}
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

                <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    className="mt-8 mb-4 bg-indigo-600"
                    color="indigo.4"
                    loading={loading}
                >
                    Login
                </Button>
                <Link to="/register">
                    <Text c="dimmed"
                        size="sm"
                        ta="left"
                        className="mt-1 mb-10">
                    Register
                    </Text>
                </Link>
            </Container>
        </form>
    )
}

export default Login