FROM denoland/deno:1.14.3

# The port that your application listens to.
EXPOSE 3000

WORKDIR /app

# Prefer not to run as root.
# USER deno
USER root

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
# COPY deps.ts .
# RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
RUN apt-get update && apt-get install sudo
# Obtaining the local IP Address
RUN sudo apt install net-tools
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --no-check main.ts

CMD ["run","--no-check","--unstable","--inspect","--allow-all","--allow-net","main.ts"]
