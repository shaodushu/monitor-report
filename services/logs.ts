import {
    existsSync
} from "https://deno.land/std@0.110.0/fs/mod.ts";

const filePath = (time: string) => `${Deno.cwd()}/logs/${time}.json`

const logsService = {
    /**
     * Add a log to the log file 
     * Handle conditions to always add the log object in an array
     * @param log
     * @param time
     */
    addLog: function (log: any, time: string) {
        const encoder = new TextEncoder();

        let newRequestLog = [];
        if (existsSync(filePath(time))) {
            const data = Deno.readFileSync(filePath(time));
            const decoderr = new TextDecoder('utf-8');
            const decodedData = decoderr.decode(data);

            if (decodedData.trim()) {
                newRequestLog = JSON.parse(decodedData);
            }
        }
        newRequestLog.push(log);
        Deno.writeFileSync(filePath(time), encoder.encode(JSON.stringify(newRequestLog)))
    },
    /**
     * Get a log to the log file 
     * @param log
     * @param time
     */
    getLog: function (time?: string) {
        let newRequestLog = [];
        if (time && existsSync(filePath(time))) {
            const data = Deno.readFileSync(filePath(time));
            const decoderr = new TextDecoder('utf-8');
            const decodedData = decoderr.decode(data);

            if (decodedData.trim()) {
                newRequestLog = JSON.parse(decodedData);
            }
        }
        return newRequestLog
    }
};

export default logsService;