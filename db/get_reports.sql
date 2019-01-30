SELECT *
FROM reports
WHERE stat = 'new' AND username= $1;