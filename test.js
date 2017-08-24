var execSync = require('child_process').execSync

let deBased = {
  last_name: new Buffer('WkV4ODVWck00QjJpRGtBb0xLUGZWZz09', 'base64'),
  first_name: new Buffer('Nm9lMHhseC9oOVA1bUhXemJnek1uUT09', 'base64'),
  email: new Buffer('TndpdzVYb1E1SVd6Qm05UjlxQ2daOHZYREk3WDk1a2tZNzVDdlRYQXVuQT0=', 'base64'),
  phone: new Buffer('V0dzV2xITXVKSW84czZ6TUs0Rno0Zz09', 'base64')
}

// TODO get from conf
let key = 'd10ea2e8e3cd00db910b52d030c91dd1ac6c9f2c'
let iv = 'elegion123456789'

function decrypt(data, key, iv) {
  return execSync("php -r \"echo openssl_decrypt(base64_decode('"+data+"'), 'AES-128-CBC', '"+key+"', 0, '"+iv+"');\"").toString();
}
console.log(decrypt('WkV4ODVWck00QjJpRGtBb0xLUGZWZz09', key, iv));



//console.log(r)
//console.log(dec.update(deBased.last_name, 'binary', 'utf8') + dec.final('utf8'))
