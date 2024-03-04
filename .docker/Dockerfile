FROM node:16-alpine

ARG workdir=/src/amplify
WORKDIR ${workdir}

# Adding package.json first will cache our dependencies so
# that they do not have to be re-installed when the image rebuilds
ADD package.json ${workdir}

RUN cd ${workdir}
RUN npm i

EXPOSE 8080
