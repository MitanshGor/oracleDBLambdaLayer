'use strict';
console.log(process.env)
const util = require('util')
const { exec } = require('child_process')
const execProm = util.promisify(exec)

module.exports.run_shell_command = async (command) => {
  let result
  try {
    result = await execProm(command)
  } catch (ex) {
    result = ex
  }
  if ( Error[Symbol.hasInstance](result) ) {
    console.log(Error[Symbol.hasInstance](result))
    return
  }
  return result
}







console.log('line 5')
const oracledb = require('oracledb')
// const oracledb = require('/opt/nodejs/node14/node_modules/oracledb')
console.log('line 6')
const oracleConfig = {
  user: "ETLSVC",
  password: "ORCLdev4etl",
  connectString: "atlas-aptean.npad.wickes.co.uk:1521/OBSDDEV"
}
console.log('line 7')
// let clientOpts = {}
// if (process.env.STAGE !== 'local') {
//   clientOpts = { libDir: '/opt/lib' }
// }

// oracledb.initOracleClient()
module.exports.hello = async (event) => {
  
  console.log("There there")
  console.log('process.env.NODE_PATH: ', process.env.NODE_PATH)

  await module.exports.run_shell_command('cd /opt ; ls').then( (res) => console.log('cd /opt ; ls : ', res) )
  await module.exports.run_shell_command('cd /opt/lib; ls ').then( (res) => console.log('cd /opt/lib; ls ', res) )
  await module.exports.run_shell_command('cd /var ; ls').then( (res) => console.log('cd /var ; ls : ', res) )
  await module.exports.run_shell_command('cd /var/task; ls').then( (res) => console.log('cd /var/task; ls ', res) )
  await module.exports.run_shell_command('cd /var/runtime; ls').then( (res) => console.log('cd /var/runtime; ls ', res) )
  await module.exports.run_shell_command('cd /var/runtime/node_modules; ls').then( (res) => console.log('cd /var/runtime/node_modules; ls ', res) )
  await module.exports.run_shell_command('cd /var/runtime/node_modules/oracledb; ls').then( (res) => console.log('cd /var/runtime/node_modules/oracledb; ls', res) )
  await module.exports.run_shell_command('cd /var/task/lib; ls').then( (res) => console.log('cd /var/task/lib; ls ', res) )

  const calidusConn = await oracledb.getConnection(oracleConfig)
  console.log({calidusConn})
  return 'wow'
};
