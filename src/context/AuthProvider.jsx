import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  useEffect(() => {
    if (auth?.accessToken) {
      localStorage.setItem('auth', JSON.stringify(auth));
    } else {
      localStorage.removeItem('auth');
    }
  }, [auth]);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

// const AuthContext = createContext({}) // creating a context variable

// export const AuthProvider = ({children}) => {  // supplying the context varibale to the children components
//     // useState to manage authentication state
//     const [auth,setAuth] = React.useState({})

//     return (
//     <>
//       <AuthContext.Provider value={{auth,setAuth}}>
//         {children}
//         </AuthContext.Provider>
//     </>
//   )
// }

// export default AuthContext
