---
layout: Post
title: Install Git 1.8 on RHEL 6
date: 2014-05-26
hero: /assets/21779073769_24078096d8_o.jpg
---




## Install Git 1.8 on RHEL 6

While PyCharm does work with the native version of Git that ships with RHEL 6.5, it does complain a lot. I also feared that something would go wrong eventually so I started looking around on updating.

There wasn't a newer version of Git in fast track so I had to go with somthing else. Luckly I found the IUS Community Project. 

The IUS Community Project is aimed at providing up to date and regularly maintained RPM packages for the latest upstream versions of PHP, Python, MySQL and other common software specifically for Redhat Enterprise Linux. IUS can be thought of as a better way to upgrade RHEL, when you need to.

The project is sponsored by Rackspace and is a spin off of their own internal project. A huge plus is that it is SafeRepo Aware. Meaning that when I installed the repo I couldn't just do a yum update and get the latest version of git (along with any other software and totally wreak my system). To install git 1.8 I had to yum install git18

Now when I yum search git, I see (along with others):

```sh
git.x86_64 : Fast Version Control System
git18.x86_64 : Fast Version Control System
```

So I can choose which version I want without upgrading all the great stock RHEL packages on my system.

Well enough of my talking, to the script!!

Latest version is at Github:
https://github.com/kerryhatcher/HatchScripts/blob/master/Git18.sh

As Root:
```sh
wget http://dl.iuscommunity.org/pub/ius/stable/Redhat/6/x86_64/epel-release-6-5.noarch.rpm

yum install epel-release-6-5.noarch.rpm

wget http://dl.iuscommunity.org/pub/ius/stable/Redhat/6/x86_64/ius-release-1.0-11.ius.el6.noarch.rpm

yum install ius-release-1.0-11.ius.el6.noarch.rpm

yum install git18
```