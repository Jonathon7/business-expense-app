INSERT INTO reports
    (username, title, date, expense_type, amount, comments, ispersonal)
VALUES($1, $2, $3, $4, $5, $6, $7);

SELECT *
FROM reports;

    


      
