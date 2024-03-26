# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:latest

# 安装 certbot 工具
RUN apt-get update && apt-get install -y certbot

# 暴露 HTTP 和 HTTPS 端口
EXPOSE 80
EXPOSE 443

# 定义工作目录
WORKDIR /usr/share/nginx/html

# 复制 Nginx 配置文件到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 添加自动更新证书的脚本
COPY renew_cert.sh /renew_cert.sh
RUN chmod +x /renew_cert.sh

# 设置容器启动命令
CMD ["nginx", "-g", "daemon off;"]
