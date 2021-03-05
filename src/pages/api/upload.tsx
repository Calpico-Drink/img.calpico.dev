import formidable from 'formidable';

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
  form.uploadDir = "./public";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    let path = files.file.path.replace('public\\', '').replace(' ', '')
    console.log(path)
    console.log(binaryToZeroWidth(textToBinary(path)))
    res.json({
      success: true,
      file: {
        url: 'https://image-orcin.vercel.app/' + binaryToZeroWidth(textToBinary(path)),
        delete_url: 'test'
      }
    })
  });
};