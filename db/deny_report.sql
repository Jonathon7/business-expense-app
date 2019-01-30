UPDATE reports SET stat = $2 WHERE report_id = $1;

UPDATE reports SET denial_comments = $3 WHERE report_id = $1;

