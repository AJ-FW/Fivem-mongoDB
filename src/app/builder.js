function Build(){
    let MongoDB = {}
    MongoDB.Async = {}
    const a = require('../functions/Sync/insert');
    const b = require('../functions/Async/insert');
    const c = require('../functions/Sync/find');
    const d = require('../functions/Async/find');
    const e = require('../functions/Sync/findsingle');
    const f = require('../functions/Async/findsingle');
    const g = require('../functions/Sync/update');
    const h = require('../functions/Async/update');
    const i = require('../functions/Sync/count');
    const j = require('../functions/Async/count');
    const k = require('../functions/Sync/delete');
    const l = require('../functions/Async/delete');
    const m = require('../functions/Sync/findupdate');
    const n = require('../functions/Async/findupdate');
    const o = require('../functions/Sync/findinsert');
    const p = require('../functions/Async/findinsert');
    const q = require('../functions/Sync/fiu');
    const r = require('../functions/Async/fiu');
    const s = require('../functions/Sync/aggregate');
    const t = require('../functions/Async/aggregate');
    //always use insertmany function
    MongoDB.Insert = a.insertfun                    // Required(dbname, parms:{collection,   document{data:"data"}})
    MongoDB.Async.Insert = b.insertfunawait
    //include find or limit
    MongoDB.Find = c.findfun                          // Required(dbname, parms:{collection,   query{data:"data"}})   Optional(parms:{limit:1})
    MongoDB.Async.Find = d.findfunawait
    MongoDB.FindSingle = e.findsinglefun
    MongoDB.Async.FindSingle = f.findsinglefunawait
    //include update single
    MongoDB.Update = g.updatefun                      // Required(dbname, parms:{collection,   query{data:"data"},    update{data:"data"}})       Optional(isUpdateOne)
    MongoDB.Async.Update = h.updatefunawait
    //count values by givin values
    MongoDB.Count = i.countfun                        // Required(dbname, parms:{collection,   query{data:"data"}})
    MongoDB.Async.Count = j.countfunawait
    //includes single delete
    MongoDB.Delete = k.deletefun                      // Required(dbname, parms:{collection,   query{data:"data"}})   Optional(isDeleteOne)
    MongoDB.Async.Delete = l.deletefunawait
    //includes single find and update
    MongoDB.FindAndUpdate = m.findandupdatefun        // Required(dbname, parms:{collection,   query{data:"data"},    update{data:"data"}})       Optional(isUpdateOne)
    MongoDB.Async.FindAndUpdate = n.findandupdatefunawait
    // finds data then insert if not found and always use insertmany function
    MongoDB.FindAndInsert = o.findandinsert           // Required(dbname, parms:{collection,   query{data:"data"},    document{data:"data"}})
    MongoDB.Async.FindAndInsert = p.findandinsertawait
    //find data if found then update else insert
    MongoDB.FindInsertUpdate = q.findinsertupdate     // Required(dbname, parms:{collection,   query{data:"data"},    document{data:"data"},  update{data:"data"}})
    MongoDB.Async.FindInsertUpdate = r.findinsertupdateawait
    MongoDB.Aggregate = s.aggregatefun
    MongoDB.Async.Aggregate = t.aggregatefunawait
    return MongoDB
}

module.exports = {
    Build,
}