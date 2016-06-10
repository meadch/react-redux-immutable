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
  console.log("listenToFeed running...")
  // Setting up listener...
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a,b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB)

}