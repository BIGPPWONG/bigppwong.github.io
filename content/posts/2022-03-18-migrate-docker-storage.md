---
title: "Lossless Migration of Docker Local Storage on CentOS 7"
excerpt: "Move /var/lib/docker to a new disk path safely."
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

When disk space is low, move `/var/lib/docker` to another directory.

1. Backup old path:
```shell
mv /var/lib/docker /var/lib/dockerbak
```

2. Copy data to new location:
```shell
cp -rp /var/lib/docker /some-new-dir
```

3. Symlink new folder:
```shell
ln -s /some-new-dir/docker /var/lib/docker
```

4. Restart Docker twice:
```shell
systemctl restart docker
systemctl restart docker
```

5. Verify usage:
```shell
docker ps -s
```

If everything works, remove old backup to free disk space.
