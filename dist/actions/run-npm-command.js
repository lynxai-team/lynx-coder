/*
# tool
name: run-npm-command
description: run an npm command inside the workspace
parallel: false
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
    const pp = msg;
    // try to cleanup the ai mess
    let c = args.arguments.split("|")[0];
    c = args.arguments.split("&")[0];
    c = args.arguments.split("2>")[0];
    c = args.arguments.split(";")[0];
    //const npmArgs = c.replace("npm", "").trim().split(" ");
    const npmArgs = c.trim().split(" ");
    let data = "";
    const aw = createAwaiter();
    console.log("Executing: npm", "--prefix", pp, ...npmArgs);
    let i = 1;
    const stderrw = () => setTimeout(() => {
        //console.log("END", i);
        aw.unblock();
    }, 100);
    const res = await utils.execute("npm", ["--prefix", pp, ...npmArgs], {
        onStdout: (o) => {
            console.log(o);
            data += o;
        },
        onStderr: (o) => {
            //console.log(i, "STDERR", o);
            data += i == 1 ? ("STDERR: \n" + o) : o;
            if (i == 1) {
                stderrw();
            }
            ++i;
        },
        onError: (o) => {
            console.log("ERROR", o);
            data += "ERROR: " + o;
            aw.unblock();
        },
        onFinished: () => {
            console.log("OK", data);
            aw.unblock();
        }
    });
    await aw.awaiter;
    return data;
}

export { action };