FROM mcr.microsoft.com/devcontainers/universal:2

# Установка зависимостей
RUN apt-get update && apt-get install -y wget unzip openjdk-17-jdk

# Загрузка Android SDK
ARG ANDROID_SDK_URL=https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip
RUN wget $ANDROID_SDK_URL -O android-sdk.zip && \
    unzip android-sdk.zip -d /opt/android-sdk && \
    rm android-sdk.zip

# Настройка переменных среды
ENV ANDROID_HOME=/opt/android-sdk/cmdline-tools
ENV PATH=$PATH:$ANDROID_HOME/bin:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Принятие лицензий Android SDK
RUN yes | sdkmanager --licenses > /dev/null

# Установка необходимых компонентов Android SDK
RUN sdkmanager "platforms;android-33" "build-tools;33.0.0" "platform-tools"

# Установка Node.js и Yarn (если необходимо)
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn
