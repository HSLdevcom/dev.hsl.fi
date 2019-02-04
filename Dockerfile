FROM node:10-alpine

ENV WORK=/opt/devhslfi

WORKDIR ${WORK}

ADD . ${WORK}

RUN yarn global add gatsby-cli@2.4.5 && \
  yarn global add serve@10.1.1 && \
  yarn && \
  gatsby build

EXPOSE 8080

ENTRYPOINT ["serve", "-l", "8080", "./public"]
