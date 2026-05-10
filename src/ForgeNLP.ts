import { ForgeClient, ForgeExtension } from "@tryforge/forgescript"
import { join } from "node:path"

export class ForgeNLP extends ForgeExtension {
  public name: string = "ForgeMath"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  public init(client: ForgeClient): void {
    this.load(join(__dirname, "functions"))
  }
}
