# serveo.net
ssh -R 80:localhost:3000 serveo.net

# Installing Node Using the Node Version Manager
Another way of installing Node.js that is particularly flexible is to use nvm, the Node Version Manager. This piece of software allows you to install and maintain many different independent versions of Node.js, and their associated Node packages, at the same time.

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

source ~/.bashrc

nvm list-remote

nvm install v20.11.1

nvm list

nvm use v20.11.1


# Removing Node.js
You can uninstall Node.js using apt or nvm, depending on how it was installed. To remove the version from the system repositories, use apt remove:

sudo apt remove nodejs

sudo apt purge nodejs

nvm current

nvm uninstall node_version


# install nginx basic
https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

sudo apt update

sudo apt install nginx

sudo ufw app list

sudo ufw allow 'Nginx HTTP'

sudo ufw status

systemctl status nginx

## To stop your web server, type:

sudo systemctl stop nginx

## To start the web server when it is stopped, type:

sudo systemctl start nginx

## To stop and then start the service again, type:

sudo systemctl restart nginx

# install pm2

npm install -g pm2

pm2 --version

pm2 start app.js

pm2 status

pm2 logs app

pm2 restart app

pm2 stop app




# install docker
sudo apt update && sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io
