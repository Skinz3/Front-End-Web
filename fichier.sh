ng build --prod
scp -r C:\Users\sbaim\Desktop\PIT\Front-End-Web\dist\tezea-chantiers ubuntu@5.196.8.112:/home/ubuntu/
ssh ubuntu@5.196.8.112
echo "vJVgFqCdgV2Z"
export PATH=/usr/bin/:$PATH
sudo mv /home/ubuntu/tezea-chantiers /var/www
sudo rm -rf /var/www/html
sudo mv /var/www/tezea-chantiers /var/www/html