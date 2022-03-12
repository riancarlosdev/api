
import express from 'express'
import cors from 'cors'

import {r as UserRouter} from './routes/UserRouter'

export default class App {

  private app = express()
  private cors = cors ?? null

  public constructor() {
    this.middle()
    this.routes()
  }

  private middle() {
    this.app.use(express.json())
    !!this.cors && (this.app.use(cors({credentials: true})))
  }

  private routes() {
    this.app.use('/user', UserRouter)
  }

  public initialServer(type:boolean) {
    if(!type) {
      return this.app.listen(5000)
    }

    return this.app
  }

}