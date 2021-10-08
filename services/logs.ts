const logsService = {
    /**
     * Add a log to the log file 
     * Handle conditions to always add the log object in an array
     * @param requestingUser
     * @param requested
     */
    addLog: async function (log: any, time: string) {
        const encoder = new TextEncoder();
        let newRequestLog = [];

        const data = await Deno.readFile(`${Deno.cwd()}/logs/${time}.json`);
        const decoderr = new TextDecoder('utf-8');
        const decodedData = decoderr.decode(data);

        if (decodedData.trim()) {
            newRequestLog = JSON.parse(decodedData);
        }
        newRequestLog.push(log);

        await Deno.writeFile(
            `"./logs/${time}.json"`,
            encoder.encode(JSON.stringify(newRequestLog))
        );
    }
};

export default logsService;