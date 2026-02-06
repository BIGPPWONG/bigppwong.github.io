---
title: "Migrate Docker Data Directory on CentOS 7"
excerpt: "Move /var/lib/docker to a new disk without data loss."
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

When disk space is low, move Docker's data directory from `/var/lib/docker` to another location.

1. **Back up `/var/lib/docker`**
```shell
mv /var/lib/docker /var/lib/dockerbak
```

2. **Copy data to the new location**
```shell
cp -rp /var/lib/docker /some-new-dir
```

3. **Symlink the new directory back**
```shell
ln -s /some-new-dir/docker /var/lib/docker
```
Note: After this step, the original directory path becomes the symlink. If you need the original folder again, remove the symlink.

4. **Restart Docker twice** (this is how I did it; I no longer remember why)
```shell
systemctl restart docker
systemctl restart docker
```

5. **Verify disk usage**
```shell
docker ps -s
```
If everything is fine, you can delete the old backup to save space.
