-- name: GetUser :one
SELECT *
FROM users
WHERE id = @id;

-- name: ListUsers :many
SELECT *
FROM users;

-- name: CreateUser :exec
INSERT INTO users (id, email, username)
VALUES (@id, @email, @username);

-- name: UpdateUserUsername :one
UPDATE users
SET username = @username
WHERE id = @id
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = @id;
