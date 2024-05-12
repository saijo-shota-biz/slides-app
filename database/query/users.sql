-- name: GetUser :one
SELECT *
FROM users
WHERE id = @id;

-- name: GetUserByEmail :one
SELECT *
FROM users
WHERE email = @email;

-- name: ListUsers :many
SELECT *
FROM users;

-- name: CreateUser :one
INSERT INTO users (id, email, username)
VALUES (@id, @email, @username)
RETURNING *;

-- name: UpdateUserUsername :one
UPDATE users
SET username = @username
WHERE id = @id
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = @id;
