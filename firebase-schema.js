// There's no such thing as perfect. Tons of tradeoffs that need to be understood. Keep things shallow. Repeating data is OK.

// Home view
  // All ducks

// Profile view
  // User info
  // User ducks

// Replies view
  // Specific duck
  // All replies for duck

/users
  uid
    name
    uid
    avatar

/ducks
  duckid
    avatar
    duckid
    name
    text
    timestamp
    uid

likeCount
  duckid
