# Adonis-social-network


[EN] My first Adonis project. A Twitter-like social network where you can
share your news with your friends!

[RU] Проба пера на Адонисе. Небольшая социальная сеть для обмена
новостями и мнениями с другими пользователями.


### Project Description:

Adonis.js + Typescript + PostgreSQL deployed using Heroku.

An authorized user can:
- write their own posts,
- read the news of other users,
- read the news of a single author,
- view the page of a single post with comments to it,
- leave their own comments,
- sign out of their account

Unauthorized cannot share their news or comments.
To do so they must:
- register (/signup)
- log in (/login)


### Launcing project locally:

1. Clone the repo and cd into Adonis-test folder
```
git clone <...>
```

2. Install the required packages:
```
npm install
```

3. To launch the app locally you'll need to tweak
some database configurations.
Please check 
- config/database.ts
- env.example
- env.ts 
for further instructions.

4. Run migrations:
```
node ace migration:run
```

5. Launch:
```
node ace serve -w
```
