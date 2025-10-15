FROM php:8.2-apache

# Extensions PHP
RUN docker-php-ext-install pdo pdo_mysql

# Activer mod-rewrite
RUN a2enmod rewrite

# Supprimer le warning AH00558
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copier les sources et appliquer les droits
COPY crm/ /var/www/html/
RUN chown -R www-data:www-data /var/www/html \
 && chmod -R 755 /var/www/html

EXPOSE 80