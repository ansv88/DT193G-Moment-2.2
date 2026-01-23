# Book API (Hapi + MongoDB)

En enkel REST‑webbtjänst för att hantera en boksamling.

## Teknik
- Hapi.js
- MongoDB + Mongoose

## Start
1. Skapa `.env` med:
   ```
   DATABASE=<din-mongodb-connection-string>
   ```
2. Installera:
   ```
   npm install
   ```
3. Starta:
   ```
   npm run start
   ```

## Endpoints (CRUD)
- **GET** `/books` – hämta alla böcker (valfritt: `?title=` eller `?author=`)
- **GET** `/books/{id}` – hämta en bok via id
- **POST** `/books` – lägg till en bok
- **PUT** `/books/{id}` – uppdatera en bok
- **DELETE** `/books/{id}` – ta bort en bok

## Payload‑exempel (POST/PUT)
```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "datePublished": 1965,
  "read": true
}
```

## Exempel (cURL)
```
curl -X POST http://localhost:5000/books \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"datePublished\":1965,\"read\":true}"
```