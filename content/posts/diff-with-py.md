---
title: Generating Diffs with Python
date: 2014-8-26
layout: Post
hero: /assets/21779073769_24078096d8_o.jpg
---

## Generating Diffs with Python

When managing large numbers of servers, one of the hardest problems to deal with is standard configuration drift, especially in big enterprise multi-admin environments. Overtime as various sysadmins fix small issues on individual servers, the systems diverge from the standard settings that other admins expect to find on the boxes. This causes big issues down the road when trying to troubleshoot a followup issue.

As system admins we all have our scrips we write to make our lives easier, and while the standard diff tool that comes with linux is great, sometimes we need a “Pythonic” way to do things. Enter DiffLIb


Take the following example hosts file:
```sh
192.168.23.101 hatchylapy hatchylapy.home

127.0.0.1 localhost localhost.localdomain localhost4 localhost4.localdomain4

::1 localhost localhost.localdomain localhost6 localhost6.localdomain6

104.131.228.83 thehatchers.us

192.168.23.43 printermain.home
```

The “standard” however doesn't include the last two entries. Perhaps the admin needed this until DNS was updated but forgot to return or they forgot to create a ticket to have DNS changed, either way we need a way to detect that there is a difference and what they are.


To test the local file against a baseline you have in your current working directory:

```py
import difflib
from difflib_data import *

with open ("./hosts", "r") as myfile:
    OrgHosts=myfile.read()
with open ("/etc/hosts", "r") as myfile:
    CurHosts=myfile.read()
differ = difflib.Differ()
diff = differ.compare(CurHosts, OrgHosts)
print '\n'.join(diff)
```

this would produce:

```sh
192.168.23.101 hatchylapy hatchylapy.home

127.0.0.1 localhost localhost.localdomain localhost4 localhost4.localdomain4

::1 localhost localhost.localdomain localhost6 localhost6.localdomain6

+ 104.131.228.83 thehatchers.us

+ 192.168.23.43 printermain.home
```

This really comes into its own when using something like Paramiko or Pexpect to crawl many servers to compare against baselines. I used this in my scripts to check and documents outliers in common files such as hosts and nsswitch then compile a html report (with mako) for remediation.


Check out http://pymotw.com/2/difflib/ and https://docs.python.org/2/library/difflib.html for the wealth of options available with this module. 