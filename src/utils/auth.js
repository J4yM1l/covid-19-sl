export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}

export const setUser = user => {
  isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))
}
  

  export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const logout = (firebase) => {
  return new Promise(resolve => {
    firebase.auth().signOut().then(function() {
      setUser({});
      resolve();
    });
  })
}

// export const handleLogin = ({ username, password }) => {
//   if (username === `john` && password === `pass`) {
//     return setUser({
//       username: `john`,
//       name: `Johnny`,
//       email: `johnny@example.org`,
//     })
//   }
//   return false
// }
// export const isLoggedIn = () => {
//   const user = getUser()
//   return !!user.username
// }
// export const logout = callback => {
//   setUser({})
//   callback()
// }