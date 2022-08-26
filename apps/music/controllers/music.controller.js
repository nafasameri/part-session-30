const MusicRepository = require("../repositories/music.repository");
const sendResponse = require('../../../modules/handler/response.handler');
const { date } = require('../../../modules/utility');
const logger = require('log4js').getLogger();
const formidable = require('formidable')
// const musicRepository = new MusicRepository();

logger.level = 'debug';

const upload = async (req, res) => {
    try {
        const form = formidable({
            uploadDir: `uploads`,
            keepExtensions: true,
            filename(name, ext, part, form) {
                // return `${slugify(name)}.${slugify(ext, { separator: '' })}`.substr(0, 100);
                return date() + ' ' + name + ext;
            },
            // filter: function ({name, originalFilename, mimetype}) {
            //   // keep only images
            //   return mimetype && mimetype.includes("image");
            // }
            // maxTotalFileSize: 4000,
            // maxFileSize: 1000,

        });

        form.parse(req, (error, fields, files) => {
            req.fields = fields;
            req.files = files;

            if (error) {
                logger.error(error);
                sendResponse(res, error.httpCode || 400, { 'Content-Type': 'text/plain' }, `${error}`);
                return;
            }
            sendResponse(res, 200, { 'Content-Type': 'application/json' }, JSON.stringify({ fields, files }, null, 2));
        });

        return;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

const root = async (req, res) => {
    // else show a file upload form
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<html><body>
      <h2>With Node.js <code>"http"</code> module</h2>
      <form action="/music/upload" enctype="multipart/form-data" method="post">
        <div>Text field title: <input type="text" name="title" /></div>
        <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
        <input type="submit" value="Upload" />
      </form>
      </body></html>`);
    res.end();
}


module.exports = {
    upload,
    root
};
