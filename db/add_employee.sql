INSERT INTO employees
    (username, hash)
VALUES($1, $2);

SELECT *
FROM employees
WHERE username = $1;