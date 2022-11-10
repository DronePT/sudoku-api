FROM --platform=linux/amd64 node:lts-alpine AS build

WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM --platform=linux/amd64 node:lts-alpine AS production

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=${PORT}

WORKDIR /app

COPY --from=build /app/dist/ .
COPY --from=build /app/node_modules/ ./node_modules/

EXPOSE ${PORT}

CMD ["node", "index.js"]
