import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { WordDatasetSource, WordDatasetSourceType } from "./structures";
export interface IForgeNLPOptions {
    wordDataset: WordDatasetSource<WordDatasetSourceType>[];
    loadDefaults?: boolean;
}
export declare class ForgeNLP extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    options: IForgeNLPOptions;
    constructor(opts?: Partial<IForgeNLPOptions>);
    init(client: ForgeClient): Promise<void>;
}
//# sourceMappingURL=ForgeNLP.d.ts.map