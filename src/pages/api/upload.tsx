import formidable from 'formidable'
import FormData from 'form-data'
import fs from 'fs'
import http from 'https'

const zeroPad = num => '00000000'.slice(String(num).length) + num;
const textToBinary = username => (
  username.split('').map(char =>
    zeroPad(char.charCodeAt(0).toString(2))).join(' ')
);

const binaryToZeroWidth = binary => (
  binary.split('').map((binaryNum) => {
    const num = parseInt(binaryNum, 10);
    if (num === 1) {
      return '​'; // zero-width space
    } else if (num === 0) {
      return '‌'; // zero-width non-joiner
    }
    return '‍'; // zero-width joiner
  }).join('') // zero-width no-break space
);

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    let form = new FormData()
    form.append('file', files.file)
    form.append('userkey', '	6sIziL2SkqdDSinMn0z7EgBNKeXUuLRD')
    var request = http.request({
      method: 'post',
      host: 'vgy.me',
      path: '/upload',
      headers: form.getHeaders()
    });

    form.pipe(request);

    request.on('response', function (res) {
      console.log(res.statusCode);
    });
    res.json({
      success: true,
      file: {
        url: 'https://image-orcin.vercel.app/',
        delete_url: 'test'
      }
    })
  });
};