/*
# tool
name: shell
description: "Execute shell commands"
arguments:
    command:
        description: |-
            The shell command to execute
        required: true
parallel: false
*/
import { SimpleBox } from '@boxlite-ai/boxlite';
async function action(args, options) {
    //console.log("SHELL ARGS", args);
    //console.log("SHELL OPTS", options);
    const location = options?.variables?.path ?? options?.variables?.workspace;
    if (!location) {
        return "[Error]: shell tool missing path or workspace parameter";
    }
    if (options?.debug) {
        console.log('Opening box', location);
    }
    //console.log("Cmd:", cmd, cmdArgs);
    const box = new SimpleBox({
        //image: 'golang:1.26',
        image: "cimg/go:1.25-node",
        name: "goshellbox",
        workingDir: "/workspace",
        volumes: [
            { hostPath: location, guestPath: '/workspace' },
        ],
        //network: { "mode": "disabled" },
        security: {
            seccompEnabled: false
        },
        reuseExisting: true,
    });
    process.on('SIGINT', () => {
        box.getInfo().then(info => {
            //console.log("INFO", info);
            if (info.state.running) {
                console.log('\nExiting shell box');
                box.stop().then(() => process.exit(0));
            }
            else {
                process.exit(0);
            }
        });
    });
    let res = "";
    setTimeout(() => {
        res = "Timeout: the process has timed out";
        box.stop();
    }, 60000);
    try {
        const result = await box.exec("sh", "-c", args.command);
        //console.log("CMD RES", result);
        if (result?.stderr.length > 0) {
            res += "[Stderr] exit code:" + result.exitCode + "\n" + result.stderr;
        }
        if (result?.stdout.length > 0) {
            if (result.stdout == "" && result?.stderr.length == 0) {
                res += "[Stdout] Exit code: " + result.exitCode;
            }
            else {
                if (res.length == 0) {
                    res += "[Stdout] " + result.stdout;
                } else {
                    res += "\n\n[Stdout] " + result.stdout;
                }
            }
        }
    }
    finally {
        if (options?.debug) {
            console.log("stopping shell box");
        }
        await box.stop();
    }
    return res;
}
export { action, };
