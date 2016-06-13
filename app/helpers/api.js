import { ref } from 'config/constants'

export function saveToDucks(duck) {
  // This will return a unique key for us
  const duckId = ref.child('ducks').push().key()
  const duckPromise = ref.child(`ducks/${duckId}`).set({...duck, duckId})
  return {
    duckId,
    duckPromise,
  }
}

export function saveUserDucks (duck, duckId){
  return ref.child(`users/${duck.uid}/${duckId}`).set({...duck, duckId})
}

export function saveLikeCount (duckId){
  return ref.child(`likeCount/${duckId}`).set(0)
}

export function saveDuck (duck) {
  const { duckId, duckPromise } = saveToDucks(duck)

  return Promise.all([
    duckPromise,
    saveUserDucks(duck, duckId),
    saveLikeCount(duckId)
  ])
  .then(()=> ( { ...duck, duckId } ) )
}

export function listenToFeed (cb, errorCB) {
  // Setting up listener...
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a,b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB)
}


export function fetchUsersLikes(uid){
  return ref.child(`usersLikes/${uid}`).once('value')
  .then( (snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, duckId){
  return ref.child(`usersLikes/${uid}/${duckId}`).set(true)
}
export function deleteFromUsersLikes (uid, duckId){
  return ref.child(`usersLikes/${uid}/${duckId}`).set(null)

}
export function incrementNumberOfLikes (duckId){
  return ref.child(`likeCount/${duckId}`)
  .transaction( (current = 0) => current + 1)
}
export function decrementNumberOfLikes (duckId){
  return ref.child(`likeCount/${duckId}`)
  .transaction( (current = 0) => current - 1)

}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then( (snapshot) => {
      console.log("SNAPSHOT")
      console.log(snapshot.val())
      return snapshot.val()
    })
}

export function fetchUsersDucks(uid){
  return ref.child(`usersDucks/${uid}`).once('value')
  .then( (snapshot) => {
    console.log("ANOTHER")
    console.log(snapshot.val())

  })
}
