RegisterNetEvent('onDatabaseConnect', function(data)
    local MongoDB = exports.cluster:Load()
    MongoDB.FindSingle('DB Name', {
        collection = 'Collection Name',
        query = {
            key = 'value'
        },
    },function(a,b,c,d)
        if not a then
            print(b)
        else
            print(b[1].a,c,d)
        end
    end)
end)