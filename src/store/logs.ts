import { VuexModule, Module, Mutation } from "vuex-module-decorators";
import { Log } from "@/models/logs";

@Module
export default class LogsModule extends VuexModule {
  logs: Log[][] = [];
  unstagedLogs: Log[] = [];
  @Mutation
  pushLogs() {
    this.logs.push(this.unstagedLogs);
    this.unstagedLogs = [];
  }
  @Mutation
  addLog(log: Log) {
    this.unstagedLogs.push(log);
  }
}
