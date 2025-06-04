// Простые задания (1-15)

// 1. Создание базы данных
use("shop");

// 2. Создание коллекции
// db.createCollection("products");

// 3. Добавление одного документа
// db.products.insertOne({name: "sofa", price: 100, category: "furniture"});

// 4. Добавление нескольких документов
// db.products.insertMany([
//   { name: "table", price: 60, category: "furniture" },
//   { name: "chair", price: 30, category: "furniture" },
//   { name: "lamp", price: 25, category: "electronics" },
//   { name: "headphones", price: 80, category: "electronics" },
// ]);

// 5. Вывод всех товаров
// db.products.find().pretty();

// 6. Поиск товара по названию
// db.products.find({name: "chair"});

// 7. Фильтрация товаров по цене

// db.products.find({price: {$gt: 60}});

// 8. Обновление данных товара
// db.products.updateOne({ name: "lamp" }, { $set: { price: 35 } });

//
// 9. Удаление одного товара

// db.products.deleteOne({name: "table"});

// 10. Удаление товаров по условию < 35
// db.products.deleteMany({price: {$lt: 35}});

// 11. Создание индекса
// db.products.createIndex({ name: 1 });
// проверка, что индекс создался
// db.products.getIndexes();

// 12. Подсчет количества товаров
// db.products.countDocuments();

// 13. Поиск товаров в ценовом диапазоне
// db.products.find({
//   price: { $gte: 40, $lte: 100 },
// });

// 14. Фильтрация по категории
// db.products.find({ category: "electronics" });

// 15. Добавление нового поля ко всем товарам
// db.products.updateMany(
//   {},
//   { $set: { stock: 50 } }
// );

// Средние задания (16-30)

// 16. Добавление товара с вложенным документом
// db.products.insertOne({
//   name: "smartphone",
//   price: 700,
//   category: "electronics",
//   stock: 25,
//   details: {
//     brand: "Samsung",
//     model: "Galaxy S21",
//   },
// });

// 17. Поиск товаров с определенным полем
// db.products.find({ details: { $exists: true } });

// 18. Массовое обновление цен
// db.products.updateMany(
//   {},
//   { $mul: { price: 1.1 } }
// );

// 19. Добавление массива в товары
// db.products.updateMany(
//   {},
//   { $set: { reviews: ["Отличный товар!"] } }
// );

// 20. Добавление отзыва в массив
// db.products.updateOne(
//   { name: "smartphone" },
//   { $push: { reviews: "Отличный телефон, быстрая работа и хороший экран." } }
// );

// 21. Поиск товаров с определенным рейтингом

// добавим поле рейтинга ко всем товарам
// db.products.updateMany(
//   {},
//   {
//     $set: {
//       reviews: [
//         { text: "Первый отзыв", rating: 0 }
//       ]
//     }
//   }
// );
// выставим рейтинг = 5 для смартфона
// db.products.updateOne(
//   { name: "smartphone" },
//   { $set: { "reviews.$[].rating": 5 } }
// );

// поиск товара по условию задания

// db.products.find({
//   reviews: { $elemMatch: { rating: 5 } }
// });

// 22. Удаление вложенных данных
// db.products.updateOne(
//   { name: "smartphone" },
//   { $unset: { reviews: "" } }
// );

// 23. Создание новой коллекции и добавление данных
// db.orders.insertOne({
//   order_id: 1,
//   items: ["Laptop", "Mouse"],
//   status: "Pending",
//   total: 1500
// });

// 24. Обновление данных в коллекции заказов
// db.orders.updateOne(
//   { status: "Pending" },
//   { $set: { status: "Shipped" } }
// );

// 25. Подсчет заказов по статусу
// db.orders.countDocuments({ status: "Shipped" });

// 26. Удаление заказов с определенными товарами
// db.orders.deleteMany({ items: "Phone" });

// 27. Создание связи между заказами и пользователями
// const user = {
//   _id: ObjectId(),
//   name: "Ivan Ivanov",
//   email: "ivan@example.com"
// };
// db.users.insertOne(user);

// db.orders.updateMany(
//   {}, // все заказы, можно по условию
//   { $set: { user_id: ObjectId("68404b0400fc135c42bcef8f") } }
// );

// 28. Объединение данных из двух коллекций
// db.orders.aggregate([
//   {
//     $lookup: {
//       from: "users",
//       localField: "user_id",
//       foreignField: "_id",
//       as: "user_info"
//     }
//    }
// ]);

// 29. Сортировка товаров по цене
// db.products.find({ price: { $gt: 30 } }).sort({ price: -1 });

// 30. Создание уникального индекса
// db.customers.createIndex({ email: 1 }, { unique: true });
