DROP TABLE IF EXISTS users;

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id text PRIMARY KEY NOT NULL,
  created_at text DEFAULT CURRENT_TIMESTAMP,
  updated_at text DEFAULT CURRENT_TIMESTAMP,
  email text NOT NULL,
  username text NOT NULL
);
