import { sqlConfig } from "../config";
import mssql from 'mssql'


export class DatabaseHelper{
    private  static pool: Promise<mssql.ConnectionPool> =mssql.connect(sqlConfig)

    private static addInputsToRequest(request:mssql.Request, data:{[x:string]:string|number}){
        const keys  =  Object.keys(data)
        keys.map(keyName=>{
            return request.input(keyName,data[keyName])
        })
        return request 
    }
    static async  exec(storedProcedure:string,data:{[x:string]:string|number}){
        // DatabaseHelper.pool = mssql.connect(sqlConfig)
        let request :mssql.Request=(await DatabaseHelper.pool).request() //empty pool
        request =  DatabaseHelper.addInputsToRequest(request,data)
       return  request.execute(storedProcedure)
    }

    static async query(queryString: string, data?: { [x: string]: string | number }) {
        let request: mssql.Request = (await DatabaseHelper.pool).request();
      
        if (data) {
          request = DatabaseHelper.addInputsToRequest(request, data);
        }
      
        return await request.query(queryString);
      }
}