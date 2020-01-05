const getIndex = (indexName, client) => {

    if (!client) return;
    
    const index = client.initIndex(indexName);
    
    if (!index) return;

    // index.setSettings({
    //     'searchableAttributes': [
    //         'bodyText',
    //         'lead',
    //         'heading'
    //     ]
    // });

    return index;
}

exports.getIndex = getIndex;