SELECT *
FROM reports
WHERE stat = $2 AND username = $1;