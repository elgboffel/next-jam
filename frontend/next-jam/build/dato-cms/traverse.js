function traverse(records, path, root, cb) {

    if (!records || records.length <= 0) return;
    
    // if (typeof records === "object") return cb(records, path, false, root);

    console.log("records:::", records)
    records.forEach((record) => {
      const hasChildren = record.children.length > 0;
      // Create a new folder path if item has children
      if (hasChildren) path = `${path}/${record.slug}`; 

      cb(record, path, root);

      if (hasChildren) traverse(record.children, path, root, cb);
    });
  }
  
  /**
   * 
   * @param {Object} records 
   * @param {string} path
   * @param {function()} cb
   * @param {number=} depth 
   */
  module.exports = (records, path, root, cb) => traverse(records, path, root, cb);