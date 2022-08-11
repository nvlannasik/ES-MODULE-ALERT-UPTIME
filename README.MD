# MODULE ALERT TO TELEGRAM FOR ELK

Respository ini berisikan module/fitur untuk mengirimkan pesan dari alert rule ELK ke telegram secara otomatis dan gratis

## Tested on

**NodeJS Version:** 14.16.0

**NPM Version:** 6.14.11

**Docker Version:** 20.10.17, build 100c701

## Installation

clone repository

```bash
git clone https://github.com/nvlannasik/ES-MODULE-ALERT.git
```

masuk kedalam repo dan install dependensi

```bash
cd ES-MODULE-ALERT
npm install
```

rename `.envexample` menjadi `.env` dan masukan environment variable sesuai dengan kebutuhan

```bash
ELASTIC_URL=<elastic Host>
ELASTIC_USERNAME=<elastic Username>
ELASTIC_PASSWORD=<elastic Password>
ELASTIC_INDEX=<elastic Index>

TELEGRAM_TOKEN=<TOKEN BOT>
TELEGRAM_CHAT_ID=<Telegram Chat ID>
```

Setelah mengisi environment variable, jalankan program

```bash
npm start
```

## Running On Docker

Untuk menjalankan program di docker, build terlebih dahulu image dockernya dengan menggunakan perintah

```bash
docker build -t es-module-alert:v1 .
```

jalankan image tersebut dengan perintah

```bash
docker run es-module-alert:v1
```

## Dokumentasi Alert Rule

Untuk membuat alert rule di dashboard kibana, silahkan lihat dokumentasi di [Dokumentasi Alert Rule](https://github.com/nvlannasik)

## Authors

- [Ahmad Naoval Annasik](https://github.com/nvlannasik)
