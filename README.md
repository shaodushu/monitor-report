##前端日志收集上报

### 项目启动
 ```bash
 deno run --no-check --unstable --inspect --allow-all  main.ts
 ```

### Docker

```basic
docker build -t monitor-report . && docker run -it -p 3000:3000 monitor-report
```

