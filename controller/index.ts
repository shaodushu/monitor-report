import {
    RouteParams,
    RouterContext,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import {
    decode as base64Decode,
} from 'https://deno.land/std@0.110.0/encoding/base64.ts';
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import logsService from "../services/logs.ts";

const MOMENT: moment.Moment = moment();

export const addReport = (
    ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
    const {
        response,
        request,
    } = ctx;

    const info = request.url.searchParams.get('info')
    const textDecoder = new TextDecoder('utf-8');
    const json = JSON.parse(textDecoder.decode(base64Decode(info || '')).toString())

    logsService.addLog(json, MOMENT.format('YYYYMMDD'))

    response.status = 200;
}

export const getReport = (
    ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
    const {
        params,
        response,
    } = ctx;

    const data = logsService.getLog(params.time)

    response.status = 200;
    response.body = data
}