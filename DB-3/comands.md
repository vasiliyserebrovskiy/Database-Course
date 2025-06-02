### Группа номер 2.

- Создание БД

```sql
CREATE DATABASE university_db;
```

- Создание таблиц

```sql
CREATE TABLE courses (
	id serial PRIMARY KEY,
  course_name varchar(80) NOT NULL,
  semestr int CHECK(semestr > 0 AND semestr <= 10)
);

CREATE TABLE teachers (
	id serial PRIMARY KEY,
  first_name varchar(80) NOT NULL,
  last_name varchar(80) NOT NULL,
  age int CHECK(age > 25 AND AGE < 110),
  gender varchar(10),
  title varchar(20) NOT NULL
);

CREATE TABLE faculty (
	id serial PRIMARY KEY,
  faculty_name varchar(50) NOT NULL UNIQUE
);

CREATE TABLE subjects (
	id serial PRIMARY KEY,
  name varchar(80) NOT NULL,
  teacher_id int REFERENCES teachers(id)
);

CREATE TABLE students (
	id serial PRIMARY KEY,
  first_name varchar(80) NOT NULL,
  last_NAME varchar(80) NOT NULL,
  age int CONSTRAINT age_must_be_between_15_and_100 CHECK(age > 15 AND age < 100),
  faculty_id integer REFERENCES faculty(id),
  gender varchar(10),
  course_id int REFERENCES courses(id)
);

CREATE TABLE grades (
	id serial PRIMARY KEY,
  student_id int REFERENCES students(id),
  subject_id int REFERENCES subjects(id),
  grade float CHECK(grade > 0 AND grade <= 5.0)
);
```

- Данные

```sql
INSERT INTO faculty (faculty_name) VALUES
('Computer Science'),
('Physics'),
('Mathematics');

INSERT INTO courses (course_name, semestr) VALUES
('Introduction to Programming', 1),
('Advanced Physics', 3),
('Linear Algebra', 2);

INSERT INTO teachers (first_name, last_name, age, gender, title) VALUES
('Alice', 'Johnson', 45, 'Female', 'Professor'),
('Bob', 'Smith', 52, 'Male', 'Associate Professor'),
('Clara', 'Davis', 39, 'Female', 'Lecturer');

INSERT INTO subjects (name, teacher_id) VALUES
('Python Basics', 1),
('Quantum Mechanics', 2),
('Matrix Theory', 3);

INSERT INTO students (first_name, last_name, age, faculty_id, gender, course_id) VALUES
('Daniel', 'Evans', 20, 1, 'Male', 1),
('Eva', 'Petrova', 21, 2, 'Female', 2),
('Mark', 'Lee', 19, 3, 'Male', 3),
('Nina', 'Schmidt', 22, 1, 'Female', 1);

INSERT INTO grades (student_id, subject_id, grade) VALUES
(1, 1, 4.5),
(1, 2, 3.7),
(2, 2, 4.8),
(3, 3, 3.9),
(4, 1, 5.0);
```

- 1 Самый молодой студент

```sql
SELECT MIN(age) AS young_student FROM students;
```

- 2 Самый возрастной преподаватель

```sql
SELECT MAX(age) AS old_teacher FROM teachers;
```

- 3 Оценки студентов по предметам

```sql
SELECT a.first_name, a.last_name, c.name, b.grade FROM students a JOIN grades b ON a.id = b.student_id JOIN subjects c ON b.subject_id = c.id;
```

- 4 Средний бал по студентам

```sql
SELECT a.last_name, a.first_name, AVG(b.grade) AS grade_by_student FROM students a JOIN grades b ON a.id = b.student_id GROUP BY a.last_name, a.first_name;
```

- 5 Количество студентов на каждом курсе (группировка по курсам)

```sql
SELECT c.course_name, COUNT(s.id) AS student_count
FROM courses c
JOIN students s ON s.course_id = c.id
GROUP BY c.course_name;
```

- 6 Количество студентов по полу

```sql
SELECT gender, COUNT(*) AS total_students
FROM students
GROUP BY gender;
```

- 7 средний бал по факультетам

```sql
SELECT
  faculty_name,
  AVG(grade) AS avg_grade
FROM
  faculty f
  JOIN students s ON s.faculty_id = f.id
  JOIN grades g ON g.student_id = s.id
GROUP BY f.id;
```

- 8 Преподаватели, а так же предметы, которые они ведут

```sql
SELECT t.first_name, t.last_name, s.name AS subject
FROM teachers t
JOIN subjects s ON s.teacher_id = t.id;
```

---

- 9 Количество студентов у каждого преподавателя(через предметы и оценки)

```sql
SELECT
  CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
  COUNT(DISTINCT g.student_id) AS student_count
FROM teachers t
JOIN subjects s ON t.id = s.teacher_id
JOIN grades g ON s.id = g.subject_id
GROUP BY t.id;
```

- 10 Средний возраст студентов по факультетам

```sql
SELECT
  f.faculty_name,
  ROUND(AVG(s.age), 1) AS avg_age
FROM faculty f
JOIN students s ON s.faculty_id = f.id
GROUP BY f.faculty_name;
```

- 11 Средний балл по семестрам

```sql
SELECT
  c.semestr,
  ROUND(AVG(g.grade), 2) AS avg_grade
FROM courses c
JOIN students s ON s.course_id = c.id
JOIN grades g ON s.id = g.student_id
GROUP BY c.semestr
ORDER BY c.semestr;

```

- 12 Преподаватели, у которых средняя оценка студентов выше 4.5

```sql
SELECT
  CONCAT(t.first_name, ' ', t.last_name) AS teacher_name,
  ROUND(AVG(g.grade)::numeric, 2) AS avg_teacher_grade
FROM teachers t
JOIN subjects s ON t.id = s.teacher_id
JOIN grades g ON s.id = g.subject_id
GROUP BY t.id
HAVING AVG(g.grade) > 4.5;
```
