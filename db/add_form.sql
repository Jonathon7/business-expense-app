INSERT INTO reports
    (username, title, date, expense_type, amount, comments, ispersonal)
VALUES($1, $2, $3, $4, $5, $6, $7);

UPDATE employees SET reports = reports + 1 WHERE username = $1;

SELECT *
FROM reports;

    


      
