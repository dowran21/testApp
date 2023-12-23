import { SimpleGrid } from '@mantine/core';
import { CardBox } from '../../components/users/card';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../application/actions/auth';
import { RemoveCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import { get } from '../../application/middlewares';
import { Link } from 'react-router-dom';

export function Users() {
  const dispatch = useDispatch() 
  const Logout = ()=>{
    dispatch(logout())
    RemoveCookie("refresh_token")
  } 
  const token = useSelector(state => state?.auth?.token)
  const [users, setUsers] = useState([])
  useEffect(()=>{
    dispatch(get({
      url:'api/user/other-users',
      token,
      action: (response) =>{
        if(response.success){
          console.log(response.data.users)
          setUsers(response.data.users)
        }
      }
    }))
  }, [])
  return (
    <div className='h-screen w-screen bg-blue-50'>
      <div className='flex flex-row justify-between items-center px-5'>
        <Link to="/update">Update</Link>
        <p className="cursor-pointer" onClick={()=>Logout()}>Logout</p>
      </div>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 5 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
        className='bg-blue-50 w-full p-4'
      >
        {users.map(item=>(
          <div key = {item._id}>
            <CardBox data={item}/>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}