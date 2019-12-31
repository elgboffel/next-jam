const SiteClient = require("datocms-client").SiteClient;

module.exports = new SiteClient(process.env.DATOCMS_READ_WRITE_TOKEN);
