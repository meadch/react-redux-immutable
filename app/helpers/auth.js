export default function auth (){
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve({
        name: "Charlie Mead",
        uid: "charliemead"
      })
    }, 2000)
  })
}
