/*
# tool
name: run-npm-command
description: run an npm command inside the workspace
arguments:
    arguments:
        description: 'the arguments for the npm command: example: "test", "run build" is valid, "test 2>&1" or any other pipe is invalid, it is not a shell'
        required: true
    path:
        description: the path from where to run the command. If not provided the command will run at /workspace  
*/
import { utils } from "@agent-smith/core";
import { parsePath } from '../utils.js';

function createAwaiter() {
    let resolveFn;
    let rejectFn;
    const promise = new Promise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });
    return {
        awaiter: promise,
        unblock: resolveFn,
        reject: rejectFn
    };
}

async function action(args, options) {
    const { ok, msg } = parsePath(args, options);
    if (!ok) {
        return msg;
    }
    const pp = args?.path ? args.path.replace("/workspace", msg) : msg;
    // try to cleanup the ai mess
    let c = args.arguments.split("|")[0];
    c = args.arguments.split("&")[0];
    c = args.arguments.split("2>")[0];
    c = args.arguments.split(";")[0];
    //const npmArgs = c.replace("npm", "").trim().split(" ");
    const npmArgs = c.trim().split(" ");
    let data = "";
    const aw = createAwaiter();
    const res = await utils.runShellCmd("npm", ["--prefix", pp, ...npmArgs], {
        onStdout: (o) => {
            console.log(o);
            data += o;
        },
        onErr: console.log,
        onFinished: () => {
            console.log("====================== END\n", data, "=========================");
            aw.unblock();
        }
    });
    await aw.awaiter;
    return data;
}

export { action };