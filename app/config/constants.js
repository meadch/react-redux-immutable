import Firebase from 'firebase'

const firebaseUrl = 'https://charlie-react-redux.firebaseio.com/'

export const ref = new Firebase(firebaseUrl)


export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
