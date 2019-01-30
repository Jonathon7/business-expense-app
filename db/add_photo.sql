UPDATE employees SET picture = $1 WHERE username = $2;

SELECT picture
from employees
WHERE username = $2;