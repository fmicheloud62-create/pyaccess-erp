export function getUsers() {

  if (
    typeof window ===
    "undefined"
  ) {

    return [];
  }

  const users =
    localStorage.getItem(
      "users"
    );

  if (!users) {

    const defaultUsers = [

      {
        username: "admin",
        password: "admin123",
        role: "admin",
      },

      {
        username: "vendedor",
        password: "1234",
        role: "seller",
      },
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(
        defaultUsers
      )
    );

    return defaultUsers;
  }

  return JSON.parse(users);
}

export function login(
  username,
  password
) {

  const users =
    getUsers();

  return users.find(
    (user) =>
      user.username ===
        username &&
      user.password ===
        password
  );
}

export function saveSession(
  user
) {

  if (
    typeof window ===
    "undefined"
  )
    return;

  localStorage.setItem(
    "session",
    JSON.stringify(user)
  );
}

export function getSession() {

  if (
    typeof window ===
    "undefined"
  ) {

    return null;
  }

  const session =
    localStorage.getItem(
      "session"
    );

  return session
    ? JSON.parse(session)
    : null;
}

export function logout() {

  if (
    typeof window ===
    "undefined"
  )
    return;

  localStorage.removeItem(
    "session"
  );
}