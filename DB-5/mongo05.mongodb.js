use("Cohort60_lection_05");

// db.animals.insertMany([
//   { kind: "tiger", weight: 300, name: "Alan", predatory: true },
//   { kind: "penguin", weight: 2, name: "Kovalsky", predatory: true },
//   { kind: "chicken", weight: 1, name: "Cipa", predatory: false },
//   { kind: "shark", weight: 400, name: "Sharp", predatory: false },
//   { kind: "shark", weight: 450, name: "John", predatory: false },
//   { kind: "panda", weight: 200, name: "Po", predatory: false },
// ]);

// Update

// Операторы: $set, $inc, $rename, $push, $pull, $unset

// SET оператор
// изменим поле predator у всех акул на true
// db.animals.updateMany({ kind: "shark" }, { $set: { predatory: true } });

// INC - увеличивает значение на указанную величину
// увеличиваем вес всех животных на три

// Увеличиваем вес всех животных на 3
// db.animals.updateMany({}, { $inc: { weight: 3 } });

// rename - переименуем свойство weight в kg
// RENAME - переименовать имя свойства
// переименуем у всех животных weight в kg

// db.animals.updateMany({}, { $rename: { weight: "kg" } });

// изменение по id
// UPDATE ONE - изменить одну запись - первый документ
// изменим имя конкретного объекта по ид

// db.animals.updateOne(
//   {
//     _id: ObjectId("683ffab1f82e3ecc7f413412"),
//   },
//   {
//     $set: { name: "Prapor Kovalsky" },
//   }
// );

// добавили всем хищникам новое поле - еда - массив стрингов

// db.animals.updateMany(
//   { predatory: true },
//   { $set: { foods: ["fish", "meat", "squid"] } }
// );

// PUSH - добавить в массив
// добавили "wolf" в массив еды

// db.animals.updateOne({ kind: "tiger" }, { $push: { foods: "wolf" } });

// PULL - забрать из массива
// как убрать squid из массива

// db.animals.updateOne({ kind: "tiger" }, { $pull: { foods: "squid" } });

// UNSET

// db.animals.updateOne({kind: "chicken"}, {$unset: {predatory:""}});

// delete
// DELETE  - deleteOne, deleteMany
// один параметр - фильтр - кого желаем удалить
// удалим акулу по id

// db.animals.deleteOne({_id: ObjectId("683ffab1f82e3ecc7f413415")});

// добавление записи
// db.animals.insertOne({
//   kind: "t-rex",
//   kg: 2000,
// });

// Устроим вымирание динозаврам

// db.animals.deleteMany({kind: "t-rex"});

// AGGREGATION
// pipeline -
// Основные стадии (этапы, stages) обработки - операторы
// $match фильтрация
// $sort сортировка
// -1 по убыванию
// 1 по возрастанию
// $project проекция
// $limit лимитирование
// $skip пропустить (документы)

// $sample получить произвольные документы
// $count возвращает ко-во документов

// получим всех хищников
// db.animals.aggregate([
//     {$match: {predatory: true}}
// ])

// все хищники + сортировка по весу от большего к меньшему
// db.animals.aggregate(
//     {$match: {predatory: true}},
//     {$sort: {kg: -1}}
// );

// получить самого тяжелого не хищника
// db.animals.aggregate(
//   { $match: { predatory: false } },
//   { $sort: { kg: -1 } },
//   { $limit: 1 }
// );

// третий по тяжести хищник
// db.animals.aggregate(
//   { $match: { predatory: true } },
//   { $sort: { kg: -1 } },
//   { $skip: 2 },
//   { $limit: 1 }
// );

// получим втрого и третьего по весу хищников
// db.animals.aggregate(
//   { $match: { predatory: true } },
//   { $sort: { kg: -1 } },
//   { $skip: 1 },
//   { $limit: 2 }
// );

// db.animals.aggregate(
//     {$match:{kg:5}},
//     {$project:{name:1, foods:1, _id:0}}
// );

// посчитать количество травоядных - мы указали alias -
// псеводним под которым вывести результат

// db.animals.aggregate(
//     {$match:{predatory:false}},
//     {$count:"number_of_planteaters"}
// );

