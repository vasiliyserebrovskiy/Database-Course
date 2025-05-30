### Test data for database airport_db

```sql
-- Testdata for table company_address
INSERT INTO company_address (city, country, phone_number, street, building) VALUES
('Berlin', 'Germany', '+49 30 1234567', 'Alexanderplatz', 5),
('Moscow', 'Russia', '+7 495 7654321', 'Tverskaya Street', 12),
('New York', 'USA', '+1 212 5551234', '5th Avenue', 101);

-- Testdata for table companies
INSERT INTO companies (company_name, address_id) VALUES
('Sky Airlines', 1),
('Red Wings', 2),
('JetExpress', 3);

-- Testdata for table flights
INSERT INTO flights (plane_number, plane_type, company_id, town_from, town_to, time_out, time_in) VALUES
('SU100', 'Boeing 737', 1, 'Berlin', 'Moscow', '2025-06-01 08:00:00+02', '2025-06-01 13:00:00+03'),
('RW202', 'Airbus A320', 2, 'Moscow', 'New York', '2025-06-02 15:30:00+03', '2025-06-02 21:30:00-04'),
('JE303', 'Embraer E190', 3, 'New York', 'Berlin', '2025-06-03 10:00:00-04', '2025-06-03 22:00:00+02');

-- Testdata for table passengers
INSERT INTO passengers (first_name, last_name, gender, age) VALUES
('Anna', 'Ivanova', 'F', 28),
('John', 'Smith', 'M', 34),
('Maria', 'Garcia', 'F', 45),
('Michael', 'Brown', 'M', 52);

-- Testdata for table flight_passengers
INSERT INTO flight_passengers (flight_id, passenger_id, seat_number, luggage, hand_luggage, boarding_time, class) VALUES
(1, 1, '12A', TRUE, TRUE, '2025-06-01 07:30:00+02', 'Economy'),
(1, 2, '12B', FALSE, TRUE, '2025-06-01 07:30:00+02', 'Economy'),
(2, 3, '1A', TRUE, TRUE, '2025-06-02 15:00:00+03', 'Business'),
(3, 4, '3C', TRUE, FALSE, '2025-06-03 09:30:00-04', 'Economy');

```
