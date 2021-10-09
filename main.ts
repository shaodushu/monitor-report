import {
    Application,
    isHttpError,
    Status,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import router from './routes/index.ts'

// 获取环境变量
const env = Deno.env.toObject();
const PORT = env.PORT || 3000;
const HOST = env.HOST || '0.0.0.0';

const app = new Application();

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


await app.listen(`${HOST}:${PORT}`);