FROM php:8.2-apache

# Copy source code and choose working directory
COPY ./server /var/www/html
WORKDIR /var/www/html

# Install PHP extensions and software
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
install-php-extensions gmp gd openssl pdo_mysql mbstring

RUN install-php-extensions xdebug

RUN apt update && apt install ssl-cert -y && \
    a2enmod headers cgi rewrite ssl socache_shmcb setenvif

RUN apt update && apt install ssl-cert unzip -y;

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Expose ports
EXPOSE 80
EXPOSE 443
CMD ["apache2-foreground"]