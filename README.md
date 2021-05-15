# Api for Arcduino curse

## Data Controll

- `GET /find` - Get all data from data base.
- `GET /data/:user/:title/:data` - Create new document.
- `GET /find/user/:user` - Find data by user.
- `GET /find/title/:title` - Find data by title.
- `GET /find/user/:user/title/:title` - Find data by user and title.
- `GET /user/:user/limit/:limit` - Find last n documents by user.
- `GET /title/:title/limit/:limit` - Find last n documents by title.
- `GET /update/:user/:title/:update` - Update by title.
- `GET /delete/:_id` - Delete document by id.
- `GET /delete/title/:title` - Delete many by titile.
