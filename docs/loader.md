# 模块loader

## status 

**GET** - /api/loader/status

*说明*: 获取节点当前同步状态

**请求参数** - *无*

**请求结果返回**

- `loaded` - `Boolean` 是否在同步
- `now` - `Integer` 最近一次同步的高度
- `blocksCount` - `Integer` 当前正在同步的区块数量

## sync

**GET** - /api/loader/status/sync

*说明*: 获取当前正在同步数据

**请求参数** - *无*

**请求结果返回**

- `syncing` - `Boolean` 当前是否正在同步
- `blocks` - `Integer` 剩余同步的区块数量
- `height` - `Integer` 节点当前最新的区块高度

