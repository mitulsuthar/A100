FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
ENV NODE_VERSION 11.10.0
ENV NODE_DOWNLOAD_SHA 4117de50800ecc6d5f7a9c3989d5497fa9dd37df87a904ac4d49948ab10d39ba
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
   && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
   && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
   && rm nodejs.tar.gz \
   && ln -s /usr/local/bin/node /usr/local/bin/nodejs
WORKDIR /app
EXPOSE 80
EXPOSE 443


FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ["A100/A100.csproj", "A100/"]
RUN dotnet restore "A100/A100.csproj"
COPY . .
ENV NODE_VERSION 11.10.0
ENV NODE_DOWNLOAD_SHA 4117de50800ecc6d5f7a9c3989d5497fa9dd37df87a904ac4d49948ab10d39ba
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
   && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
   && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
   && rm nodejs.tar.gz \
   && ln -s /usr/local/bin/node /usr/local/bin/nodejs
RUN npm install -g npm
WORKDIR "/src/A100/ClientApp"
RUN npm install
WORKDIR "/src/A100"
RUN dotnet build "A100.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "A100.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "A100.dll"]