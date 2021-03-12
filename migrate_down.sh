env $(cat .env | xargs) sql-migrate down
