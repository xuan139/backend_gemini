#!/bin/bash

# 使用 certbot 自动更新 Let's Encrypt SSL 证书
certbot renew --nginx --no-self-upgrade
