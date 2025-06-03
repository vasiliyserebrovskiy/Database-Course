//Создали db и подключаемся к ней
use("cohort60_db");

//Добавили пользователя с именем
// db.users.insertOne({name:"Vasilii"});

//Вложение
// db.users.insertOne({
//     name: "Artem",
//     age: "35",
//     address:{city:"Berlin"}

// });

// db.users.insertMany([
//     {name:"Dave", age: 32},
//     {name:"John", age: 18},
//     {name:"Kianu", age:45}
// ]);

// db.users.insertOne({
//     name: "Will",
//     age: 20,
//     hobbys: ["music", "serfing", "hacking", "snowboard", "cars"]
// });

// получить всех пользователей
// db.users.find();

// только первые три значения
// db.users.find().limit(3);

// вывод данных по возрастанию
// db.users.find().sort({name: 1});

// по убыванию
// db.users.find().sort({name:-1});

// сортировка по имени и потом по возрасту
// db.users.find().sort({name:-1, age:1});

// пропуск при поиске
// db.users.find().skip(2);

// поиск по возрасту age = 45
// db.users.find({ age: 45 });

// поиск age > 25
// db.users.find({ age: { $gt: 25 } });

// db.users.insertMany([
//     {name:"Dude", age: 32},
//     {name:"Johny", age: 18},
//     {name:"Ann", age:32}
// ]);

// поиск первого попавшегося age = 32
// db.users.findOne({ age: 32 });

// Операторы
// $gt - greater then
// db.users.find({ age: { $gt: 25 } });

// $ls - less then

// db.users.find({ age: { $lt: 25 } });

// $lte - less or equal then

// db.users.find({age: {$lte: 25}});

// $gte - greater or equal then
// db.users.find({age: {$gte: 32}});

// Равно $eq - equal
// db.users.find({name: {$eq: "Ann"}});

// Не равно $ne - not equal

// db.users.find({name: {$ne: "Dude"}});

// выбираем те поля которые нам нужны
// db.users.find({age: 32},{name:1});
// тоже но без поля _id
// db.users.find({age: 32},{name:1, _id:0});

// {name: 1}: Это второй аргумент метода find,
// который представляет собой проекцию (projection).
// Проекция определяет, какие поля должны быть включены в результат.
// В данном случае {name: 1} означает,
// что в результате запроса будут включены только поле name.
// Поле _id будет включено по умолчанию, если не указано другое.

// Оператор $in -  выведет всех с именами
// выведем всех с именами
// db.users.find({ name: { $in: ["John", "Ann"] } });

// Оператор $nin - not in list не входит
// db.users.find({ name: { $nin: ["John", "Ann"] } });

// логическое и возраст =  34 и имя не Dude
// db.users.find({ $and: [{ age: 32 }, { name: { $ne: "Dude" } }] });


