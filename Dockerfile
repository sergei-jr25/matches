FROM mcr.microsoft.com/devcontainers/universal:2

 RUN apt-get update && apt-get install -y wget unzip openjdk-17-jdk

 ARG ANDROID_SDK_URL=https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
RUN wget $ANDROID_SDK_URL -O android-sdk.zip && \
    unzip android-sdk.zip -d /opt/android-sdk && \
    rm android-sdk.zip

 ENV ANDROID_HOME=/opt/android-sdk/cmdline-tools
ENV PATH=$PATH:$ANDROID_HOME/bin:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

 RUN yes | sdkmanager --licenses > /dev/null

 RUN sdkmanager "platforms;android-33" "build-tools;33.0.0" "platform-tools"

 RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn
