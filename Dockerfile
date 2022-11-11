FROM node:latest as builder

ARG NODE_VERSION=latest


#######################################################################

RUN mkdir /app
WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN npm install
FROM node:latest

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production

CMD [ "npm", "run", "start" ]
