// What's the minimal representation of app state as an object?
{
  users: {
    isAuthed,
    isFetching,
    error,
    [uid]:{
      lastUpdated,
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  ducks: {
    isFetching,
    error,
    [duckid]:{
      lastUpdated,
      info: {
        avatar,
        duckid,
        name,
        text,
        timestamp,
        uid
      }
    }
  },
  usersDucks: {
    lastUpdated,
    [uid]: {
      duckIds: []
    },
    likeCount: {
      duckId:
    },
    usersLikes: {
      [duckid]: true
    }
  },
  replies: {
    duckId: [],
  },
  modal: {
    duck:
    isOpen:
  },
  listeners: {
    id: true
  }
}