// получение рандомного животного
// db.animals.aggregate(
//     {$sample:{size:1}}
// );

// Lookup в MongoDB — это оператор агрегации, который позволяет объединить две коллекции на основе общего поля.

// Он выполняет операцию левого внешнего соединения двух коллекций, объединяя документы на основе указанного поля.
// Этот оператор позволяет агрегационной структуре извлекать документы из одной коллекции и сопоставлять их с документами
// из другой коллекции.

// Результатом является массив объединённых документов, где каждый документ из исходной коллекции содержит поле массива,
// заполненное соответствующими документами из целевой коллекции.

// Lookup особенно полезен для создания более сложных и всеобъемлющих запросов,
// которые включают данные из нескольких коллекций в базе данных MongoDB.

// Некоторый пост

// db.posts.insertOne({
//   _id: ObjectId("65c6096e0451b42a2273e13c"),
//   likes: 10,
//   text: "Hi, I am glad to be on likedin",
// });

// добавили комментарий к этому посту
use("Cohort60_lection_05");
// db.comments.insertMany([
//   {
//     email: "fish@mail.com",
//     message: "Oh, you are here! Wonderful!",
//     post_id: ObjectId("65c6096e0451b42a2273e13c"),
//   },
//   {
//     email: "eidelman@mail.com",
//     message: "Hey, man!",
//     post_id: ObjectId("65c6096e0451b42a2273e13c"),
//   },
//   {
//     email: "eidelman@mail.com",
//     message: "P.S. love you so!",
//     post_id: ObjectId("65c6096e0451b42a2273e13c"),
//   },
// ]);

// выборка поста с коментариями в одном запросе
// db.comments.aggregate([
//   {$lookup: {
//     from: "posts", // куда будем подсматривать - коллекция
//     localField: "post_id", // как называется в колл. комменте
//     foreignField: "_id",   // как называется в колл. посте
//     as: 'post_info'
//   }}
// ]);

// Что делает этот запрос:
// Проходит по всем документам коллекции comments.
// Для каждого комментария берёт значение поля post_id.
// Ищет в коллекции posts документ(ы), у которых _id совпадает с post_id.
// Добавляет к каждому комментарию новое поле post_info, содержащее массив
// соответствующих постов (чаще всего это будет массив из одного элемента, если post_id уникален).

// db.comments.aggregate([
//   {$lookup: {
//     from: "posts",// Коллекция, из которой будут подтягиваться данные (аналог JOIN в SQL)
//     localField: "post_id",// Поле в коллекции comments, по которому будет происходить связь
//     foreignField: "_id",// Поле в коллекции posts, с которым будет сравниваться post_id
//     as: 'post_info'// Название поля, в котором окажется массив с данными из posts
//   }}
// ]);

//GROUP

// db.posts.insertMany([
//   {
//     likes: 10,
//     text: "Hi, I am glad to be on likedin",
//     category: "science",
//   },
//   {
//     likes: 2,
//     text: "Hi, I am glad to be on likedin",
//     category: "music",
//   },
//   {
//     likes: 3,
//     text: "Hi, I am glad to be on likedin",
//     category: "music",
//   },
// ]);

// use("Cohort60_lection_05");
// db.posts.aggregate([
//   // {$match: {category: "music"}},
//   {$group: {_id: "$category", likeTotal: {$sum: "$likes"}}}
// ]);

// Другой пример
use("Cohort60_lection_05");

// db.kids.insertMany([
//   { name: "John", age: 5, gender: "boy" },
//   { name: "Anna", age: 6, gender: "girl" },
//   { name: "Leyla", age: 4, gender: "girl" },
//   { name: "Frieda", age: 3, gender: "boy" },
//   { name: "Bob", age: 5, gender: "boy" },
// ]);

// средний возраст по полу

// db.kids.aggregate([
//   {$group: {_id: "$gender", averageAge: {$avg: "$age"}}}
// ]);

// минимальный возраст по полу

// db.kids.aggregate([{ $group: { _id: "$gender", minAge: { $min: "$age" } } }]);

// максимальный возраст

db.kids.aggregate([
  {$group: {_id: "$gender", maxAge: {$max: "$age"}}}
]);
