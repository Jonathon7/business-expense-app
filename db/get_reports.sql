SELECT *
FROM reports
WHERE status = 'new' AND username= $1;