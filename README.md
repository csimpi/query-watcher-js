# query-watcher-js

This is a listener for [YorCreative/Laravel-Query-Watcher](https://github.com/YorCreative/Laravel-Query-Watcher)

## Usage
`npm install -g query-watcher-js`

Run `query-watcher-js` from anywhere, it will pick up the `.env` file from the current folder.
It's compatible with Laravel environment settings. If you run `query-watcher-js` in a Laravel app's root folder it will use those settings.

## Example .env
```
BROADCAST_DRIVER=redis

REDIS_HOST=localhost
REDIS_PORT=6379

PUSHER_APP_ID="xxxxx"
PUSHER_APP_KEY="xxxxx"
PUSHER_APP_SECRET="xxxxx"
PUSHER_APP_CLUSTER=mt1
PUSHER_APP_AUTH_ENDPOINT="https://your.public.website.com/broadcasting/query-watcher/pusher/auth"

QUERY_WATCH_TOKEN="This token should be the same as on the server side"
```

## Adapters
So far it's only compatible with [Redis](https://github.com/csimpi/query-watcher-js/blob/main/src/Adapters/RedisAdapter.ts) and [Pusher](https://github.com/csimpi/query-watcher-js/blob/main/src/Adapters/PusherAdapter.ts). 
Feel free to make a PR and add more adapters to the list.

If you would like to add a custom adapter you just need to implement [AdapterInterface](https://github.com/csimpi/query-watcher-js/blob/main/src/Interfaces/AdapterInterface.ts).

The `onMessage()` function should return a `Subject`. Everything that that `Subject` emits will appear on the console.

