exports.buildInfo = (dato) => {
    if (process.env.INCOMING_HOOK_BODY) {
        const json = JSON.parse(process.env.INCOMING_HOOK_BODY);
        console.log("################### Incoming Hook Body ###################");
        console.log(process.env.INCOMING_HOOK_BODY);
        console.log("################### Incoming Hook Body End ###################");
        console.log("Item: ", dato.find(json.entity_id).toMap(1));
    }
};
