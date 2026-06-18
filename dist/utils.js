import * as fs from 'fs';
import path from "path";

function parsePath(args, options) {
    // check required args
    const location = options?.variables?.workspace;
    if (!location) {
        console.log("[Error]: missing workspace parameter", options);
        return { ok: false, msg: "[Error]: missing workspace parameter" };
    }
    let requestedPath = args?.path ?? "/workspace";
    if (requestedPath.startsWith("./")) {
        requestedPath = process.cwd() + args.path.slice(2);
    }
    let ok = false;
    let fp;
    //console.log("PPA", args);
    //console.log("PPO", options);
    // check for workspace
    if (options?.variables?.workspace) {
        fp = requestedPath.replace("/workspace", options.variables.workspace);
        ok = true;
    }
    // check for authorized paths if no workspace
    else if (options?.variables?.path) {
        const aps = options.variables.path.split(",");
        for (const ap of aps) {
            const authorizedPath = [".", "./"].includes(ap) ? process.cwd() : ap;
            //console.log("Auth path", authorizedPath);
            if (requestedPath.startsWith(authorizedPath)) {
                fp = requestedPath;
                ok = true;
                break;
            }
        }
    }
    if (!ok) {
        return { ok: false, msg: "[Error]: unauthorized file path" };
    }
    return { ok: true, msg: fp };
}

export {
    parsePath,
};
