FROM php:8.2-fpm

# Copy source code and choose working directory
COPY ./server /var/www/html
WORKDIR /var/www/html

# Install PHP extensions and software
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
install-php-extensions gmp gd openssl pdo_mysql mbstring

RUN apt update && apt install ssl-cert unzip -y;

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]