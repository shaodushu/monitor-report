import {
    Application,
    isHttpError,
    RouteParams,
    Router,
    RouterContext,
    Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import {
    decode as base64Decode,
} from 'https://deno.land/std@0.110.0/encoding/base64.ts';
import logsService from "./services/logs.ts";


// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || "127.0.0.1";

// 构建一个 oak 应用
const router = new Router();
const app = new Application();

router.get("/", (ctx) => {
    ctx.response.body = "Hello World ";
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT}...`);

app.use(async (_, next) => {
    try {
        await next();
    } catch (err) {
        if (isHttpError(err)) {
            switch (err.status) {
                case Status.NotFound:
                    // handle NotFound
                    break;
                case Status.InternalServerError:
                    console.log(err);
                    break;
                default:
                // handle other statuses
            }
        } else {
            // rethrow if you can't handle the error
            throw err;
        }
    }
});

export const getReport = (
    ctx: RouterContext<RouteParams, Record<string, any>>,
) => {
    const {
        response,
        request,
    } = ctx;

    const info = request.url.searchParams.get('info')
    const textDecoder = new TextDecoder('utf-8');
    const json = JSON.parse(textDecoder.decode(base64Decode(info || '')).toString())

    logsService.addLog(json, '20211008')

    response.status = 200;
}
router
    .get("/report", getReport);

await app.listen(`${HOST}:${PORT}`);