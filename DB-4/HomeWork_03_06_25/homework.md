# Home Work Database 03.06.2025

## Задание:

- 1 Добавьте несколько напитков в коллекцию drinks (лучше 5-6). (Она создастся - как только вы добавите туда документы).
- 2 Пусть у напитков будут поля цена, крепость, и прочие на ваше усмотрение.
- 3 Выведите самый дорогой напиток
- 4 Выведите топ три самых дешевых напитка
- 5 Выведите название самого крепкого напитка.

## Дополнительное задание:

- 6 создайте напитки с тегами (дессертный, коктейль, горячий и пр.)
- 7 получите название напитков, в которых присутсвует искомый тег

# Решение

## 1 Create / Use our DB "drinks_db"

```javascript
use("drinks_db");
```

## 2 Add data to our DB

```javascript
db.users.insertMany([
  {
    name: "Jack Daniel's Old No.7",
    alcohol_strength: 40,
    price: 25.99,
    type: "whiskey",
    brand: "Jack Daniel's",
    volume: 700,
  },
  {
    name: "Absolut Vodka",
    alcohol_strength: 40,
    price: 18.5,
    type: "vodka",
    brand: "Absolut",
    volume: 700,
  },
  {
    name: "Heineken",
    alcohol_strength: 5,
    price: 1.5,
    type: "beer",
    brand: "Heineken",
    volume: 500,
  },
  {
    name: "Baileys Irish Cream",
    alcohol_strength: 17,
    price: 14.75,
    type: "liqueur",
    brand: "Baileys",
    volume: 700,
  },
  {
    name: "Moët & Chandon Brut",
    alcohol_strength: 12,
    price: 39.99,
    type: "champagne",
    brand: "Moët & Chandon",
    volume: 750,
  },
  {
    name: "Coca-Cola",
    alcohol_strength: 0,
    price: 0.99,
    type: "soft drink",
    brand: "Coca-Cola",
    volume: 500,
  },
  {
    name: "Château Margaux",
    alcohol_strength: 13.5,
    price: 120.0,
    type: "red wine",
    brand: "Château Margaux",
    volume: 750,
  },
  {
    name: "Beefeater London Dry Gin",
    alcohol_strength: 40,
    price: 19.99,
    type: "gin",
    brand: "Beefeater",
    volume: 700,
  },
  {
    name: "Fanta Orange",
    alcohol_strength: 0,
    price: 0.89,
    type: "soft drink",
    brand: "Fanta",
    volume: 500,
  },
  {
    name: "Corona Extra",
    alcohol_strength: 4.6,
    price: 1.7,
    type: "beer",
    brand: "Corona",
    volume: 355,
  },
  {
    name: "Jägermeister",
    alcohol_strength: 35,
    price: 16.0,
    type: "herbal liqueur",
    brand: "Jägermeister",
    volume: 700,
  },
]);
```

## 3 Выведите самый дорогой напиток

### 3.1 easy

```javascript
db.users.find().sort({ price: -1 }).limit(1);
```

### 3.2 with some fields

```javascript
db.users
  .find({}, { name: 1, price: 1, brand: 1, _id: 0 })
  .sort({ price: -1 })
  .limit(1);
```

## 4 Выведите топ три самых дешевых напитка

### 4.1 easy

```javascript
db.users.find().sort({ price: 1 }).limit(3);
```

### 4.2 with some fields

```javascript
db.users
  .find({}, { name: 1, price: 1, type: 1, _id: 0 })
  .sort({ price: 1 })
  .limit(3);
```

## 5 Выведите название самого крепкого напитка.

### 5.1 easy

```javascript
db.users.find({}, { name: 1, _id: 0 }).sort({ alcohol_strength: -1 }).limit(1);
```

### 5.2 with alcohol_strength

```javascript
db.users
  .find({}, { name: 1, alcohol_strength: 1, _id: 0 })
  .sort({ alcohol_strength: -1 })
  .limit(1);
```

# Дополнительное задание

## 6 создайте напитки с тегами (дессертный, коктейль, горячий и пр.)

```javascript
db.users.insertMany([
  {
    name: "Baileys Irish Cream",
    alcohol_strength: 17,
    price: 14.75,
    type: "liqueur",
    brand: "Baileys",
    volume: 700,
    tags: ["dessert", "cream", "cocktail"],
  },
  {
    name: "Hot Toddy",
    alcohol_strength: 10,
    price: 6.5,
    type: "mixed drink",
    brand: "homemade",
    volume: 250,
    tags: ["hot", "cocktail", "comfort"],
  },
  {
    name: "Mojito",
    alcohol_strength: 12,
    price: 7.5,
    type: "cocktail",
    brand: "classic",
    volume: 300,
    tags: ["refreshing", "mint", "cocktail"],
  },
  {
    name: "Mulled Wine",
    alcohol_strength: 8,
    price: 5.5,
    type: "wine",
    brand: "homemade",
    volume: 250,
    tags: ["hot", "spiced", "winter"],
  },
  {
    name: "Coca-Cola Vanilla",
    alcohol_strength: 0,
    price: 1.2,
    type: "soft drink",
    brand: "Coca-Cola",
    volume: 500,
    tags: ["sweet", "vanilla", "dessert"],
  },
]);
```

## 7 получите название напитков, в которых присутсвует искомый тег

### найдем все напитки с тегом "dessert":

```javascript
db.users.find({ tags: "dessert" }, { name: 1, _id: 0 });
```

### найдем горячие напитки

```javascript
db.users.find({ tags: "hot" }, { name: 1, _id: 0 });
```

### ищем напитки, у которых есть ВСЕ указанные теги

```javascript
db.users.find({ tags: { $all: ["hot", "cocktail"] } }, { name: 1, _id: 0 });
```

### ищем напитки, у которых есть хотя бы один из тегов

```javascript
db.users.find({ tags: { $in: ["dessert", "hot"] } }, { name: 1, _id: 0 });
```

### ищем напитки, у которых нет указанного тега

```javascript
db.users.find({ tags: { $ne: "cocktail" } }, { name: 1, _id: 0 });
```

### напитки, которые не содержат cocktail

```javascript
db.users.find({ tags: { $not: { $in: ["cocktail"] } } }, { name: 1, _id: 0 });
```
