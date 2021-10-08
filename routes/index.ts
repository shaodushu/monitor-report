
import {
    Router,
} from "https://deno.land/x/oak@v9.0.0/mod.ts";
import { addReport, getReport } from "../controller/index.ts";

// 构建一个 oak 应用
const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = "Hello World ";
});

router.get("/report", addReport);
router.get("/report/:time", getReport);

export default router