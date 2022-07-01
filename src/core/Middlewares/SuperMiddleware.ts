export class SuperMiddleware {
    async process(): Promise<any>{
        return new Promise((resolve)=>{
            resolve(null)
        })
    }
}