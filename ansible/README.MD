## Automate your scripts with Ansible
### Resources:  
https://www.ansible.com/  
https://docs.ansible.com/ansible/latest/index.html

##### Author: DylanFJ

### Install a local development VirtualBox VM
* Before we begin
    - Operating System (OS): Debian 10 amd64bits.
    - Title of project: Smart2Survey
    - Local domain name: smart2survey.local
* Download and install VirtualBox and his extension pack.
  - macOS & Windows: https://www.virtualbox.org/wiki/Downloads
  - ubuntu: sudo apt install virtualbox
* Download the latest Debian 10 64-bit ISO from debian website  
  https://cdimage.debian.org/debian-cd/current/amd64/iso-dvd/
* Launch VirtualBox.
    * Config
        * In File/Host network manager, add a new network vboxnet0:
            * Adapter:
            * IPv4 Address: 192.168.56.1
            * IPv4 Network Mask: 255.255.255.0
        * DHCP Server
            * Enable Server
            * Server Address: 192.168.56.100
            * Server Mask: 255.255.255.0
            * Lower Address Bound: 192.168.56.101
            * Upper Address Bound: 192.168.56.254
    * Create a new VM:
        * Name: Debian 10
        * Type: Linux
        * Version: Debian (64 bit)
        * Memory size: 2048MB
        * Create a virtual hard disk now
        * Hard drive file type: VMDK, Fixed size, max 20GB
        * Settings/Network
            * Adapter 1: Host-only Adapter, vboxnet0
            * Adapter 2: NAT
        * Add Settings/Shared Folders/ for your project folder (Smart2Survey)
            * Folder Path: /path-to-your-project-folder-git-checkout/web
            * Folder Name: web
            * Auto-mount
    * Start VM and install debian:
        * Install
        * Language: English
        * Location: other/Europe/France (put your location)
        * Locale: en_US.UTF-8
        * Keymap to use: French (put your keymap)
        * Primary network: enp0s8
        * Hostname: debian10
        * Domain name: 
        * Root password: enter a password
        * New user: ansible
        * Password for the new user: enter a password
        * Partitioning method: Guided - use entire disk, All files in one partition
        * Debian archive mirror country: France, deb.debian.org (according the country)
        * HTTP proxy:
        * Participate in the package usage survey: no
        * Choose software to install: SSH server (unselect everything else)
        * Install the GRUB boot loader to the master boot record: yes, /dev/sda
        * Reboot
        * Login as root:

```
nano /etc/network/interfaces
```

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback

allow-hotplug enp0s3
iface enp0s3 inet static
  address 192.168.56.60
  network 192.168.56.0
  netmask 255.255.255.0
  broadcast 192.168.56.255

allow-hotplug enp0s8
iface enp0s8 inet dhcp

# Use these following lines if necessary
# ifup enp0s3
# exit
```

* Add VM in your hosts file /etc/hosts:
```
echo "192.168.56.60   debian10" | sudo tee -a /etc/hosts
echo "192.168.56.60 smart2survey.local www.smart2survey.local back.smart2survey.local" | sudo tee -a /etc/hosts
echo -e "Host debian10\n  User ansible" >> ~/.ssh/config
```
For Windows users, edit as admin: ```C:\Windows\System32\drivers\etc\hosts```
* Allow symbolic links in VirtualBox shared folders:

```
VBoxManage setextradata "Debian 10" VBoxInternal2/SharedFoldersEnableSymlinksCreate/web 1
```
* Generate ssh key if not done (id_rsa.pub is the public key generated here but you can choose an another name).
```
ssh-keygen -t rsa -b 4096
```
* An apt sources.list is provided, you can use it if necessary.
```
cd path-to-your-mysurvey-git-checkout/ansible
scp ~/files/sources.list ansible@debian10:/tmp/
ssh root@debian10
mv /tmp/sources.list /etc/apt/
```
* Check nginx user
```
ssh root@debian10
cat /etc/nginx/nginx.conf
```
Remenber that user, you must put this user name in your ansible_directory/vars/common.yaml for key 'web_user'.  
Nginx start with this user and your application also.

* Configure ansible account:
```
scp ~/.ssh/id_rsa.pub ansible@debian10:/tmp/
```
```
ssh root@debian10
apt update
apt full-upgrade
apt install acl python3 python3-apt sudo
usermod -a -G sudo ansible
echo "ansible ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/ansible
exit
mkdir ~/.ssh
chmod 700 ~/.ssh
cp /tmp/id_rsa.pub ~/.ssh/authorized_keys
sudo reboot
```

Install ansible on your computer  
See https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html
    
Run ansible

```
cd /path-to-your-mysurvey-git-checkout/ansible
./dev-1-install.sh
```
Then
```
ssh ansible@debian10 'sudo reboot'
```

### Issues
If you have this error when running dev-1-install.sh "System has not been booted with systemd as init system (PID 1)", do this:
```
ssh root@debian10
ls -l /usr/sbin/ | grep init
```
You should have ```init -> /lib/systemd/systemd```.
If not,
```
rm /usr/sbin/init
ln -s /lib/systemd/systemd /usr/sbin/init
```
Restart the virtual machine from virtual box and restart ansible script.