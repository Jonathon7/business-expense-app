SELECT *
FROM reports
WHERE stat = $1 AND username = $2;