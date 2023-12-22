
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
  import { DateInput, DatePickerInput } from '@mantine/dates';
//   import * as Yup from "yup";
  import { useForm, Controller } from "react-hook-form";
//   import { yupResolver } from "@hookform/resolvers/yup";

function Register(){
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
                <Controller
                name="image"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <FileInput 
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    accept="image/png,image/jpeg" 
                    label="Upload image" 
                    placeholder="Upload image" 
                    mt='md'
                    />
                    
                )}
                />
                <Controller
                name="birthday"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePickerInput
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    label="Date input"
                    placeholder="Date input"
                    mt="md"
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
                    Register
                </Button>
            </Container>
        </form>
    )
}

export default Register