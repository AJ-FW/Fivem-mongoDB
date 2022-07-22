# mongoDB


Step 1: Download Resource
Step 2: Rename it to mongoDB
Step 3: Start in server.cfg

## How to use mongoDB

add this in your resource fxmanifest.lua in server scripts make sure this line stays on top in server scripts
```lua
'@mongoDB/init.lua'
```

OR you can simply call this in your server script

```lua
local MongoDB = exports.cluster:Load()
```

# Usage

at Line 4

```js
const url = "mongodb://localhost:27017";
```

this will be your mongo db url

at line 6
```js
const db1 = 'Game';
const db2 = 'MDT';
const db3 = 'Permissions';
const db4 = 'Players';
const db5 = 'Storage';
```

you can create multiple database

setup your databases in this

```js
mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {

    if (err) return console.log("[MongoDB][ERROR] Failed to connect: " + err.message);
    
    database1 = client.db(db1);
    database2 = client.db(db2);
    database3 = client.db(db3);
    database4 = client.db(db4);
    database5 = client.db(db5);

    console.log(`[MongoDB] Connected to database "${db1+" "+db2+" "+db3+" "+db4+" "+db5}".`);

    emit("onDatabaseConnect", db1,db2,db3,db4,db5);

});

function checkDatabaseReady(dbname)

function getParamsCollection(dbname, params)
```

# export usage

```lua
MongoDB.Insert('Database name',{
    collection = 'collection name',
    document = {
        key = 'value'
    }
}, function(success, count, array)
    if not success then
        print(count) -- generally throws error
        return
    end
    print(count, array)
end)
```

```lua
local result = MongoDB.Async.Insert('Database name',{
    collection = 'collection name',
    document = {
        key = 'value'
    }
})
```


```lua
MongoDB.Find('Database name',{
    collection = 'collection name',
    query = {
        key = 'value'
    },
    limit = 2 -- optional
}, function(success, array)
    if not success then
        print(array) -- generally throws error
        return
    end
    print(array)
end)
```

```lua
local result = MongoDB.Async.Find('Database name',{
    collection = 'collection name',
    query = {
        key = 'value'
    },
    limit = 2 -- optional
})
```
