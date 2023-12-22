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
//   import * as Yup from "yup";
  import { useForm, Controller } from "react-hook-form";
//   import { yupResolver } from "@hookform/resolvers/yup";

function Login(){
    const {
        handleSubmit,
        formState: { errors },
        setError,
        control,
      } = useForm({});

    return (
        <form
            // onSubmit={handleSubmit(onSubmit)}
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
                    App, honey!
                </Text>

                <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                    <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        label="Email"
                        placeholder="you@something.dev"
                        // error={errors?.email?.message}
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
                    // error={errors?.password?.message}
                    />
                )}
                />

                <Button
                type="submit"
                fullWidth
                mt="xl"
                className="mt-8 mb-4 bg-indigo-600"
                color="indigo.4"
                //   loading={state.loading}
                >
                    Login
                </Button>
            </Container>
        </form>
    )
}

export default Login