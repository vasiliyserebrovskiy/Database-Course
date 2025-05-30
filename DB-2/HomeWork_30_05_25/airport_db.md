###

- 1 Create user for airport_db database:

```sql
CREATE USER airport_owner WITH PASSWORD '1QazXsw2';
```

- 2 Create database airport_db

```sql
CREATE DATABASE airport_db OWNER airport_owner;
```

- 3 Create table company_address

```sql
CREATE TABLE company_address (
  id serial PRIMARY KEY,
  city varchar(100),
  country varchar(100),
  phone_number varchar(50),
  street varchar(100),
  building integer
);

```

- 4 Create table companies

```sql
CREATE TABLE companies (
  id serial PRIMARY KEY,
  company_name varchar(150),
  address_id integer REFERENCES company_address(id)
);
```

- 5 Create table flights

```sql
CREATE TABLE flights (
  id serial PRIMARY KEY,
  plane_number varchar(10),
  plane_type varchar(30),
  company_id integer REFERENCES companies(id),
  town_from varchar(100),
  town_to varchar(100),
  time_out timestamptz,
  time_in timestamptz
);
```

- 6 Create table passengers

```sql
CREATE TABLE passengers (
  id serial PRIMARY KEY,
  first_name varchar(50),
  last_name varchar(50),
  gender char(1),
  age integer
);
```

- 7 Create table flight_passengers

```sql
CREATE TABLE flight_passengers (
  id serial,
  flight_id integer REFERENCES flights(id),
  passenger_id integer REFERENCES passengers(id),
  seat_number varchar(5),
  luggage boolean NOT NULL DEFAULT FALSE,
  hand_luggage boolean NOT NULL DEFAULT FALSE,
  boarding_time timestamptz,
  class varchar(20)
);
```
