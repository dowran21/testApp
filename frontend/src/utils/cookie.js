import cookie from 'js-cookie';
 
export const SetCookie = (key, value) => {

    cookie.set(key, value, { expires: 7 });

};
 
export const GetCookie = (name) => {
    return cookie.get(name)
}
 
export const RemoveCookie = (name)=>{
    return cookie.remove(name);
}