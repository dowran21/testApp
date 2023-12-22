import { TextInput } from "@mantine/core"
import { Fieldset } from '@mantine/core';

function Login(){
    return (
        <div className="w-full h-screen bg-blue-50 flex justify-center items-center">
            {/* <div className=" bg-white m-8 p-8 rounded-xl shadow-lg shadow-inner">
                <TextInput placeholder="hello" label="some label"/>
            </div> */}
            <Fieldset legend="Personal information" className=" bg-gray-200  m-8 p-8 rounded-xl shadow-lg shadow-inner">
                <TextInput label="Your name" placeholder="Your name"  radius="xl" className="py-2 text-indigo-400 "/>
                <TextInput label="Email" placeholder="Email" radius="xl " className="py-2 text-indigo-400 "/>
            </Fieldset>
        </div>
    )
}

export default Login