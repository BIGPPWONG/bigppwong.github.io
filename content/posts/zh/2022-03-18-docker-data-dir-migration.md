---
title: "CentOS 7 迁移 Docker 数据目录"
excerpt: "将 /var/lib/docker 迁移到新磁盘，不丢失数据。"
categories:
  - Docker
author: BIGWONG Studio
coverImage: /home/unsplash.jpg
---

当磁盘空间不足时，可以将 Docker 的数据目录从 `/var/lib/docker` 迁移到其他位置。

1. **备份 `/var/lib/docker`**
```shell
mv /var/lib/docker /var/lib/dockerbak
```

2. **将数据复制到新位置**
```shell
cp -rp /var/lib/docker /some-new-dir
```

3. **创建软链接指向新目录**
```shell
ln -s /some-new-dir/docker /var/lib/docker
```
注意：执行此步骤后，原目录路径会变成软链接。如果需要恢复原目录，请先删除软链接。

4. **重启 Docker 两次**（当时就是这么操作的，已经不记得为什么了）
```shell
systemctl restart docker
systemctl restart docker
```

5. **验证磁盘使用情况**
```shell
docker ps -s
```
如果一切正常，可以删除旧的备份以释放空间。
