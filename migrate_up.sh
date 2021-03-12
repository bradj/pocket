env $(cat .env | xargs) sql-migrate up
