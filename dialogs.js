var dialogs={};
module.exports=dialogs;

dialogs.google = require('./dialog/v1/google_dialog.js');
dialogs.cv = require('./dialog/v1/cv.js');

