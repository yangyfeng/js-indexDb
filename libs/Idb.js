/*
 * @Author: your name
 * @Date: 2019-02-15 12:30:45
 * @LastEditTime: 2022-04-26 15:59:02
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /adsdesk-web-fixbug/src/libs/idb/libs/Idb.js
 */
import DB from './DB'
import { log } from './uitils/log'

function Idb({ dbName, version = new Date().getTime(), tables = [] }) {
  const db = new DB({
    dbName,
    version
  })

  for (let tableItem of tables) {
    // tableItem<Object> @tableName,@option,@indexs
    db.add_table(tableItem)
  }

  return new Promise((resolve, reject) => {
    db.open({
      success: () => {
        log(`数据库 ${dbName} 已经打开`)
        resolve(db)
      },
      upgradeneedSuccess: () => {
        log(`数据库 ${dbName} 已经 upgradeneed`)
        // resolve(db)
      },
      error: err => {
        reject(err)
      }
    })
  })
}

export default Idb
