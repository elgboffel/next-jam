const getIndex = (indexName, client) => {

    if (!client) return;
    
    const index = client.initIndex(indexName);
    
    if (!index) return;

    return index;
};

exports.getIndex = getIndex;